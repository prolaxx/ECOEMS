import type { ServerQuestion, ClientQuestion } from '@/types/exam';
import { geografiaQuestions } from './geografia';
import { formacionCivicaQuestions } from './formacion-civica';
import { historiaQuestions } from './historia';
import { biologiaQuestions } from './biologia';
import { quimicaQuestions } from './quimica';
import { fisicaQuestions } from './fisica';
import { espanolQuestions } from './espanol';
import { habilidadVerbalQuestions } from './habilidad-verbal';
import { matematicasQuestions } from './matematicas';
import { habilidadMatematicaQuestions } from './habilidad-matematica';

// Complete question bank with correct answers (SERVER ONLY)
export const allQuestions: ServerQuestion[] = [
  ...geografiaQuestions,
  ...formacionCivicaQuestions,
  ...biologiaQuestions,
  ...historiaQuestions,
  ...espanolQuestions,
  ...habilidadVerbalQuestions,
  ...fisicaQuestions,
  ...quimicaQuestions,
  ...matematicasQuestions,
  ...habilidadMatematicaQuestions,
].sort((a, b) => a.number - b.number);

// Seeded random number generator for reproducible shuffles
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Fisher-Yates shuffle with seed
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(currentSeed) * (i + 1));
    currentSeed++;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

// Shuffle choices within a question
function shuffleChoices(question: ServerQuestion, seed: number): ServerQuestion {
  const choiceKeys = ['A', 'B', 'C', 'D'] as const;
  const shuffledKeys = shuffleArray([...choiceKeys], seed);
  
  const newChoices: Record<string, string> = {};
  let newCorrectChoice = question.correctChoice;
  
  shuffledKeys.forEach((originalKey, newIndex) => {
    const newKey = choiceKeys[newIndex];
    newChoices[newKey] = question.choices[originalKey];
    
    if (originalKey === question.correctChoice) {
      newCorrectChoice = newKey;
    }
  });
  
  return {
    ...question,
    choices: newChoices as ServerQuestion['choices'],
    correctChoice: newCorrectChoice as ServerQuestion['correctChoice']
  };
}

// Get questions without correct answers for client
export function getClientQuestions(): ClientQuestion[] {
  return allQuestions.map(({ correctChoice, ...rest }) => rest);
}

// Get questions by section
export function getQuestionsBySection(section: string): ServerQuestion[] {
  return allQuestions.filter(q => q.section === section);
}

// Get client questions by section
export function getClientQuestionsBySection(section: string): ClientQuestion[] {
  return getQuestionsBySection(section).map(({ correctChoice, ...rest }) => rest);
}

// Get correct answer for a question (SERVER ONLY)
export function getCorrectAnswer(questionNumber: number): string | undefined {
  const question = allQuestions.find(q => q.number === questionNumber);
  return question?.correctChoice;
}

// Get correct answers map (SERVER ONLY)
export function getCorrectAnswersMap(): Record<number, string> {
  const map: Record<number, string> = {};
  allQuestions.forEach(q => {
    map[q.number] = q.correctChoice;
  });
  return map;
}

// Get question by number
export function getQuestionByNumber(number: number): ServerQuestion | undefined {
  return allQuestions.find(q => q.number === number);
}

// Version seeds for the 4 exam versions
const VERSION_SEEDS = {
  1: 12345,
  2: 67890,
  3: 11111,
  4: 99999
};

// Get exam version (1-4) based on random selection or specific version
export function getExamVersion(): number {
  return Math.floor(Math.random() * 4) + 1;
}

// Generate a randomized exam version
export function getExamByVersion(version: number, shuffleQuestionOrder: boolean = true, shuffleAnswers: boolean = true): ServerQuestion[] {
  const versionSeed = VERSION_SEEDS[version as keyof typeof VERSION_SEEDS] || VERSION_SEEDS[1];
  
  // Get all questions
  let questions = [...allQuestions];
  
  // Group questions by section to maintain section grouping but shuffle within sections
  const sections = [...new Set(questions.map(q => q.section))];
  const questionsBySection: Record<string, ServerQuestion[]> = {};
  
  sections.forEach(section => {
    questionsBySection[section] = questions.filter(q => q.section === section);
  });
  
  // Shuffle questions within each section
  if (shuffleQuestionOrder) {
    let seedOffset = 0;
    sections.forEach(section => {
      questionsBySection[section] = shuffleArray(
        questionsBySection[section], 
        versionSeed + seedOffset
      );
      seedOffset += 100;
    });
    
    // Optionally shuffle section order as well
    const shuffledSections = shuffleArray(sections, versionSeed + 1000);
    
    // Rebuild questions array with shuffled sections
    questions = [];
    shuffledSections.forEach(section => {
      questions.push(...questionsBySection[section]);
    });
  }
  
  // Shuffle answer choices
  if (shuffleAnswers) {
    questions = questions.map((q, index) => 
      shuffleChoices(q, versionSeed + index * 7)
    );
  }
  
  // Renumber questions sequentially for the exam
  return questions.map((q, index) => ({
    ...q,
    originalNumber: q.number, // Keep track of original number for scoring
    number: index + 1
  }));
}

// Get client-safe version of randomized exam
export function getClientExamByVersion(version: number): { questions: ClientQuestion[], version: number } {
  const serverQuestions = getExamByVersion(version);
  const clientQuestions = serverQuestions.map(({ correctChoice, ...rest }) => rest);
  
  return {
    questions: clientQuestions,
    version
  };
}

// Get correct answers map for a specific version (SERVER ONLY)
export function getCorrectAnswersMapByVersion(version: number): Record<number, string> {
  const questions = getExamByVersion(version);
  const map: Record<number, string> = {};
  
  questions.forEach(q => {
    map[q.number] = q.correctChoice;
  });
  
  return map;
}

// Get questions for diagnostic mode (balanced selection) - now with version support
export function getDiagnosticQuestions(count: number = 128, version?: number): ServerQuestion[] {
  // For diagnostic, use all 128 questions with optional version-based randomization
  if (version) {
    return getExamByVersion(version);
  }
  
  // Default: return all questions in original order
  return [...allQuestions];
}

// Get questions for practice mode
export function getPracticeQuestions(section: string, count: number): ServerQuestion[] {
  const sectionQuestions = getQuestionsBySection(section);
  const shuffled = [...sectionQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get all sections with question counts
export function getSectionStats(): Array<{ section: string; count: number }> {
  const sections = [...new Set(allQuestions.map(q => q.section))];
  return sections.map(section => ({
    section,
    count: allQuestions.filter(q => q.section === section).length
  }));
}

// Validate that we have 128 questions
export function validateQuestionBank(): { valid: boolean; count: number; missing: number[] } {
  const count = allQuestions.length;
  const numbers = new Set(allQuestions.map(q => q.number));
  const missing: number[] = [];
  
  for (let i = 1; i <= 128; i++) {
    if (!numbers.has(i)) {
      missing.push(i);
    }
  }
  
  return {
    valid: count === 128 && missing.length === 0,
    count,
    missing
  };
}

// Export version information
export const EXAM_VERSIONS = {
  total: 4,
  descriptions: {
    1: 'Versión A - Orden aleatorio 1',
    2: 'Versión B - Orden aleatorio 2', 
    3: 'Versión C - Orden aleatorio 3',
    4: 'Versión D - Orden aleatorio 4'
  }
};
