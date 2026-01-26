'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBannerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    isActive: true,
    displayOrder: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  // Manejar selección de archivo y subida
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setImagePreview(URL.createObjectURL(file));
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('bucket', 'banners');
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        alert('Error al subir la imagen: ' + (data.error || '')); 
      }
    } catch (err) {
      alert('Error inesperado al subir la imagen');
    } finally {
      setUploading(false);
    }
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
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="w-full max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-4">
        {/* Botón volver arriba */}
        <div className="mb-6">
          <Link href="/admin/banners" className="text-primary hover:underline mb-4 inline-block">
            ← Volver a banners
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Crear Nuevo Banner</h1>
        <p className="text-gray-600 mb-8 text-center">Agrega un nuevo banner al carousel principal</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ej: Paquetes todo incluido con hasta 40% de descuento"
            />
          </div>

          {/* Imagen: subir desde PC o URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen *</label>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6A3B76] file:text-white hover:file:bg-[#5a2f66]"
              />
              {uploading && <span className="text-xs text-gray-500">Subiendo imagen...</span>}
              {imagePreview && (
                <img src={imagePreview} alt="Previsualización" className="rounded-lg border max-h-40 object-contain" />
              )}
              {formData.imageUrl && !imagePreview && (
                <img src={formData.imageUrl} alt="Imagen actual" className="rounded-lg border max-h-40 object-contain" />
              )}
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Puedes subir una imagen desde tu PC o pegar una URL. Si subes una imagen, la URL se completará automáticamente.
              </p>
            </div>
          </div>

          {/* Estado Activo */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
              Banner activo (visible en el sitio)
            </label>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear Banner'}
            </button>
            <Link
              href="/admin/banners"
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
