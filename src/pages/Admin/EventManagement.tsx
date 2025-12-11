import { useEffect, useState } from "react";
import { Pencil, Trash2, Image } from "lucide-react";
import api from "../../services/api";

interface EventItem {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  imageUrl: string;
  status: string;
  content?: string;
}

export default function EventManagement() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    eventDate: "",
    eventTime: "",
    location: "",
    description: "",
    status: "upcoming",
    content: "",
    file: null as File | null,
  });

  const loadEvents = async () => {
    const res = await api.get("/api/home/events");
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
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
      title: "",
      eventDate: "",
      eventTime: "",
      location: "",
      description: "",
      status: "upcoming",
      content: "",
      file: null,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("eventDate", form.eventDate);
      formData.append("eventTime", form.eventTime);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("content", form.content ?? "");

      if (form.file) {
        formData.append("file", form.file);
      }

      if (editingId) {
        await api.put(`/api/admin/events/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/admin/events", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      loadEvents();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleEdit = (item: EventItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      eventDate: item.eventDate,
      eventTime: item.eventTime,
      location: item.location,
      description: item.description,
      status: item.status,
      content: item.content ?? "",
      file: null,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    await api.delete(`/api/admin/events/${id}`);
    loadEvents();
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Event Management</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
        <p className="text-sm text-gray-500 mt-2">
          Add, edit and manage community events visible on the homepage.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Event" : "Add Event"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* TITLE */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              required
            />
          </div>

          {/* DATE - TIME - STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Event Time</label>
              <input
                type="time"
                name="eventTime"
                value={form.eventTime}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4 text-purple-600" />
              Upload Event Image
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              required={!editingId}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Short Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
            ></textarea>
          </div>

          {/* CONTENT */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Full Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
            ></textarea>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow"
            >
              {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-gray-200 text-gray-800 rounded-xl"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4">Existing Events</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{ev.title}</td>
                <td className="p-3">{ev.eventDate}</td>
                <td className="p-3 capitalize">{ev.status}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(ev)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg flex items-center gap-1"
                  >
                    <Pencil className="w-4" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ev.id)}
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
