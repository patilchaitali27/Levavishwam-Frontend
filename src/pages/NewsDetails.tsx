import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { getNewsById } from "../services/homeApi";

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

export default function NewsDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dataFromState = location.state;

  const [news, setNews] = useState<NewsItem | null>(
    (dataFromState as NewsItem) || null
  );

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      if (!dataFromState) {
        try {
          const res = await getNewsById(Number(id));
          setNews(res);
        } catch {}
      }
    };
    load();
  }, [id]);

  if (!news) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        to="/#news"
        className="flex items-center text-blue-600 hover:underline mb-5"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to News
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>

      <div className="flex items-center gap-6 text-gray-600 mb-6">
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          {news.newsDate}
        </span>

        <span className="flex items-center gap-2">
          <User className="w-4 h-4 text-purple-600" />
          {news.author}
        </span>

        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
          {news.category}
        </span>
      </div>

      <div className="w-full h-[420px] rounded-xl overflow-hidden mb-8">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {news.content}
      </div>
    </div>
  );
}
