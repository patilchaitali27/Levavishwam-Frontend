import { useEffect, useState } from "react";
import api from "../../services/api";
import { Check, X } from "lucide-react";

interface UserItem {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  status: string;
}

export default function UserApprovalManagement() {
  const [users, setUsers] = useState<UserItem[]>([]);

  // 🔹 TEMP STATIC DATA for UI demonstration
  const staticUsers: UserItem[] = [
    {
      id: 1,
      fullName: "Chaitali Patil",
      email: "chaitali@example.com",
      mobile: "9876543210",
      status: "pending",
    },
    {
      id: 2,
      fullName: "Rahul Sharma",
      email: "rahul.s@gmail.com",
      mobile: "9822114477",
      status: "pending",
    },
    {
      id: 3,
      fullName: "Priya Deshmukh",
      email: "priya.desh@example.com",
      mobile: "9665001122",
      status: "pending",
    }
  ];

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/admin/users/pending");
      setUsers(res.data);
    } catch (err) {
      console.log("API not ready → Using static sample users");
      setUsers(staticUsers);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const approveUser = async (id: number) => {
    alert(`Approved User ID: ${id}`);
  };

  const rejectUser = async (id: number) => {
    alert(`Rejected User ID: ${id}`);
  };

  return (
    <div className="space-y-10">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">User Approvals</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2" />
        <p className="text-sm text-gray-500 mt-2">
          Approve or reject users registered on the portal.
        </p>
      </div>

      {/* USER TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4">Pending Users</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{u.fullName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.mobile || "—"}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => approveUser(u.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
                  >
                    <Check className="w-4" /> Approve
                  </button>

                  <button
                    onClick={() => rejectUser(u.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                  >
                    <X className="w-4" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
