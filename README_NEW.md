# Viatana Travel 🌍✈️

Plataforma web moderna de agencia de viajes desarrollada con Next.js 14+.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz responsive con Tailwind CSS
- 🔐 **Panel Admin**: Sistema completo de gestión de contenido
- 📦 **Paquetes Turísticos**: Gestión dinámica de paquetes y ofertas
- 🎯 **Categorías**: Organización por tipos de viaje
- 🎠 **Carrusel de Banners**: Sistema de promociones destacadas
- 📧 **Formulario de Contacto**: Con rate limiting y validaciones
- 🔒 **Seguridad**: Middleware, validaciones y sanitización
- 🚀 **SEO Optimizado**: Metadata, sitemap y robots.txt

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: NextAuth v5
- **Email**: Resend
- **Lenguaje**: TypeScript
- **Iconos**: React Icons

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- (Opcional) Cuenta de Resend para emails

## 🚀 Instalación Rápida

```bash
# 1. Clonar repositorio
git clone <tu-repositorio>
cd viatana-travel

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Documentación Completa

Para instrucciones detalladas de configuración, consulta [SETUP.md](SETUP.md)

## 🔐 Admin Panel

- **URL**: `/admin/login`
- **Usuario por defecto**: `admin` / `admin123` (⚠️ cambiar en producción)

## 📁 Estructura del Proyecto

```
viatana-travel/
├── app/                 # App Router (páginas y APIs)
├── components/          # Componentes React
├── lib/                # Lógica de negocio
│   ├── validations.ts  # Validaciones
│   ├── rate-limit.ts   # Rate limiting
│   ├── auth.ts         # Autenticación
│   └── supabase.ts     # Cliente BD
├── types/              # TypeScript types
├── middleware.ts       # Protección de rutas
└── public/            # Assets estáticos
```

## 🔒 Seguridad Implementada

- ✅ Middleware de protección de rutas admin
- ✅ Rate limiting (5 mensajes/15min por IP)
- ✅ Validación y sanitización de inputs
- ✅ Console.logs solo en desarrollo
- ✅ Variables de entorno documentadas

## 🎯 SEO y Performance

- ✅ Metadata dinámica con Open Graph
- ✅ Sitemap.xml automático
- ✅ Robots.txt configurado
- ✅ Imágenes optimizadas con next/image

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Configura variables de entorno
3. Deploy automático

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

## 🐛 Solución de Problemas

Ver [SETUP.md](SETUP.md#-solución-de-problemas) para problemas comunes.

## 📈 Roadmap

- [ ] Sistema de reservas con pagos
- [ ] Tests unitarios y E2E
- [ ] Internacionalización (i18n)
- [ ] Analytics y monitoring
- [ ] Búsqueda y filtros avanzados
- [ ] PWA support

## 📄 Licencia

Proyecto privado - Viatana Travel © 2026

## 💬 Soporte

Para soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Viatana Travel**
