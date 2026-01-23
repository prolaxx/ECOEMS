'use client';

import { cn } from '@/lib/utils';
import type { SectionResult } from '@/types/exam';
import { TRAFFIC_LIGHT_COLORS } from '@/lib/constants';
import { getTrafficLightColor } from '@/lib/utils';

interface SectionChartProps {
  sections: SectionResult[];
}

export function SectionChart({ sections }: SectionChartProps) {
  const sortedSections = [...sections].sort((a, b) => b.percent - a.percent);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h3 className="font-serif text-xl font-bold text-[#002B7A] mb-6">Desempeño por Materia</h3>
      
      <div className="space-y-5">
        {sortedSections.map((section) => {
          const level = getTrafficLightColor(section.percent);
          const colors = TRAFFIC_LIGHT_COLORS[level];

          return (
            <div key={section.section}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">
                  {section.section}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">
                    {section.correct}/{section.total}
                  </span>
                  <span className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-bold',
                    colors.bg, colors.text
                  )}>
                    {section.percent}%
                  </span>
                </div>
              </div>
              
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{
                    width: `${section.percent}%`,
                    backgroundColor: colors.fill
                  }}
                >
                    {/* Add subtle shine effect */}
                    <div className="absolute inset-0 bg-white/20" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-xs text-slate-500 font-medium">Dominado (≥70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-xs text-slate-500 font-medium">Regular (50-69%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs text-slate-500 font-medium">Crítico (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
}
