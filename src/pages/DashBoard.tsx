import { useEffect, useState } from "react";
import ActivityCard from "../components/check/ActivityCard";
import MotivationMessage from "../components/check/MotivationMessage";
import StatCard from "../components/check/StatCard";
import WeeklyCalendar from "../components/check/WeeklyCalendar";
import { useAuthStore } from "../store/useAuthStore";
import {
  fetchLastWeekActivities,
  fetchLastWeekAttendance,
  transformToActivityLog,
  transformToWeeklyData,
} from "../utils/dashboardData";

interface WeeklyGoal {
  count: number;
  goal: number;
}

interface WeeklyData {
  prayer: WeeklyGoal;
  scripture: WeeklyGoal;
  qt: WeeklyGoal;
  attendance: WeeklyGoal;
}
interface DayActivity {
  day: number;
  prayer: boolean;
  scripture: boolean;
  qt: boolean;
}

export function DashBoard() {
  const auth = useAuthStore((state) => state);
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({
    prayer: { count: 0, goal: 7 },
    scripture: { count: 0, goal: 7 },
    qt: { count: 0, goal: 7 },
    attendance: { count: 0, goal: 1 },
  });

  const [activityLog, setActivityLog] = useState<DayActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      if (!auth.user.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const [activities, attendance] = await Promise.all([
          fetchLastWeekActivities(auth.user.id, auth.accessToken!),
          fetchLastWeekAttendance(auth.user.id, auth.accessToken!),
        ]);
        const weekly = transformToWeeklyData(activities, attendance);
        const daily = transformToActivityLog(activities);

        setWeeklyData(weekly);
        setActivityLog(daily);
      } catch (err) {
        console.error("faild to load dashboard:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [auth.user.id]);

  const totalActivities =
    weeklyData.prayer.count + weeklyData.scripture.count + weeklyData.qt.count;
  const totalGoals =
    weeklyData.prayer.goal + weeklyData.scripture.goal + weeklyData.qt.goal;
  const overallPercentage = Math.round((totalActivities / totalGoals) * 100);
  const perfectDays = activityLog.filter(
    (day) => day.prayer && day.scripture && day.qt
  ).length;

  const activities = [
    {
      title: "기도",
      data: weeklyData.prayer,
      color: "bg-blue-500",
      strokeColor: "#3b82f6",
    },
    {
      title: "말씀읽기",
      data: weeklyData.scripture,
      color: "bg-green-500",
      strokeColor: "#22c55e",
    },
    {
      title: "큐티",
      data: weeklyData.qt,
      color: "bg-purple-500",
      strokeColor: "#a855f7",
    },
    {
      title: "출석",
      data: weeklyData.attendance,
      color: "bg-pink-500",
      strokeColor: "#ec4899",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            {auth.profile.name}님 지난 주 활동 대시보드
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            한 주간의 신앙생활을 되돌아봅시다
          </p>
        </div>

        {/* 격려 메시지 */}
        <MotivationMessage percentage={overallPercentage} />

        {/* 활동 카드 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          {activities.map((activity, idx) => (
            <ActivityCard
              key={idx}
              title={activity.title}
              count={activity.data.count}
              goal={activity.data.goal}
              color={activity.color}
              strokeColor={activity.strokeColor}
            />
          ))}
        </div>

        {/* 주간 활동 캘린더 */}
        <WeeklyCalendar activityLog={activityLog} />

        {/* 통계 요약 */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            value={totalActivities}
            label="총 활동 횟수"
            color="text-blue-600"
          />
          <StatCard
            value={perfectDays}
            label="완벽한 날"
            color="text-green-600"
          />
          <StatCard
            value={`${overallPercentage}%`}
            label="전체 달성률"
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
}
