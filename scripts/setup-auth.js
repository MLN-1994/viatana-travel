#!/usr/bin/env node
/**
 * Script de configuración rápida de autenticación
 * Ejecuta los pasos básicos de configuración
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configuración Rápida de Autenticación Segura\n');

// Paso 1: Verificar que bcryptjs está instalado
console.log('✅ Verificando dependencias...');
try {
  require('bcryptjs');
  console.log('   bcryptjs: Instalado\n');
} catch (e) {
  console.log('   ❌ bcryptjs no encontrado. Instalando...');
  execSync('npm install bcryptjs', { stdio: 'inherit' });
  console.log('   ✅ bcryptjs instalado\n');
}

// Paso 2: Verificar archivo .env.local
console.log('📝 Verificando configuración...');
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('   ❌ No existe .env.local');
  console.log('   Cópialo desde .env.example\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('AUTH_SECRET=') || envContent.includes('genera-un-secreto')) {
  console.log('   ⚠️  AUTH_SECRET no configurado correctamente');
  console.log('   Ejecutando generador de secreto...\n');
  execSync('node scripts/generate-auth-secret.js', { stdio: 'inherit' });
  console.log('\n   ⚠️  Copia el AUTH_SECRET generado a tu .env.local\n');
} else {
  console.log('   ✅ AUTH_SECRET configurado\n');
}

// Paso 3: Generar hashes de contraseñas
console.log('🔐 Generando hashes de contraseñas...\n');
execSync('node scripts/hash-passwords.js', { stdio: 'inherit' });

// Paso 4: Instrucciones finales
console.log('\n' + '='.repeat(80));
console.log('\n✅ CONFIGURACIÓN COMPLETADA\n');
console.log('📋 PRÓXIMOS PASOS:\n');
console.log('1. Accede a Supabase: https://supabase.com/dashboard');
console.log('2. Abre SQL Editor');
console.log('3. Ejecuta el archivo: supabase-admin-users-schema.sql');
console.log('4. Ejecuta el archivo: supabase-admin-users-seed.sql');
console.log('5. Reinicia tu servidor: npm run dev');
console.log('6. Accede a: http://localhost:3000/admin/login\n');
console.log('📖 Documentación completa: AUTENTICACION_SETUP.md\n');
console.log('🔑 Credenciales temporales: CREDENTIALS_TEMP.md\n');
console.log('='.repeat(80) + '\n');
