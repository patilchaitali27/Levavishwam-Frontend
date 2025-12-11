import React, { useEffect, useState } from "react";
import API from "../services/MenuApi";
import type { Menu ,MenuCreate} from "../types/menu";

const emptyForm: MenuCreate = {
  title: "",
  path: "",
  orderNo: 1,
  isActive: true,
  isAdminOnly: false,
};

const MenuManagement: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MenuCreate>(emptyForm);
  const [saving, setSaving] = useState<boolean>(false);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const res = await API.get<Menu[]>("/Menu");
      setMenus(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleChange = <K extends keyof MenuCreate>(key: K, value: MenuCreate[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId == null) {
        // create
        await API.post<Menu>("/Menu", {
          ...form,
          orderNo: Number(form.orderNo),
        });
      } else {
        // update
        await API.put<Menu>("/Menu", {
          id: editingId,
          ...form,
          orderNo: Number(form.orderNo),
        });
      }

      resetForm();
      await loadMenus();
    } catch (err) {
      console.error(err);
      alert("Error saving menu");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingId(menu.id);
    setForm({
      title: menu.title,
      path: menu.path,
      orderNo: menu.orderNo,
      isActive: menu.isActive,
      isAdminOnly: menu.isAdminOnly,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this menu?")) return;
    try {
      await API.delete(`/Menu/${id}`);
      await loadMenus();
    } catch (err) {
      console.error(err);
      alert("Error deleting menu");
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Menu Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Add, update and manage all navigation menus shown to users.
        </p>
      </div>

      {/* Form card */}
      <section className="bg-white rounded-2xl shadow-md p-6 max-w-xl">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          {editingId ? "Edit Menu" : "Add Menu"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Menu Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Home, News, Events..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Path
            </label>
            <input
              type="text"
              value={form.path}
              onChange={(e) => handleChange("path", e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="/home, /news, /events"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Order No
            </label>
            <input
              type="number"
              value={form.orderNo}
              min={1}
              onChange={(e) =>
                handleChange("orderNo", Number(e.target.value) || 1)
              }
              className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
              />
              Active
            </label>

            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={form.isAdminOnly}
                onChange={(e) =>
                  handleChange("isAdminOnly", e.target.checked)
                }
              />
              Admin only
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Menu"
                : "Add Menu"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border text-sm text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Table card */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Existing Menus
        </h2>

        {loading ? (
          <p className="text-sm text-slate-500">Loading menus...</p>
        ) : menus.length === 0 ? (
          <p className="text-sm text-slate-500">No menus found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Path</th>
                  <th className="p-3 text-left">Order</th>
                  <th className="p-3 text-left">Active</th>
                  <th className="p-3 text-left">Admin</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((m) => (
                  <tr key={m.id} className="border-t hover:bg-slate-50">
                    <td className="p-3">{m.title}</td>
                    <td className="p-3">{m.path}</td>
                    <td className="p-3">{m.orderNo}</td>
                    <td className="p-3">{m.isActive ? "Yes" : "No"}</td>
                    <td className="p-3">{m.isAdminOnly ? "Yes" : "No"}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(m)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-3 py-1 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuManagement;
