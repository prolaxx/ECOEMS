import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { randomBytes } from 'crypto';

// One-time seed endpoint — protected by ADMIN_API_KEY
// Only creates users that don't already exist

const SEED_USERS = [
  { email: 'randallsolorzanor@gmail.com', full_name: 'Randall Solorzano Razo' },
  { email: 'palomosanti0@gmail.com',      full_name: 'Santiago Lara Palomo' },
  { email: 'nahomid304@gmail.com',        full_name: 'Sharon Nahomi Espino Díaz' },
  { email: 'nallelypg3012@gmail.com',     full_name: 'Yamile Taylete Zamora Perez' },
];

function generateUserId(): string {
  return `user_${Date.now()}_${randomBytes(8).toString('hex')}`;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (!token || token !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const client = await getMongoClient();
    const db = client.db();
    const users = db.collection('users');

    const results: { email: string; status: 'created' | 'exists' }[] = [];

    for (const userData of SEED_USERS) {
      const existing = await users.findOne({ email: userData.email });
      if (existing) {
        results.push({ email: userData.email, status: 'exists' });
        continue;
      }

      await users.insertOne({
        id: generateUserId(),
        email: userData.email,
        role: 'user',
        user_metadata: { full_name: userData.full_name },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      results.push({ email: userData.email, status: 'created' });
    }

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
