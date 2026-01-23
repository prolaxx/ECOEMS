'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { SubtopicResult } from '@/types/exam';
import { TRAFFIC_LIGHT_COLORS } from '@/lib/constants';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface SubtopicGridProps {
  subtopics: SubtopicResult[];
}

export function SubtopicGrid({ subtopics }: SubtopicGridProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Group by section
  const sections = [...new Set(subtopics.map(s => s.section))];
  
  const groupedBySection = sections.map(section => ({
    section,
    subtopics: subtopics.filter(s => s.section === section)
  }));

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h3 className="font-serif text-xl font-bold text-[#002B7A] mb-4 flex items-center gap-2">
        <Layers className="w-6 h-6 text-[#C59D5F]" />
        Desglose Detallado por Subtemas
      </h3>

      <p className="text-slate-600 text-sm mb-8">
        Identifica con precisión quirúrgica en qué temas específicos necesitas reforzar tu estudio.
      </p>

      <div className="space-y-3">
        {groupedBySection.map(({ section, subtopics: sectionSubtopics }) => {
          const isExpanded = expandedSection === section;
          const avgPercent = Math.round(
            sectionSubtopics.reduce((sum, s) => sum + s.percent, 0) / sectionSubtopics.length
          );
          const overallLevel = 
            avgPercent >= 70 ? 'verde' : 
            avgPercent >= 50 ? 'amarillo' : 
            'rojo';
          const colors = TRAFFIC_LIGHT_COLORS[overallLevel];

          return (
            <div
              key={section}
              className={cn(
                'rounded-xl border transition-all duration-300',
                isExpanded 
                  ? 'bg-slate-50 border-slate-300 shadow-md' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              )}
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span 
                    className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white"
                    style={{ backgroundColor: colors.fill }}
                  />
                  <span className="font-bold text-slate-700 text-base">{section}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                    <span className={cn(
                        'text-sm font-bold',
                        colors.text
                    )}>
                        {avgPercent}%
                    </span>
                    <span className="text-xs text-slate-400 border-l border-slate-200 pl-2">
                        {sectionSubtopics.length} temas
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#002B7A]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Subtopics List */}
              {isExpanded && (
                <div className="px-5 pb-5 grid gap-3 animate-fade-in">
                  <div className="h-px w-full bg-slate-200 mb-2" />
                  {sectionSubtopics.map((subtopic, idx) => {
                    const stColors = TRAFFIC_LIGHT_COLORS[subtopic.level];

                    return (
                      <div
                        key={`${subtopic.topic}-${subtopic.subtopic}-${idx}`}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span 
                            className="w-2 h-2 rounded-full ring-1 ring-slate-100"
                            style={{ backgroundColor: stColors.fill }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{subtopic.subtopic}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{subtopic.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
                            {subtopic.correct}/{subtopic.total}
                          </span>
                          <span className={cn(
                            'px-2.5 py-1 rounded-md text-xs font-bold w-12 text-center',
                            stColors.bg, stColors.text
                          )}>
                            {subtopic.percent}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
