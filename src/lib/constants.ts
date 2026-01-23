import type { ExamConfig, SectionWeight } from '@/types/exam';

// Exam Sections as they appear in the PDF
export const EXAM_SECTIONS = [
  'Geografía',
  'Formación Cívica y Ética',
  'Historia',
  'Biología',
  'Química',
  'Física',
  'Español',
  'Habilidad Verbal',
  'Matemáticas',
  'Habilidad Matemática'
] as const;

// Section weights for priority calculation (can be adjusted)
export const SECTION_WEIGHTS: SectionWeight[] = [
  { section: 'Matemáticas', weight: 1.2 },
  { section: 'Habilidad Matemática', weight: 1.1 },
  { section: 'Español', weight: 1.0 },
  { section: 'Habilidad Verbal', weight: 1.0 },
  { section: 'Física', weight: 1.0 },
  { section: 'Química', weight: 1.0 },
  { section: 'Biología', weight: 0.9 },
  { section: 'Historia', weight: 0.9 },
  { section: 'Geografía', weight: 0.9 },
  { section: 'Formación Cívica y Ética', weight: 0.9 }
];

// Exam configurations
export const EXAM_CONFIGS: Record<string, Omit<ExamConfig, 'selectedSection'>> = {
  simulador_realista: {
    mode: 'simulador_realista',
    questionCount: 128,
    maxTimeSeconds: 3 * 60 * 60, // 3 hours
    shuffleQuestions: false
  },
  diagnostico_rapido: {
    mode: 'diagnostico_rapido',
    questionCount: 40,
    maxTimeSeconds: 60 * 60, // 1 hour
    shuffleQuestions: false
  },
  practica_area_20: {
    mode: 'practica_area',
    questionCount: 20,
    maxTimeSeconds: 30 * 60, // 30 minutes
    shuffleQuestions: true
  },
  practica_area_40: {
    mode: 'practica_area',
    questionCount: 40,
    maxTimeSeconds: 60 * 60, // 1 hour
    shuffleQuestions: true
  }
};

// LocalStorage keys
export const STORAGE_KEYS = {
  CURRENT_ATTEMPT: 'ecoems_current_attempt',
  ATTEMPT_HISTORY: 'ecoems_attempt_history',
  USER_PREFERENCES: 'ecoems_user_preferences'
} as const;

// Autosave interval (milliseconds)
export const AUTOSAVE_INTERVAL = 5000; // 5 seconds

// Colors for UI
export const TRAFFIC_LIGHT_COLORS = {
  verde: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-500',
    fill: '#10b981'
  },
  amarillo: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-500',
    fill: '#f59e0b'
  },
  rojo: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-500',
    fill: '#f43f5e'
  }
} as const;

// Question status colors
export const STATUS_COLORS = {
  not_seen: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-300'
  },
  answered: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-500'
  },
  flagged: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-500'
  },
  unanswered: {
    bg: 'bg-slate-50',
    text: 'text-slate-500',
    border: 'border-slate-200'
  }
} as const;

// Topics by section (will be populated from question bank)
export const SECTION_TOPICS: Record<string, string[]> = {
  'Geografía': [
    'Espacio geográfico',
    'Recursos naturales',
    'Población y cultura',
    'Riesgos y desastres',
    'Desarrollo sustentable'
  ],
  'Formación Cívica y Ética': [
    'Valores y ciudadanía',
    'Democracia y participación',
    'Normas y leyes',
    'Derechos humanos',
    'Identidad y diversidad'
  ],
  'Historia': [
    'Prehispánico',
    'Colonia',
    'Independencia',
    'Siglo XIX',
    'Revolución Mexicana',
    'México contemporáneo',
    'Historia Universal'
  ],
  'Biología': [
    'Célula y funciones',
    'Genética y herencia',
    'Evolución',
    'Ecología',
    'Cuerpo humano'
  ],
  'Química': [
    'Estructura atómica',
    'Tabla periódica',
    'Enlaces químicos',
    'Reacciones químicas',
    'Química orgánica'
  ],
  'Física': [
    'Mecánica',
    'Energía y trabajo',
    'Ondas',
    'Electricidad',
    'Óptica'
  ],
  'Español': [
    'Comprensión lectora',
    'Gramática',
    'Ortografía',
    'Redacción',
    'Literatura'
  ],
  'Habilidad Verbal': [
    'Analogías',
    'Sinónimos y antónimos',
    'Comprensión de textos',
    'Ordenamiento de ideas'
  ],
  'Matemáticas': [
    'Aritmética',
    'Álgebra',
    'Geometría',
    'Trigonometría',
    'Probabilidad y estadística'
  ],
  'Habilidad Matemática': [
    'Series numéricas',
    'Razonamiento lógico',
    'Problemas matemáticos',
    'Patrones y secuencias'
  ]
};
