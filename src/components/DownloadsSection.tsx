import { useState, useEffect } from "react";
import { Download, FileText, File, Clock, ArrowRight } from "lucide-react";
import { getDownloads } from "../services/homeApi";

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

function getIcon(type: string) {
  if (type === "pdf") return <File className="w-7 h-7 text-red-500" />;
  if (type === "doc") return <FileText className="w-7 h-7 text-blue-500" />;
  return <FileText className="w-7 h-7 text-green-500" />;
}

export default function DownloadsSection() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDownloads();
        setDocs(res);
      } catch {}
    };
    load();
  }, []);

  const visibleDocs = showAll ? docs : docs.slice(0, 3);

  const handleDownload = (url: string) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <section id="downloads" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
          {visibleDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white
                         hover:shadow-lg hover:border-blue-300 transition cursor-pointer"
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
                    <span>{doc.downloadsCount} downloads</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.fileUrl)}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {docs.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 
                         font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              {showAll ? "View Less" : "View All Downloads"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
