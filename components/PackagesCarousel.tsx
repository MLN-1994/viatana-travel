'use client';

import { useState, useEffect, useRef } from 'react';
import PackageCard from './PackageCard';
import type { TravelPackage, Category } from '@/types';

export default function PackagesCarousel() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [packagesRes, categoriesRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/categories')
      ]);

      const packagesData = await packagesRes.json();
      const categoriesData = await categoriesRes.json();

      setPackages(packagesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(pkg => pkg.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Cargando paquetes...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header y filtros */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight text-center">
            Nuestros paquetes <span className="text-[#6A3B76]">turisticos</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-center mb-10">
            Explora nuestros destinos más populares
          </p>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#6A3B76] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full font-medium transition cursor-pointer ${
                  selectedCategory === category.slug
                    ? 'bg-[#6A3B76] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        {filteredPackages.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No hay paquetes disponibles en esta categoría
          </div>
        ) : (
          <div className="relative md:px-16 min-h-[600px]">
            {/* Botón anterior - posición fija */}
            {filteredPackages.length > 3 && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-[250px] -translate-y-1/2 z-10 bg-white hover:bg-[#6A3B76] hover:text-white text-gray-800 p-4 rounded-full shadow-xl transition-all cursor-pointer border-2 border-gray-200 hidden md:flex items-center justify-center"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Contenedor de paquetes */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 px-4 md:px-0 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start flex"
                >
                  <PackageCard package={pkg} />
                </div>
              ))}
            </div>

            {/* Botón siguiente - posición fija */}
            {filteredPackages.length > 3 && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-[250px] -translate-y-1/2 z-10 bg-white hover:bg-[#6A3B76] hover:text-white text-gray-800 p-4 rounded-full shadow-xl transition-all cursor-pointer border-2 border-gray-200 hidden md:flex items-center justify-center"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Indicador de scroll en móvil */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
