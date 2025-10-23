import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Advertising from "./pages/Advertising";
import { Attendance } from "./pages/Attendance";
import AuthPages from "./pages/auth/AuthPage";
import BiblePage from "./pages/BiblePage";
import { DashBoard } from "./pages/DashBoard";
import PrayerPage from "./pages/PrayerPage";
import QtPage from "./pages/QtPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Layout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="prayer" element={<PrayerPage />} />
        <Route path="bible" element={<BiblePage />} />
        <Route path="qt" element={<QtPage />} />
        <Route path="advertising" element={<Advertising />} />
      </Route>
      <Route path="/" element={<AuthPages />} />
    </Routes>
  );
}

export default App;
