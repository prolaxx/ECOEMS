'use client';

import { useExamStore } from '@/store/examStore';
import { cn } from '@/lib/utils';
import { STATUS_COLORS } from '@/lib/constants';
import type { QuestionStatus } from '@/types/exam';
import { Flag, Check, Eye, HelpCircle } from 'lucide-react';

export function QuestionGrid() {
  const { 
    questions, 
    currentAttempt, 
    goToQuestion, 
    filterFlagged, 
    setFilterFlagged 
  } = useExamStore();

  if (!currentAttempt) return null;

  const getQuestionStatus = (qNum: number): QuestionStatus => {
    const answer = currentAttempt.answers[qNum];
    if (!answer) return 'not_seen';
    if (answer.flagged) return 'flagged';
    if (answer.choice) return 'answered';
    return 'unanswered';
  };

  const filteredQuestions = filterFlagged
    ? questions.filter(q => currentAttempt.answers[q.number]?.flagged)
    : questions;

  // Group by section for better organization
  const sections = [...new Set(questions.map(q => q.section))];

  return (
    <div className="p-4 lg:p-5">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-3 h-3 rounded bg-zinc-700"></span>
          No vista
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-3 h-3 rounded bg-emerald-500/70"></span>
          Respondida
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-3 h-3 rounded bg-amber-500/70"></span>
          Marcada
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-3 h-3 rounded bg-zinc-500"></span>
          Vista
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilterFlagged(!filterFlagged)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            filterFlagged
              ? 'bg-amber-500/90 text-white'
              : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'
          )}
        >
          <Flag className="w-3.5 h-3.5" />
          Solo marcadas ({questions.filter(q => currentAttempt.answers[q.number]?.flagged).length})
        </button>
      </div>

      {/* Questions Grid */}
      <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {sections.map(section => {
          const sectionQuestions = filteredQuestions.filter(q => q.section === section);
          if (sectionQuestions.length === 0) return null;

          return (
            <div key={section} className="mb-4">
              <h4 className="text-xs font-medium text-zinc-600 uppercase tracking-wide mb-2">
                {section}
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-1">
                {sectionQuestions.map(q => {
                  const status = getQuestionStatus(q.number);
                  const isCurrent = currentAttempt.currentQuestion === q.number;

                  return (
                    <button
                      key={q.number}
                      onClick={() => goToQuestion(q.number)}
                      className={cn(
                        'w-7 h-7 rounded flex items-center justify-center text-xs font-medium transition-all',
                        isCurrent && 'ring-2 ring-amber-500/50 ring-offset-1 ring-offset-zinc-950',
                        status === 'answered' && 'bg-emerald-500/70 text-white',
                        status === 'flagged' && 'bg-amber-500/70 text-white',
                        status === 'not_seen' && 'bg-zinc-800/60 text-zinc-500 hover:bg-zinc-800',
                        status === 'unanswered' && 'bg-zinc-600 text-white'
                      )}
                      title={`Pregunta ${q.number} - ${q.topic}`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-zinc-800/50 grid grid-cols-2 gap-2 text-center">
        <div className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-800/50">
          <p className="text-xl font-bold text-emerald-400/90">
            {Object.values(currentAttempt.answers).filter(a => a.choice).length}
          </p>
          <p className="text-xs text-zinc-500">Respondidas</p>
        </div>
        <div className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-800/50">
          <p className="text-xl font-bold text-amber-400/90">
            {Object.values(currentAttempt.answers).filter(a => a.flagged).length}
          </p>
          <p className="text-xs text-zinc-500">Marcadas</p>
        </div>
      </div>
    </div>
  );
}
