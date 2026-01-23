'use client';

import { cn } from '@/lib/utils';
import type { PriorityItem } from '@/types/exam';
import { AlertCircle, TrendingUp, Target } from 'lucide-react';
import { TRAFFIC_LIGHT_COLORS } from '@/lib/constants';
import { getTrafficLightColor } from '@/lib/utils';

interface PriorityListProps {
  priorities: PriorityItem[];
}

export function PriorityList({ priorities }: PriorityListProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold text-[#002B7A] flex items-center gap-2">
          <Target className="w-6 h-6 text-[#C59D5F]" />
          Top 10 Prioridades de Estudio
        </h3>
      </div>

      <p className="text-slate-600 text-sm mb-8 leading-relaxed max-w-2xl">
        Estas son las áreas donde más puntos puedes ganar con el menor esfuerzo. 
        Enfócate en ellas primero para subir tu calificación rápidamente.
      </p>

      <div className="space-y-4">
        {priorities.map((priority) => {
          const level = getTrafficLightColor(priority.currentPercent);
          const colors = TRAFFIC_LIGHT_COLORS[level];

          return (
            <div
              key={`${priority.section}-${priority.subtopic}`}
              className={cn(
                'p-5 rounded-xl border-l-4 bg-slate-50 border border-slate-100 transition-all hover:shadow-md',
                colors.border
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm',
                      priority.rank <= 3 
                        ? 'bg-red-500' 
                        : 'bg-slate-400'
                    )}>
                      {priority.rank}
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      {priority.section}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-base mb-1">
                    {priority.subtopic}
                  </h4>
                  
                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    {priority.topic}
                  </p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                    {priority.reason}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[80px]">
                  <div className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold shadow-sm',
                    colors.bg, colors.text
                  )}>
                    {priority.currentPercent}%
                  </div>
                  
                  {priority.expectedGain > 0 && (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{priority.expectedGain} pts
                    </div>
                  )}
                </div>
              </div>

              {priority.rank <= 3 && (
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-amber-600 text-xs font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>Prioridad crítica - Impacto alto en puntaje final</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
