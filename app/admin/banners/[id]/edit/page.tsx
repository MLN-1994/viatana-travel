'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import type { Banner } from '@/types';

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const bannerId = params?.id as string;

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    isActive: true,
    displayOrder: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (bannerId) {
      fetchBanner();
    }
  }, [bannerId]);

  const fetchBanner = async () => {
    try {
      const response = await fetch(`/api/banners/${bannerId}`);
      if (response.ok) {
        const banner: Banner = await response.json();
        setFormData({
          title: banner.title,
          subtitle: banner.subtitle || '',
          imageUrl: banner.imageUrl,
          isActive: banner.isActive,
          displayOrder: banner.displayOrder,
        });
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Error al cargar banner');
        router.push('/admin/banners');
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
      alert('Error al cargar banner');
      router.push('/admin/banners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isActive: e.target.checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/banners/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Banner actualizado correctamente');
        router.push('/admin/banners');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'No se pudo actualizar el banner'}`);
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Error al actualizar el banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando banner...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Botón de volver */}
        <a className="text-[#6A3B76] hover:underline mb-4 inline-block" href="/admin/banners">← Volver a banners</a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Banner</h1>
        <p className="text-gray-600 mb-8">Modifica la información del banner</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
            />
          </div>

          {/* Subtítulo */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo
            </label>
            <textarea
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
            />
          </div>

          {/* URL de Imagen */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen *
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 1920x600px
            </p>
          </div>

          {/* Vista previa de imagen */}
          {formData.imageUrl && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/800x300?text=Error+al+cargar+imagen';
                }}
              />
            </div>
          )}

          {/* ...existing code... */}

          {/* Orden de Visualización */}
          <div>
            <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Orden de Visualización
            </label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Menor número = mayor prioridad
            </p>
          </div>

          {/* Estado Activo */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-[#6A3B76] border-gray-300 rounded focus:ring-[#6A3B76]"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
              Banner activo (visible en el sitio)
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <Link
              href="/admin/banners"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
