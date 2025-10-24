import { Outlet } from "react-router-dom";
import { SideNavComponent } from "./SideNavComponent";

export function Layout() {
  return (
    <div className="h-screen flex flex-col lg:flex-row w-screen">
      {/* 사이드바 - 데스크톱(1024px 이상)에서는 좌측, 모바일에서는 하단 */}
      <div className="lg:w-[15%] order-2 lg:order-1">
        <div className="">
          <SideNavComponent />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="lg:w-[85%] flex-1 order-1 lg:order-2 overflow-auto pb-16 lg:pb-0">
        <Outlet />
      </div>
    </div>
  );
}
