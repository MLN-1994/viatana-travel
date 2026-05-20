'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/types';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch {
      console.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar la entrada "${title}"?`)) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        alert('Error al eliminar');
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) fetchPosts();
      else alert('Error al actualizar estado');
    } catch {
      alert('Error al actualizar estado');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
            >
              ←
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog de Viajes</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {posts.length} {posts.length === 1 ? 'entrada' : 'entradas'}
              </p>
            </div>
          </div>
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6A3B76] text-white font-semibold rounded-xl hover:bg-purple-700 transition shadow-sm text-sm"
          >
            <span>+</span> Nueva entrada
          </Link>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Cargando...</div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-400 mb-4">No hay entradas aún.</p>
              <Link href="/admin/posts/new" className="text-[#6A3B76] font-semibold hover:underline text-sm">
                Crear la primera entrada →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gradient-to-r from-[#6A3B76] to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Título</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Slug</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900 text-sm max-w-[240px] truncate">{post.title}</p>
                        {post.subtitle && (
                          <p className="text-xs text-gray-400 truncate max-w-[240px] mt-0.5">{post.subtitle}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`/blog-de-viajes/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#6A3B76] hover:underline"
                        >
                          /{post.slug}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(post.id, post.isActive)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            post.isActive
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {post.isActive ? 'Publicado' : 'Borrador'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="px-3 py-1.5 text-xs font-semibold text-[#6A3B76] border border-purple-200 rounded-lg hover:bg-purple-50 transition"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
