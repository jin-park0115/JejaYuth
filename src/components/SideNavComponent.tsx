import {
  LogOut,
  Home,
  CheckSquare,
  MessageCircle,
  Book,
  BookOpen,
  Megaphone,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/covenentLogo.jpg";
import { useAuthStore } from "../store/useAuthStore";

const menuItems = [
  { name: "대시보드", path: "/home/dashboard", icon: Home },
  { name: "출석체크", path: "/home/attendance", icon: CheckSquare },
  { name: "기도체크", path: "/home/prayer", icon: MessageCircle },
  { name: "말씀체크", path: "/home/bible", icon: Book },
  { name: "큐티체크", path: "/home/qt", icon: BookOpen },
  { name: "광고", path: "/home/advertising", icon: Megaphone },
];

export function SideNavComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logoutAuth();
      navigate("/");
      toast.error("로그아웃 되었습니다.", {
        duration: 2000,
        icon: <LogOut className="w-5 h-5" />,
      });
    }
  };

  return (
    <>
      {/* 데스크톱 사이드바 (1024px 이상) */}
      <div className="hidden lg:flex h-full bg-white">
        <div className="flex flex-col gap-[50px] p-[10px]">
          <Link
            to="/home/dashboard"
            className="hover:opacity-80 transition-opacity w-[100px]"
          >
            <img src={logo} alt="커버넌트 로고" />
          </Link>
          <div className="text-xl flex flex-col gap-[4px]">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="text-[14px] pl-[10px]">
            <button onClick={handleLogout} className="cursor-pointer">
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 하단 네비게이션 바 (1024px 미만) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">
                  {item.name.replace("체크", "")}
                </span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-gray-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">로그아웃</span>
          </button>
        </div>
      </div>
    </>
  );
}
