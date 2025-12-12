import React from "react";
import {
  Newspaper,
  CalendarDays,
  Download,
  Users,
  LayoutDashboard,
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Quickly manage all modules of the Levavishwam Community Portal.
        </p>

        <div className="w-28 h-1 mx-auto mt-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
      </div>

      {/* QUICK STATS */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Menus</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">–</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Approved Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Pending Approvals</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
        </div>
      </div>

      {/* MANAGEMENT SECTIONS */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Manage Modules</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* NEWS */}
          <div
            onClick={() => navigate("/admin/news")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Newspaper className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">News Management</p>
                <p className="text-sm text-gray-500">Add, edit & publish news</p>
              </div>
            </div>
          </div>

          {/* EVENTS */}
          <div
            onClick={() => navigate("/admin/events")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <CalendarDays className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Events Management</p>
                <p className="text-sm text-gray-500">Create & manage events</p>
              </div>
            </div>
          </div>

          {/* DOWNLOADS */}
          <div
            onClick={() => navigate("/admin/downloads")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Download className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Downloads Management</p>
                <p className="text-sm text-gray-500">Upload & manage documents</p>
              </div>
            </div>
          </div>

          {/* COMMITTEE */}
          <div
            onClick={() => navigate("/admin/committee")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Committee Members</p>
                <p className="text-sm text-gray-500">Manage details & roles</p>
              </div>
            </div>
          </div>

          {/* USER APPROVALS */}
          <div
            onClick={() => navigate("/admin/user-approvals")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">User Approvals</p>
                <p className="text-sm text-gray-500">Approve or reject users</p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div
            onClick={() => navigate("/admin/menu")}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <LayoutDashboard className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Menu Management</p>
                <p className="text-sm text-gray-500">Control navigation menus</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
