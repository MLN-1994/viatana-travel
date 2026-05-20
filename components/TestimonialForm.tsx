'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Testimonial } from '@/types';

interface TestimonialFormProps {
  initial?: Partial<Testimonial>;
  mode: 'new' | 'edit';
  testimonialId?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  destination: string;
  content: string;
  date: string;
  rating: number;
  isActive: boolean;
  displayOrder: number;
  avatarUrl: string;
  photo1Url: string;
  photo2Url: string;
  photo3Url: string;
}

export default function TestimonialForm({ initial, mode, testimonialId }: TestimonialFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormData>({
    firstName: initial?.firstName ?? '',
    lastName: initial?.lastName ?? '',
    destination: initial?.destination ?? '',
    content: initial?.content ?? '',
    date: initial?.date ?? today,
    rating: initial?.rating ?? 5,
    isActive: initial?.isActive ?? true,
    displayOrder: initial?.displayOrder ?? 0,
    avatarUrl: initial?.avatarUrl ?? '',
    photo1Url: initial?.photo1Url ?? '',
    photo2Url: initial?.photo2Url ?? '',
    photo3Url: initial?.photo3Url ?? '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de carga por imagen
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const avatarRef = useRef<HTMLInputElement>(null);
  const photo1Ref = useRef<HTMLInputElement>(null);
  const photo2Ref = useRef<HTMLInputElement>(null);
  const photo3Ref = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked
        : type === 'number' ? parseInt(value) || 0
        : value,
    }));
  };

  const uploadImage = async (file: File, field: keyof FormData): Promise<void> => {
    setUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('bucket', 'testimonials');
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, [field]: json.url }));
      } else {
        alert('Error al subir imagen');
      }
    } catch {
      alert('Error al subir imagen');
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file, field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      avatarUrl: formData.avatarUrl || undefined,
      photo1Url: formData.photo1Url || undefined,
      photo2Url: formData.photo2Url || undefined,
      photo3Url: formData.photo3Url || undefined,
    };

    try {
      const url = mode === 'new' ? '/api/testimonials' : `/api/testimonials/${testimonialId}`;
      const method = mode === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/testimonials');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Error al guardar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sub-componente de campo de imagen
  const ImageField = ({
    label,
    field,
    inputRef,
  }: {
    label: string;
    field: keyof FormData;
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => {
    const url = formData[field] as string;
    const isLoading = uploading[field];

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-3">
          {url ? (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0">
              <Image src={url} alt={label} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-1 min-w-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isLoading}
              className="text-sm px-3 py-1.5 bg-purple-50 text-[#6A3B76] border border-purple-200 rounded-lg hover:bg-purple-100 transition disabled:opacity-50"
            >
              {isLoading ? 'Subiendo...' : url ? 'Cambiar imagen' : 'Subir imagen'}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, [field]: '' }))}
                className="text-xs text-red-500 hover:underline text-left"
              >
                Quitar imagen
              </button>
            )}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, field)}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/admin/testimonials" className="text-sm text-purple-600 hover:underline">
            ← Volver a testimonios
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            {mode === 'new' ? '➕ Nuevo testimonio' : '✏️ Editar testimonio'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-5">
          {/* Nombre y apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Juan"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="García"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              />
            </div>
          </div>

          {/* Destino + Fecha */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destino *</label>
              <input
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="Cancún, México"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              />
            </div>
          </div>

          {/* Testimonio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentario / Experiencia *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Escribe aquí la experiencia del cliente..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-none"
            />
          </div>

          {/* Calificación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calificación *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                  aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                >
                  <svg
                    className={`w-8 h-8 transition-colors ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500 self-center">{formData.rating} / 5</span>
            </div>
          </div>

          {/* Foto de perfil */}
          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Fotos</p>
            <ImageField label="Foto del rostro (avatar)" field="avatarUrl" inputRef={avatarRef} />
          </div>

          {/* Fotos del viaje */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImageField label="Foto 1" field="photo1Url" inputRef={photo1Ref} />
            <ImageField label="Foto 2" field="photo2Url" inputRef={photo2Ref} />
            <ImageField label="Foto 3" field="photo3Url" inputRef={photo3Ref} />
          </div>

          {/* Opciones */}
          <div className="border-t pt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min={0}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#6A3B76]"
                />
                <span className="text-sm font-medium text-gray-700">Activo (visible en el sitio)</span>
              </label>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/admin/testimonials"
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#6A3B76] text-white text-sm font-semibold rounded-lg hover:bg-purple-800 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Guardando...' : mode === 'new' ? 'Crear testimonio' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
