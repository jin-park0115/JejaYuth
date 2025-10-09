import { Link, useLocation } from "react-router-dom";
import logo from "../assets/covenentLogo.jpg";

const menuItems = [
  { name: "대시보드", path: "/" },
  { name: "출석체크", path: "/attendance" },
  { name: "기도체크", path: "/prayer" },
  { name: "말씀체크", path: "/word" },
  { name: "큐티체크", path: "/qt" },
  { name: "광고", path: "/ad" },
];

export function SideNavComponent() {
  const location = useLocation();

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col gap-[50px] p-[10px]">
        <Link to="/" className="hover:opacity-80 transition-opacity w-[100px]">
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
      </div>
    </div>
  );
}
