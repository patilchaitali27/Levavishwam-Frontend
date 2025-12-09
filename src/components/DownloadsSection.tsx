import { Download, FileText, File, Clock, ArrowRight } from "lucide-react";

interface Document {
  id: number;
  title: string;
  description: string;
  fileType: "pdf" | "doc" | "xls";
  size: string;
  uploadDate: string;
  downloads: number;
  category: string;
}

const documents: Document[] = [
  {
    id: 1,
    title: "Community Guidelines & Code of Conduct",
    description: "Important guidelines for all community members.",
    fileType: "pdf",
    size: "2.4 MB",
    uploadDate: "Dec 1, 2024",
    downloads: 234,
    category: "Guidelines",
  },
  {
    id: 2,
    title: "2024 Annual Report",
    description: "Comprehensive report of community activities and plans.",
    fileType: "pdf",
    size: "5.8 MB",
    uploadDate: "Nov 28, 2024",
    downloads: 567,
    category: "Reports",
  },
  {
    id: 3,
    title: "Event Registration Form",
    description: "Template for event registration.",
    fileType: "doc",
    size: "1.2 MB",
    uploadDate: "Nov 25, 2024",
    downloads: 145,
    category: "Forms",
  },
  {
    id: 4,
    title: "Budget Allocation 2024-2025",
    description: "Detailed breakdown of yearly expenses.",
    fileType: "xls",
    size: "0.8 MB",
    uploadDate: "Nov 20, 2024",
    downloads: 98,
    category: "Finance",
  },
];

function getIcon(type: string) {
  if (type === "pdf") return <File className="w-7 h-7 text-red-500" />;
  if (type === "doc") return <FileText className="w-7 h-7 text-blue-500" />;
  return <FileText className="w-7 h-7 text-green-500" />;
}

export default function DownloadsSection() {
  return (
    <section className="py-12 bg-white rounded-2xl shadow-md p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Downloads</h2>
          <a
            href="#downloads-all"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            View All <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white hover:shadow-lg hover:border-blue-300 transition cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  {getIcon(doc.fileType)}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>

                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>{doc.size}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {doc.uploadDate}
                    </span>
                    <span>{doc.downloads} downloads</span>
                  </div>
                </div>

                <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
