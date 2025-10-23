import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider />
    <App />
  </BrowserRouter>
);
