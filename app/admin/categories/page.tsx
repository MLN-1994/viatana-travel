'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    setDeleteId(id);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== id));
        alert('Categoría eliminada correctamente');
      } else {
        alert('Error al eliminar categoría');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error al eliminar categoría');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition border border-gray-300 shadow-sm cursor-pointer"
          >
            ← Volver al Dashboard
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Administra las categorías de paquetes turísticos</p>
          </div>
          <Link
            href="/admin/categories/new"
            className="w-full sm:w-auto text-center px-6 py-3 bg-[#6A3B76] text-white rounded-lg hover:bg-[#5a2f66] transition text-sm md:text-base font-medium"
          >
            + Nueva Categoría
          </Link>
        </div>

        {/* Table for Desktop / Cards for Mobile */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Icono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No hay categorías creadas. <Link href="/admin/categories/new" className="text-[#6A3B76] hover:underline">Crear la primera</Link>
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.displayOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-2xl">
                        {category.icon || '📁'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {category.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {category.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/categories/${category.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-600 rounded hover:bg-indigo-50 transition"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(category.id)}
                            disabled={deleteId === category.id}
                            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition disabled:opacity-50"
                          >
                            {deleteId === category.id ? 'Eliminando...' : 'Eliminar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {categories.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No hay categorías creadas. <Link href="/admin/categories/new" className="text-[#6A3B76] hover:underline">Crear la primera</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <div key={category.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon || '📁'}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <span className="text-xs text-gray-500">Orden: {category.displayOrder}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">Slug:</span>
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {category.slug}
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="flex-1 text-center text-indigo-600 hover:text-indigo-900 px-4 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition text-sm font-medium"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteId === category.id}
                        className="flex-1 text-red-600 hover:text-red-900 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50 text-sm font-medium"
                      >
                        {deleteId === category.id ? '⏳' : '🗑️'} {deleteId === category.id ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            📊 Total de categorías: <strong>{categories.length}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
