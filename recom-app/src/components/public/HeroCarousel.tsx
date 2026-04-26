"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
  {
    url: "/assets/images/koudoe.jpg",
    alt: "Usinagem de Precisão - Torneamento",
  },
  {
    url: "/assets/images/recom-editorial-1.jpg",
    alt: "Suporte Técnico RECOM",
  },
  {
    url: "/assets/images/recom-editorial-2.jpg",
    alt: "Soluções de Fresamento",
  },
  {
    url: "/assets/images/recom-editorial-3.jpg",
    alt: "Ferramentas de Furação",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full aspect-video rounded-lg border-2 border-foreground bg-muted overflow-hidden shadow-2xl group">
      {/* Images */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full border border-foreground transition-all",
              currentIndex === index ? "bg-foreground scale-125" : "bg-background/50 hover:bg-background"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
