# 📝 Guía de Configuración - Viatana Travel

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd viatana-travel
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y configura tus valores:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
- **Supabase**: Obtén las keys desde [supabase.com](https://supabase.com)
- **Auth Secret**: Genera uno con `openssl rand -base64 32`
- **Resend**: API key desde [resend.com](https://resend.com)

### 4. Configurar base de datos
Ejecuta el schema SQL en tu proyecto de Supabase:
```bash
# Abre Supabase SQL Editor y ejecuta:
cat supabase-banners-schema.sql
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Arquitectura

### Stack Tecnológico
- **Framework**: Next.js 14+ (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: NextAuth v5
- **Email**: Resend
- **Lenguaje**: TypeScript

### Estructura de Carpetas
```
viatana-travel/
├── app/                    # App Router de Next.js
│   ├── (rutas públicas)
│   ├── admin/             # Panel de administración
│   └── api/               # API Routes
├── components/            # Componentes React
├── lib/                   # Utilidades y lógica de negocio
│   ├── auth.ts           # Configuración de NextAuth
│   ├── supabase.ts       # Cliente de Supabase
│   ├── validations.ts    # Validaciones de formularios
│   └── rate-limit.ts     # Rate limiting
├── types/                 # Definiciones de TypeScript
├── middleware.ts          # Middleware de Next.js
└── public/               # Assets estáticos
```

---

## 🔐 Seguridad

### Middleware
El middleware protege automáticamente:
- ✅ Todas las rutas `/admin/*` (excepto `/admin/login`)
- ✅ APIs de gestión: `/api/packages/*`, `/api/categories/*`, `/api/banners/*`

### Rate Limiting
- Formulario de contacto: 5 mensajes cada 15 minutos por IP

### Validaciones
- Sanitización de inputs para prevenir XSS
- Validación de emails y teléfonos
- Límites de longitud en formularios

---

## 👨‍💼 Panel de Administración

### Acceso
URL: `http://localhost:3000/admin/login`

**Credenciales por defecto** (⚠️ CAMBIAR EN PRODUCCIÓN):
```
Usuario: admin
Contraseña: admin123
```

### Funcionalidades
- ✅ Gestión de paquetes turísticos
- ✅ Gestión de categorías
- ✅ Gestión de banners/carrusel
- ✅ Sistema de ofertas y descuentos

---

## 📧 Configuración de Email

### Opción Recomendada: Resend

1. Crea una cuenta en [resend.com](https://resend.com)
2. Obtén tu API Key
3. Configura en `.env.local`:
```env
RESEND_API_KEY=re_tu_key_aqui
CONTACT_EMAIL=noreply@tudominio.com
CONTACT_RECIPIENT_EMAIL=contacto@viatanatravel.com
```

4. Verifica tu dominio en Resend para envíos desde tu dominio

---

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura las variables de entorno
3. Deploy automático en cada push

### Variables de entorno en producción
Asegúrate de configurar en Vercel:
- Todas las variables de `.env.example`
- `NODE_ENV=production`
- `NEXTAUTH_URL=https://tudominio.com`

---

## 🧪 Testing

### Ejecutar tests (cuando se implementen)
```bash
npm test
```

### Verificar tipos TypeScript
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

---

## 📊 Mejoras Implementadas

### ✅ Seguridad
- [x] Middleware de protección de rutas
- [x] Rate limiting en formularios
- [x] Validación y sanitización de inputs
- [x] Variables de entorno documentadas

### ✅ SEO
- [x] Metadata mejorada
- [x] robots.txt dinámico
- [x] sitemap.xml automático
- [x] Open Graph tags

### ✅ Performance
- [x] Logs solo en desarrollo
- [x] Optimización de imágenes con next/image

---

## 🐛 Solución de Problemas

### Error: "Invalid session"
- Verifica que `AUTH_SECRET` esté configurado
- Limpia las cookies del navegador
- Reinicia el servidor de desarrollo

### Error: "Supabase connection failed"
- Verifica las credenciales de Supabase
- Confirma que las tablas existan en la BD

### Emails no se envían
- Verifica `RESEND_API_KEY`
- Confirma el dominio en Resend
- Revisa logs en la consola del servidor

---

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo.

---

## 🔄 Próximas Mejoras Sugeridas

1. **Sistema de reservas completo**
   - Carrito de compras
   - Integración de pagos (Stripe/Mercado Pago)

2. **Testing**
   - Tests unitarios con Vitest
   - Tests E2E con Playwright

3. **Internacionalización**
   - Soporte multi-idioma con next-intl

4. **Analytics**
   - Google Analytics o Vercel Analytics
   - Error tracking con Sentry

5. **Búsqueda y filtros**
   - Búsqueda avanzada de paquetes
   - Filtros por precio, destino, duración

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026
