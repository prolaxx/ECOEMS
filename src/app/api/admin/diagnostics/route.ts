import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return token === process.env.ADMIN_API_KEY;
}

// GET /api/admin/diagnostics          → all diagnostics
// GET /api/admin/diagnostics?userId=  → single user's diagnostic
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const client = await getMongoClient();
    const db = client.db();
    const diagnostics = db.collection('diagnostics');
    const users = db.collection('users');

    if (userId) {
      // Single user
      const record = await diagnostics.findOne({ userId }, { projection: { _id: 0 } });
      if (!record) {
        return NextResponse.json({ diagnostic: null }, { status: 200 });
      }
      const user = await users.findOne({ id: userId }, { projection: { _id: 0, passwordHash: 0 } });
      return NextResponse.json({ diagnostic: { ...record, user: user || null } });
    }

    // All diagnostics joined with user info
    const allDiagnostics = await diagnostics
      .aggregate([
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'id',
            as: 'userInfo',
          },
        },
        { $unwind: { path: '$userInfo', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            userId: 1,
            mode: 1,
            attemptId: 1,
            updatedAt: 1,
            createdAt: 1,
            'results.score': 1,
            'results.totalQuestions': 1,
            'results.correct': 1,
            'results.percent': 1,
            'results.grade': 1,
            'results.message': 1,
            'results.completedAt': 1,
            'results.totalTimeSec': 1,
            'userInfo.email': 1,
            'userInfo.user_metadata': 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({ diagnostics: allDiagnostics });
  } catch (error) {
    console.error('Admin diagnostics error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
