'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);

  const slides = [
    {
      title: "Design Créatif",
      subtitle: "Transformez vos idées en réalité visuelle",
      type: "image", // "image", "video", or "gradient"
      media: "/images/slide-1.jpg"
    },
    {
      title: "Illustration",
      subtitle: "Des créations uniques qui racontent votre histoire",
      type: "video", // Change to "image" and add your image path
      media: "https://xk3ldx3o22d35md8.public.blob.vercel-storage.com/annimelogo.mp4"
      // For images: media: "/images/illustration.jpg"
    },
    {
      title: "Motion Design",
      subtitle: "Donnez vie à vos projets avec des animations captivantes",
      type: "image", // Change to "video" and add your video path
      media: "/images/slide-2.jpg"
      // For videos: media: "/videos/motion.mp4"
    }
  ];

  useEffect(() => {
    // Animation au chargement initial
    setHasLoaded(true);

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 700);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length, resetTimer]);

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
        // Reset le timer en changeant la valeur de resetTimer
        setResetTimer(prev => prev + 1);
      }, 700);
    }
  };

  return (
    <section id="accueil" className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.type === 'gradient' && (
            <div className={`absolute inset-0 ${slide.media}`} />
          )}
          {slide.type === 'image' && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.media}
                alt={slide.title}
                className={`w-full h-full object-cover ${
                  index === currentSlide ? 'animate-ken-burns' : 'scale-110'
                }`}
              />
            </div>
          )}
          {slide.type === 'video' && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={slide.media} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="z-10 relative text-white text-center container-custom">
        <div>
          <h1 className={`mb-4 font-heading font-bold text-5xl md:text-7xl transition-all duration-700 ease-out ${
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Sékou BAYOGO
          </h1>
          <p className={`mb-8 font-light text-2xl md:text-3xl transition-all duration-700 ease-out ${
            hasLoaded && !isAnimating ? 'opacity-100 translate-y-0 delay-[1000ms]' : 'opacity-0 translate-y-12'
          }`}>
            {slides[currentSlide].subtitle}
          </p>
          <div className={`flex sm:flex-row flex-col justify-center items-center gap-4 mt-12 transition-all duration-700 ease-out ${
            hasLoaded ? 'opacity-100 translate-y-0 delay-[2000ms]' : 'opacity-0 translate-y-12 delay-[2000ms]'
          }`}>
            <Link
              href="#travaux"
              className="btn-primary"
            >
              Voir mes travaux
            </Link>
            <Link
              href="#contact"
              className="hover:bg-white border-white btn-outline text-white hover:text-primary"
            >
              Me contacter
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-16">
        {slides.map((slide, index) => (
            <button
            key={`${slide.title}-indicator`}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="bottom-8 left-1/2 z-10 absolute -translate-x-1/2 transform">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
