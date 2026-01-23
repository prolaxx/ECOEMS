import { NextRequest, NextResponse } from 'next/server';
import { scoreExam } from '@/server/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { attemptId, answers, questionNumbers, totalTimeSec, mode, examVersion } = body;
    
    if (!attemptId || !answers || !questionNumbers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const results = scoreExam({
      attemptId,
      answers,
      questionNumbers,
      totalTimeSec: totalTimeSec || 0,
      mode: mode || 'simulador_realista',
      examVersion: examVersion // Pass exam version for randomized exams
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error scoring exam:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
