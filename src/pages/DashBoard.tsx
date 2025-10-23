import { useState } from "react";
import ActivityCard from "../components/check/ActivityCard";
import MotivationMessage from "../components/check/MotivationMessage";
import StatCard from "../components/check/StatCard";
import WeeklyCalendar from "../components/check/WeeklyCalendar";
import { useAuthStore } from "../store/useAuthStore";

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
  const profile = useAuthStore((state) => state.profile);
  //mockup data(실제로는 DB에서 가져올 예정)
  const [weeklyData] = useState<WeeklyData>({
    prayer: { count: 5, goal: 7 },
    scripture: { count: 6, goal: 7 },
    qt: { count: 4, goal: 7 },
    attendance: { count: 1, goal: 1 },
  });

  //얘도 mockup data
  const [activityLog] = useState<DayActivity[]>([
    { day: 0, prayer: true, scripture: true, qt: true },
    { day: 1, prayer: true, scripture: true, qt: false },
    { day: 2, prayer: true, scripture: true, qt: true },
    { day: 3, prayer: false, scripture: true, qt: false },
    { day: 4, prayer: true, scripture: true, qt: true },
    { day: 5, prayer: true, scripture: false, qt: true },
    { day: 6, prayer: false, scripture: false, qt: false },
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {profile?.name}님 지난 주 활동 대시보드
          </h1>
          <p className="text-gray-600">한 주간의 신앙생활을 되돌아봅시다</p>
        </div>

        {/* 격려 메시지 */}
        <MotivationMessage percentage={overallPercentage} />

        {/* 활동 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
