"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TravelPackage } from "@/types"
import { FaArrowLeft, FaSave } from "react-icons/fa"

interface PackageFormProps {
  packageId?: string
}

export default function PackageForm({ packageId }: PackageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
    category: "nacional"
  })

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#6A3B76]">
                {packageId ? "Editar Paquete" : "Nuevo Paquete"}
              </h1>
              <p className="text-gray-600 text-sm">
                Complete los datos del paquete turístico
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
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
              onChange={(e) => setFormData({ ...formData, category: e.target.value as TravelPackage['category'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
            >
              <option value="nacional">Nacional</option>
              <option value="sudamerica">Sudamérica</option>
              <option value="centroamerica">Centroamérica</option>
              <option value="europa">Europa</option>
              <option value="mundial">Mundial</option>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Original (si hay oferta)
              </label>
              <input
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Oferta */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isOffer}
                onChange={(e) => setFormData({ ...formData, isOffer: e.target.checked })}
                className="w-5 h-5 text-[#6A3B76] rounded focus:ring-2 focus:ring-[#6A3B76]"
              />
              <span className="text-sm font-medium text-gray-700">
                Este paquete es una oferta
              </span>
            </label>

            {formData.isOffer && (
              <div className="flex-1">
                <input
                  type="number"
                  value={formData.discount || ""}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                  placeholder="% descuento"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
              placeholder="https://..."
            />
            {formData.image && (
              <div className="mt-2 text-sm text-gray-600">
                ✓ Imagen configurada
              </div>
            )}
          </div>

          {/* Incluye */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué incluye? *
            </label>
            <div className="space-y-2">
              {(formData.included || [""]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleIncludedChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76]"
                    placeholder="Ej: Transporte aeropuerto-hotel"
                  />
                  {(formData.included || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIncludedItem(index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIncludedItem}
                className="text-[#6A3B76] hover:underline text-sm font-medium"
              >
                + Agregar item
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#6A3B76] text-white rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
            >
              <FaSave />
              {loading ? "Guardando..." : "Guardar Paquete"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
