import type { ServerQuestion } from '@/types/exam';

export const biologiaQuestions: ServerQuestion[] = [
  {
    id: 'q025',
    number: 25,
    section: 'Biología',
    topic: 'Evolución',
    subtopic: 'Selección natural',
    difficulty: 2,
    stem: '¿Qué personaje histórico propuso que el mecanismo central de la evolución de las especies se basa en la selección natural?',
    choices: {
      A: 'Alexander Fleming',
      B: 'Jean-Baptiste Lamarck',
      C: 'Charles Darwin',
      D: 'Francis Crick'
    },
    correctChoice: 'C',
    explanation: 'Charles Darwin propuso la teoría de la evolución por selección natural en su obra "El origen de las especies" (1859).',
    source: { pdfPage: 7 }
  },
  {
    id: 'q026',
    number: 26,
    section: 'Biología',
    topic: 'Cuerpo humano',
    subtopic: 'Sistema óseo',
    difficulty: 2,
    stem: 'Para prevenir el desarrollo de la osteoporosis y fortalecer el sistema óseo, los especialistas sugieren consumir alimentos con alto contenido de:',
    choices: {
      A: 'Magnesio',
      B: 'Zinc',
      C: 'Calcio',
      D: 'Sodio'
    },
    correctChoice: 'C',
    explanation: 'El calcio es el mineral esencial para la formación y mantenimiento de huesos fuertes, previniendo la osteoporosis.',
    source: { pdfPage: 7 }
  },
  {
    id: 'q027',
    number: 27,
    section: 'Biología',
    topic: 'Reproducción',
    subtopic: 'Reproducción asexual',
    difficulty: 2,
    stem: 'Tipo de reproducción asexual donde un nuevo individuo crece como un brote o yema del progenitor (ej. levaduras).',
    choices: {
      A: 'Bipartición',
      B: 'Esporulación',
      C: 'Gemación',
      D: 'Fragmentación'
    },
    correctChoice: 'C',
    explanation: 'La gemación es un tipo de reproducción asexual donde un nuevo organismo se desarrolla a partir de una yema o brote del progenitor.',
    source: { pdfPage: 7 }
  },
  {
    id: 'q028',
    number: 28,
    section: 'Biología',
    topic: 'Célula y funciones',
    subtopic: 'Fotosíntesis',
    difficulty: 3,
    stem: 'En el proceso de la fotosíntesis, la planta requiere de ciertos elementos para sintetizar glucosa y liberar oxígeno. Elige la opción que completa el esquema: Se necesita ___, ___ y luz para producir glucosa y oxígeno.',
    choices: {
      A: 'Agua y bióxido de carbono',
      B: 'Aire y metano',
      C: 'Ozono y bióxido de carbono',
      D: 'Nitrógeno y oxígeno'
    },
    correctChoice: 'A',
    explanation: 'La fotosíntesis requiere agua (H₂O), dióxido de carbono (CO₂) y luz solar para producir glucosa (C₆H₁₂O₆) y oxígeno (O₂).',
    source: { pdfPage: 7 }
  },
  {
    id: 'q029',
    number: 29,
    section: 'Biología',
    topic: 'Célula y funciones',
    subtopic: 'División celular',
    difficulty: 3,
    stem: '¿Cuál es el proceso de división celular encargado de generar los gametos, donde se reduce a la mitad la carga cromosómica original?',
    choices: {
      A: 'Mitosis',
      B: 'Ciclo celular',
      C: 'Meiosis',
      D: 'Fisión binaria'
    },
    correctChoice: 'C',
    explanation: 'La meiosis es el proceso de división celular que produce células sexuales (gametos) con la mitad de cromosomas.',
    source: { pdfPage: 8 }
  },
  {
    id: 'q030',
    number: 30,
    section: 'Biología',
    topic: 'Reproducción',
    subtopic: 'Métodos anticonceptivos',
    difficulty: 2,
    stem: 'Identifica los métodos anticonceptivos que funcionan como una barrera (química o física) para evitar la unión del óvulo y el espermatozoide:',
    choices: {
      A: 'Vasectomía y Ritmo',
      B: 'Diafragma y Condón',
      C: 'Anillo vaginal y Ritmo',
      D: 'Dispositivo intrauterino y Vasectomía'
    },
    correctChoice: 'B',
    explanation: 'El diafragma y el condón son métodos de barrera física que impiden el contacto entre el óvulo y el espermatozoide.',
    source: { pdfPage: 8 }
  },
  {
    id: 'q031',
    number: 31,
    section: 'Biología',
    topic: 'Salud',
    subtopic: 'Infecciones de transmisión sexual',
    difficulty: 2,
    stem: 'Infección de transmisión sexual viral que puede provocar verrugas genitales y, en tipos de alto riesgo, cáncer cervicouterino.',
    choices: {
      A: 'Sífilis',
      B: 'VPH (Virus del Papiloma Humano)',
      C: 'Gonorrea',
      D: 'VIH'
    },
    correctChoice: 'B',
    explanation: 'El VPH (Virus del Papiloma Humano) es una infección viral que puede causar verrugas genitales y ciertos tipos de cáncer.',
    source: { pdfPage: 8 }
  },
  {
    id: 'q032',
    number: 32,
    section: 'Biología',
    topic: 'Célula y funciones',
    subtopic: 'Respiración celular',
    difficulty: 2,
    stem: '¿Cómo se denomina a la respiración de los organismos que no pueden subsistir si el entorno carece de oxígeno?',
    choices: {
      A: 'Fotosíntesis',
      B: 'Respiración celular',
      C: 'Aerobia',
      D: 'Anabolismo'
    },
    correctChoice: 'C',
    explanation: 'La respiración aerobia es aquella que requiere oxígeno para llevarse a cabo; los organismos aerobios dependen del O₂.',
    source: { pdfPage: 8 }
  },
  {
    id: 'q033',
    number: 33,
    section: 'Biología',
    topic: 'Características de los seres vivos',
    subtopic: 'Irritabilidad',
    difficulty: 2,
    stem: 'Es la capacidad fundamental de todo ser vivo para reaccionar ante estímulos o variaciones físicas y químicas del entorno:',
    choices: {
      A: 'Crecimiento',
      B: 'Adaptación',
      C: 'Irritabilidad',
      D: 'Homeostasis'
    },
    correctChoice: 'C',
    explanation: 'La irritabilidad es la capacidad de los seres vivos de responder a estímulos del ambiente interno o externo.',
    source: { pdfPage: 9 }
  },
  {
    id: 'q034',
    number: 34,
    section: 'Biología',
    topic: 'Salud',
    subtopic: 'Enfermedades',
    difficulty: 2,
    stem: 'Enfermedad crónica caracterizada por niveles elevados de glucosa en sangre debido a que el cuerpo no utiliza adecuadamente la insulina.',
    choices: {
      A: 'Anemia',
      B: 'Diabetes Mellitus Tipo 2',
      C: 'Hipertensión',
      D: 'Obesidad'
    },
    correctChoice: 'B',
    explanation: 'La Diabetes Mellitus Tipo 2 se caracteriza por resistencia a la insulina, lo que provoca niveles elevados de glucosa en sangre.',
    source: { pdfPage: 9 }
  },
  {
    id: 'q035',
    number: 35,
    section: 'Biología',
    topic: 'Ecología',
    subtopic: 'Cambio climático',
    difficulty: 2,
    stem: '¿Cuál de los siguientes fenómenos es una consecuencia directa del calentamiento global que afecta las zonas costeras?',
    choices: {
      A: 'Incremento de residuos sólidos',
      B: 'Elevación del nivel de los océanos',
      C: 'Disminución de gases tóxicos',
      D: 'Mejora en la calidad del agua'
    },
    correctChoice: 'B',
    explanation: 'El calentamiento global causa el derretimiento de glaciares y la expansión térmica del agua, elevando el nivel del mar.',
    source: { pdfPage: 9 }
  },
  {
    id: 'q036',
    number: 36,
    section: 'Biología',
    topic: 'Ecología',
    subtopic: 'Biodiversidad',
    difficulty: 2,
    stem: 'Principal causa de la pérdida de biodiversidad que consiste en eliminar la vegetación forestal para agricultura o zonas urbanas.',
    choices: {
      A: 'Contaminación',
      B: 'Deforestación',
      C: 'Caza furtiva',
      D: 'Cambio climático'
    },
    correctChoice: 'B',
    explanation: 'La deforestación es la principal causa de pérdida de biodiversidad al destruir los hábitats naturales de numerosas especies.',
    source: { pdfPage: 9 }
  }
];
