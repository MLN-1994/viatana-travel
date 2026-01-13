'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBannerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    linkUrl: '',
    buttonText: '',
    isActive: true,
    displayOrder: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Banner creado correctamente');
        router.push('/admin/banners');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'No se pudo crear el banner'}`);
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Error al crear el banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Banner</h1>
        <p className="text-gray-600 mb-8">Agrega un nuevo banner al carousel principal</p>

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
              placeholder="Ej: ¡Descubre el Paraíso Caribeño!"
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
              placeholder="Ej: Paquetes todo incluido con hasta 40% de descuento"
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
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 1920x600px. Puedes usar Unsplash.com para imágenes gratuitas.
            </p>
          </div>

          {/* URL de Destino */}
          <div>
            <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL de Destino
            </label>
            <input
              type="text"
              id="linkUrl"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
              placeholder="Ej: /#ofertas o /packages/123"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deja vacío si no quieres que el banner sea clickeable.
            </p>
          </div>

          {/* Texto del Botón */}
          <div>
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
              Texto del Botón
            </label>
            <input
              type="text"
              id="buttonText"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
              placeholder="Ej: Ver Ofertas"
            />
          </div>

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
              Menor número = mayor prioridad. 0 es el primero.
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
              {isSubmitting ? 'Creando...' : 'Crear Banner'}
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
