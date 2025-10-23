import WeeklyCheckTracker from "../components/WeeklyCheckTracker";

export default function QtPage() {
  return (
    <WeeklyCheckTracker
      activityType="qt"
      title="이번 주 큐티 체크"
      description="오늘 큐티를 했다면 체크해주세요"
      tip="📖 팁: 하루의 큐티는 삶의 원동력이 될 수 있어요"
      successMessage="큐티 완료!"
      color={{
        primary: "purple",
        bgFrom: "from-purple-50",
        bgTo: "to-fuchsia-50",
      }}
    />
  );
}
