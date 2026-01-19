# 🔐 Guía de Implementación de Autenticación Segura

## ✅ Cambios Implementados (FASE 1 - CRÍTICO)

### 1. 🛡️ Middleware de Protección de Rutas
**Archivo:** `middleware.ts`
- Protege todas las rutas `/admin/*` excepto `/admin/login`
- Redirige automáticamente a login si no hay sesión
- Previene acceso a login si ya estás autenticado

### 2. 🗃️ Base de Datos de Usuarios
**Archivos:**
- `supabase-admin-users-schema.sql` - Estructura de tablas
- `supabase-admin-users-seed.sql` - Datos iniciales

**Características:**
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Sistema de roles (admin, editor, viewer)
- ✅ Bloqueo automático tras 5 intentos fallidos
- ✅ Auditoría de logins en tabla `admin_login_logs`
- ✅ Timestamps automáticos
- ✅ Row Level Security (RLS)

### 3. 🔑 Autenticación con Supabase
**Archivo:** `lib/auth.ts`
- Validación contra base de datos Supabase
- Verificación de contraseñas con bcrypt
- Sistema de bloqueo de cuentas (5 intentos = 15 minutos bloqueado)
- Registro de intentos de login (auditoría)
- Soporte para roles de usuario

### 4. 🚦 Rate Limiting
**Archivo:** `app/api/auth/[...nextauth]/route.ts`
- Límite de 5 intentos por minuto por IP
- Headers estándar de rate limit
- Mensaje claro de error con tiempo de espera

### 5. 🎲 Generación de AUTH_SECRET Seguro
**Archivo:** `scripts/generate-auth-secret.js`
- Genera secretos criptográficamente seguros
- 64 bytes (512 bits) de entropía

---

## 🚀 Pasos para Implementar

### PASO 1: Crear las Tablas en Supabase

1. Accede a tu panel de Supabase: https://supabase.com/dashboard
2. Ve a SQL Editor
3. Ejecuta el contenido de `supabase-admin-users-schema.sql`
4. Verifica que las tablas se crearon correctamente

### PASO 2: Generar Contraseñas Hasheadas

```bash
# Ejecutar el script para generar hashes
node scripts/hash-passwords.js
```

**IMPORTANTE:** Edita el archivo `scripts/hash-passwords.js` y cambia las contraseñas ANTES de ejecutarlo.

### PASO 3: Insertar Usuarios Iniciales

1. Copia el SQL generado por el script anterior
2. Ejecuta en SQL Editor de Supabase
3. Verifica que los usuarios se crearon:

```sql
SELECT id, email, username, role, is_active, created_at 
FROM admin_users;
```

### PASO 4: Generar AUTH_SECRET

```bash
# Generar un secreto seguro
node scripts/generate-auth-secret.js
```

Copia el resultado a tu archivo `.env.local`

### PASO 5: Actualizar Variables de Entorno

Asegúrate de que tu `.env.local` tenga:

```env
AUTH_SECRET=el-secreto-generado-en-paso-4
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### PASO 6: Reiniciar el Servidor

```bash
# Detener el servidor actual (Ctrl+C)
# Iniciar de nuevo
npm run dev
```

### PASO 7: Probar la Autenticación

1. Accede a: http://localhost:3000/admin
   - Debe redirigir a /admin/login
2. Ingresa con tus credenciales
3. Debe redirigir a /admin tras login exitoso
4. Prueba cerrar sesión
5. Intenta acceder a /admin sin login

---

## 🔒 Características de Seguridad Implementadas

### ✅ Implementado:
- [x] Middleware de protección de rutas
- [x] Contraseñas hasheadas (bcrypt con 10 rounds)
- [x] Base de datos de usuarios (Supabase)
- [x] Rate limiting (5 intentos/minuto por IP)
- [x] Bloqueo de cuenta tras intentos fallidos
- [x] Auditoría de logins
- [x] Sesiones JWT con expiración (30 días)
- [x] Sistema de roles básico
- [x] AUTH_SECRET seguro

### ⏳ Pendiente (Fase 2):
- [ ] Panel de gestión de usuarios
- [ ] Logs de actividad detallados
- [ ] Timeout de sesión por inactividad
- [ ] Renovación automática de tokens

### 🌟 Pendiente (Fase 3):
- [ ] Autenticación de dos factores (2FA)
- [ ] Recuperación de contraseña por email
- [ ] Notificaciones de login sospechoso
- [ ] Historial de sesiones activas

---

## 🧪 Testing de Seguridad

### Test 1: Protección de Rutas
```bash
# Sin login, debe redirigir a /admin/login
curl -I http://localhost:3000/admin
```

### Test 2: Rate Limiting
```bash
# Hacer 6 intentos rápidos (el 6to debe fallar)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/callback/credentials \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"wrong"}'
  echo "Intento $i"
done
```

### Test 3: Bloqueo de Cuenta
1. Hacer 5 intentos fallidos de login
2. La cuenta debe quedar bloqueada por 15 minutos
3. Verificar en Supabase:
```sql
SELECT username, login_attempts, locked_until 
FROM admin_users 
WHERE username = 'tu_usuario';
```

---

## 📊 Roles y Permisos

### Admin
- ✅ Acceso completo al panel
- ✅ Crear, editar, eliminar paquetes
- ✅ Gestionar banners y categorías
- ✅ (Futuro) Gestionar usuarios

### Editor
- ✅ Crear y editar paquetes
- ✅ Gestionar banners
- ❌ No puede eliminar
- ❌ No puede gestionar usuarios

### Viewer
- ✅ Ver el dashboard
- ❌ No puede modificar nada

---

## 🔧 Troubleshooting

### Error: "Invalid username or password"
- Verifica que el usuario existe en Supabase
- Confirma que la contraseña está hasheada correctamente
- Revisa los logs en Supabase

### Error: "Too many login attempts"
- Espera 1 minuto
- O limpia el rate limit (reinicia el servidor)

### Error: "Account is locked"
- Espera 15 minutos
- O resetea manualmente en Supabase:
```sql
UPDATE admin_users 
SET login_attempts = 0, locked_until = NULL 
WHERE email = 'tu@email.com';
```

### Usuario no puede acceder después de cambiar contraseña
- Verifica que el hash se generó correctamente
- Ejecuta el script hash-passwords.js
- Actualiza el registro en Supabase

---

## 📞 Próximos Pasos

Una vez verificado que todo funciona:

1. **Para Producción:**
   - Genera un nuevo AUTH_SECRET
   - Usa contraseñas fuertes (16+ caracteres)
   - Activa HTTPS (requerido para cookies seguras)
   - Configura variables de entorno en Vercel/hosting

2. **Implementar Fase 2:**
   - Panel de gestión de usuarios
   - Logs de actividad
   - Sistema de permisos granular

3. **Implementar Fase 3:**
   - 2FA con Google Authenticator
   - Recuperación de contraseña
   - Notificaciones de seguridad

---

## 📝 Notas Importantes

⚠️ **NUNCA commitear:**
- `.env.local`
- `AUTH_SECRET` real
- Contraseñas en texto plano

⚠️ **SIEMPRE:**
- Usa HTTPS en producción
- Cambia AUTH_SECRET entre entornos
- Haz backups de la tabla admin_users
- Revisa los logs de auditoría regularmente

---

**Documentación creada:** $(date)
**Versión:** 1.0.0 (FASE 1 COMPLETA)
