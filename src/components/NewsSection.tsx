import { ArrowRight, Calendar, Clock, User, ChevronDown } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
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
    readTime: "3 min read",
    category: "Events"
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
    readTime: "4 min read",
    category: "Announcement"
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
    readTime: "2 min read",
    category: "Education"
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll Indicator - More Subtle */}
        <div className="flex justify-center mb-12">
          <ChevronDown className="w-5 h-5 text-gray-300" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Latest Updates
            </span>
          </div> */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Community News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay connected with the latest announcements and events from our community
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Category Overlay */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded ${
                    news.category === 'Events' 
                      ? 'bg-blue-600 text-white' 
                      : news.category === 'Announcement'
                      ? 'bg-purple-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-700 transition-colors line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed text-sm">
                  {news.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700">{news.author}</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group">
                    Read
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional View All Button */}
        <div className="text-center">
          <a
            href="#news-all"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 group"
          >
            <span>Browse All Community Updates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}