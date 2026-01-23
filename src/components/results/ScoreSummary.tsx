'use client';

import { cn } from '@/lib/utils';
import type { ExamResults } from '@/types/exam';
import { Trophy, Target, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface ScoreSummaryProps {
  results: ExamResults;
}

export function ScoreSummary({ results }: ScoreSummaryProps) {
  const percentColor = 
    results.percent >= 80 ? 'text-emerald-600' :
    results.percent >= 60 ? 'text-amber-600' :
    'text-red-600';

  const ringColor =
    results.percent >= 80 ? 'border-emerald-500' :
    results.percent >= 60 ? 'border-amber-500' :
    'border-red-500';

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      {/* Main Score Section */}
      <div className="text-center mb-10">
        <div className="relative inline-flex items-center justify-center mb-6">
            {/* Outer Ring */}
            <div className={cn("w-40 h-40 rounded-full border-4 flex items-center justify-center bg-slate-50", ringColor)}>
                <div className="text-center">
                    <p className="text-4xl font-bold text-slate-800">{results.totalCorrect}</p>
                    <p className="text-sm text-slate-500 font-medium mt-1">de {results.totalQuestions}</p>
                </div>
            </div>
            
            {/* Grade Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#002B7A] text-white text-sm font-bold rounded-full shadow-md whitespace-nowrap flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-[#C59D5F]" />
                {results.grade}
            </div>
        </div>
        
        <h2 className={cn('text-5xl font-bold mb-4 font-serif', percentColor)}>
          {results.percent}%
        </h2>
        
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          {results.message}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-100 hover:border-emerald-200 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{results.totalCorrect}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Aciertos</p>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-100 hover:border-red-200 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{results.mistakes.length}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Errores</p>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-100 hover:border-blue-200 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{formatTime(results.totalTimeSec)}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Tiempo</p>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-100 hover:border-purple-200 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{results.priorities.length}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Focos Rojos</p>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        {results.strengths.length > 0 && (
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Fortalezas Identificadas
            </h3>
            <ul className="space-y-3">
              {results.strengths.map((s, i) => (
                <li key={i} className="text-emerald-700 text-sm flex items-start gap-3 bg-white/60 p-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {results.weaknesses.length > 0 && (
          <div className="bg-red-50/50 border border-red-100 rounded-xl p-6">
            <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Áreas de Oportunidad
            </h3>
            <ul className="space-y-3">
              {results.weaknesses.map((w, i) => (
                <li key={i} className="text-red-700 text-sm flex items-start gap-3 bg-white/60 p-2 rounded-lg">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
