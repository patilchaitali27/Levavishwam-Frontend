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

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    const id = state?.scrollToId;

    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
       
          window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        }
        try { window.history.replaceState({}, document.title); } catch {}
      }, 150);
    }
  }, [location]);

  return (
    <div id="home">
      
      <Navbar />

      
      <div className="pt-10">
        <Carousel />

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
