-- Script para insertar usuarios iniciales con contraseñas hasheadas
-- IMPORTANTE: Ejecutar este script DESPUÉS de ejecutar supabase-admin-users-schema.sql

-- Usuario administrador principal
-- Email: admin@viatana.com
-- Username: admin
-- Password: Admin2026!Secure
INSERT INTO admin_users (email, username, password_hash, role, is_active)
VALUES (
  'admin@viatana.com',
  'admin',
  '$2b$10$cw.NYlz522awJpJIm0qTMe7XieU2WtnilX4UxHVJqUv5xRgfeuDEu',
  'admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  updated_at = TIMEZONE('utc', NOW());

-- Usuario Viatana
-- Email: info@viatana.com
-- Username: viatana
-- Password: Viatana2026!Secure
INSERT INTO admin_users (email, username, password_hash, role, is_active)
VALUES (
  'info@viatana.com',
  'viatana',
  '$2b$10$5fWxYIlLm/0RqRouXiWSTuqap6s6rfQhfOD7Iy47gCpOxaJDJeqF2',
  'admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  updated_at = TIMEZONE('utc', NOW());

-- NOTAS IMPORTANTES:
-- ⚠️ CAMBIA ESTAS CONTRASEÑAS INMEDIATAMENTE después de tu primer login
-- ⚠️ Las contraseñas mostradas aquí son temporales y deben cambiarse
-- 
-- Para cambiar la contraseña de un usuario:
-- 1. Edita el archivo scripts/hash-passwords.js con la nueva contraseña
-- 2. Ejecuta: node scripts/hash-passwords.js
-- 3. Copia el hash generado y ejecuta:
--    UPDATE admin_users 
--    SET password_hash = 'NUEVO_HASH_GENERADO'
--    WHERE email = 'usuario@ejemplo.com';
