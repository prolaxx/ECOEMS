'use client';

import { useEffect, useRef } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useExamStore } from '@/store/examStore';
import { formatTime, cn } from '@/lib/utils';

export function Timer() {
  const { remainingSeconds, isTimerRunning, tick } = useExamStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, tick]);

  const isLowTime = remainingSeconds <= 600; // Less than 10 minutes
  const isCriticalTime = remainingSeconds <= 300; // Less than 5 minutes

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-2.5 rounded-full font-mono text-lg font-bold transition-all shadow-sm border',
        isCriticalTime
          ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
          : isLowTime
          ? 'bg-amber-50 border-amber-200 text-amber-600'
          : 'bg-white border-slate-200 text-[#002B7A]'
      )}
    >
      {isCriticalTime ? (
        <AlertTriangle className="w-5 h-5" />
      ) : (
        <Clock className="w-5 h-5 text-[#C59D5F]" />
      )}
      <span className="tracking-widest">{formatTime(remainingSeconds)}</span>
    </div>
  );
}
