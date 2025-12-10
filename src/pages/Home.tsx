import { useEffect } from "react";
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

  useEffect(() => {
    const state: any = (location && (location as any).state) || {};
    const id = state?.scrollToId;
    if (id) {
      setTimeout(() => {
        const el =
          document.getElementById(id) ||
          document.querySelector(`[data-section="${id}"]`);
        if (el) {
          const offset = 88;
          window.scrollTo({
            top: (el as HTMLElement).offsetTop - offset,
            behavior: "smooth",
          });
        } else {
          console.warn(
            `Home: element with id or data-section="${id}" not found.`
          );
        }
        try {
          window.history.replaceState({}, document.title);
        } catch {}
      }, 120);
    }
  }, [location]);

  const scrollToNews = () => {
    const section = document.getElementById("news");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home">
      <Navbar />

      <div className="pt-10">
        <Carousel />

        {/*SIMPLE CLEAN ARROW */}
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
