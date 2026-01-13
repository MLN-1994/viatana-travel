'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Banner } from '@/types';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Seguro que deseas eliminar el banner "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Banner eliminado correctamente');
        fetchBanners();
      } else {
        alert('Error al eliminar banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Error al eliminar banner');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchBanners();
      } else {
        alert('Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error toggling active:', error);
      alert('Error al actualizar estado');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando banners...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition border border-gray-300 shadow-sm cursor-pointer"
          >
            ← Volver al Dashboard
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Banners</h1>
            <p className="text-gray-600 mt-1">Administra los banners del carousel principal</p>
          </div>
          <Link
            href="/admin/banners/new"
            className="bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-bold py-2 px-6 rounded-lg transition"
          >
            + Nuevo Banner
          </Link>
        </div>

        {banners.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No hay banners creados</p>
            <Link
              href="/admin/banners/new"
              className="text-[#6A3B76] hover:underline font-medium"
            >
              Crear el primer banner
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtítulo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                  <tr key={banner.id} className={!banner.isActive ? 'bg-gray-50 opacity-60' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {banner.displayOrder}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {banner.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                      {banner.subtitle || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(banner.id, banner.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-transform hover:scale-105 ${
                          banner.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {banner.isActive ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/banners/${banner.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(banner.id, banner.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
