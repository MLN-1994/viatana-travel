# 🗄️ Schemas de Base de Datos - Viatana Travel

Este directorio contiene los scripts SQL para crear y mantener la estructura de base de datos en Supabase.

---

## 📋 Archivos Disponibles

### Autenticación:
- `supabase-admin-users-schema.sql` - Tabla de usuarios administradores
- `supabase-admin-users-seed.sql` - Usuarios iniciales con contraseñas

### Sistema Principal:
- `supabase-packages-schema.sql` - Tabla de paquetes turísticos
- `supabase-categories-schema.sql` - Tabla de categorías (con 8 categorías pre-insertadas)
- `supabase-banners-schema.sql` - Tabla de banners del carousel
- `supabase-contact-messages-schema.sql` - Tabla de mensajes de contacto

---

## 🚀 Orden de Ejecución

Si necesitas recrear toda la base de datos desde cero, ejecuta los scripts en este orden:

```bash
1. supabase-admin-users-schema.sql
2. supabase-admin-users-seed.sql
3. supabase-categories-schema.sql
4. supabase-packages-schema.sql
5. supabase-banners-schema.sql
6. supabase-contact-messages-schema.sql
```

---

## 📝 Cómo Ejecutar

### **Opción 1: Supabase Dashboard (Recomendado)**

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Click en **SQL Editor** (menú lateral)
4. Click en **New query**
5. Copia y pega el contenido de cada archivo `.sql`
6. Click en **Run** o presiona `Ctrl+Enter`

### **Opción 2: psql (Terminal)**

```bash
psql -h db.PROJECT_REF.supabase.co -p 5432 -d postgres -U postgres -f archivo.sql
```

---

## ⚠️ Notas Importantes

### **CREATE TABLE IF NOT EXISTS**
Todos los scripts usan `IF NOT EXISTS`, por lo que:
- ✅ **Seguro ejecutar múltiples veces**
- ✅ No sobrescribe tablas existentes
- ✅ Solo crea lo que falta

### **ON CONFLICT DO NOTHING**
Los inserts de datos usan esta cláusula:
- ✅ No duplica datos si ya existen
- ✅ Seguro para re-ejecutar

### **Datos de Ejemplo**
Algunos schemas incluyen datos de ejemplo:
- `categories` → 8 categorías básicas
- `banners` → 3 banners de muestra
- `admin_users` (seed) → 2 usuarios admin

---

## 🔍 Verificación

Después de ejecutar los scripts, verifica que todo se creó correctamente:

```sql
-- Ver todas las tablas
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Verificar estructura de una tabla
\d packages

-- Contar registros
SELECT 
  (SELECT COUNT(*) FROM admin_users) as usuarios,
  (SELECT COUNT(*) FROM categories) as categorias,
  (SELECT COUNT(*) FROM packages) as paquetes,
  (SELECT COUNT(*) FROM banners) as banners;
```

---

## 🔧 Troubleshooting

### Error: "relation already exists"
- **Causa:** La tabla ya existe
- **Solución:** Es normal, el script usa `IF NOT EXISTS`

### Error: "function does not exist"
- **Causa:** Falta ejecutar el schema completo
- **Solución:** Ejecuta el archivo completo, no solo fragmentos

### Error: "permission denied"
- **Causa:** No tienes permisos suficientes
- **Solución:** Usa el service role key de Supabase

---

## 📊 Estructura de Tablas

### `admin_users`
- Usuarios administradores con autenticación bcrypt
- RLS habilitado
- Tracking de intentos de login
- Bloqueo automático tras 5 intentos fallidos

### `categories`
- Categorías para clasificar paquetes
- Slug único para URLs amigables
- Display order para ordenamiento personalizado

### `packages`
- Paquetes turísticos principales
- Soporte para ofertas con descuentos
- Campo JSONB para servicios incluidos
- Índices optimizados para búsquedas

### `banners`
- Banners del carousel principal
- Activación/desactivación individual
- Ordenamiento configurable

### `contact_messages`
- Mensajes del formulario de contacto
- Estados: pending, read, replied, archived
- Tracking de IP y user agent

---

## 🔄 Migraciones Futuras

Si necesitas modificar la estructura:

1. **Nunca modifiques los archivos originales**
2. Crea un nuevo archivo: `YYYYMMDD_descripcion.sql`
3. Usa `ALTER TABLE` en lugar de `CREATE TABLE`
4. Documenta el cambio en este README

Ejemplo:
```sql
-- 20260120_add_featured_to_packages.sql
ALTER TABLE packages ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(featured) WHERE featured = true;
```

---

## 📚 Documentación Adicional

- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Última actualización:** 19 de enero de 2026  
**Versión:** 1.0.0
