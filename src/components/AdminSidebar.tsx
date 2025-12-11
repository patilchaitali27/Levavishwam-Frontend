import React from "react";
import { NavLink } from "react-router-dom";

const base = "block px-4 py-2.5 rounded-lg text-sm font-medium transition";
const active = "bg-indigo-600 text-white shadow-sm";
const normal = "text-slate-700 hover:bg-indigo-50";

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 shadow-sm min-h-screen p-6 flex flex-col">
      {/* Logo Section */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold mb-3">
          L
        </div>
        <p className="text-sm font-semibold text-slate-900">
          Levavishwam Community
        </p>
        <p className="text-xs text-slate-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/menu"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          Menu Management
        </NavLink>

        <NavLink
          to="/admin/news"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          News Management
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          Event Management
        </NavLink>

        <NavLink
          to="/admin/committee"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          Committee Members
        </NavLink>

        <NavLink
          to="/admin/downloads"
          className={({ isActive }) => `${base} ${isActive ? active : normal}`}
        >
          Downloads
        </NavLink>

        <button
          type="button"
          className={`${base} ${normal} opacity-60 cursor-not-allowed`}
        >
          User Approvals (coming soon)
        </button>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200 text-xs text-slate-400">
        © {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default AdminSidebar;
