import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Attempt,
  AttemptTelemetry,
  QuestionAnswer,
  ChoiceLetter,
  ClientQuestion,
  ExamConfig,
  ExamResults
} from '@/types/exam';
import { generateId } from '@/lib/utils';
import { STORAGE_KEYS } from '@/lib/constants';
import { useAuthStore } from './authStore';

interface ExamState {
  // Current attempt
  currentAttempt: Attempt | null;
  // Questions for current exam (without correct answers)
  questions: ClientQuestion[];
  // Timer
  remainingSeconds: number;
  isTimerRunning: boolean;
  // UI state
  showPanel: boolean;
  filterFlagged: boolean;
  // Results (after submission)
  results: ExamResults | null;
  // History
  hasCompletedDiagnostic: boolean;
  isLoadingHistory: boolean;
  
  // Actions
  startExam: (config: ExamConfig, questions: ClientQuestion[]) => Promise<{ success: boolean; error?: string }>;
  setAnswer: (questionNumber: number, choice: ChoiceLetter) => void;
  clearAnswer: (questionNumber: number) => void;
  toggleFlag: (questionNumber: number) => void;
  goToQuestion: (questionNumber: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  tick: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  submitExam: () => Promise<void>;
  setResults: (results: ExamResults) => void;
  resetExam: () => void;
  recoverAttempt: () => boolean;
  
  // Telemetry
  recordTelemetryEvent: (type: 'blur' | 'focus' | 'visibilitychange' | 'fullscreenchange') => void;
  
  // Panel
  togglePanel: () => void;
  setFilterFlagged: (value: boolean) => void;
  
  // Cloud Sync
  syncAttempt: () => Promise<void>;
  checkExistingDiagnostic: () => Promise<{ hasCompleted: boolean; results: ExamResults | null }>;
  loadResultsFromHistory: () => Promise<ExamResults | null>;
}

const initialTelemetry: AttemptTelemetry = {
  blurCount: 0,
  tabChangeCount: 0,
  fullscreenExitCount: 0,
  focusChanges: []
};

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      currentAttempt: null,
      questions: [],
      remainingSeconds: 0,
      isTimerRunning: false,
      showPanel: false,
      filterFlagged: false,
      results: null,
      hasCompletedDiagnostic: false,
      isLoadingHistory: false,

      checkExistingDiagnostic: async () => {
        const { hasCompletedDiagnostic, results } = get();
        const user = useAuthStore.getState().user;

        if (!user) {
          return { hasCompleted: hasCompletedDiagnostic, results };
        }

        set({ isLoadingHistory: true });

        try {
          const response = await fetch(
            `/api/diagnostic?userId=${encodeURIComponent(user.id)}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data?.results) {
              set({
                results: data.results,
                hasCompletedDiagnostic: true,
                isLoadingHistory: false
              });
              return { hasCompleted: true, results: data.results };
            }
          }
        } catch (error) {
          console.error('Error checking diagnostic history:', error);
        }

        set({ isLoadingHistory: false });
        return { hasCompleted: hasCompletedDiagnostic, results };
      },

      loadResultsFromHistory: async () => {
        const { results } = get();
        const user = useAuthStore.getState().user;

        if (!user) return results;

        set({ isLoadingHistory: true });

        try {
          const response = await fetch(
            `/api/diagnostic?userId=${encodeURIComponent(user.id)}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data?.results) {
              set({ results: data.results, isLoadingHistory: false });
              return data.results;
            }
          }
        } catch (error) {
          console.error('Error loading results from history:', error);
        }

        set({ isLoadingHistory: false });
        return results;
      },

      startExam: async (config: ExamConfig, questions: ClientQuestion[]) => {
        const user = useAuthStore.getState().user;
        
        // Check if user already completed a diagnostic
        if (config.mode === 'simulador_realista' && user) {
          const { hasCompleted } = await get().checkExistingDiagnostic();
          if (hasCompleted) {
            return { 
              success: false, 
              error: 'Ya completaste tu diagnóstico. Solo puedes realizar uno.' 
            };
          }
        }

        const attemptId = generateId();

        const attempt: Attempt = {
          attemptId,
          userId: user?.id,
          createdAt: Date.now(),
          mode: config.mode,
          selectedSection: config.selectedSection,
          questionCount: config.questionCount,
          maxTimeSeconds: config.maxTimeSeconds,
          examVersion: config.examVersion,
          answers: {},
          telemetry: { ...initialTelemetry },
          currentQuestion: questions[0]?.number || 1,
          isCompleted: false
        };

        set({
          currentAttempt: attempt,
          questions,
          remainingSeconds: config.maxTimeSeconds,
          isTimerRunning: true,
          results: null
        });

        return { success: true };
      },

      setAnswer: (questionNumber: number, choice: ChoiceLetter) => {
        const { currentAttempt } = get();
        if (!currentAttempt || currentAttempt.isCompleted) return;

        const existingAnswer = currentAttempt.answers[questionNumber];
        const newAnswer: QuestionAnswer = {
          choice,
          flagged: existingAnswer?.flagged || false,
          timeSpentSec: existingAnswer?.timeSpentSec || 0,
          changedCount: (existingAnswer?.changedCount || 0) + (existingAnswer?.choice !== choice ? 1 : 0),
          firstAnswerTime: existingAnswer?.firstAnswerTime || Date.now()
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionNumber]: newAnswer
            }
          }
        });
      },

      clearAnswer: (questionNumber: number) => {
        const { currentAttempt } = get();
        if (!currentAttempt || currentAttempt.isCompleted) return;

        const existingAnswer = currentAttempt.answers[questionNumber];
        if (!existingAnswer) return;

        const newAnswer: QuestionAnswer = {
          ...existingAnswer,
          choice: undefined
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionNumber]: newAnswer
            }
          }
        });
      },

      toggleFlag: (questionNumber: number) => {
        const { currentAttempt } = get();
        if (!currentAttempt || currentAttempt.isCompleted) return;

        const existingAnswer = currentAttempt.answers[questionNumber] || {};
        const newAnswer: QuestionAnswer = {
          ...existingAnswer,
          flagged: !existingAnswer.flagged
        };

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [questionNumber]: newAnswer
            }
          }
        });
      },

      goToQuestion: (questionNumber: number) => {
        const { currentAttempt, questions } = get();
        if (!currentAttempt) return;

        const questionExists = questions.some(q => q.number === questionNumber);
        if (!questionExists) return;

        set({
          currentAttempt: {
            ...currentAttempt,
            currentQuestion: questionNumber
          }
        });
      },

      nextQuestion: () => {
        const { currentAttempt, questions } = get();
        if (!currentAttempt) return;

        const currentIndex = questions.findIndex(q => q.number === currentAttempt.currentQuestion);
        if (currentIndex < questions.length - 1) {
          set({
            currentAttempt: {
              ...currentAttempt,
              currentQuestion: questions[currentIndex + 1].number
            }
          });
        }
      },

      prevQuestion: () => {
        const { currentAttempt, questions } = get();
        if (!currentAttempt) return;

        const currentIndex = questions.findIndex(q => q.number === currentAttempt.currentQuestion);
        if (currentIndex > 0) {
          set({
            currentAttempt: {
              ...currentAttempt,
              currentQuestion: questions[currentIndex - 1].number
            }
          });
        }
      },

      tick: () => {
        const { remainingSeconds, isTimerRunning, currentAttempt } = get();
        if (!isTimerRunning || remainingSeconds <= 0 || !currentAttempt) return;

        const newRemaining = remainingSeconds - 1;
        
        const currentQNum = currentAttempt.currentQuestion;
        const existingAnswer = currentAttempt.answers[currentQNum] || {};
        
        set({
          remainingSeconds: newRemaining,
          currentAttempt: {
            ...currentAttempt,
            answers: {
              ...currentAttempt.answers,
              [currentQNum]: {
                ...existingAnswer,
                timeSpentSec: (existingAnswer.timeSpentSec || 0) + 1
              }
            }
          }
        });

        if (newRemaining <= 0) {
          get().submitExam();
        }
      },

      pauseTimer: () => set({ isTimerRunning: false }),
      
      resumeTimer: () => set({ isTimerRunning: true }),

      submitExam: async () => {
        const { currentAttempt, questions, remainingSeconds } = get();
        if (!currentAttempt) return;

        const maxTime = currentAttempt.maxTimeSeconds;
        const totalTimeSec = maxTime - remainingSeconds;

        const completedAttempt = {
          ...currentAttempt,
          isCompleted: true,
          finishedAt: Date.now(),
          totalTimeSec
        };

        set({
          currentAttempt: completedAttempt,
          isTimerRunning: false
        });

        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              attemptId: currentAttempt.attemptId,
              answers: currentAttempt.answers,
              questionNumbers: questions.map(q => q.number),
              totalTimeSec,
              mode: currentAttempt.mode,
              examVersion: currentAttempt.examVersion
            })
          });

          if (response.ok) {
            const results = await response.json();
            set({ 
              results,
              hasCompletedDiagnostic: currentAttempt.mode === 'simulador_realista'
            });
            await get().syncAttempt();
          }
        } catch (error) {
          console.error('Error scoring exam:', error);
        }
      },

      setResults: (results: ExamResults) => set({ results }),

      resetExam: () => {
        set({
          currentAttempt: null,
          questions: [],
          remainingSeconds: 0,
          isTimerRunning: false,
          showPanel: false,
          filterFlagged: false,
          results: null
        });
      },

      recoverAttempt: () => {
        const { currentAttempt, questions } = get();
        if (currentAttempt && !currentAttempt.isCompleted && questions.length > 0) {
          set({ isTimerRunning: true });
          return true;
        }
        return false;
      },

      recordTelemetryEvent: (type) => {
        const { currentAttempt } = get();
        if (!currentAttempt || currentAttempt.isCompleted) return;

        const event = { type, timestamp: Date.now() };
        const telemetry = { ...currentAttempt.telemetry };
        telemetry.focusChanges = [...telemetry.focusChanges, event];

        if (type === 'blur') telemetry.blurCount++;
        if (type === 'visibilitychange') telemetry.tabChangeCount++;
        if (type === 'fullscreenchange') telemetry.fullscreenExitCount++;

        set({
          currentAttempt: {
            ...currentAttempt,
            telemetry
          }
        });
      },

      togglePanel: () => set(state => ({ showPanel: !state.showPanel })),
      
      setFilterFlagged: (value: boolean) => set({ filterFlagged: value }),

      syncAttempt: async () => {
        const { currentAttempt, results } = get();
        const user = useAuthStore.getState().user;

        if (!user || !currentAttempt || !results) return;

        try {
          const response = await fetch('/api/diagnostic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              attempt: currentAttempt,
              results
            })
          });

          // Clear results from local storage for regular users after sync
          // Admins retain results for navigation to /resultados
          if (response.ok && user.role !== 'admin') {
            set({ results: null });
          }
        } catch (error) {
          console.error('Error syncing diagnostic:', error);
        }
      }
    }),
    {
      name: STORAGE_KEYS.CURRENT_ATTEMPT,
      partialize: (state) => ({
        currentAttempt: state.currentAttempt,
        questions: state.questions,
        remainingSeconds: state.remainingSeconds,
        results: state.results,
        hasCompletedDiagnostic: state.hasCompletedDiagnostic
      })
    }
  )
);

// Helper hooks
export function useCurrentQuestion() {
  const { currentAttempt, questions } = useExamStore();
  if (!currentAttempt || questions.length === 0) return null;
  return questions.find(q => q.number === currentAttempt.currentQuestion) || null;
}

export function useQuestionStatus(questionNumber: number) {
  const { currentAttempt } = useExamStore();
  if (!currentAttempt) return 'not_seen';
  
  const answer = currentAttempt.answers[questionNumber];
  if (!answer) return 'not_seen';
  if (answer.flagged) return 'flagged';
  if (answer.choice) return 'answered';
  return 'unanswered';
}

export function useExamProgress() {
  const { currentAttempt, questions } = useExamStore();
  if (!currentAttempt) return { answered: 0, flagged: 0, total: 0 };

  let answered = 0;
  let flagged = 0;

  questions.forEach(q => {
    const answer = currentAttempt.answers[q.number];
    if (answer?.choice) answered++;
    if (answer?.flagged) flagged++;
  });

  return { answered, flagged, total: questions.length };
}
