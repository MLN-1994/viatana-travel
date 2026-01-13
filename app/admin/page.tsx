"use client"

import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa"
import { TravelPackage } from "@/types"

export default function AdminDashboard() {
  const router = useRouter()
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      const response = await fetch("/api/packages")
      const data = await response.json()
      setPackages(data)
    } catch (error) {
      console.error("Error al cargar paquetes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este paquete?")) return

    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        loadPackages()
      }
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-purple-50 to-gray-100 relative">
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 text-[#6A3B76] text-8xl">✈️</div>
        <div className="absolute bottom-20 left-10 text-[#6A3B76] text-7xl">🌍</div>
        <div className="absolute top-1/2 right-1/3 text-[#6A3B76] text-6xl">🏔️</div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-[#6A3B76] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="/"
                className="bg-linear-to-br from-[#6A3B76] to-purple-600 p-2 md:p-3 rounded-xl shadow-lg hover:scale-110 transition-transform"
                title="Ir a la página principal"
              >
                <span className="text-2xl md:text-3xl">✈️</span>
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-3xl font-bold text-[#6A3B76] flex items-center gap-2">
                    Viatana Travel
                    <span className="text-sm md:text-lg font-normal text-gray-500">Admin</span>
                  </h1>
                  <a
                    href="/"
                    className="text-xs md:text-sm text-purple-600 hover:text-purple-800 underline hidden sm:inline"
                    title="Ver sitio público"
                  >
                    Ver sitio →
                  </a>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mt-1">📦 Gestión de paquetes</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Cerrar sesión</span>
              <span className="sm:hidden">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Quick Links */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/packages/new')}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#6A3B76] hover:shadow-lg transition text-left cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#6A3B76] p-3 rounded-lg">
                <FaPlus className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Nuevo Paquete</h3>
                <p className="text-sm text-gray-500">Crear paquete turístico</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => router.push('/admin/categories')}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition text-left cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500 p-3 rounded-lg">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Categorías</h3>
                <p className="text-sm text-gray-500">Gestionar categorías</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/admin/banners')}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500 hover:shadow-lg transition text-left cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className="bg-pink-500 p-3 rounded-lg">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Banners</h3>
                <p className="text-sm text-gray-500">Gestionar carousel</p>
              </div>
            </div>
          </button>
        </div>

        {/* Action Bar */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-4 md:p-5 border-l-4 border-[#6A3B76]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                📋 Paquetes Turísticos
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Total: <span className="font-semibold text-[#6A3B76]">{packages.length}</span> paquetes
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/packages/new")}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-linear-to-r from-[#6A3B76] to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg font-semibold text-sm md:text-base w-full sm:w-auto justify-center"
            >
              <FaPlus className="text-base md:text-lg" />
              Agregar Paquete
            </button>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">          {/* Mensaje informativo en móvil */}
          <div className="block sm:hidden bg-purple-50 border-b border-purple-100 px-4 py-3">
            <p className="text-xs text-purple-700 text-center">
              ← Desliza para ver más columnas →
            </p>
          </div>
                    <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-[#6A3B76] to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    📦 Título
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    📍 Destino
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    🏷️ Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    💰 Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ⏱️ Duración
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    🔥 Oferta
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    ⚙️ Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="animate-spin h-10 w-10 text-[#6A3B76]" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-gray-600 font-medium">Cargando paquetes...</span>
                      </div>
                    </td>
                  </tr>
                ) : packages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-6xl">📦</span>
                        <p className="text-gray-600 font-medium">No hay paquetes registrados</p>
                        <p className="text-gray-400 text-sm">Crea uno nuevo para empezar</p>
                      </div>
                    </td>
                  </tr>
                ) : packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-purple-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          width={48}
                          height={48}
                          className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover mr-3 shadow-md border-2 border-purple-200"
                        />
                        <div className="text-xs md:text-sm font-semibold text-gray-900 max-w-[120px] md:max-w-none truncate">
                          {pkg.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                      {pkg.destination}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className="px-2 md:px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-linear-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                      ${pkg.price}
                      {pkg.originalPrice && (
                        <span className="text-gray-400 line-through ml-2 text-xs">
                          ${pkg.originalPrice}
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                      {pkg.duration}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      {pkg.isOffer && (
                        <span className="px-2 md:px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-linear-to-r from-red-100 to-red-200 text-red-800 border border-red-300 animate-pulse">
                          🔥 {pkg.discount}% OFF
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                          className="p-2 text-[#6A3B76] hover:bg-purple-100 rounded-lg transition-all transform hover:scale-110"
                          title="Editar"
                        >
                          <FaEdit className="text-base md:text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all transform hover:scale-110"
                          title="Eliminar"
                        >
                          <FaTrash className="text-base md:text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
