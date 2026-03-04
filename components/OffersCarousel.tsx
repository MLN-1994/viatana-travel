'use client';

import { useState, useEffect, useCallback } from 'react';
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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const handleNextClick = () => {
    nextSlide();
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-r from-[#6A3B76] to-[#63768D] flex items-center justify-center">
        <p className="text-white animate-pulse">Cargando...</p>
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden group">
      {/* Contenedor principal: Flex scrolleable en móvil, Relativo en desktop */}
      <div className="flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide h-[400px] md:h-[500px] lg:h-[650px] w-full">
        {banners.map((banner, index) => {
          const BannerContent = (
            <>
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-16 left-0 w-full px-6 md:px-12 lg:px-20 z-20">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-md">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-sm font-light">
                    {banner.subtitle}
                  </p>
                )}
              </div>
            </>
          );

          return (
            <div
              key={index}
              className={`
                relative min-w-full h-full snap-center md:absolute md:inset-0 md:transition-opacity md:duration-1000 md:ease-in-out
                ${index === currentIndex ? 'md:opacity-100 md:z-10' : 'md:opacity-0 md:z-0'}
              `}
            >
              <div className="w-full h-full">
                {BannerContent}
                {banner.packageId && (
                  <div className="absolute left-0 w-full flex justify-center z-30" style={{ top: '2rem' }}>
                    <Link
                      href={`/packages/${banner.packageId}`}
                      tabIndex={index === currentIndex ? 0 : -1}
                      aria-label={`Ver paquete: ${banner.title}`}
                      className="inline-block px-6 py-2 rounded-full bg-transparent text-white font-semibold border border-white transition-all duration-200 text-base md:text-lg hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Ver paquete
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navegación - Flechas (Ocultas en móvil para permitir el scroll natural) */}
      {banners.length > 1 && (
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Indicadores (Dots) - Ocultos en móvil para no interferir con el scroll */}
      {banners.length > 1 && (
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex ? 'bg-white w-8 h-2' : 'bg-white/40 w-2 h-2 hover:bg-white/60'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}