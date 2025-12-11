import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import NewsSection from "../components/NewsSection";
import EventsSection from "../components/EventsSection";
import DownloadsSection from "../components/DownloadsSection";
import CommitteeSection from "../components/CommitteeSection";
import InformationSection from "../components/InformationSection";
import Footer from "../components/Footer";

import { ChevronDown } from "lucide-react";
import { useMenuContext } from "../context/MenuContext";

export default function Home() {
  const location = useLocation();
  const { menus, loading: menuLoading } = useMenuContext();
  const [pageLoading, setPageLoading] = useState(true);

  // LOG — Does API return menus?
  console.log("🔥 FRONTEND MENUS:", menus);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const state: any = location?.state || {};
    const id = state?.scrollToId;

    if (id) {
      setTimeout(() => {
        const el =
          document.getElementById(id) ||
          document.querySelector(`[data-section="${id}"]`);

        if (el) {
          window.scrollTo({
            top: (el as HTMLElement).offsetTop - 88,
            behavior: "smooth",
          });
        }

        try {
          window.history.replaceState({}, document.title);
        } catch {}
      }, 200);
    }
  }, [location]);

  const scrollToNews = () => {
    const sec = document.getElementById("news");
    if (sec) sec.scrollIntoView({ behavior: "smooth" });
  };

  const normalize = (p: string) => p.trim().toLowerCase();

  const renderSection = (path: string) => {
    switch (normalize(path)) {
      case "/carousel":
        return <section id="carousel"><Carousel /></section>;
      case "/news":
        return <section id="news"><NewsSection /></section>;
      case "/information":
        return <section id="information"><InformationSection /></section>;
      case "/events":
        return <section id="events"><EventsSection /></section>;
      case "/downloads":
        return <section id="downloads"><DownloadsSection /></section>;
      case "/committee":
        return <section id="committee"><CommitteeSection /></section>;
      default:
        return null;
    }
  };

  // FIXED LOADER (menus can be empty)
  if (pageLoading || menuLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div id="home">
      <Navbar />

      <main className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {menus.map((menu) => (
          <div key={menu.id}>{renderSection(menu.path)}</div>
        ))}
      </main>

      {menus.some((m) => normalize(m.path) === "/news") && (
        <div className="flex justify-center -mt-10 mb-10">
          <button
            onClick={scrollToNews}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm"
          >
            <ChevronDown className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
