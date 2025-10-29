import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { App } from "./App.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HashRouter>
      <App />
    </HashRouter>
  </BrowserRouter>
);
