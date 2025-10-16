import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Attendance } from "./pages/Attendance";
import AuthPages from "./pages/auth/AuthPage";
import { DashBoard } from "./pages/DashBoard";
import PrayerPage from "./pages/PrayerPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Layout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="prayer" element={<PrayerPage />} />
      </Route>
      <Route path="/" element={<AuthPages />} />
    </Routes>
  );
}

export default App;
