import { handlers } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

// Wrapper para aplicar rate limiting al POST (login)
async function handlePOST(request: NextRequest) {
  const ip = getClientIp(request)
  
  // Limitar a 5 intentos por minuto por IP
  const rateLimitResult = rateLimit(ip, 5, 60000)
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Demasiados intentos de inicio de sesión. Por favor, espera un momento.',
        retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString()
        }
      }
    )
  }

  // Si pasa el rate limit, ejecutar el handler normal
  return handlers.POST(request)
}

export const GET = handlers.GET
export const POST = handlePOST
