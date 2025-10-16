import { TrendingUp } from "lucide-react";

interface DayActivity {
  day: number;
  prayer: boolean;
  scripture: boolean;
  qt: boolean;
}

interface WeeklyCalendarProps {
  activityLog: DayActivity[];
}

export default function WeeklyCalendar({ activityLog }: WeeklyCalendarProps) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">주간 활동 패턴</h2>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div key={idx} className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-3">{day}</div>
            <div className="space-y-2">
              <div
                className={`h-8 rounded ${
                  activityLog[idx]?.prayer ? "bg-blue-500" : "bg-gray-200"
                }`}
                title="기도"
              />
              <div
                className={`h-8 rounded ${
                  activityLog[idx]?.scripture ? "bg-green-500" : "bg-gray-200"
                }`}
                title="말씀"
              />
              <div
                className={`h-8 rounded ${
                  activityLog[idx]?.qt ? "bg-purple-500" : "bg-gray-200"
                }`}
                title="큐티"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-sm text-gray-600">기도</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm text-gray-600">말씀</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <span className="text-sm text-gray-600">큐티</span>
        </div>
      </div>
    </div>
  );
}
