import { Outlet } from "react-router-dom";
import { SideNavComponent } from "./SideNavComponent";

export function Layout() {
  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* 사이드바 - 데스크톱(1024px 이상)에서는 좌측, 모바일에서는 하단 */}
      <div className="lg:w-[15%] order-2 lg:order-1 relative z-10">
        <SideNavComponent />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="lg:w-[85%] flex-1 order-1 lg:order-2 overflow-auto pb-16 lg:pb-0 relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
