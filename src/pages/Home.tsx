import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import NewsSection from "../components/NewsSection";
import EventsSection from "../components/EventsSection";
import DownloadsSection from "../components/DownloadsSection";
import CommitteeSection from "../components/CommitteeSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Carousel />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsSection />

        <div className="mt-12">
          <EventsSection />
        </div>

        <div className="mt-12">
          <DownloadsSection />
        </div>

        <div className="mt-12">
          <CommitteeSection />
        </div>
      </main>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
