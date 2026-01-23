'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { MistakeDetail, ChoiceLetter } from '@/types/exam';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';

interface MistakesListProps {
  mistakes: MistakeDetail[];
  showAll?: boolean;
}

export function MistakesList({ mistakes, showAll = false }: MistakesListProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const displayedMistakes = showAll || showMore 
    ? mistakes 
    : mistakes.slice(0, 12);

  const choiceLabels: Record<ChoiceLetter, string> = {
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D'
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-xl font-bold text-[#002B7A] flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          Análisis de Errores
        </h3>
        <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100">
          {mistakes.length} errores detectados
        </span>
      </div>

      <p className="text-slate-600 text-sm mb-8 leading-relaxed">
        Revisa detalladamente cada reactivo incorrecto. Comprender <span className="font-bold text-slate-800">por qué</span> fallaste es más importante que saber cuál era la respuesta correcta.
      </p>

      <div className="space-y-4">
        {displayedMistakes.map((mistake) => {
          const isExpanded = expanded === mistake.questionNumber;

          return (
            <div
              key={mistake.questionNumber}
              className={cn(
                'rounded-xl border transition-all duration-300',
                isExpanded 
                  ? 'bg-slate-50 border-red-200 shadow-md' 
                  : 'bg-white border-slate-200 hover:border-red-200 hover:shadow-sm'
              )}
            >
              {/* Mistake Header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : mistake.questionNumber)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors",
                    isExpanded ? "bg-red-500 text-white" : "bg-red-50 text-red-600"
                  )}>
                    {mistake.questionNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{mistake.section}</p>
                    <p className="text-slate-800 font-medium text-base truncate pr-4">{mistake.stem}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 ml-2">
                  <div className="hidden sm:flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Tú:</span>
                        {mistake.chosen ? (
                        <span className="w-6 h-6 rounded-md bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
                            {mistake.chosen}
                        </span>
                        ) : (
                        <span className="text-xs text-slate-400 italic">vacío</span>
                        )}
                    </div>
                    <span className="text-slate-300 text-lg">›</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Correcta:</span>
                        <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                        {mistake.correct}
                        </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#002B7A]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Mistake Details */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-6 animate-fade-in">
                  <div className="h-px w-full bg-slate-200" />
                  
                  {/* Full Question */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-inner">
                    <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line font-medium">
                        {mistake.stem}
                    </p>
                  </div>

                  {/* Your Answer vs Correct */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-bold text-red-700">Tu respuesta incorrecta</span>
                      </div>
                      <p className="text-red-800/80 text-sm pl-7">
                        {mistake.chosen 
                          ? `Opción ${mistake.chosen}`
                          : 'No respondiste esta pregunta'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-700">Respuesta correcta</span>
                      </div>
                      <p className="text-emerald-800/80 text-sm pl-7">
                        Opción {mistake.correct}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-bold text-blue-800">Explicación detallada</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{mistake.explanation}</p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-bold text-amber-800">Tip de estudio</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{mistake.recommendation}</p>
                  </div>

                  {/* Topic Info */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                      {mistake.topic}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                      {mistake.subtopic}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {!showAll && mistakes.length > 12 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-8 w-full py-3 bg-white text-[#002B7A] rounded-xl font-semibold hover:bg-slate-50 transition-colors text-sm border border-slate-200 shadow-sm"
        >
          {showMore ? 'Ver menos errores' : `Ver todos los errores (${mistakes.length})`}
        </button>
      )}
    </div>
  );
}
