'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { WeekPlan } from '@/types/exam';
import { Calendar, Clock, Target, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface StudyPlanProps {
  plan4w: WeekPlan[];
  plan8w: WeekPlan[];
}

export function StudyPlan({ plan4w, plan8w }: StudyPlanProps) {
  const [selectedPlan, setSelectedPlan] = useState<'4w' | '8w'>('4w');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const currentPlan = selectedPlan === '4w' ? plan4w : plan8w;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-xl font-bold text-[#002B7A] flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#C59D5F]" />
          Plan de Estudio Personalizado
        </h3>

        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setSelectedPlan('4w')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              selectedPlan === '4w'
                ? 'bg-white text-[#002B7A] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            4 semanas
          </button>
          <button
            onClick={() => setSelectedPlan('8w')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              selectedPlan === '8w'
                ? 'bg-white text-[#002B7A] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            8 semanas
          </button>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        {selectedPlan === '4w' 
          ? 'Este plan intensivo está diseñado para cubrir los temas clave en un mes. Requiere mayor dedicación diaria.'
          : 'Este plan extendido permite una preparación más profunda y pausada, ideal para consolidar conocimientos a largo plazo.'}
      </p>

      <div className="space-y-4">
        {currentPlan.map((week) => {
          const isExpanded = expandedWeek === week.week;

          return (
            <div
              key={week.week}
              className={cn(
                'rounded-xl border transition-all duration-300',
                isExpanded 
                  ? 'bg-slate-50 border-[#002B7A]/20 shadow-md' 
                  : 'bg-white border-slate-200 hover:border-[#002B7A]/30'
              )}
            >
              {/* Week Header */}
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-colors",
                    isExpanded ? "bg-[#002B7A] text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    {week.week}
                  </span>
                  <div>
                    <h4 className={cn("font-bold text-base transition-colors", isExpanded ? "text-[#002B7A]" : "text-slate-700")}>
                        Semana {week.week}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">{week.focus}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#002B7A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {/* Week Sessions */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 animate-fade-in">
                  <div className="h-px w-full bg-slate-200 mb-4" />
                  {week.sessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <h5 className="font-bold text-slate-800 text-base flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#C59D5F]" />
                          {session.title}
                        </h5>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          {session.minutes} min
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Objetivos de aprendizaje:</p>
                        <ul className="space-y-2">
                          {session.goals.map((goal, gIdx) => (
                            <li key={gIdx} className="text-sm text-slate-600 flex items-start gap-2">
                              <Target className="w-4 h-4 text-[#002B7A] mt-0.5 flex-shrink-0" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Actividades prácticas:</p>
                        <div className="flex flex-wrap gap-2">
                          {session.drills.map((drill, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200"
                            >
                              {drill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
