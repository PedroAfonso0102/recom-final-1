"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
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
    <div className="relative h-full w-full overflow-hidden group">
      {/* Images */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative min-w-full h-full">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/92 p-2.5 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white opacity-100 sm:left-4 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/92 p-2.5 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white opacity-100 sm:right-4 sm:p-3 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md sm:bottom-6 sm:gap-3 sm:px-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
