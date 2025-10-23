import WeeklyCheckTracker from "../components/WeeklyCheckTracker";

export default function BiblePage() {
  return (
    <WeeklyCheckTracker
      activityType="bible"
      title="이번 주 성경 읽기 체크"
      description="오늘 성경을 읽었다면 체크해주세요"
      tip="📖 팁: 매일 4 장씩만 읽어도 10개월만에 성경을 다 읽을 수 있어요"
      successMessage="성경 읽기 완료!"
      color={{
        primary: "green",
        bgFrom: "from-green-50",
        bgTo: "to-emerald-50",
      }}
    />
  );
}
