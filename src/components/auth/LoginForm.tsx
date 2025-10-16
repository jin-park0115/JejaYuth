import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          email: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
        }
      );
      const data = response.data;
      console.log("로그인완", data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const userId = data.user.id;
      const userResponse = await axios.get(
        `${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );
      const userProfile = userResponse.data[0];
      console.log("유저 프로필", userProfile);

      if (userProfile) {
        localStorage.setItem("profile", JSON.stringify(userProfile));
      }

      alert("로그인 성공");
      navigate("/home");
    } catch (error: any) {
      const errData = error.response?.data;
      alert("로그인 실패: " + (errData?.error_description || error.message));
      console.error("로그인 실패", errData || error.message);
    }
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
