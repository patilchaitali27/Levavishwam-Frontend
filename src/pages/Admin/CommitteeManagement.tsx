import { useEffect, useState } from "react";
import { Pencil, Trash2, Image } from "lucide-react";
import api from "../../services/api";

interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  department: string;
  imageUrl: string;
  email: string;
  phone: string;
  bio: string;
  joinYear: number;
}

export default function CommitteeManagement() {
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    bio: "",
    joinYear: new Date().getFullYear(),
    file: null as File | null
  });

  const loadData = async () => {
    const res = await api.get("/api/home/committee");
    setCommittee(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: any) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      bio: "",
      joinYear: new Date().getFullYear(),
      file: null
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("department", form.department);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("bio", form.bio);
      formData.append("joinYear", String(form.joinYear));

      if (form.file) formData.append("file", form.file);

      if (editingId) {
        await api.put(`/api/admin/committee/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await api.post("/api/admin/committee", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      resetForm();
      loadData();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleEdit = (item: CommitteeMember) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      role: item.role,
      department: item.department,
      email: item.email,
      phone: item.phone,
      bio: item.bio,
      joinYear: item.joinYear,
      file: null
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    await api.delete(`/api/admin/committee/${id}`);
    loadData();
  };

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Committee Members Management</h1>
        <p className="text-sm text-slate-500">
          Add, update and manage official community committee members.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Committee Member" : "Add Committee Member"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* NAME + ROLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Role</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required
              />
            </div>
          </div>

          {/* DEPARTMENT + IMAGE UPLOAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* IMAGE UPLOAD FIELD */}
            <div>
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Image className="w-4 h-4 text-indigo-600" />
                Upload Photo
              </label>

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required={!editingId}
              />
            </div>
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              rows={4}
            ></textarea>
          </div>

          {/* JOIN YEAR */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Join Year</label>
            <input
              type="number"
              name="joinYear"
              value={form.joinYear}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Saving..." : editingId ? "Update Member" : "Add Member"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-3 px-5 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* TABLE LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Existing Members</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {committee.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.role}</td>
                <td className="p-3">{m.phone}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(m)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg flex items-center gap-1"
                  >
                    <Pencil className="w-4" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg flex items-center gap-1"
                  >
                    <Trash2 className="w-4" /> Delete
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
