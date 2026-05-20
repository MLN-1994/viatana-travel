'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Testimonial } from '@/types';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar el testimonio de "${name}"?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTestimonials();
      } else {
        alert('Error al eliminar');
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) fetchTestimonials();
      else alert('Error al actualizar estado');
    } catch {
      alert('Error al actualizar estado');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando testimonios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link href="/admin" className="text-sm text-purple-600 hover:underline">
              ← Volver al panel
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">💬 Testimonios</h1>
            <p className="text-sm text-gray-500">
              Total: <span className="font-semibold text-[#6A3B76]">{testimonials.length}</span> testimonios
            </p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="px-5 py-2.5 bg-[#6A3B76] text-white rounded-lg hover:bg-purple-800 transition font-semibold text-sm shadow-md"
          >
            + Nuevo testimonio
          </Link>
        </div>

        {/* Lista */}
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No hay testimonios aún.{' '}
            <Link href="/admin/testimonials/new" className="text-[#6A3B76] underline">
              Agregar el primero
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`bg-white rounded-xl shadow border-l-4 ${t.isActive ? 'border-green-400' : 'border-gray-300'} p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center`}
              >
                {/* Avatar */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-purple-100 flex items-center justify-center">
                  {t.avatarUrl ? (
                    <Image src={t.avatarUrl} alt="" fill className="object-cover" />
                  ) : (
                    <span className="text-[#6A3B76] font-bold text-lg">
                      {t.firstName.charAt(0)}{t.lastName.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {t.firstName} {t.lastName}
                    </span>
                    <span className="text-xs text-white bg-[#6A3B76] px-2 py-0.5 rounded-full">
                      {t.destination}
                    </span>
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{t.content}</p>
                  {/* Fotos */}
                  {(t.photo1Url || t.photo2Url || t.photo3Url) && (
                    <div className="flex gap-2 mt-2">
                      {[t.photo1Url, t.photo2Url, t.photo3Url].filter(Boolean).map((url, i) => (
                        <div key={i} className="relative w-10 h-10 rounded-lg overflow-hidden">
                          <Image src={url!} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(t.id, t.isActive)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                      t.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {t.isActive ? 'Activo' : 'Inactivo'}
                  </button>
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id, `${t.firstName} ${t.lastName}`)}
                    className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
