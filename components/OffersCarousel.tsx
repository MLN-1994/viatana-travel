'use client';

import { useState, useEffect } from 'react';
import { TravelPackage } from '@/types';
import Image from 'next/image';

export default function OffersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [offers, setOffers] = useState<TravelPackage[]>([]);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        const featuredOffers = data.filter((pkg: TravelPackage) => pkg.isOffer);
        setOffers(featuredOffers.slice(0, 3));
      })
      .catch(err => console.error('Error al cargar ofertas:', err));
  }, []);

  // Limitar a solo 3 ofertas
  const displayedOffers = offers;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedOffers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayedOffers.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedOffers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedOffers.length) % displayedOffers.length);
    setIsAutoPlaying(false);
  };

  if (displayedOffers.length === 0) return null;

  const currentOffer = displayedOffers[currentIndex];

  return (
    <section className="relative bg-linear-to-r from-[#6A3B76] to-[#63768D] text-white" id="ofertas">
      <div className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 px-4">
          🔥 Ofertas Especiales
        </h2>

        <div className="relative w-full">
          {/* Main carousel */}
          <div className="relative overflow-hidden shadow-2xl group">
            <div className="relative h-[500px] md:h-[600px]">
              <Image
                src={currentOffer.image}
                alt={currentOffer.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg mb-4">
                  {currentOffer.discount}% OFF
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4">{currentOffer.title}</h3>
                <p className="text-xl md:text-2xl mb-2">📍 {currentOffer.destination}</p>
                <p className="text-lg md:text-xl mb-4 max-w-2xl">{currentOffer.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <span className="text-gray-300 line-through text-lg md:text-xl">
                      USD $ {currentOffer.originalPrice}
                    </span>
                    <span className="text-3xl md:text-4xl font-bold ml-3">
                      USD $ {currentOffer.price}
                    </span>
                  </div>
                  <div className="text-lg md:text-xl">
                    ⏱️ {currentOffer.duration}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const packagesSection = document.getElementById('paquetes');
                    if (packagesSection) {
                      packagesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-block bg-white hover:bg-gray-100 text-[#6A3B76] font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
                >
                  Ver Más Ofertas →
                </button>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 backdrop-blur-sm text-white/60 hover:text-white p-2 rounded-full transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 text-2xl"
            >
              &lt;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/30 backdrop-blur-sm text-white/60 hover:text-white p-2 rounded-full transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 text-2xl"
            >
              &gt;
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {displayedOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
