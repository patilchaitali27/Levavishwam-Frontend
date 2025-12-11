import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import NewsSection from "../components/NewsSection";
import EventsSection from "../components/EventsSection";
import DownloadsSection from "../components/DownloadsSection";
import CommitteeSection from "../components/CommitteeSection";
import Footer from "../components/Footer";
import InformationSection from "../components/InformationSection";

import { ChevronDown } from "lucide-react";

export default function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // ⛔ Stop browser from restoring scroll after refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Page loader ⏳
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to specific section when coming from another page
  useEffect(() => {
    const state: any = location?.state || {};
    const scrollId = state?.scrollToId;

    if (scrollId) {
      setTimeout(() => {
        const element =
          document.getElementById(scrollId) ||
          document.querySelector(`[data-section="${scrollId}"]`);

        if (element) {
          window.scrollTo({
            top: (element as HTMLElement).offsetTop - 88,
            behavior: "smooth",
          });
        }

        try {
          window.history.replaceState({}, document.title);
        } catch {}
      }, 200);
    }
  }, [location]);

  // Scroll to News on arrow click
  const scrollToNews = () => {
    const section = document.getElementById("news");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // LOADER UI
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div id="home">
      <Navbar />

      <div className="pt-10">
        <Carousel />

        {/* Scroll-down Arrow */}
        <div className="w-full flex justify-center mt-6 mb-10">
          <button
            onClick={scrollToNews}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
          >
            <ChevronDown className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsSection />

          <InformationSection />

          <div className="mt-12">
            <EventsSection />
          </div>

          <div className="mt-12">
            <DownloadsSection />
          </div>

          <div className="mt-12">
            <CommitteeSection />
          </div>
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
