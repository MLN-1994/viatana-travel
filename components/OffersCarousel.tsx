'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function OffersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/banners?active=true')
      .then(res => res.json())
      .then(data => {
        setBanners(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar banners:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="relative bg-gradient-to-r from-[#6A3B76] to-[#63768D] text-white">
        <div className="h-[500px] md:h-[600px] flex items-center justify-center">
          <p className="text-xl">Cargando...</p>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative bg-gradient-to-r from-[#6A3B76] to-[#63768D] text-white">
      <div className="relative w-full py-8">
        {/* Main carousel */}
        <div className="relative overflow-hidden shadow-2xl group">
          <div className="relative h-[500px] md:h-[600px]">
            <Image
              src={currentBanner.imageUrl}
              alt={currentBanner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h3 className="text-3xl md:text-5xl font-bold mb-4">{currentBanner.title}</h3>
              {currentBanner.subtitle && (
                <p className="text-lg md:text-xl mb-6 max-w-3xl">{currentBanner.subtitle}</p>
              )}
              
              {currentBanner.buttonText && currentBanner.linkUrl && (
                <Link
                  href={currentBanner.linkUrl}
                  className="inline-block bg-white text-[#6A3B76] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition text-lg"
                >
                  {currentBanner.buttonText}
                </Link>
              )}
            </div>
          </div>

          {/* Navigation arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 text-2xl"
                aria-label="Anterior"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 text-2xl"
                aria-label="Siguiente"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {banners.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Ir a banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
