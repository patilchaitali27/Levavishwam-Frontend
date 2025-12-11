import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage menus, content and users of the Levavishwam Community Portal.
        </p>
      </div>

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
    </div>
  );
};

export default AdminDashboard;
