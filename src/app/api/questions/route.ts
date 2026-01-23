import { NextRequest, NextResponse } from 'next/server';
import { 
  getClientQuestions, 
  getClientQuestionsBySection,
  getDiagnosticQuestions,
  getPracticeQuestions,
  getSectionStats,
  getExamVersion,
  getClientExamByVersion,
  EXAM_VERSIONS
} from '@/data/questions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'full';
  const section = searchParams.get('section');
  const count = parseInt(searchParams.get('count') || '128', 10);
  const versionParam = searchParams.get('version');

  try {
    let questions;
    let version: number | undefined;

    switch (mode) {
      case 'full':
        // Full exam without randomization
        questions = getClientQuestions();
        break;
        
      case 'diagnostic':
      case 'simulador':
        // Get a randomized version of the exam
        // If version is specified, use that; otherwise, generate a random version
        version = versionParam ? parseInt(versionParam, 10) : getExamVersion();
        
        // Validate version is between 1-4
        if (version < 1 || version > 4) {
          version = getExamVersion();
        }
        
        const examData = getClientExamByVersion(version);
        questions = examData.questions;
        
        return NextResponse.json({ 
          questions,
          version: examData.version,
          totalVersions: EXAM_VERSIONS.total
        });
        
      case 'practice':
        if (!section) {
          return NextResponse.json(
            { error: 'Section required for practice mode' },
            { status: 400 }
          );
        }
        questions = getPracticeQuestions(section, count).map(({ correctChoice, ...rest }) => rest);
        break;
        
      case 'section':
        if (!section) {
          return NextResponse.json(
            { error: 'Section parameter required' },
            { status: 400 }
          );
        }
        questions = getClientQuestionsBySection(section);
        break;
        
      case 'stats':
        const stats = getSectionStats();
        return NextResponse.json({ 
          sections: stats,
          totalQuestions: stats.reduce((acc, s) => acc + s.count, 0),
          examVersions: EXAM_VERSIONS.total
        });
        
      default:
        questions = getClientQuestions();
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
