import { useEffect, useState } from "react";
import { Pencil, Trash2, Image } from "lucide-react";
import api from "../../services/api";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  newsDate: string;
  author: string;
  category: string;
  content: string;
}

export default function NewsManagement() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    newsDate: "",
    author: "",
    category: "",
    content: "",
    file: null as File | null,
  });

  const loadNews = async () => {
    const res = await api.get("/api/home/news");
    setNewsList(res.data);
  };

  useEffect(() => {
    loadNews();
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
      excerpt: "",
      newsDate: "",
      author: "",
      category: "",
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
      formData.append("excerpt", form.excerpt);
      formData.append("newsDate", form.newsDate);
      formData.append("author", form.author);
      formData.append("category", form.category);
      formData.append("content", form.content);

      if (form.file) {
        formData.append("file", form.file);
      }

      if (editingId) {
        await api.put(`/api/admin/news/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/admin/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      loadNews();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      newsDate: item.newsDate,
      author: item.author,
      category: item.category,
      content: item.content,
      file: null,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    await api.delete(`/api/admin/news/${id}`);
    loadNews();
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">News Management</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mt-2"></div>
        <p className="text-sm text-gray-500 mt-2">
          Add, update and manage all news displayed on the homepage.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit News" : "Add News"}
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

          {/* EXCERPT */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Short Description</label>
            <input
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4 text-purple-600" />
              Upload News Image
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

          {/* DATE - AUTHOR - CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="newsDate"
                value={form.newsDate}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-50"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              {loading ? "Saving..." : editingId ? "Update News" : "Add News"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4">Existing News</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {newsList.map((n) => (
              <tr key={n.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{n.title}</td>
                <td className="p-3">{n.category}</td>
                <td className="p-3">{n.newsDate}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(n)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg flex items-center gap-1 hover:bg-green-700"
                  >
                    <Pencil className="w-4" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg flex items-center gap-1 hover:bg-red-700"
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
