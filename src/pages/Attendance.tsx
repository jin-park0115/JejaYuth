import axios from "axios";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../utils/supabaseConfig";

export function Attendance() {
  const [selected, setSelected] = useState<"참석" | "불참" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuthStore((state) => state);

  const getCurrentSunday = () => {
    const today = new Date();
    let day = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - day);
    const offset = sunday.getTimezoneOffset() * 6000;
    return new Date(sunday.getTime() - offset).toISOString().split("T")[0];
  };
  const currentSunday = getCurrentSunday();

  const isCheckAvailable = () => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 || day === 1;
  };

  const handleSubmit = async () => {
    if (!selected) return alert("참석 여부를 선택하세요.");
    if (!isCheckAvailable()) return alert("오늘은 출석 체크가 불가능 합니다.");
    setIsSubmitting(true);

    try {
      const { data: existing } = await axios.get(
        `${SUPABASE_URL}/rest/v1/sunday_check?user_id=eq.${auth.user.id}&date=eq.${currentSunday}`,
        {
          headers: {
            apiKey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (existing.length > 0) {
        alert("이미 출석 체크를 완료했습니다!");
        setIsSubmitting(false);
        return;
      }

      await axios.post(
        `${SUPABASE_URL}/rest/v1/sunday_check`,
        {
          user_id: auth.user.id,
          date: currentSunday,
          check_attended: selected === "참석",
        },
        {
          headers: {
            apiKey: SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
            Prefer: "resolution=merge-duplicates",
          },
        }
      );
      alert("출석완료!");
      setSelected(null);
    } catch (error) {
      console.error("출석실패", error);
      alert("출석 제출 중 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              출석 체크
            </h1>
            <p className="text-gray-500 text-base sm:text-lg">
              {currentSunday}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            <button
              disabled={!isCheckAvailable() || isSubmitting}
              onClick={() => setSelected("불참")}
              className={`relative border-2 rounded-lg p-6 sm:p-8 transition-all duration-200 ${
                selected === "불참"
                  ? "border-red-500 bg-red-500 text-white shadow-lg scale-105"
                  : "border-gray-300 hover:border-red-400 bg-white text-gray-800"
              } ${
                !isCheckAvailable() || isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {selected === "불참" && (
                <div className="absolute top-2 right-2">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={3}
                  />
                </div>
              )}
              <span className="text-lg sm:text-xl font-semibold">불참</span>
            </button>

            <button
              disabled={!isCheckAvailable() || isSubmitting}
              onClick={() => setSelected("참석")}
              className={`relative border-2 rounded-lg p-6 sm:p-8 transition-all duration-200 ${
                selected === "참석"
                  ? "border-blue-500 bg-blue-500 text-white shadow-lg scale-105"
                  : "border-gray-300 hover:border-blue-400 bg-white text-gray-800"
              } ${
                !isCheckAvailable() || isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {selected === "참석" && (
                <div className="absolute top-2 right-2">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={3}
                  />
                </div>
              )}
              <span className="text-lg sm:text-xl font-semibold">참석</span>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selected || !isCheckAvailable() || isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              !selected || !isCheckAvailable() || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "제출 중..." : "제출"}
          </button>

          {!isCheckAvailable() && (
            <p className="text-center text-sm text-red-500 mt-4">
              출석 체크는 주일과 월요일에만 가능합니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
