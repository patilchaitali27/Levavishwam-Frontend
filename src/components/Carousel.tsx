import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCarousel } from "../services/homeApi";

interface CarouselImage {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Carousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay, setAutoPlayState] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await getCarousel();
      setCarouselImages(res);
    };
    load();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0 || !autoPlay) return;

    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [autoPlay, carouselImages]);

  const handlePrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const scrollToEvents = () => {
    const section = document.getElementById("events");
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop - 88,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl">
      <div
        className="relative h-[500px]"
        onMouseEnter={() => setAutoPlayState(false)}
        onMouseLeave={() => setAutoPlayState(true)}
      >
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-16 text-white">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                  Levavishwam Community
                </span>

                <h3 className="text-5xl font-bold mb-4 leading-tight">
                  {image.title}
                </h3>

                <p className="text-xl text-gray-200 mb-8">{image.description}</p>

                {image.ctaText && (
                  <button
                    onClick={scrollToEvents}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl"
                  >
                    {image.ctaText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
