import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Attendance } from "./pages/Attendance";
import AuthPages from "./pages/auth/AuthPage";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Layout />}>
        <Route path="dashboard" element={<MainPage />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>
      <Route path="/" element={<AuthPages />} />
    </Routes>
  );
}

export default App;
