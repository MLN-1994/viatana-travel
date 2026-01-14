'use client';

import { useState, useEffect } from 'react';
import PackageCard from './PackageCard';
import { TravelPackage, Category } from '@/types';

export default function PackagesGrid() {
  const [filter, setFilter] = useState<string>('all');
  const [travelPackages, setTravelPackages] = useState<TravelPackage[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar paquetes y categorías en paralelo
    Promise.all([
      fetch('/api/packages').then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ])
      .then(([packagesData, categoriesData]) => {
        setTravelPackages(packagesData);
        
        // Construir array de categorías con formato para los botones
        const categoryButtons = [
          { id: 'all', label: '🌍 Todos' },
          { id: 'ofertas', label: '🔥 Ofertas' },
          ...categoriesData.map((cat: Category) => ({
            id: cat.slug,
            label: `${cat.icon || '📁'} ${cat.name}`
          }))
        ];
        
        setCategories(categoryButtons);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar datos:', err);
        setLoading(false);
      });
  }, []);

  const filteredPackages = filter === 'all' 
    ? travelPackages 
    : filter === 'ofertas'
    ? travelPackages.filter(pkg => pkg.isOffer)
    : travelPackages.filter(pkg => pkg.category === filter);

  return (
    <section className="py-16 bg-gray-50" id="paquetes">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          🌟 Nuestros Paquetes de Viaje
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explora destinos increíbles con paquetes diseñados para cada tipo de viajero
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category.id
                  ? 'bg-[#6A3B76] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-[#63768D] hover:text-white shadow'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Packages grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Cargando paquetes...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No hay paquetes disponibles en esta categoría
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
