'use client';

import { useEffect } from 'react';
import { useExamStore } from '@/store/examStore';

export function useTelemetry() {
  const { recordTelemetryEvent, currentAttempt } = useExamStore();

  useEffect(() => {
    if (!currentAttempt || currentAttempt.isCompleted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordTelemetryEvent('visibilitychange');
      }
    };

    const handleBlur = () => {
      recordTelemetryEvent('blur');
    };

    const handleFocus = () => {
      recordTelemetryEvent('focus');
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        recordTelemetryEvent('fullscreenchange');
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [currentAttempt, recordTelemetryEvent]);
}

export function useFullscreen() {
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Error attempting to enable fullscreen:', err);
      });
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.log('Error attempting to exit fullscreen:', err);
      });
    }
  };

  const isFullscreen = () => {
    return !!document.fullscreenElement;
  };

  return { enterFullscreen, exitFullscreen, isFullscreen };
}
