import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Annual Community Gathering Successfully Held",
    excerpt:
      "Over 500 community members gathered to celebrate our annual festival with cultural performances and traditional food stalls.",
    image:
      "https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "Dec 5, 2024",
    author: "Admin",
    category: "Events",
  },
  {
    id: 2,
    title: "New Community Center Grand Opening",
    excerpt:
      "We're excited to announce the opening of our state-of-the-art community center with modern facilities for all members.",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "Dec 1, 2024",
    author: "Admin",
    category: "Announcement",
  },
  {
    id: 3,
    title: "Scholarship Program Launched for Students",
    excerpt:
      "Launching our new scholarship program to support deserving students from our community with mentorship opportunities.",
    image:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "Nov 28, 2024",
    author: "Admin",
    category: "Education",
  },
];

export default function NewsSection() {
  const SCROLL_OFFSET = 88;

  const scrollToNewsTop = () => {
    const el = document.getElementById("news");
    if (el)
      window.scrollTo({ top: el.offsetTop - SCROLL_OFFSET, behavior: "smooth" });
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Community News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay connected with the latest updates and announcements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 h-[420px] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {/* Minimal Category */}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-lg bg-white/85 text-gray-800 border">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-700">
                  {news.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Date */}
                <div className="flex items-center text-gray-500 text-sm border-t pt-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {news.date}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700">{news.author}</span>
                  </div>

                  {/* Pass entire news object to the details page */}
                  <Link
                    to={`/news/${news.id}`}
                    state={news}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All News button (centered) */}
        <div className="text-center">
          <button
            onClick={scrollToNewsTop}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
