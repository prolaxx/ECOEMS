import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  // Generate a valid UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDateShort(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTrafficLightColor(percent: number): 'verde' | 'amarillo' | 'rojo' {
  if (percent >= 70) return 'verde';
  if (percent >= 50) return 'amarillo';
  return 'rojo';
}

export function getGradeMessage(percent: number): { grade: string; message: string } {
  if (percent >= 90) {
    return {
      grade: 'Excelente',
      message: '¡Felicidades! Tienes un dominio sobresaliente del contenido. Enfócate en pulir los detalles.'
    };
  }
  if (percent >= 80) {
    return {
      grade: 'Muy Bien',
      message: 'Tienes una base sólida. Con algo de práctica en áreas específicas, puedes alcanzar la excelencia.'
    };
  }
  if (percent >= 70) {
    return {
      grade: 'Bien',
      message: 'Vas por buen camino. Identifica tus áreas débiles y dedícales tiempo adicional.'
    };
  }
  if (percent >= 60) {
    return {
      grade: 'Suficiente',
      message: 'Necesitas reforzar varias áreas. Sigue el plan de estudio para mejorar significativamente.'
    };
  }
  if (percent >= 50) {
    return {
      grade: 'Regular',
      message: 'Es momento de intensificar tu preparación. El plan de estudio te ayudará a subir tu rendimiento.'
    };
  }
  return {
    grade: 'Necesita Mejorar',
    message: 'Requieres dedicar más tiempo a la preparación. No te desanimes, el diagnóstico te muestra exactamente qué estudiar.'
  };
}

export function calculateExpectedGain(
  totalQuestions: number,
  currentPercent: number,
  targetPercent: number = 0.8
): number {
  const currentCorrect = Math.round(totalQuestions * currentPercent);
  const targetCorrect = Math.round(totalQuestions * targetPercent);
  return Math.max(0, targetCorrect - currentCorrect);
}

export function calculatePriorityScore(
  sectionWeight: number,
  subtopicPercent: number,
  frequency: number = 1,
  easeBonus: number = 0
): number {
  return (sectionWeight * (1 - subtopicPercent) * frequency) + easeBonus;
}
