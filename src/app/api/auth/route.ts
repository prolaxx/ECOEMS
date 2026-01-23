import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { randomBytes } from 'crypto';

type SignInPayload = {
  email: string;
  password?: string;
};

// Generate a unique user ID
function generateUserId(): string {
  return `user_${Date.now()}_${randomBytes(8).toString('hex')}`;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Simple password-less auth or basic password check
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignInPayload;
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db();
    const users = db.collection('users');

    // Find or create user
    let user = await users.findOne({ email });

    if (!user) {
      // Create new user
      const userId = generateUserId();
      const newUser = {
        id: userId,
        email,
        user_metadata: {
          full_name: email.split('@')[0]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await users.insertOne(newUser);
      // We can safely use newUser here as the user object for the session
      // casting to any to avoid TS mismatch with WithId<Document> from findOne
      user = newUser as any;
    } else {
      // Update last login
      await users.updateOne(
        { email },
        { $set: { lastLogin: new Date() } }
      );
    }

    // Generate simple session token
    const sessionToken = randomBytes(32).toString('hex');

    // Store session (optional - for now just return it)
    if (!user) {
      return NextResponse.json(
        { error: 'User processing failed' },
        { status: 500 }
      );
    }

    const session = {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
      },
      access_token: sessionToken,
    };

    return NextResponse.json({ 
      session,
      message: user ? 'Welcome back!' : 'Account created successfully!' 
    });
  } catch (error) {
    console.error('Error in auth:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
