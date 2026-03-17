import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':');
    const derivedHash = scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedHash, 'hex'));
  } catch {
    return false;
  }
}

function generateUserId(): string {
  return `user_${Date.now()}_${randomBytes(8).toString('hex')}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Correo y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Formato de correo inválido' },
        { status: 400 }
      );
    }

    // Admin authentication via environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminApiKey = process.env.ADMIN_API_KEY;

    if (adminEmail && email.toLowerCase() === adminEmail.toLowerCase()) {
      if (!adminPassword || password !== adminPassword) {
        return NextResponse.json(
          { error: 'Credenciales inválidas' },
          { status: 401 }
        );
      }
      return NextResponse.json({
        session: {
          user: {
            id: 'admin',
            email: adminEmail,
            role: 'admin',
            user_metadata: { full_name: 'Administrador' },
          },
          access_token: adminApiKey || randomBytes(32).toString('hex'),
        },
        message: 'Bienvenido, Administrador',
      });
    }

    // Regular user authentication
    const client = await getMongoClient();
    const db = client.db();
    const users = db.collection('users');

    let user = await users.findOne({ email });

    if (!user) {
      // Create new user with hashed password
      const userId = generateUserId();
      const newUser = {
        id: userId,
        email,
        passwordHash: hashPassword(password),
        role: 'user',
        user_metadata: { full_name: email.split('@')[0] },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await users.insertOne(newUser);
      user = newUser as any;
    } else {
      // Verify or set password
      if (!user.passwordHash) {
        // Legacy user without password — set it now
        await users.updateOne(
          { email },
          { $set: { passwordHash: hashPassword(password), lastLogin: new Date() } }
        );
      } else if (!verifyPassword(password, user.passwordHash as string)) {
        return NextResponse.json(
          { error: 'Credenciales inválidas' },
          { status: 401 }
        );
      } else {
        await users.updateOne({ email }, { $set: { lastLogin: new Date() } });
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Error al procesar el usuario' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      session: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role || 'user',
          user_metadata: user.user_metadata,
        },
        access_token: randomBytes(32).toString('hex'),
      },
      message: 'Bienvenido',
    });
  } catch (error) {
    console.error('Auth error:', error);
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }
    return NextResponse.json(
      { error: 'Error interno del servidor. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
