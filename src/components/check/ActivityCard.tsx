interface ActivityCardProps {
  title: string;
  count: number;
  goal: number;
  color: string;
  strokeColor: string;
}

export default function ActivityCard({
  title,
  count,
  goal,
  strokeColor,
}: ActivityCardProps) {
  const percentage = (count / goal) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={strokeColor}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-800">{count}</div>
            <div className="text-xs text-gray-500">/ {goal}일</div>
          </div>
        </div>

        <h3 className="text-gray-700 font-semibold text-lg mb-1">{title}</h3>
        <div className="text-sm text-gray-500">
          {percentage.toFixed(0)}% 완료
        </div>
      </div>
    </div>
  );
}
