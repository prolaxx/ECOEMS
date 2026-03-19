import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { randomBytes } from 'crypto';

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return token === process.env.ADMIN_API_KEY;
}

function generateUserId(): string {
  return `user_${Date.now()}_${randomBytes(8).toString('hex')}`;
}

// GET /api/admin/users → all users with diagnostic status
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const client = await getMongoClient();
    const db = client.db();

    const users = await db
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'diagnostics',
            localField: 'id',
            foreignField: 'userId',
            as: 'diagnostics',
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            email: 1,
            role: 1,
            user_metadata: 1,
            createdAt: 1,
            lastLogin: 1,
            hasPassword: {
              $cond: [{ $gt: ['$passwordHash', null] }, true, false],
            },
            hasDiagnostic: { $gt: [{ $size: '$diagnostics' }, 0] },
            diagnosticScore: { $arrayElemAt: ['$diagnostics.results.percent', 0] },
            diagnosticGrade: { $arrayElemAt: ['$diagnostics.results.grade', 0] },
            diagnosticCompletedAt: {
              $arrayElemAt: ['$diagnostics.results.completedAt', 0],
            },
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST /api/admin/users → pre-register a new user
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, full_name } = body as { email: string; full_name?: string };

    if (!email) {
      return NextResponse.json({ error: 'El correo electrónico es requerido' }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
      return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db();
    const users = db.collection('users');

    const existing = await users.findOne({ email: emailLower });
    if (existing) {
      return NextResponse.json({ error: 'Este correo ya está registrado en el sistema' }, { status: 409 });
    }

    const userId = generateUserId();
    const newUser = {
      id: userId,
      email: emailLower,
      passwordHash: null,
      role: 'user',
      user_metadata: { full_name: full_name?.trim() || emailLower.split('@')[0] },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await users.insertOne(newUser);

    return NextResponse.json(
      {
        user: {
          id: userId,
          email: emailLower,
          user_metadata: newUser.user_metadata,
        },
        message: 'Usuario registrado exitosamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin users POST error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE /api/admin/users?userId= → remove a user and their diagnostics
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId es requerido' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db();

    await db.collection('users').deleteOne({ id: userId });
    await db.collection('diagnostics').deleteMany({ userId });

    return NextResponse.json({ message: 'Usuario y sus datos eliminados correctamente' });
  } catch (error) {
    console.error('Admin users DELETE error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
