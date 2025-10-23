import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../../utils/supabaseConfig";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

// Types
interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          email: formData.email,
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
      const profile = userResponse.data[0];

      setAuth({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        profile,
      });

      toast.success("로그인 성공!", {
        duration: 2000,
        icon: <LogIn className="w-5 h-5" />,
        position: "top-center",
      });
      navigate("/home/dashboard");
    } catch (error: any) {
      const errData = error.response?.data;
      toast.error(
        `로그인 실패: ${errData?.error_description || error.message}`,
        {
          duration: 3000,
          position: "bottom-center",
        }
      );
      console.error("로그인 실패", errData || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">환영합니다!</h2>
        <p className="text-white/70">로그인하여 계속하세요</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="이메일"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
        type="submit"
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
    </form>
  );
}
