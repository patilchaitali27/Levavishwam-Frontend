import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext"; // ⬅ ADD THIS

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>       
        <App />
      </MenuProvider>
    </AuthProvider>
  </StrictMode>
);
