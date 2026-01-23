import type {
  ChoiceLetter,
  QuestionAnswer,
  ExamResults,
  SectionResult,
  SubtopicResult,
  PriorityItem,
  MistakeDetail,
  WeekPlan,
  TrafficLight
} from '@/types/exam';
import { 
  allQuestions, 
  getCorrectAnswersMap, 
  getQuestionByNumber,
  getCorrectAnswersMapByVersion,
  getExamByVersion
} from '@/data/questions';
import { SECTION_WEIGHTS } from '@/lib/constants';
import {
  getTrafficLightColor,
  getGradeMessage,
  calculatePriorityScore,
  calculateExpectedGain
} from '@/lib/utils';

interface ScoreInput {
  attemptId: string;
  answers: Record<number, QuestionAnswer>;
  questionNumbers: number[];
  totalTimeSec: number;
  mode: string;
  examVersion?: number; // New: version of the exam for randomized exams
}

export function scoreExam(input: ScoreInput): ExamResults {
  const { attemptId, answers, questionNumbers, totalTimeSec, mode, examVersion } = input;
  
  // Get correct answers based on version
  let correctAnswers: Record<number, string>;
  let questions: typeof allQuestions;
  
  if (examVersion && examVersion >= 1 && examVersion <= 4) {
    // Use version-specific answers (for randomized exams)
    correctAnswers = getCorrectAnswersMapByVersion(examVersion);
    questions = getExamByVersion(examVersion);
  } else {
    // Use standard answers
    correctAnswers = getCorrectAnswersMap();
    questions = [...allQuestions];
  }
  
  // Create a map for quick question lookup
  const questionMap = new Map(questions.map(q => [q.number, q]));
  
  // Calculate basic score
  let totalCorrect = 0;
  const mistakes: MistakeDetail[] = [];
  
  questionNumbers.forEach(qNum => {
    const userAnswer = answers[qNum]?.choice;
    const correctAnswer = correctAnswers[qNum] as ChoiceLetter;
    const question = questionMap.get(qNum);
    
    if (userAnswer === correctAnswer) {
      totalCorrect++;
    } else {
      if (question) {
        mistakes.push({
          questionNumber: qNum,
          stem: question.stem.substring(0, 100) + (question.stem.length > 100 ? '...' : ''),
          chosen: userAnswer,
          correct: correctAnswer,
          explanation: question.explanation || 'Sin explicación disponible.',
          topic: question.topic,
          subtopic: question.subtopic,
          section: question.section,
          recommendation: generateRecommendation(question.section, question.topic, question.subtopic)
        });
      }
    }
  });

  const totalQuestions = questionNumbers.length;
  const percent = Math.round((totalCorrect / totalQuestions) * 100);
  const { grade, message } = getGradeMessage(percent);

  // Calculate by section
  const bySection = calculateBySection(answers, questionNumbers, correctAnswers, questionMap);
  
  // Calculate by subtopic
  const bySubtopic = calculateBySubtopic(answers, questionNumbers, correctAnswers, questionMap);
  
  // Calculate priorities
  const priorities = calculatePriorities(bySubtopic, bySection);
  
  // Generate study plans
  const studyPlan4w = generateStudyPlan(priorities, 4);
  const studyPlan8w = generateStudyPlan(priorities, 8);
  
  // Identify strengths and weaknesses
  const strengths = bySection
    .filter(s => s.percent >= 70)
    .map(s => s.section);
  
  const weaknesses = bySection
    .filter(s => s.percent < 50)
    .map(s => s.section);

  return {
    attemptId,
    totalCorrect,
    totalQuestions,
    percent,
    grade,
    message,
    bySection,
    bySubtopic,
    priorities,
    studyPlan4w,
    studyPlan8w,
    mistakes,
    strengths,
    weaknesses,
    completedAt: Date.now(),
    totalTimeSec
  };
}

function calculateBySection(
  answers: Record<number, QuestionAnswer>,
  questionNumbers: number[],
  correctAnswers: Record<number, string>,
  questionMap: Map<number, typeof allQuestions[0]>
): SectionResult[] {
  const sectionMap = new Map<string, { correct: number; total: number }>();
  
  questionNumbers.forEach(qNum => {
    const question = questionMap.get(qNum);
    if (!question) return;
    
    const section = question.section;
    const current = sectionMap.get(section) || { correct: 0, total: 0 };
    current.total++;
    
    if (answers[qNum]?.choice === correctAnswers[qNum]) {
      current.correct++;
    }
    
    sectionMap.set(section, current);
  });

  return Array.from(sectionMap.entries()).map(([section, data]) => ({
    section,
    correct: data.correct,
    total: data.total,
    percent: Math.round((data.correct / data.total) * 100)
  }));
}

function calculateBySubtopic(
  answers: Record<number, QuestionAnswer>,
  questionNumbers: number[],
  correctAnswers: Record<number, string>,
  questionMap: Map<number, typeof allQuestions[0]>
): SubtopicResult[] {
  const subtopicMap = new Map<string, { 
    section: string;
    topic: string;
    subtopic: string;
    correct: number; 
    total: number 
  }>();
  
  questionNumbers.forEach(qNum => {
    const question = questionMap.get(qNum);
    if (!question) return;
    
    const key = `${question.section}|${question.topic}|${question.subtopic}`;
    const current = subtopicMap.get(key) || { 
      section: question.section,
      topic: question.topic,
      subtopic: question.subtopic,
      correct: 0, 
      total: 0 
    };
    current.total++;
    
    if (answers[qNum]?.choice === correctAnswers[qNum]) {
      current.correct++;
    }
    
    subtopicMap.set(key, current);
  });

  return Array.from(subtopicMap.values()).map(data => {
    const percent = Math.round((data.correct / data.total) * 100);
    return {
      ...data,
      percent,
      level: getTrafficLightColor(percent)
    };
  });
}

function calculatePriorities(
  bySubtopic: SubtopicResult[],
  bySection: SectionResult[]
): PriorityItem[] {
  const sectionWeightMap = new Map(SECTION_WEIGHTS.map(sw => [sw.section, sw.weight]));
  
  const priorityScores = bySubtopic.map(st => {
    const sectionWeight = sectionWeightMap.get(st.section) || 1;
    const score = calculatePriorityScore(
      sectionWeight,
      st.percent / 100,
      st.total,
      0
    );
    
    return {
      ...st,
      score,
      expectedGain: calculateExpectedGain(st.total, st.percent / 100)
    };
  });

  // Sort by priority score (higher is more urgent)
  priorityScores.sort((a, b) => b.score - a.score);

  // Take top 10 and format
  return priorityScores.slice(0, 10).map((item, index) => ({
    rank: index + 1,
    section: item.section,
    topic: item.topic,
    subtopic: item.subtopic,
    reason: generatePriorityReason(item),
    expectedGain: item.expectedGain,
    currentPercent: item.percent,
    totalQuestions: item.total
  }));
}

function generatePriorityReason(item: SubtopicResult & { score: number }): string {
  if (item.percent === 0) {
    return `No acertaste ninguna pregunta de ${item.subtopic}. Es un área crítica que requiere atención inmediata.`;
  }
  if (item.percent < 30) {
    return `Tu rendimiento en ${item.subtopic} es muy bajo (${item.percent}%). Necesitas reforzar los conceptos básicos.`;
  }
  if (item.percent < 50) {
    return `${item.subtopic} está por debajo del promedio (${item.percent}%). Con práctica puedes mejorar significativamente.`;
  }
  if (item.percent < 70) {
    return `${item.subtopic} necesita refuerzo (${item.percent}%). Estás cerca de dominarlo.`;
  }
  return `Consolida tu conocimiento en ${item.subtopic} (${item.percent}%) para asegurar estos puntos.`;
}

function generateRecommendation(section: string, topic: string, subtopic: string): string {
  const recommendations: Record<string, string> = {
    'Geografía': 'Revisa mapas de México y conceptos de geografía física y humana.',
    'Formación Cívica y Ética': 'Estudia los valores cívicos, derechos humanos y estructura del gobierno.',
    'Historia': 'Repasa las etapas históricas de México y sus personajes principales.',
    'Biología': 'Enfócate en la célula, genética, ecología y sistemas del cuerpo humano.',
    'Química': 'Practica con la tabla periódica, enlaces y reacciones químicas.',
    'Física': 'Resuelve problemas de mecánica, energía y electricidad.',
    'Español': 'Practica gramática, ortografía y comprensión de textos.',
    'Habilidad Verbal': 'Ejercita analogías, sinónimos y ordenamiento de ideas.',
    'Matemáticas': 'Practica álgebra, geometría y resolución de problemas.',
    'Habilidad Matemática': 'Resuelve series numéricas y problemas de razonamiento lógico.'
  };
  
  return recommendations[section] || `Refuerza el tema de ${topic}: ${subtopic}.`;
}

function generateStudyPlan(priorities: PriorityItem[], weeks: number): WeekPlan[] {
  const plan: WeekPlan[] = [];
  const prioritiesPerWeek = Math.ceil(priorities.length / Math.ceil(weeks / 2));
  
  for (let w = 1; w <= weeks; w++) {
    const weekPlan: WeekPlan = {
      week: w,
      focus: '',
      sessions: []
    };

    if (w <= Math.ceil(weeks / 2)) {
      // First half: Focus on weak areas
      const startIdx = (w - 1) * prioritiesPerWeek;
      const weekPriorities = priorities.slice(startIdx, startIdx + prioritiesPerWeek);
      
      weekPlan.focus = weekPriorities.map(p => p.subtopic).join(', ') || 'Repaso general';
      
      weekPlan.sessions = [
        {
          title: 'Sesión de teoría',
          goals: weekPriorities.map(p => `Comprender ${p.subtopic}`),
          minutes: 60,
          drills: ['Lectura de material', 'Notas y resúmenes']
        },
        {
          title: 'Sesión de práctica',
          goals: weekPriorities.map(p => `Practicar ${p.subtopic}`),
          minutes: 45,
          drills: ['Ejercicios del tema', '10-15 preguntas tipo examen']
        },
        {
          title: 'Sesión de repaso',
          goals: ['Consolidar lo aprendido', 'Identificar dudas'],
          minutes: 30,
          drills: ['Repaso de errores', 'Mini-examen de 10 preguntas']
        }
      ];
    } else {
      // Second half: Practice and simulation
      weekPlan.focus = 'Práctica intensiva y simulacros';
      
      weekPlan.sessions = [
        {
          title: 'Simulacro parcial',
          goals: ['Practicar bajo presión', 'Mejorar tiempo'],
          minutes: 90,
          drills: ['40 preguntas cronometradas', 'Revisión de errores']
        },
        {
          title: 'Repaso de áreas débiles',
          goals: priorities.slice(0, 3).map(p => `Reforzar ${p.subtopic}`),
          minutes: 60,
          drills: ['Ejercicios específicos', 'Revisión de conceptos']
        },
        {
          title: 'Examen de práctica',
          goals: ['Simular condiciones reales', 'Evaluar progreso'],
          minutes: 120,
          drills: ['Examen completo o parcial', 'Análisis de resultados']
        }
      ];
    }
    
    plan.push(weekPlan);
  }
  
  return plan;
}
