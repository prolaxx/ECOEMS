'use client';

import { useExamStore, useCurrentQuestion } from '@/store/examStore';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onShowSummary?: () => void;
}

export function Navigation({ onShowSummary }: NavigationProps) {
  const { 
    nextQuestion, 
    prevQuestion, 
    questions,
    currentAttempt 
  } = useExamStore();
  const currentQuestion = useCurrentQuestion();

  if (!currentAttempt || !currentQuestion) return null;

  const currentIndex = questions.findIndex(q => q.number === currentQuestion.number);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Previous Button */}
      <button
        onClick={prevQuestion}
        disabled={isFirst}
        className={cn(
          'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm',
          isFirst
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent'
            : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#002B7A] border border-slate-200 hover:border-[#002B7A]/30'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Center Controls - Simplified for cleaner UI */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-400 hidden sm:block">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}% Completado
        </span>
      </div>

      <div className="flex gap-3">
        {/* Next Button */}
        {!isLast ? (
            <button
            onClick={nextQuestion}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md bg-[#002B7A] text-white hover:bg-[#001C42] hover:shadow-lg hover:-translate-y-0.5"
            >
            <span className="hidden sm:inline">Siguiente</span>
            <span className="sm:hidden">Sig.</span>
            <ChevronRight className="w-5 h-5" />
            </button>
        ) : (
             /* Submit Button (Only on last question) */
            <button
            onClick={onShowSummary}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 animate-pulse-subtle"
            >
            <span className="hidden sm:inline">Finalizar Examen</span>
            <span className="sm:hidden">Finalizar</span>
            <Send className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
}
