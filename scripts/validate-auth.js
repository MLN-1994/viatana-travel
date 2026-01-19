#!/usr/bin/env node
/**
 * Script de validación de configuración de autenticación
 * Verifica que todos los componentes estén correctamente configurados
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando Configuración de Autenticación\n');

let allValid = true;
const checks = [];

// Check 1: Verificar middleware.ts
console.log('1️⃣  Verificando middleware.ts...');
const middlewarePath = path.join(process.cwd(), 'middleware.ts');
if (fs.existsSync(middlewarePath)) {
  const content = fs.readFileSync(middlewarePath, 'utf8');
  if (content.includes('auth()') && content.includes('/admin')) {
    console.log('   ✅ Middleware configurado correctamente\n');
    checks.push({ name: 'Middleware', status: true });
  } else {
    console.log('   ❌ Middleware existe pero configuración incompleta\n');
    checks.push({ name: 'Middleware', status: false });
    allValid = false;
  }
} else {
  console.log('   ❌ middleware.ts no encontrado\n');
  checks.push({ name: 'Middleware', status: false });
  allValid = false;
}

// Check 2: Verificar lib/auth.ts
console.log('2️⃣  Verificando lib/auth.ts...');
const authPath = path.join(process.cwd(), 'lib', 'auth.ts');
if (fs.existsSync(authPath)) {
  const content = fs.readFileSync(authPath, 'utf8');
  if (content.includes('bcrypt') && content.includes('supabaseAdmin')) {
    console.log('   ✅ Autenticación con Supabase y bcrypt configurada\n');
    checks.push({ name: 'Auth con Supabase', status: true });
  } else {
    console.log('   ⚠️  Auth existe pero falta integración con Supabase/bcrypt\n');
    checks.push({ name: 'Auth con Supabase', status: false });
    allValid = false;
  }
} else {
  console.log('   ❌ lib/auth.ts no encontrado\n');
  checks.push({ name: 'Auth con Supabase', status: false });
  allValid = false;
}

// Check 3: Verificar rate limiting en auth route
console.log('3️⃣  Verificando rate limiting...');
const authRoutePath = path.join(process.cwd(), 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
if (fs.existsSync(authRoutePath)) {
  const content = fs.readFileSync(authRoutePath, 'utf8');
  if (content.includes('rateLimit') && content.includes('429')) {
    console.log('   ✅ Rate limiting aplicado al login\n');
    checks.push({ name: 'Rate Limiting', status: true });
  } else {
    console.log('   ❌ Rate limiting no configurado\n');
    checks.push({ name: 'Rate Limiting', status: false });
    allValid = false;
  }
} else {
  console.log('   ❌ route.ts de auth no encontrado\n');
  checks.push({ name: 'Rate Limiting', status: false });
  allValid = false;
}

// Check 4: Verificar .env.local
console.log('4️⃣  Verificando .env.local...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  
  let envChecks = {
    AUTH_SECRET: false,
    SUPABASE_URL: false,
    SUPABASE_KEYS: false
  };
  
  if (content.includes('AUTH_SECRET=') && !content.includes('genera-un-secreto')) {
    const match = content.match(/AUTH_SECRET=(.+)/);
    if (match && match[1].trim().length > 40) {
      envChecks.AUTH_SECRET = true;
    }
  }
  
  if (content.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
    envChecks.SUPABASE_URL = true;
  }
  
  if (content.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && 
      content.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
    envChecks.SUPABASE_KEYS = true;
  }
  
  if (envChecks.AUTH_SECRET && envChecks.SUPABASE_URL && envChecks.SUPABASE_KEYS) {
    console.log('   ✅ Variables de entorno configuradas\n');
    checks.push({ name: 'Variables de entorno', status: true });
  } else {
    console.log('   ⚠️  Variables de entorno incompletas:');
    if (!envChecks.AUTH_SECRET) console.log('      - AUTH_SECRET no configurado o muy corto');
    if (!envChecks.SUPABASE_URL) console.log('      - NEXT_PUBLIC_SUPABASE_URL faltante');
    if (!envChecks.SUPABASE_KEYS) console.log('      - Claves de Supabase faltantes');
    console.log('');
    checks.push({ name: 'Variables de entorno', status: false });
    allValid = false;
  }
} else {
  console.log('   ❌ .env.local no encontrado\n');
  checks.push({ name: 'Variables de entorno', status: false });
  allValid = false;
}

// Check 5: Verificar archivos SQL
console.log('5️⃣  Verificando archivos SQL...');
const schemaPath = path.join(process.cwd(), 'supabase-admin-users-schema.sql');
const seedPath = path.join(process.cwd(), 'supabase-admin-users-seed.sql');

if (fs.existsSync(schemaPath) && fs.existsSync(seedPath)) {
  console.log('   ✅ Archivos SQL presentes\n');
  checks.push({ name: 'Archivos SQL', status: true });
} else {
  console.log('   ❌ Archivos SQL faltantes\n');
  checks.push({ name: 'Archivos SQL', status: false });
  allValid = false;
}

// Check 6: Verificar dependencias
console.log('6️⃣  Verificando dependencias...');
try {
  require('bcryptjs');
  require('next-auth');
  require('@supabase/supabase-js');
  console.log('   ✅ Todas las dependencias instaladas\n');
  checks.push({ name: 'Dependencias NPM', status: true });
} catch (e) {
  console.log('   ❌ Faltan dependencias. Ejecuta: npm install\n');
  checks.push({ name: 'Dependencias NPM', status: false });
  allValid = false;
}

// Check 7: Verificar tipos
console.log('7️⃣  Verificando tipos TypeScript...');
const typesPath = path.join(process.cwd(), 'types', 'index.ts');
if (fs.existsSync(typesPath)) {
  const content = fs.readFileSync(typesPath, 'utf8');
  if (content.includes('declare module "next-auth"') && content.includes('role')) {
    console.log('   ✅ Tipos de NextAuth extendidos correctamente\n');
    checks.push({ name: 'Tipos TypeScript', status: true });
  } else {
    console.log('   ⚠️  Tipos existen pero extensiones de NextAuth incompletas\n');
    checks.push({ name: 'Tipos TypeScript', status: false });
    allValid = false;
  }
} else {
  console.log('   ❌ types/index.ts no encontrado\n');
  checks.push({ name: 'Tipos TypeScript', status: false });
  allValid = false;
}

// Resumen
console.log('='.repeat(70));
console.log('\n📊 RESUMEN DE VALIDACIÓN\n');

checks.forEach((check, index) => {
  const icon = check.status ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
});

console.log('\n' + '='.repeat(70));

if (allValid) {
  console.log('\n🎉 ¡VALIDACIÓN EXITOSA!\n');
  console.log('✅ Todos los componentes están correctamente configurados.\n');
  console.log('📋 PRÓXIMOS PASOS:');
  console.log('   1. Ejecuta los SQL en Supabase');
  console.log('   2. Reinicia el servidor: npm run dev');
  console.log('   3. Accede a: http://localhost:3000/admin/login');
  console.log('   4. Prueba las credenciales de CREDENTIALS_TEMP.md\n');
} else {
  console.log('\n⚠️  VALIDACIÓN INCOMPLETA\n');
  console.log('Algunos componentes necesitan atención.');
  console.log('Revisa los errores arriba y consulta: AUTENTICACION_SETUP.md\n');
  console.log('Para arreglar automáticamente algunos problemas, ejecuta:');
  console.log('   node scripts/setup-auth.js\n');
}

console.log('='.repeat(70) + '\n');

process.exit(allValid ? 0 : 1);
