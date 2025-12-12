import { useEffect, useState } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getNews } from "../services/homeApi";
import { useAuth } from "../context/AuthContext";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  newsDate: string;
  author: string;
  category: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNews();
        setNews(res);
      } catch {}
    };
    load();
  }, []);

  const visibleNews = showAll ? news : news.slice(0, 3);

  const handleProtected = (callback: () => void) => {
    if (!isAuthenticated) navigate("/login");
    else callback();
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay updated with the latest announcements and community highlights.
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {item.newsDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" />
                    {item.author}
                  </span>
                </div>

                <div className="text-xs text-blue-600 font-medium mb-3">
                  {item.category}
                </div>

                <button
                  onClick={() =>
                    handleProtected(() =>
                      navigate(`/news/${item.id}`, { state: item })
                    )
                  }
                  className="w-full px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg 
                             hover:bg-blue-50 transition flex items-center justify-center gap-2 font-medium"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {news.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() =>
                handleProtected(() => setShowAll(!showAll))
              }
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 
                font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition"
            >
              {showAll ? "View Less" : "View All News"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
