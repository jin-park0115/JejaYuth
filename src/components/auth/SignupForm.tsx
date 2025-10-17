import { useState } from "react";
import { Mail, User, Lock, EyeOff, Eye } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface SignupFormData {
  name: string;
  age: string;
  cell: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    age: "",
    cell: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pw: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+~])[A-Za-z\d!@#$%^&*()_+~]{8,}$/.test(
      pw
    );

  const handleSubmit = async () => {
    if (!validateEmail(formData.email))
      return alert("이메일 형식이 올바르지 않습니다.");
    if (!validatePassword(formData.password))
      return alert(
        "비밀번호는 8자 이상, 영문과 숫자 특수문자 기호를 포함해야 합니다."
      );
    if (formData.password !== formData.confirmPassword)
      return alert("비밀번호가 일치하지 않습니다.");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        alert("이미 가입된 이메일입니다.");
      } else {
        alert(`회원가입 실패: ${signUpError.message}`);
      }
      return;
    }

    const user = data.user;

    if (!user) return alert("세션 생성 실패. 다시 시도해주세요.");

    const { error: dbError } = await supabase.from("users").insert([
      {
        id: user.id, // auth.users.id (UUID)
        name: formData.name,
        age: formData.age,
        cell: formData.cell,
        role: formData.role,
      },
    ]);

    if (dbError) {
      alert(`DB 저장 실패: ${dbError.message}`);
      console.error(dbError);
      return;
    }

    alert("회원가입 성공! 🎉");
    navigate("/home");
  };

  return (
    <div className="p-8 space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">계정 만들기</h2>
        <p className="text-white/70">환영합니다.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="나이"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={formData.cell}
              onChange={(e) =>
                setFormData({ ...formData, cell: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-purple-600">
                셀 선택
              </option>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num} className="bg-purple-600">
                  {num}셀
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-purple-600">
              직분 선택
            </option>
            <option value="목사님" className="bg-purple-600">
              목사님
            </option>
            <option value="리더" className="bg-purple-600">
              리더
            </option>
            <option value="새가족 담당" className="bg-purple-600">
              새가족 담당
            </option>
            <option value="셀원" className="bg-purple-600">
              셀원
            </option>
          </select>
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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
            className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showConfirmPassword ? (
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
        회원가입
      </button>
    </div>
  );
}
