'use client';

import { useState, useRef, useEffect } from 'react';
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
    packageId: '',
  });
  const [packages, setPackages] = useState([]);
    useEffect(() => {
      // Cargar paquetes para el select desde la API
      async function fetchPackages() {
        try {
          const res = await fetch('/api/packages');
          if (res.ok) {
            const pkgs = await res.json();
            setPackages(pkgs);
          } else {
            setPackages([]);
          }
        } catch {
          setPackages([]);
        }
      }
      fetchPackages();
    }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [validationDetails, setValidationDetails] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setFormError(null);
    setValidationDetails(null);

    // LOG: Verificar datos enviados
    console.log('FORM DATA ENVIADO:', formData);

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
        setFormError(error.error || 'No se pudo crear el banner');
        if (error.details) setValidationDetails(error.details);
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      setFormError('Error al crear el banner');
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
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
              <strong>Error:</strong> {formError}
              {validationDetails && validationDetails.fieldErrors && (
                <ul className="mt-1 text-sm list-disc list-inside">
                  {Object.entries(validationDetails.fieldErrors).map(([field, errors]) =>
                    Array.isArray(errors) && errors.length > 0 ? (
                      <li key={field}><b>{field}:</b> {errors.join(', ')}</li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
          )}
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

          {/* Orden de Visualización */}
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
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ej: 0 para primero, 1 para segundo, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Menor número = mayor prioridad en el carrusel
            </p>
          </div>

          {/* Selección de Paquete */}
          <div>
            <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 mb-2">
              Paquete vinculado (opcional)
            </label>
            <select
              id="packageId"
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">-- Sin paquete vinculado --</option>
              {packages.map((pkg: any) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title} ({pkg.destination})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Si seleccionas un paquete, el banner será clickeable y llevará al detalle de ese paquete.</p>
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
