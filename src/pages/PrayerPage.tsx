import axios from "axios";
import { Ban, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../utils/supabaseConfig";

interface WeekDay {
  day: string;
  checked: boolean;
  date: Date | null;
}

interface DailyCheck {
  id: number;
  user_id: string;
  activity_type: string;
  check_date: string;
  created_at: string;
}

export default function PrayerPage() {
  const [weekDays, setWeekDays] = useState<WeekDay[]>([
    { day: "월", checked: false, date: null },
    { day: "화", checked: false, date: null },
    { day: "수", checked: false, date: null },
    { day: "목", checked: false, date: null },
    { day: "금", checked: false, date: null },
    { day: "토", checked: false, date: null },
    { day: "일", checked: false, date: null },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const auth = useAuthStore((state) => state);

  const supabaseApi = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${auth.accessToken || SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const updatedDays = weekDays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return { ...day, date };
    });
    setWeekDays(updatedDays);

    if (auth.user.id) {
      loadWeekData(updatedDays);
    }
  }, [auth.user.id]);

  const loadWeekData = async (days: WeekDay[]) => {
    try {
      const startDate = days[0].date!.toISOString().split("T")[0];
      const endDate = days[6].date!.toISOString().split("T")[0];

      const { data } = await supabaseApi.get<DailyCheck[]>(
        `/daily_checks?user_id=eq.${auth.user.id}&activity_type=eq.prayer&check_date=gte.${startDate}&check_date=lte.${endDate}`
      );
      const checkedDates = data.map((record) => record.check_date);
      const updatedDays = days.map((day) => ({
        ...day,
        checked: checkedDates.includes(day.date!.toISOString().split("T")[0]),
      }));
      setWeekDays(updatedDays);
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  };

  const toggleDay = async (index: number) => {
    const day = weekDays[index];
    const checkDate = day.date!.toISOString().split("T")[0];
    setIsSubmitting(true);

    try {
      if (!day.checked) {
        await supabaseApi.post(
          "/daily_checks",
          {
            user_id: auth.user.id,
            activity_type: "prayer",
            check_date: checkDate,
          },
          {
            headers: {
              Prefer: "return=minimal",
            },
          }
        );
        const newWeekDays = [...weekDays];
        newWeekDays[index].checked = true;
        setWeekDays(newWeekDays);
        toast.success("기도 체크완료!", {
          duration: 3000,
          icon: <Check className="w-5 h-5" />,
        });
      } else {
        await supabaseApi.delete(
          `/daily_checks?user_id=eq.${auth.user.id}&activity_type=eq.prayer&check_date=eq.${checkDate}`
        );
        const newWeekDays = [...weekDays];
        newWeekDays[index].checked = false;
        setWeekDays(newWeekDays);
        toast("체크가 해제되었습니다.", {
          duration: 2000,
          icon: <Ban className="w-5 h-5" />,
        });
      }
    } catch (error) {
      console.error("토글 오류", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            이번 주 기도 체크
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            5분 이상 기도했다면 체크해주세요
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {weekDays.map((day, index) => (
            <button
              key={index}
              onClick={() => toggleDay(index)}
              className="relative group"
              disabled={isSubmitting || !day.date}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  day.checked
                    ? "bg-blue-500 shadow-lg scale-110"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {day.checked ? (
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={3}
                  />
                ) : (
                  <X
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    strokeWidth={2}
                  />
                )}
              </div>
              <span className="text-xs text-gray-600 mt-1 block">
                {day.day}
              </span>
              {day.date && (
                <span className="text-xs text-gray-400 block">
                  {day.date.getDate()}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              이번 주 기도 일수
            </span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {weekDays.filter((d) => d.checked).length} / 7
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (weekDays.filter((d) => d.checked).length / 7) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-xs text-gray-400 text-center space-y-1">
          <p>💡 팁: 매일 5분만 기도해도 큰 변화가 생깁니다</p>
          <p className="text-gray-300">클릭하면 즉시 저장됩니다</p>
        </div>
      </div>
    </div>
  );
}
