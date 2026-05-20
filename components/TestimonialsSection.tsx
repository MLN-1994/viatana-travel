'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/types';

// Componente de estrellas según rating real
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Formatear fecha a texto legible en español
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long' });
  } catch {
    return dateStr;
  }
}

// Iniciales del nombre para el avatar fallback
function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Colores de fondo para avatares sin foto
const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
];

function avatarColor(id: string): string {
  const sum = id.charCodeAt(0) + (id.charCodeAt(1) || 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const photos = [
    testimonial.photo1Url,
    testimonial.photo2Url,
    testimonial.photo3Url,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4 min-w-[300px] max-w-[340px] snap-start hover:shadow-lg transition-shadow duration-200">
      {/* Header: avatar + nombre + fecha */}
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
          {testimonial.avatarUrl ? (
            <Image
              src={testimonial.avatarUrl}
              alt={`${testimonial.firstName} ${testimonial.lastName}`}
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-white font-semibold text-sm ${avatarColor(testimonial.id)}`}>
              {getInitials(testimonial.firstName, testimonial.lastName)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {testimonial.firstName} {testimonial.lastName}
          </p>
          <p className="text-gray-400 text-xs">{formatDate(testimonial.date)}</p>
        </div>
      </div>

      {/* Estrellas */}
      <StarRating rating={testimonial.rating} />

      {/* Destino */}
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6A3B76] bg-purple-50 px-2.5 py-1 rounded-full w-fit">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {testimonial.destination}
      </span>

      {/* Texto del testimonio */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">
        {testimonial.content}
      </p>

      {/* Fotos opcionales */}
      {photos.length > 0 && (
        <div className="flex gap-2 mt-1">
          {photos.map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={url}
                alt={`Foto ${i + 1} de ${testimonial.firstName}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/testimonials?active=true')
      .then((r) => r.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || testimonials.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#6A3B76] mb-2">
            Experiencias reales
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Cada viaje es una historia. Estas son algunas de las que nos compartieron.
          </p>
        </div>

        {/* Carrusel de cards */}
        <div className="relative group">
          {/* Botón izquierdo */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hidden md:flex"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          {/* Botón derecho */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hidden md:flex"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
