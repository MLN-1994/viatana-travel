"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TravelPackage, Category } from "@/types"

interface PackageFormProps {
  packageId?: string
}

export default function PackageForm({ packageId }: PackageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<Partial<TravelPackage>>({
    title: "",
    destination: "",
    description: "",
    price: 0,
    duration: "",
    image: "",
    isOffer: false,
    originalPrice: 0,
    discount: 0,
    included: [""],
    category: ""
  })

  useEffect(() => {
    // Cargar categorías
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error al cargar categorías:', err));
    
    if (packageId) {
      // Cargar paquete existente
      fetch("/api/packages")
        .then(res => res.json())
        .then(packages => {
          const pkg = packages.find((p: TravelPackage) => p.id === packageId)
          if (pkg) {
            setFormData(pkg)
          } else {
            setError("Paquete no encontrado")
          }
        })
        .catch(() => setError("Error al cargar el paquete"))
    }
  }, [packageId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const url = packageId ? `/api/packages/${packageId}` : "/api/packages"
      const method = packageId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error("Error al guardar el paquete")
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("Error al guardar el paquete")
    } finally {
      setLoading(false)
    }
  }

  const handleIncludedChange = (index: number, value: string) => {
    const newIncluded = [...(formData.included || [])]
    newIncluded[index] = value
    setFormData({ ...formData, included: newIncluded })
  }

  const addIncludedItem = () => {
    setFormData({ ...formData, included: [...(formData.included || []), ""] })
  }

  const removeIncludedItem = (index: number) => {
    const newIncluded = (formData.included || []).filter((_, i) => i !== index)
    setFormData({ ...formData, included: newIncluded })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition border border-gray-300 shadow-sm cursor-pointer"
          >
            ← Volver al Dashboard
          </button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {packageId ? "Editar Paquete" : "Nuevo Paquete"}
          </h1>
          <p className="text-gray-600 mt-1">
            Complete los datos del paquete turístico
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              placeholder="Ej: Machu Picchu Clásico"
            />
          </div>

          {/* Destino */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino *
            </label>
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              placeholder="Ej: Cusco, Perú"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              placeholder="Describe el paquete turístico..."
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duración */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración *
            </label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              placeholder="Ej: 4 días / 3 noches"
            />
          </div>

          {/* Precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Original
              </label>
              <input
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
                placeholder="Si hay oferta"
              />
            </div>
          </div>

          {/* Oferta */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isOffer}
                onChange={(e) => setFormData({ ...formData, isOffer: e.target.checked })}
                className="w-5 h-5 text-[#6A3B76] rounded focus:ring-2 focus:ring-[#6A3B76]"
              />
              <span className="text-sm font-medium text-gray-800">
                Este paquete es una oferta especial
              </span>
            </label>

            {formData.isOffer && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Porcentaje de descuento
                </label>
                <input
                  type="number"
                  value={formData.discount || ""}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all hover:border-red-300"
                  placeholder="Ej: 20"
                />
              </div>
            )}
          </div>

          {/* Imagen URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen *
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.image && (
              <div className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700 font-medium">
                <span className="text-xl">✓</span> Imagen configurada correctamente
              </div>
            )}
          </div>

          {/* Incluye */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Qué incluye el paquete? *
            </label>
            <div className="space-y-3">
              {(formData.included || [""]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleIncludedChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-300 bg-white"
                    placeholder="Ej: Transporte aeropuerto-hotel"
                  />
                  {(formData.included || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIncludedItem(index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-all font-semibold transform hover:scale-105"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIncludedItem}
                className="w-full py-2 px-4 bg-white border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-100 rounded-lg transition-all font-semibold transform hover:scale-[1.02]"
              >
                + Agregar item
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 px-5 py-4 rounded-xl text-sm font-semibold flex items-center gap-3 animate-pulse">
              <span className="text-2xl">⚠️</span>
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full sm:w-auto px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-bold transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ❌ Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-[#6A3B76] to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  💾 Guardar Paquete
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
