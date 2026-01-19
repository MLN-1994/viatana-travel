/**
 * Script para generar un AUTH_SECRET seguro
 * Uso: node scripts/generate-auth-secret.js
 */

const crypto = require('crypto');

function generateAuthSecret() {
  // Generar 64 bytes aleatorios y convertir a base64
  const secret = crypto.randomBytes(64).toString('base64');
  
  console.log('🔐 AUTH_SECRET generado con éxito!\n');
  console.log('Copia esta línea a tu archivo .env.local:\n');
  console.log(`AUTH_SECRET=${secret}`);
  console.log('\n⚠️  IMPORTANTE:');
  console.log('- NO compartas este secreto con nadie');
  console.log('- Usa un secreto diferente para cada entorno (desarrollo, staging, producción)');
  console.log('- Guárdalo de forma segura (variables de entorno del servidor)');
  console.log('- Si lo cambias, todos los usuarios deberán volver a iniciar sesión\n');
}

generateAuthSecret();
