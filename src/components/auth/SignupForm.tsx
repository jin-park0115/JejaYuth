import { useState } from "react";
import { Mail, Calendar, User, Lock, EyeOff, Eye } from "lucide-react";

interface SignupFormData {
  name: string;
  age: string;
  cell: string;
  position: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    age: "",
    cell: "",
    position: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    console.log("회원가입:", formData);
    alert("회원가입 성공!");
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
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="number"
              placeholder="나이"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-purple-600">
              직위 선택
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
            placeholder="아이디"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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
