import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
  id: number;
  url: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Welcome to Our Community",
    description: "Connect, collaborate, and grow with like-minded students",
    ctaText: "Explore Events",
    ctaLink: "#events"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Community Events & Activities",
    description: "Participate in cultural celebrations, sports, and social gatherings",
    ctaText: "View Events",
    ctaLink: "#events"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Join Our Community Network",
    description: "Connect with fellow members, share experiences, and build relationships",
    ctaText: "Join Now",
    ctaLink: "/login"
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => 
      (prev - 1 + carouselImages.length) % carouselImages.length
    );
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

  const [autoPlay, setAutoPlayState] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const setAutoPlay = (value: boolean) => {
    setAutoPlayState(value);
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl">
      <div
        className="relative h-[500px]"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-16 text-white">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 text-white">
                    Levavishwam Community
                  </span>
                  <h3 className="text-5xl font-bold mb-4 leading-tight">
                    {image.title}
                  </h3>
                  <p className="text-xl text-gray-200 mb-8">
                    {image.description}
                  </p>
                </div>
                
                {image.ctaText && (
                  <div className="flex items-center space-x-4">
                    {image.id === 3 ? (
                      // Join Now button for login page
                      <a
                        href="/login"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/25"
                      >
                        {image.ctaText}
                      </a>
                    ) : (
                      // Explore Events button for events section
                      <a
                        href="#events"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/25"
                      >
                        {image.ctaText}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / carouselImages.length) * 100}%`
            }}
          />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <div className="absolute -inset-1 rounded-full border border-white/30" />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <span className="font-mono text-xl font-bold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/50">/</span>
            <span className="font-mono">
              {String(carouselImages.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}