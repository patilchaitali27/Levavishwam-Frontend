import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

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
    ctaText: "Explore Clubs",
    ctaLink: "/clubs"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Learn & Grow Together",
    description: "Join workshops, seminars, and hands-on projects",
    ctaText: "View Events",
    ctaLink: "/events"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Build Your Network",
    description: "Meet industry professionals and alumni mentors",
    ctaText: "Join Network",
    ctaLink: "/network"
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => 
      (prev - 1 + carouselImages.length) % carouselImages.length
    );
    setAutoPlay(false);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setAutoPlay(false);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl group animate-fade-in">
      {/* Auto-play control */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full transition-all duration-300"
          aria-label={autoPlay ? "Pause auto-play" : "Play auto-play"}
        >
          {autoPlay ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Carousel container */}
      <div
        className="relative h-[500px] bg-gradient-to-br from-dark-900 to-primary-900"
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
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-primary-900/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-16 text-white">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-accent-400/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-accent-400/30">
                    Community Portal
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
                    <a
                      href={image.ctaLink}
                      className="group relative px-8 py-3 bg-primary-400 hover:bg-primary-300 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-400/25 overflow-hidden"
                    >
                      <span className="relative z-10">{image.ctaText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    <a
                      href="#"
                      className="px-6 py-3 border-2 border-white/30 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10"
                    >
                      Learn More
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-500"
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
                <div className="absolute -inset-1 animate-pulse-slow rounded-full border border-white/30" />
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