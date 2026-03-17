import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

// GET /api/auth/check?email=xxx
// Returns whether the user exists and if they have a password set
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase().trim();

  if (!email) {
    return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
  }

  // Admin never needs "create password" flow
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (adminEmail && email === adminEmail) {
    return NextResponse.json({ exists: true, hasPassword: true, isAdmin: true });
  }

  try {
    const client = await getMongoClient();
    const db = client.db();
    const user = await db.collection('users').findOne(
      { email },
      { projection: { passwordHash: 1, user_metadata: 1 } }
    );

    if (!user) {
      return NextResponse.json({ exists: false, hasPassword: false });
    }

    return NextResponse.json({
      exists: true,
      hasPassword: !!user.passwordHash,
      name: user.user_metadata?.full_name || null,
    });
  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
