// Sistema simple de rate limiting basado en IP
// Para producción considera usar: https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-limit

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

// Limpiar registros viejos cada 5 minutos
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach(key => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}, 5 * 60 * 1000)

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000 // 1 minuto por defecto
): RateLimitResult {
  const now = Date.now()
  const key = `rate_limit_${identifier}`

  // Obtener o crear el registro
  if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
    rateLimitStore[key] = {
      count: 0,
      resetTime: now + windowMs
    }
  }

  const record = rateLimitStore[key]
  record.count++

  const remaining = Math.max(0, limit - record.count)
  const success = record.count <= limit

  return {
    success,
    limit,
    remaining,
    reset: record.resetTime
  }
}

// Obtener IP del request
export function getClientIp(request: Request): string {
  // En producción con proxies (Vercel, CloudFlare, etc)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  // Fallback
  return 'unknown'
}
