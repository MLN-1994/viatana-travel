"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Credenciales inválidas")
      } else {
        router.push("/admin")
        router.refresh()
      }
    } catch {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-[#63768D] relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-white text-9xl">✈️</div>
        <div className="absolute bottom-20 right-10 text-white text-9xl">🌍</div>
        <div className="absolute top-1/2 left-1/3 text-white text-7xl transform -translate-y-1/2">🏔️</div>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border-t-4 border-[#6A3B76]">
        {/* Logo/Icono principal */}
        <div className="text-center mb-8">
          <div className="inline-block bg-linear-to-br from-[#6A3B76] to-purple-600 p-4 rounded-full mb-4 shadow-lg">
            <span className="text-5xl">✈️</span>
          </div>
          <h1 className="text-3xl font-bold text-[#6A3B76] mb-2">
            Viatana Travel
          </h1>
          <p className="text-gray-600 text-sm">Panel de Administración</p>
          <div className="w-20 h-1 bg-linear-to-r from-[#6A3B76] to-[#63768D] mx-auto mt-3 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-[#6A3B76]">👤</span> Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              required
              autoComplete="username"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-[#6A3B76]">🔒</span> Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A3B76] focus:border-transparent transition-all hover:border-purple-300"
              required
              autoComplete="current-password"
              placeholder="Ingrese su contraseña"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#6A3B76] to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span> Iniciar sesión
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-400">
            <p className="mb-2">🔐 Acceso seguro y protegido</p>
            <p className="text-[10px]">© 2025 Viatana Travel - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
