# 📜 Scripts de Utilidad - Autenticación

Esta carpeta contiene scripts útiles para configurar y gestionar el sistema de autenticación.

## 🚀 Scripts Disponibles

### 1. `setup-auth.js`
**Propósito:** Configuración automática completa del sistema de autenticación

**Uso:**
```bash
node scripts/setup-auth.js
```

**Lo que hace:**
- ✅ Verifica dependencias
- ✅ Valida configuración de .env.local
- ✅ Genera AUTH_SECRET si es necesario
- ✅ Genera hashes de contraseñas
- ✅ Muestra instrucciones para Supabase

---

### 2. `validate-auth.js`
**Propósito:** Validar que todos los componentes de autenticación estén correctamente configurados

**Uso:**
```bash
node scripts/validate-auth.js
```

**Lo que valida:**
- ✅ Middleware existe y está configurado
- ✅ Auth con Supabase y bcrypt
- ✅ Rate limiting aplicado
- ✅ Variables de entorno completas
- ✅ Archivos SQL presentes
- ✅ Dependencias instaladas
- ✅ Tipos TypeScript extendidos

**Códigos de salida:**
- `0` = Todo OK
- `1` = Algunos componentes necesitan atención

---

### 3. `generate-auth-secret.js`
**Propósito:** Generar un AUTH_SECRET criptográficamente seguro

**Uso:**
```bash
node scripts/generate-auth-secret.js
```

**Output:**
```
🔐 AUTH_SECRET generado con éxito!

Copia esta línea a tu archivo .env.local:

AUTH_SECRET=UCWtV5wKOAnYC0eUeXsj7QavWAG8ICXpL0p2VcTM+m1X+plds5Y4FXVaiB8KPq4qWt4r6aQ4rcgqmXd3M19rKw==
```

**Características:**
- 64 bytes (512 bits) de entropía
- Base64 encoded
- Compatible con NextAuth v5

---

### 4. `hash-passwords.js`
**Propósito:** Generar hashes bcrypt de contraseñas para usuarios administradores

**Uso:**
```bash
node scripts/hash-passwords.js
```

**Antes de ejecutar:**
1. Edita el archivo `hash-passwords.js`
2. Modifica las contraseñas en el array `users`
3. Guarda el archivo
4. Ejecuta el script

**Output:**
- Muestra el hash generado para cada usuario
- Proporciona SQL listo para ejecutar en Supabase

**Configuración de bcrypt:**
- Salt rounds: 10 (balance óptimo seguridad/rendimiento)
- Algoritmo: bcrypt 2a/2b

---

### 5. `setup-supabase.js`
**Propósito:** Guía interactiva para configurar Supabase

**Uso:**
```bash
node scripts/setup-supabase.js
```

**Lo que hace:**
- 📋 Muestra instrucciones paso a paso
- 📄 Imprime el contenido de los archivos SQL
- ✅ Proporciona queries de verificación
- 🔗 Links directos a Supabase Dashboard

---

## 🔄 Flujo de Trabajo Recomendado

### Primera Vez (Setup Inicial)

1. **Setup completo:**
   ```bash
   node scripts/setup-auth.js
   ```

2. **Configurar Supabase:**
   ```bash
   node scripts/setup-supabase.js
   ```
   Sigue las instrucciones en pantalla

3. **Validar todo:**
   ```bash
   node scripts/validate-auth.js
   ```

4. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

### Cambiar Contraseñas

1. **Editar:** `scripts/hash-passwords.js`
2. **Ejecutar:**
   ```bash
   node scripts/hash-passwords.js
   ```
3. **Copiar** el SQL generado
4. **Ejecutar** en Supabase SQL Editor

### Generar Nuevo Secret (Producción)

1. **Generar:**
   ```bash
   node scripts/generate-auth-secret.js
   ```
2. **Copiar** el resultado
3. **Actualizar** en las variables de entorno de producción

---

## 📚 Documentación Relacionada

- `../AUTENTICACION_SETUP.md` - Guía completa de implementación
- `../CREDENTIALS_TEMP.md` - Credenciales de desarrollo
- `../AUTH_CHECKLIST.md` - Lista de verificación
- `../FASE1_COMPLETA.md` - Resumen de completación

---

## 🛠️ Troubleshooting

### Error: "Cannot find module 'bcryptjs'"
```bash
npm install
```

### Error: "AUTH_SECRET not defined"
```bash
node scripts/generate-auth-secret.js
# Copiar resultado a .env.local
```

### Error al ejecutar scripts
```bash
# Asegúrate de estar en el directorio raíz
cd c:/Users/Raul/viatana-travel

# Ejecuta desde la raíz
node scripts/nombre-del-script.js
```

---

## ⚙️ Requisitos

- Node.js 18+
- npm/yarn
- Dependencias del proyecto instaladas (`npm install`)

---

## 🔐 Seguridad

⚠️ **IMPORTANTE:**
- Nunca commitees contraseñas en texto plano
- Los hashes de `hash-passwords.js` son seguros para commitear
- Genera AUTH_SECRET diferentes para dev/staging/prod
- No compartas CREDENTIALS_TEMP.md

---

## 📝 Contribuir

Si creas un nuevo script útil:
1. Agrégalo a esta carpeta
2. Documéntalo aquí
3. Sigue las convenciones de código existentes
4. Incluye mensajes claros y emojis para UX

---

**Última Actualización:** ${new Date().toLocaleDateString('es-ES')}
