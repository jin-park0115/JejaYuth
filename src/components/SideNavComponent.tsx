import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/covenentLogo.jpg";
import { useAuthStore } from "../store/useAuthStore";

const menuItems = [
  { name: "대시보드", path: "/home/dashboard" },
  { name: "출석체크", path: "/home/attendance" },
  { name: "기도체크", path: "/home/prayer" },
  { name: "말씀체크", path: "/home/word" },
  { name: "큐티체크", path: "/home/qt" },
  { name: "광고", path: "/home/ad" },
];

export function SideNavComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logoutAuth();
      navigate("/");
    }
  };

  return (
    <div className="h-full bg-white">
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
  );
}
