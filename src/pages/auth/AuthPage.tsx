import { useState } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";

export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex p-2 bg-white/5">
            <button
              onClick={() => setCurrentPage("login")}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                currentPage === "login"
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setCurrentPage("signup")}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                currentPage === "signup"
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              회원가입
            </button>
          </div>

          {currentPage === "login" ? <LoginForm /> : <SignupForm />}
        </div>

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>주 예수를 믿으라 그리하면 너와 네 집이 구원을 얻으리라</p>
          <p className="test-[12px]">사도행전 16:31</p>
        </div>
      </div>
    </div>
  );
}
