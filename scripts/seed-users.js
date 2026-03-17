/**
 * Seed script: registers exam users via the running Next.js server.
 * Requires the server to be running on localhost:3000
 *
 * Usage:  node scripts/seed-users.js
 */

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

if (!ADMIN_API_KEY) {
  console.error('❌  Missing ADMIN_API_KEY in .env.local');
  process.exit(1);
}

async function seedUsers() {
  console.log(`\n🌐  Llamando al servidor en ${SERVER_URL}/api/seed ...`);

  try {
    const response = await fetch(`${SERVER_URL}/api/seed`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ADMIN_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`❌  Error ${response.status}:`, data.error || JSON.stringify(data));
      process.exitCode = 1;
      return;
    }

    console.log('\n✅  Registro completado:\n');

    let created = 0;
    let skipped = 0;

    for (const r of data.results || []) {
      if (r.status === 'created') {
        console.log(`   ✅  Creado:   ${r.email}`);
        created++;
      } else {
        console.log(`   ⚠️   Ya existe: ${r.email}`);
        skipped++;
      }
    }

    console.log(`\n──────────────────────────────────────────`);
    console.log(`📊  Creados:  ${created}  |  Ya existían: ${skipped}`);
    console.log(`──────────────────────────────────────────`);
    console.log('\n💡  Los usuarios sin contraseña podrán establecerla');
    console.log('    la primera vez que inicien sesión.\n');

  } catch (err) {
    console.error('\n❌  No se pudo conectar al servidor.');
    console.error('    Asegúrate de que el servidor esté corriendo en', SERVER_URL);
    console.error('    Error:', err.message, '\n');
    process.exitCode = 1;
  }
}

seedUsers();
