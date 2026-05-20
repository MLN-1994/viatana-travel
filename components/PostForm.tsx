'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types';

interface PostFormProps {
  initial?: Partial<Post>;
  mode: 'new' | 'edit';
  postId?: string;
}

interface FormData {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  secondImage: string;
  contentP1: string;
  contentP2: string;
  excerpt: string;
  isActive: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function PostForm({ initial, mode, postId }: PostFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    slug: initial?.slug ?? '',
    coverImage: initial?.coverImage ?? '',
    secondImage: initial?.secondImage ?? '',
    contentP1: initial?.contentP1 ?? '',
    contentP2: initial?.contentP2 ?? '',
    excerpt: initial?.excerpt ?? '',
    isActive: initial?.isActive ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const coverRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      };
      // Auto-generar slug desde el título si está vacío o sin editar manualmente
      if (name === 'title' && mode === 'new') {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const uploadImage = async (file: File, field: keyof FormData): Promise<void> => {
    setUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('bucket', 'posts');
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
      subtitle: formData.subtitle || undefined,
      secondImage: formData.secondImage || undefined,
      contentP2: formData.contentP2 || undefined,
    };

    try {
      const url = mode === 'new' ? '/api/posts' : `/api/posts/${postId}`;
      const method = mode === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/posts');
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

  const ImageField = ({
    label,
    field,
    inputRef,
    required = false,
  }: {
    label: string;
    field: keyof FormData;
    inputRef: React.RefObject<HTMLInputElement | null>;
    required?: boolean;
  }) => {
    const url = formData[field] as string;
    const isLoading = uploading[field];

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {url && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 mb-1">
            <Image src={url} alt={label} fill sizes="600px" className="object-cover" />
          </div>
        )}
        <input
          type="url"
          name={field as string}
          value={url}
          onChange={handleChange}
          placeholder="https://... o sube un archivo"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-purple-50 text-[#6A3B76] border border-purple-200 rounded-lg hover:bg-purple-100 transition disabled:opacity-50"
          >
            {isLoading ? 'Subiendo...' : 'Subir imagen'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, field)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Cabecera */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/posts"
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'new' ? 'Nueva entrada de blog' : 'Editar entrada de blog'}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Blog de Viajes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
          {/* Título */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={300}
              placeholder="Ej: 10 destinos imperdibles para el verano"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
            />
          </div>

          {/* Subtítulo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Subtítulo</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              maxLength={400}
              placeholder="Ej: Guía completa para viajeros aventureros"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#6A3B76] bg-white">
              <span className="text-gray-400 text-sm whitespace-nowrap">/blog-de-viajes/</span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                maxLength={300}
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="mi-entrada-del-blog"
                className="flex-1 text-sm focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-400">Solo letras minúsculas, números y guiones. Se genera automáticamente desde el título.</p>
          </div>

          {/* Resumen (excerpt) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Resumen / Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              maxLength={400}
              rows={3}
              placeholder="Breve descripción que aparece en el listado del blog (máx. 400 caracteres)"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-none"
            />
            <p className="text-xs text-gray-400 text-right">{formData.excerpt.length}/400</p>
          </div>

          {/* Imagen de portada */}
          <ImageField label="Imagen de portada" field="coverImage" inputRef={coverRef} required />

          {/* Contenido principal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Contenido principal <span className="text-red-500">*</span>
            </label>
            <textarea
              name="contentP1"
              value={formData.contentP1}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Escribí el texto principal de la entrada..."
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-y"
            />
          </div>

          {/* Imagen secundaria (opcional) */}
          <ImageField label="Imagen secundaria (opcional)" field="secondImage" inputRef={secondRef} />

          {/* Contenido secundario (opcional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Contenido secundario (opcional)</label>
            <textarea
              name="contentP2"
              value={formData.contentP2}
              onChange={handleChange}
              rows={6}
              placeholder="Continuación del texto, después de la imagen secundaria..."
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-y"
            />
          </div>

          {/* Activo */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 accent-[#6A3B76] rounded"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
              Publicado (visible en el blog)
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#6A3B76] text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Guardando...' : mode === 'new' ? 'Publicar entrada' : 'Guardar cambios'}
            </button>
            <Link
              href="/admin/posts"
              className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
