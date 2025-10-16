import { Award } from "lucide-react";

interface MotivationMessageProps {
  percentage: number;
}

export default function MotivationMessage({
  percentage,
}: MotivationMessageProps) {
  const getMessage = () => {
    if (percentage >= 90)
      return {
        text: "정말 훌륭해요! 꾸준히 실천하고 계시네요 🌟",
        color: "text-green-600",
      };
    if (percentage >= 70)
      return {
        text: "잘하고 계세요! 조금만 더 힘내요 💪",
        color: "text-blue-600",
      };
    if (percentage >= 50)
      return {
        text: "좋은 시작이에요. 함께 노력해봐요 😊",
        color: "text-yellow-600",
      };
    return {
      text: "오늘부터 다시 시작해볼까요? 응원합니다! 🙏",
      color: "text-gray-600",
    };
  };

  const message = getMessage();

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <Award className="w-8 h-8 text-yellow-500" />
        <div>
          <p className={`text-lg font-medium ${message.color}`}>
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}
