/**
 * Script para generar hashes de contraseñas con bcrypt
 * Uso: node scripts/hash-passwords.js
 */

const bcrypt = require('bcryptjs');

// Configuración
const SALT_ROUNDS = 10;

// Usuarios a hashear
const users = [
  {
    email: 'admin@viatana.com',
    username: 'admin',
    password: 'Admin2026!Secure', // Cambiar esta contraseña
    role: 'admin'
  },
  {
    email: 'info@viatana.com',
    username: 'viatana',
    password: 'Viatana2026!Secure', // Cambiar esta contraseña
    role: 'admin'
  }
];

async function hashPasswords() {
  console.log('🔐 Generando hashes de contraseñas...\n');
  
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    
    console.log(`Usuario: ${user.username} (${user.email})`);
    console.log(`Password: ${user.password}`);
    console.log(`Hash: ${hash}`);
    console.log('\n--- SQL para insertar ---');
    console.log(`INSERT INTO admin_users (email, username, password_hash, role, is_active)
VALUES (
  '${user.email}',
  '${user.username}',
  '${hash}',
  '${user.role}',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  updated_at = TIMEZONE('utc', NOW());
`);
    console.log('\n' + '='.repeat(80) + '\n');
  }
}

// Ejecutar
hashPasswords().catch(console.error);
