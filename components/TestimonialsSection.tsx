'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/types';

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  photos: string[];
  initialIndex: number;
  authorName: string;
  onClose: () => void;
  isNested?: boolean;
}

function Lightbox({ photos, initialIndex, authorName, onClose, isNested = false }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, photos.length - 1)), [photos.length]);

  // Solo bloquea el scroll si no hay un padre que ya lo haga (ej: modal)
  useEffect(() => {
    if (isNested) return;
    const saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = saved; };
  }, [isNested]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${authorName}`}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label="Cerrar"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contador */}
      {photos.length > 1 && (
        <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest">
          {current + 1} / {photos.length}
        </span>
      )}

      {/* Imagen principal */}
      <div
        className="relative w-full max-w-3xl mx-16 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photos[current]}
          src={photos[current]}
          alt={`Foto ${current + 1} de ${authorName}`}
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-contain"
          priority
        />
      </div>

      {/* Flecha izquierda */}
      {current > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-colors"
          aria-label="Foto anterior"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Flecha derecha */}
      {current < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-colors"
          aria-label="Foto siguiente"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((url, i) => (
            <button
              key={url}
              onClick={() => setCurrent(i)}
              className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? 'border-white opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image src={url} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Testimonial Modal ───────────────────────────────────────────────────────
const CONTENT_THRESHOLD = 180;

interface TestimonialModalProps {
  testimonial: Testimonial;
  onClose: () => void;
}

function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = [
    testimonial.photo1Url,
    testimonial.photo2Url,
    testimonial.photo3Url,
  ].filter(Boolean) as string[];

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      // Solo cierra el modal si el lightbox interno NO está abierto
      if (e.key === 'Escape' && lightbox === null) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = saved;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, lightbox]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonio de ${testimonial.firstName} ${testimonial.lastName}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel: bottom-sheet en mobile, dialog centrado en desktop */}
      <div
        className="relative z-10 bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl max-h-[90vh] overflow-y-auto animate-slideUp md:animate-scaleIn shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — solo mobile */}
        <div className="flex justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 md:pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              {testimonial.avatarUrl ? (
                <Image
                  src={testimonial.avatarUrl}
                  alt={`${testimonial.firstName} ${testimonial.lastName}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-white font-semibold text-sm ${avatarColor(testimonial.id)}`}>
                  {getInitials(testimonial.firstName, testimonial.lastName)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-base">
                {testimonial.firstName} {testimonial.lastName}
              </p>
              <p className="text-gray-400 text-sm">{formatDate(testimonial.date)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-100 shrink-0 ml-2"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 pb-8 space-y-4">
          {/* Estrellas */}
          <StarRating rating={testimonial.rating} />

          {/* Destino */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6A3B76] bg-purple-50 px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {testimonial.destination}
          </span>

          {/* Texto completo */}
          <p className="text-gray-700 text-base leading-relaxed">
            {testimonial.content}
          </p>

          {/* Fotos */}
          {photos.length > 0 && (
            <div className="flex gap-2 pt-1">
              {photos.map((url, i) => (
                <button
                  key={url}
                  onClick={() => setLightbox(i)}
                  className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden group/mphoto cursor-zoom-in"
                  aria-label={`Ver foto ${i + 1} en grande`}
                >
                  <Image
                    src={url}
                    alt={`Foto ${i + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover/mphoto:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/mphoto:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox sobre el modal */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightbox}
          authorName={`${testimonial.firstName} ${testimonial.lastName}`}
          onClose={() => setLightbox(null)}
          isNested
        />
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
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
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const showReadMore = testimonial.content.length > CONTENT_THRESHOLD;

  const photos = [
    testimonial.photo1Url,
    testimonial.photo2Url,
    testimonial.photo3Url,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4 min-w-[360px] max-w-[400px] snap-start hover:shadow-lg transition-shadow duration-200">
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
      <div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
          {testimonial.content}
        </p>
        {showReadMore && (
          <button
            onClick={() => setModal(true)}
            className="mt-1.5 text-sm font-medium text-[#6A3B76] hover:text-[#5a2f66] transition-colors cursor-pointer"
          >
            Leer más →
          </button>
        )}
      </div>

      {/* Fotos opcionales */}
      {photos.length > 0 && (
        <div className="flex gap-2 mt-auto pt-2">
          {photos.map((url, i) => (
            <button
              key={url}
              onClick={() => setLightbox(i)}
              className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden group/photo cursor-zoom-in"
              aria-label={`Ver foto ${i + 1} en grande`}
            >
              <Image
                src={url}
                alt={`Foto ${i + 1} de ${testimonial.firstName}`}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover/photo:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightbox}
          authorName={`${testimonial.firstName} ${testimonial.lastName}`}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Modal testimonio completo */}
      {modal && (
        <TestimonialModal
          testimonial={testimonial}
          onClose={() => setModal(false)}
        />
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
