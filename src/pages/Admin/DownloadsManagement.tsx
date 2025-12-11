import { useEffect, useState } from "react";
import { Trash2, UploadCloud } from "lucide-react";
import api from "../../services/api";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  fileType: string;
  size: string;
  uploadDate: string;
  downloadsCount: number;
  category: string;
  fileUrl: string;
}

export default function DownloadsManagement() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    uploadDate: "",
    file: null as File | null
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      uploadDate: "",
      file: null
    });
  };

  const loadDocuments = async () => {
    const res = await api.get("/api/home/downloads");
    setDocs(res.data);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleChange = (e: any) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please upload a file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("uploadDate", form.uploadDate);
      formData.append("file", form.file);

      await api.post("/api/admin/downloads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      resetForm();
      loadDocuments();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this file?")) return;

    await api.delete(`/api/admin/downloads/${id}`);
    loadDocuments();
  };

  return (
    <div className="space-y-10">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Downloads Management</h1>
        <p className="text-sm text-slate-500">
          Upload and manage downloadable files for users.
        </p>
      </div>

      {/* ADD FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="text-sm font-semibold text-slate-600">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Upload Date</label>
            <input
              type="date"
              name="uploadDate"
              value={form.uploadDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-indigo-600" />
              Upload File
            </label>

            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleChange}
              className="w-full mt-2"
              required
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>

      {/* DOCUMENT LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-3">{d.title}</td>
                <td className="p-3">{d.category}</td>
                <td className="p-3">{d.fileType}</td>
                <td className="p-3">{d.uploadDate}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
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
