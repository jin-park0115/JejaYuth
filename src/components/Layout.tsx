import { Routes, Route } from "react-router-dom";
import { Attendance } from "../pages/Attendance";
import { MainPage } from "../pages/MainPage";
import { HeaderComponents } from "./HeaderComponent";
import { SideNavComponent } from "./SideNavComponent";

export function Layout() {
  return (
    <div className="h-screen grid grid-cols-[250px_1fr] grid-rows-[60px_1fr]">
      {/* 사이드바 - 컬럼 1, 로우 2 (전체 높이) */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <div className="h-full shadow-2xl border-r border-black">
          <SideNavComponent />
        </div>
      </div>

      {/* 헤더 - 컬럼 2, 로우 1 (사이드바 옆 위쪽) */}
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 bg-white border-b border-gray-200 justify-center">
        <HeaderComponents />
      </div>

      {/* 메인 콘텐츠 - 컬럼 2, 로우 2 (헤더 아래) */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </div>
  );
}
