import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger todas las rutas /admin excepto /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = await auth()

    if (!session) {
      // Redirigir a login si no hay sesión
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Si está autenticado y trata de acceder a /admin/login, redirigir al dashboard
  if (pathname === "/admin/login") {
    const session = await auth()
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
}
