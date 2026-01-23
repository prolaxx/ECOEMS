'use client';

import { useExamStore, useCurrentQuestion, useQuestionStatus } from '@/store/examStore';
import { cn } from '@/lib/utils';
import type { ChoiceLetter } from '@/types/exam';
import { Flag, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export function QuestionView() {
  const { currentAttempt, setAnswer, clearAnswer, toggleFlag } = useExamStore();
  const question = useCurrentQuestion();
  const status = useQuestionStatus(question?.number || 0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  if (!question || !currentAttempt) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 font-medium animate-pulse">Cargando pregunta...</p>
      </div>
    );
  }

  const currentAnswer = currentAttempt.answers[question.number]?.choice;
  const isFlagged = currentAttempt.answers[question.number]?.flagged || false;

  const handleChoiceClick = (choice: ChoiceLetter) => {
    if (currentAnswer === choice) {
      return;
    }
    setAnswer(question.number, choice);
  };

  const handleImageError = (imgSrc: string) => {
    setImgError(prev => ({ ...prev, [imgSrc]: true }));
    console.error(`Error cargando imagen: ${imgSrc}`);
  };

  const choiceLetters: ChoiceLetter[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="glass-card p-6 lg:p-10 animate-fade-in bg-white shadow-lg rounded-2xl border border-slate-200">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-8 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-[#002B7A] text-white rounded-md text-xs font-bold uppercase tracking-wider">
            {question.section}
          </span>
          <span className="text-slate-500 text-sm font-semibold">
            Reactivo {question.number}
          </span>
        </div>
        <button
          onClick={() => toggleFlag(question.number)}
          className={cn(
            'p-2 rounded-full transition-all duration-200',
            isFlagged
              ? 'bg-[#C59D5F] text-white shadow-md transform scale-105'
              : 'text-slate-400 hover:bg-slate-100 hover:text-[#C59D5F]'
          )}
          title={isFlagged ? 'Quitar marca' : 'Marcar para revisar'}
        >
          <Flag className={cn("w-5 h-5", isFlagged && "fill-current")} />
        </button>
      </div>

      {/* Question Stem */}
      <div className="mb-10">
        <p className="text-xl lg:text-2xl text-[#002B7A] leading-relaxed font-serif font-medium">
          {question.stem}
        </p>
        
        {/* Question Images */}
        {question.assets?.images && question.assets.images.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {question.assets.images.map((img, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md p-2"
              >
                {imgError[img] ? (
                    <div className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-500 rounded-lg border border-red-100">
                        <span className="text-sm font-semibold">No se pudo cargar la imagen</span>
                        <span className="text-xs mt-1 text-slate-400 select-all font-mono">{img}</span>
                    </div>
                ) : (
                    <img 
                    src={img} 
                    alt={`Imagen del reactivo ${question.number}`}
                    className="max-w-full h-auto max-h-[400px] object-contain rounded-lg"
                    onError={() => handleImageError(img)}
                    />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="space-y-4">
        {choiceLetters.map((letter) => {
          const isSelected = currentAnswer === letter;
          
          return (
            <button
              key={letter}
              onClick={() => handleChoiceClick(letter)}
              className={cn(
                'w-full flex items-center gap-5 p-5 rounded-xl border-2 text-left transition-all duration-200 group relative overflow-hidden',
                isSelected
                  ? 'border-[#002B7A] bg-[#002B7A]/5 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-[#C59D5F] hover:bg-slate-50 hover:shadow-md'
              )}
            >
              <span
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all',
                  isSelected
                    ? 'bg-[#002B7A] text-white shadow-md scale-110'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-[#C59D5F] group-hover:text-white'
                )}
              >
                {letter}
              </span>
              <span className={cn(
                "flex-1 text-base lg:text-lg font-medium transition-colors",
                isSelected ? "text-[#002B7A] font-semibold" : "text-slate-700 group-hover:text-slate-900"
              )}>
                {question.choices[letter]}
              </span>
              {isSelected && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-6 h-6 text-[#002B7A]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Clear Answer Button */}
      {currentAnswer && (
        <div className="mt-6 flex justify-end">
            <button
            onClick={() => clearAnswer(question.number)}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50"
            >
            <XCircle className="w-4 h-4" />
            Borrar selección
            </button>
        </div>
      )}

      {/* Topic Info Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs lg:text-sm text-slate-500">
        <div className="flex flex-col sm:flex-row sm:gap-4">
             <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-700">Tema:</span> {question.topic}
             </span>
             {question.subtopic && (
                <span className="hidden sm:inline text-slate-300">|</span>
             )}
             {question.subtopic && (
                <span className="flex items-center gap-1">
                     <span className="font-semibold text-slate-700">Subtema:</span> {question.subtopic}
                </span>
             )}
        </div>
      </div>
    </div>
  );
}
