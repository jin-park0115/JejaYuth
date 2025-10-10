import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";

// Types
interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log("로그인:", formData);
    alert("로그인 성공!");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">환영합니다!</h2>
        <p className="text-white/70">로그인하여 계속하세요</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="아이디"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        로그인
      </button>

      <div className="text-center">
        <button
          type="button"
          className="text-white/70 hover:text-white text-sm transition-colors"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </div>
  );
}
