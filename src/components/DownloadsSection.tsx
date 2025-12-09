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
  const scrollToDownloadsTop = () => {
    const el = document.getElementById("downloads");
    if (el) window.scrollTo({ top: el.offsetTop - 88, behavior: "smooth" });
  };

  return (
    <section id="downloads" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header with linear underline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Downloads
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Get the latest resources and files.
          </p>
          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
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

        {/* View All Downloads button */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToDownloadsTop}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            View All Downloads
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
