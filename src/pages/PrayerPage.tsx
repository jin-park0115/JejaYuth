import WeeklyCheckTracker from "../components/WeeklyCheckTracker";

export default function PrayerPage() {
  return (
    <WeeklyCheckTracker
      activityType="prayer"
      title="이번 주 기도 체크"
      description="5분 이상 기도했다면 체크해주세요"
      tip="💡 팁: 매일 5분만 기도해도 큰 변화가 생깁니다"
      successMessage="기도 체크 완료!"
      color={{
        primary: "blue",
        bgFrom: "from-blue-50",
        bgTo: "to-indigo-50",
      }}
    />
  );
}
