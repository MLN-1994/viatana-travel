'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_SETTINGS_DEFAULTS } from '@/lib/site-settings-defaults';

type Fields = {
  headline_title: string;
  headline_title_highlight: string;
  headline_subtitle: string;
  headline_paragraph: string;
  headline_cta_text: string;
};

export default function AdminContenidoPage() {
  const [fields, setFields] = useState<Fields>({
    headline_title:           SITE_SETTINGS_DEFAULTS.headline_title,
    headline_title_highlight: SITE_SETTINGS_DEFAULTS.headline_title_highlight,
    headline_subtitle:        SITE_SETTINGS_DEFAULTS.headline_subtitle,
    headline_paragraph:       SITE_SETTINGS_DEFAULTS.headline_paragraph,
    headline_cta_text:        SITE_SETTINGS_DEFAULTS.headline_cta_text,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => {
        setFields((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {/* usa defaults */})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Error al guardar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link href="/admin" className="text-sm text-purple-600 hover:underline">
              ← Volver al panel
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">✏️ Contenido del sitio</h1>
            <p className="text-sm text-gray-500">Los cambios se reflejan al instante en el sitio público.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#6A3B76] text-white font-semibold rounded-lg hover:bg-purple-800 transition disabled:opacity-60 shadow-md text-sm"
          >
            {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Panel de edición */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Sección Hero (portada)</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Título — parte normal
              </label>
              <input
                value={fields.headline_title}
                onChange={(e) => handleChange('headline_title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                placeholder="Viajes a medida con"
              />
              <p className="text-xs text-gray-400 mt-1">Texto en negro, tamaño grande</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Título — parte destacada <span className="text-[#6A3B76]">(color violeta)</span>
              </label>
              <input
                value={fields.headline_title_highlight}
                onChange={(e) => handleChange('headline_title_highlight', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                placeholder="atención humana."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subtítulo</label>
              <textarea
                value={fields.headline_subtitle}
                onChange={(e) => handleChange('headline_subtitle', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Párrafo descriptivo</label>
              <textarea
                value={fields.headline_paragraph}
                onChange={(e) => handleChange('headline_paragraph', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Texto del botón WhatsApp</label>
              <input
                value={fields.headline_cta_text}
                onChange={(e) => handleChange('headline_cta_text', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                placeholder="Consultar por WhatsApp"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2.5 bg-[#6A3B76] text-white font-semibold rounded-lg hover:bg-purple-800 transition disabled:opacity-60 text-sm"
              >
                {saving ? 'Guardando...' : saved ? '✓ Cambios guardados' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* Preview en tiempo real */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Vista previa</h2>
            <div className="relative overflow-hidden rounded-xl bg-white py-10 px-6 text-center border border-gray-100">
              {/* Fondo decorativo mini */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-200 blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[80px]" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-black tracking-tight text-gray-900 leading-tight mb-3">
                  {fields.headline_title || '…'}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A3B76] to-purple-600">
                    {fields.headline_title_highlight || '…'}
                  </span>
                </h2>

                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {fields.headline_subtitle || '…'}
                </p>

                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed mb-5">
                  {fields.headline_paragraph || '…'}
                </p>

                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6A3B76] to-purple-600 text-white font-bold rounded-xl text-sm shadow">
                    <FaWhatsapp className="w-4 h-4" />
                    {fields.headline_cta_text || '…'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              La vista real puede variar levemente por el tamaño de pantalla.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
