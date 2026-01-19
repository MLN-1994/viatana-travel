#!/usr/bin/env node
/**
 * Script para ayudar con la configuración de Supabase
 * Muestra instrucciones paso a paso
 */

const fs = require('fs');
const path = require('path');

console.log('═'.repeat(70));
console.log('🗄️  CONFIGURACIÓN DE SUPABASE - GUÍA PASO A PASO');
console.log('═'.repeat(70));
console.log('');

// Leer archivos SQL
const schemaPath = path.join(process.cwd(), 'supabase-admin-users-schema.sql');
const seedPath = path.join(process.cwd(), 'supabase-admin-users-seed.sql');

if (!fs.existsSync(schemaPath) || !fs.existsSync(seedPath)) {
  console.log('❌ Error: Archivos SQL no encontrados.');
  console.log('   Asegúrate de estar en el directorio raíz del proyecto.\n');
  process.exit(1);
}

console.log('📋 INSTRUCCIONES:\n');
console.log('1️⃣  Abre tu navegador y ve a:');
console.log('   👉 https://supabase.com/dashboard\n');

console.log('2️⃣  Selecciona el proyecto: viatana-travel\n');

console.log('3️⃣  En el menú lateral, haz clic en:');
console.log('   📊 SQL Editor\n');

console.log('4️⃣  Haz clic en "New query" (botón azul superior derecho)\n');

console.log('─'.repeat(70));
console.log('\n🔷 PASO 1: Crear las Tablas\n');
console.log('Copia y pega este contenido en el SQL Editor:\n');
console.log('📁 Archivo: supabase-admin-users-schema.sql');
console.log('📍 Ubicación:', schemaPath);
console.log('\nPresiona Enter para ver el contenido...');

// Esperar input (simulado, en realidad mostramos directamente)
console.log('\n' + '─'.repeat(70));
console.log('CONTENIDO DEL SCHEMA:');
console.log('─'.repeat(70) + '\n');

const schemaContent = fs.readFileSync(schemaPath, 'utf8');
console.log(schemaContent);

console.log('\n' + '─'.repeat(70));
console.log('\n✅ Después de copiar y pegar:');
console.log('   1. Haz clic en "Run" (botón verde) o presiona Ctrl+Enter');
console.log('   2. Verifica que dice "Success. No rows returned"\n');

console.log('─'.repeat(70));
console.log('\n🔷 PASO 2: Insertar Usuarios Iniciales\n');
console.log('Ahora copia y pega este contenido:\n');
console.log('📁 Archivo: supabase-admin-users-seed.sql');
console.log('📍 Ubicación:', seedPath);
console.log('\n' + '─'.repeat(70));
console.log('CONTENIDO DEL SEED:');
console.log('─'.repeat(70) + '\n');

const seedContent = fs.readFileSync(seedPath, 'utf8');
console.log(seedContent);

console.log('\n' + '─'.repeat(70));
console.log('\n✅ Después de copiar y pegar:');
console.log('   1. Haz clic en "Run"');
console.log('   2. Debe decir "Success. X rows affected"\n');

console.log('─'.repeat(70));
console.log('\n🔍 PASO 3: Verificar que Todo se Creó\n');
console.log('Ejecuta esta consulta para verificar:\n');
console.log('─'.repeat(70));
console.log(`
SELECT 
  id, 
  email, 
  username, 
  role, 
  is_active, 
  created_at
FROM admin_users
ORDER BY created_at DESC;
`);
console.log('─'.repeat(70));
console.log('\n✅ Debes ver 2 usuarios:');
console.log('   - admin@viatana.com (username: admin)');
console.log('   - info@viatana.com (username: viatana)\n');

console.log('═'.repeat(70));
console.log('🎉 CONFIGURACIÓN DE SUPABASE COMPLETADA');
console.log('═'.repeat(70));
console.log('\n📋 PRÓXIMOS PASOS:\n');
console.log('1. Reinicia tu servidor de desarrollo:');
console.log('   npm run dev\n');
console.log('2. Accede al panel de admin:');
console.log('   http://localhost:3000/admin\n');
console.log('3. Usa las credenciales de CREDENTIALS_TEMP.md para login\n');
console.log('═'.repeat(70) + '\n');
