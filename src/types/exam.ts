// Core Types for the Exam Simulator

export type ChoiceLetter = 'A' | 'B' | 'C' | 'D';

export type QuestionStatus = 'not_seen' | 'answered' | 'flagged' | 'unanswered';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type TrafficLight = 'verde' | 'amarillo' | 'rojo';

export type ExamMode = 'simulador_realista' | 'diagnostico_rapido' | 'practica_area';

// Question Model (Bank)
export interface Question {
  id: string; // e.g., "q001"
  number: number; // 1..128 (or sequential number in randomized exam)
  originalNumber?: number; // Original question number before shuffling
  section: string; // e.g., "Geografía", "Matemáticas"
  topic: string; // Main topic
  subtopic: string; // Subtopic for detailed analysis
  difficulty: DifficultyLevel;
  stem: string; // Question text
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  explanation?: string; // Can be empty initially
  assets?: {
    images?: string[]; // URLs or paths to images
  };
  tags?: string[];
  source?: {
    pdfPage?: number;
    pdfRef?: string;
  };
}

// Question without correct answer (for client)
export type ClientQuestion = Omit<Question, 'correctChoice'>;

// Server-side question with correct answer
export interface ServerQuestion extends Question {
  correctChoice: ChoiceLetter;
}

// Answer for a single question
export interface QuestionAnswer {
  choice?: ChoiceLetter;
  flagged?: boolean;
  timeSpentSec?: number;
  changedCount?: number;
  firstAnswerTime?: number; // Timestamp
}

// Telemetry data
export interface AttemptTelemetry {
  blurCount: number;
  tabChangeCount: number;
  fullscreenExitCount: number;
  focusChanges: Array<{
    type: 'blur' | 'focus' | 'visibilitychange' | 'fullscreenchange';
    timestamp: number;
  }>;
}

// Attempt Model
export interface Attempt {
  attemptId: string;
  userId?: string;
  createdAt: number; // Timestamp
  mode: ExamMode;
  selectedSection?: string; // For practice mode
  questionCount: number;
  maxTimeSeconds: number;
  examVersion?: number; // 1-4, for randomized exam versions
  answers: Record<number, QuestionAnswer>; // questionNumber -> answer
  telemetry: AttemptTelemetry;
  finishedAt?: number;
  totalTimeSec?: number;
  currentQuestion: number;
  isCompleted: boolean;
}

// Section Result
export interface SectionResult {
  section: string;
  correct: number;
  total: number;
  percent: number;
}

// Subtopic Result
export interface SubtopicResult {
  section: string;
  topic: string;
  subtopic: string;
  correct: number;
  total: number;
  percent: number;
  level: TrafficLight;
}

// Priority Item
export interface PriorityItem {
  rank: number;
  section: string;
  topic: string;
  subtopic: string;
  reason: string;
  expectedGain: number;
  currentPercent: number;
  totalQuestions: number;
}

// Study Session
export interface StudySession {
  title: string;
  goals: string[];
  minutes: number;
  drills: string[];
}

// Weekly Plan
export interface WeekPlan {
  week: number;
  focus: string;
  sessions: StudySession[];
}

// Mistake Detail
export interface MistakeDetail {
  questionNumber: number;
  stem: string;
  chosen: ChoiceLetter | undefined;
  correct: ChoiceLetter;
  explanation: string;
  topic: string;
  subtopic: string;
  section: string;
  recommendation: string;
}

// Complete Results
export interface ExamResults {
  attemptId: string;
  totalCorrect: number;
  totalQuestions: number;
  percent: number;
  grade: string;
  message: string;
  bySection: SectionResult[];
  bySubtopic: SubtopicResult[];
  priorities: PriorityItem[];
  studyPlan4w: WeekPlan[];
  studyPlan8w: WeekPlan[];
  mistakes: MistakeDetail[];
  strengths: string[];
  weaknesses: string[];
  completedAt: number;
  totalTimeSec: number;
}

// Exam Configuration
export interface ExamConfig {
  mode: ExamMode;
  questionCount: number;
  maxTimeSeconds: number;
  shuffleQuestions: boolean;
  selectedSection?: string;
  examVersion?: number; // 1-4, for randomized exam versions
}

// Section weights for priority calculation
export interface SectionWeight {
  section: string;
  weight: number;
}
