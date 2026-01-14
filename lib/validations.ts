// Validaciones para formularios y APIs
// Puedes instalar Zod más adelante con: npm install zod

// Validación de email simple
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validación de teléfono (formato flexible)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s+()-]{7,20}$/
  return phoneRegex.test(phone)
}

// Sanitizar texto para prevenir XSS
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Validación de formulario de contacto
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {}

  // Validar nombre
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }
  if (data.name && data.name.length > 100) {
    errors.name = 'El nombre es demasiado largo'
  }

  // Validar email
  if (!data.email) {
    errors.email = 'El email es requerido'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'El email no es válido'
  }

  // Validar teléfono (opcional)
  if (data.phone && data.phone.trim() !== '' && !isValidPhone(data.phone)) {
    errors.phone = 'El teléfono no es válido'
  }

  // Validar mensaje
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
  }
  if (data.message && data.message.length > 2000) {
    errors.message = 'El mensaje es demasiado largo (máximo 2000 caracteres)'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
