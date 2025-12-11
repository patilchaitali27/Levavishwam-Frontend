import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-slate-200">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Levavishwam <span className="text-indigo-600">Admin</span>
        </h1>
        <p className="text-xs text-slate-500">
          Community Portal • Administration
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="text-sm px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
          Logout
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full border border-slate-200"
            alt="Admin"
          />
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">Admin</p>
            <p className="text-xs text-slate-500">Superuser</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
