import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function NewsDetailsPage() {
  const { state: news } = useLocation();

  if (!news) {
    return (
      <p className="text-center py-20 text-gray-600">
        No details available.
      </p>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Back to News (scrolls to #news on homepage) */}
        <Link
          to="/#news"
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to News
        </Link>

        {/* Image */}
        <img
          src={news.image}
          className="w-full h-80 object-cover rounded-xl shadow mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {news.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" /> {news.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" /> {news.date}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {news.excerpt}
        </p>

        <p className="text-gray-700 leading-relaxed text-lg">
          More detailed description can be added from backend later.
          This is your full article content area.
        </p>

      </div>
    </section>
  );
}
