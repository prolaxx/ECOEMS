import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { Attempt, ExamResults } from '@/types/exam';

type DiagnosticPayload = {
  userId: string;
  attempt?: Attempt;
  results: ExamResults;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const mode = searchParams.get('mode') || 'simulador_realista';

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const diagnostics = db.collection('diagnostics');

    const record = await diagnostics.findOne(
      { userId, mode },
      { projection: { _id: 0 } }
    );

    if (!record) {
      return NextResponse.json({ results: null }, { status: 200 });
    }

    // Cast the record to any to access results property safely
    const results = (record as any).results;

    return NextResponse.json({ results: results || null });
  } catch (error) {
    console.error('Error fetching diagnostic:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DiagnosticPayload;
    const { userId, attempt, results } = body;

    if (!userId || !results) {
      return NextResponse.json(
        { error: 'userId and results are required' },
        { status: 400 }
      );
    }

    const mode = attempt?.mode || 'simulador_realista';
    const createdAt = attempt?.createdAt ? new Date(attempt.createdAt) : new Date();

    const payload = {
      userId,
      mode,
      attemptId: results.attemptId,
      attempt: attempt || null,
      results,
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();
    const diagnostics = db.collection('diagnostics');

    await diagnostics.updateOne(
      { userId, mode },
      {
        $set: payload,
        $setOnInsert: { createdAt },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error saving diagnostic:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
