import React from "react";
import { Newspaper, CalendarDays, Download, Users, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage content, news, events, and community updates.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <p className="text-xs text-slate-500">Total Menus</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">–</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 opacity-70">
          <p className="text-xs text-slate-500">Approved Users</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">Coming soon</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 opacity-70">
          <p className="text-xs text-slate-500">Pending Approvals</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">Coming soon</p>
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Manage Modules</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* News Management */}
          <div
            onClick={() => navigate("/admin/news")}
            className="bg-white cursor-pointer rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Newspaper className="w-10 h-10 text-purple-600" />
              <div>
                <p className="text-lg font-semibold text-slate-900">News Management</p>
                <p className="text-sm text-slate-500">Add, edit and delete news</p>
              </div>
            </div>
          </div>

          {/* Events Management */}
          <div
            onClick={() => navigate("/admin/events")}
            className="bg-white cursor-pointer rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <CalendarDays className="w-10 h-10 text-blue-600" />
              <div>
                <p className="text-lg font-semibold text-slate-900">Events Management</p>
                <p className="text-sm text-slate-500">Create and manage events</p>
              </div>
            </div>
          </div>

          {/* Downloads Management */}
          <div
            onClick={() => navigate("/admin/downloads")}
            className="bg-white cursor-pointer rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Download className="w-10 h-10 text-green-600" />
              <div>
                <p className="text-lg font-semibold text-slate-900">Downloads Management</p>
                <p className="text-sm text-slate-500">Upload and manage documents</p>
              </div>
            </div>
          </div>

          {/* Committee Members */}
          <div
            onClick={() => navigate("/admin/committee")}
            className="bg-white cursor-pointer rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-lg font-semibold text-slate-900">Committee Members</p>
                <p className="text-sm text-slate-500">Manage member details</p>
              </div>
            </div>
          </div>

          {/* Menu Management */}
          <div
            onClick={() => navigate("/admin/menu")}
            className="bg-white cursor-pointer rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-10 h-10 text-indigo-500" />
              <div>
                <p className="text-lg font-semibold text-slate-900">Menu Management</p>
                <p className="text-sm text-slate-500">Manage website menus</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
