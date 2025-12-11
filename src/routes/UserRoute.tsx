import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserRoute() {
  const { user } = useAuth();

  if (user?.role?.toLowerCase() === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
