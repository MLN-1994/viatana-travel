'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    displayOrder: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, [params.id]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${params.id}`);
      if (response.ok) {
        const data: Category = await response.json();
        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description || '',
          icon: data.icon || '',
          displayOrder: data.displayOrder,
        });
      } else {
        alert('Categoría no encontrada');
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Error al cargar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'displayOrder' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/categories/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Categoría actualizada correctamente');
        router.push('/admin/categories');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'No se pudo actualizar la categoría'}`);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error al actualizar la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/categories" className="text-[#6A3B76] hover:underline mb-4 inline-block">
            ← Volver a categorías
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Editar Categoría</h1>
          <p className="text-gray-600 mt-2">Modifica los datos de la categoría</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
                placeholder="Ej: Aventura, Playas, Cultural..."
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL amigable) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
                placeholder="aventura"
              />
              <p className="text-xs text-gray-500 mt-1">Sin espacios, solo letras minúsculas y guiones</p>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
                placeholder="Breve descripción de la categoría"
              />
            </div>

            {/* Icono */}
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                Icono (Emoji)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
                  placeholder="🏖️"
                  maxLength={2}
                />
                {formData.icon && (
                  <span className="text-4xl">{formData.icon}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Copia y pega un emoji desde tu teclado</p>
            </div>

            {/* Orden */}
            <div>
              <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
                Orden de visualización
              </label>
              <input
                type="number"
                id="displayOrder"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Menor número = aparece primero</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#6A3B76] text-white py-3 px-6 rounded-lg hover:bg-[#5a2f66] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <Link
                href="/admin/categories"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
