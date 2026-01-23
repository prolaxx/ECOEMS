import type { ServerQuestion } from '@/types/exam';

export const matematicasQuestions: ServerQuestion[] = [
  {
    id: 'q101',
    number: 101,
    section: 'Matemáticas',
    topic: 'Álgebra',
    subtopic: 'Simplificación de expresiones',
    difficulty: 3,
    stem: 'Simplifica la siguiente expresión algebraica: 3x(2x - 5) - 4x² + 8x',
    choices: {
      A: '2x² + 3x',
      B: '2x² - 7x',
      C: '10x² - 7x',
      D: '6x² - 15x'
    },
    correctChoice: 'B',
    explanation: '3x(2x - 5) - 4x² + 8x = 6x² - 15x - 4x² + 8x = 2x² - 7x',
    source: { pdfPage: 28 }
  },
  {
    id: 'q102',
    number: 102,
    section: 'Matemáticas',
    topic: 'Estadística',
    subtopic: 'Media aritmética',
    difficulty: 2,
    stem: 'Un estudiante obtuvo las siguientes calificaciones en sus primeros cinco exámenes de física: 7, 9, 6, 10 y 8. ¿Cuál es el promedio (media aritmética) de sus calificaciones?',
    choices: {
      A: '7.5',
      B: '8.0',
      C: '8.2',
      D: '8.5'
    },
    correctChoice: 'B',
    explanation: 'Promedio = (7 + 9 + 6 + 10 + 8) / 5 = 40 / 5 = 8.0',
    source: { pdfPage: 28 }
  },
  {
    id: 'q103',
    number: 103,
    section: 'Matemáticas',
    topic: 'Geometría',
    subtopic: 'Triángulos semejantes',
    difficulty: 3,
    stem: 'Observa los triángulos semejantes. Si sabemos que el triángulo pequeño y el grande son proporcionales, ¿cuál es el valor de la altura "h" del triángulo mayor?',
    choices: {
      A: '12 m',
      B: '15 m',
      C: '18 m',
      D: '20 m'
    },
    correctChoice: 'C',
    explanation: 'Por la propiedad de triángulos semejantes, las alturas son proporcionales a los lados correspondientes. h = 18 m.',
    assets: { images: ['/images/reactivos/matematica_103.jpg'] },
    source: { pdfPage: 29 }
  },
  {
    id: 'q104',
    number: 104,
    section: 'Matemáticas',
    topic: 'Álgebra',
    subtopic: 'Sistemas de ecuaciones',
    difficulty: 3,
    stem: 'Para una función de cine, una familia pagó $410 pesos por 3 boletos de adulto y 2 de niño. Otra familia pagó $340 pesos por 2 boletos de adulto y 3 de niño. ¿Cuál es el sistema de ecuaciones que permite conocer el precio de cada tipo de boleto (x = adulto, y = niño)?',
    choices: {
      A: '3x + 2y = 340; 2x + 3y = 410',
      B: '3x - 2y = 410; 2x - 3y = 340',
      C: '2x + 2y = 410; 3x + 3y = 340',
      D: '3x + 2y = 410; 2x + 3y = 340'
    },
    correctChoice: 'D',
    explanation: '3 adultos + 2 niños = $410 → 3x + 2y = 410; 2 adultos + 3 niños = $340 → 2x + 3y = 340',
    source: { pdfPage: 29 }
  },
  {
    id: 'q105',
    number: 105,
    section: 'Matemáticas',
    topic: 'Trigonometría',
    subtopic: 'Funciones trigonométricas',
    difficulty: 3,
    stem: 'Una escalera de 10 metros de longitud está recargada sobre una pared vertical. Si el pie de la escalera está a 6 metros de la base de la pared, ¿qué función trigonométrica nos permite calcular el ángulo (A) que forma la escalera con el suelo?',
    choices: {
      A: 'sen(A) = 6/10',
      B: 'tan(A) = 10/6',
      C: 'cos(A) = 6/10',
      D: 'cos(A) = 10/6'
    },
    correctChoice: 'C',
    explanation: 'El coseno es cateto adyacente / hipotenusa. cos(A) = 6/10 = 0.6',
    assets: { images: ['/images/reactivos/matematica_105.jpg'] },
    source: { pdfPage: 29 }
  },
  {
    id: 'q106',
    number: 106,
    section: 'Matemáticas',
    topic: 'Álgebra',
    subtopic: 'Ecuación cuadrática',
    difficulty: 3,
    stem: 'Identifica cuál de las siguientes es la fórmula general utilizada para resolver ecuaciones cuadráticas de la forma ax² + bx + c = 0',
    choices: {
      A: 'x = (-b ± √(b² - 4ac)) / 2a',
      B: 'x = (b ± √(b² + 4ac)) / 2a',
      C: 'x = (-b ± √(b² - 4ac)) / 2',
      D: 'x = b² - 4ac'
    },
    correctChoice: 'A',
    explanation: 'La fórmula general para ecuaciones cuadráticas es x = (-b ± √(b² - 4ac)) / 2a',
    assets: { images: ['/images/reactivos/matematica_106.jpg'] },
    source: { pdfPage: 30 }
  },
  {
    id: 'q107',
    number: 107,
    section: 'Matemáticas',
    topic: 'Álgebra',
    subtopic: 'Productos notables',
    difficulty: 3,
    stem: 'Al desarrollar el producto notable (3x + 4)² el resultado correcto es:',
    choices: {
      A: '9x² + 16',
      B: '9x² + 12x + 16',
      C: '9x² + 24x + 16',
      D: '3x² + 24x + 16'
    },
    correctChoice: 'C',
    explanation: '(3x + 4)² = (3x)² + 2(3x)(4) + 4² = 9x² + 24x + 16',
    source: { pdfPage: 30 }
  },
  {
    id: 'q108',
    number: 108,
    section: 'Matemáticas',
    topic: 'Geometría',
    subtopic: 'Áreas compuestas',
    difficulty: 3,
    stem: 'Calcula el área total de la figura compuesta en forma de "L", considerando las medidas en centímetros proporcionadas en la imagen.',
    choices: {
      A: '28 cm²',
      B: '32 cm²',
      C: '36 cm²',
      D: '40 cm²'
    },
    correctChoice: 'C',
    explanation: 'El área de la figura en L se calcula dividiendo en rectángulos y sumando sus áreas = 36 cm².',
    assets: { images: ['/images/reactivos/matematica_108.jpg'] },
    source: { pdfPage: 30 }
  },
  {
    id: 'q109',
    number: 109,
    section: 'Matemáticas',
    topic: 'Álgebra',
    subtopic: 'Problemas con ecuaciones',
    difficulty: 2,
    stem: 'La edad de Mariana es el triple que la de su hermano Luis. Si la suma de ambas edades es 24 años, ¿cuántos años tiene Luis?',
    choices: {
      A: '6 años',
      B: '8 años',
      C: '12 años',
      D: '18 años'
    },
    correctChoice: 'A',
    explanation: 'Sea x la edad de Luis. Mariana = 3x. x + 3x = 24, 4x = 24, x = 6 años.',
    source: { pdfPage: 30 }
  },
  {
    id: 'q110',
    number: 110,
    section: 'Matemáticas',
    topic: 'Probabilidad',
    subtopic: 'Probabilidad simple',
    difficulty: 2,
    stem: 'En una urna hay 5 canicas rojas, 3 azules y 2 verdes. Si sacas una canica al azar, ¿cuál es la probabilidad de que sea azul?',
    choices: {
      A: '3/10',
      B: '1/3',
      C: '5/10',
      D: '2/10'
    },
    correctChoice: 'A',
    explanation: 'Total = 10 canicas. P(azul) = 3/10',
    source: { pdfPage: 31 }
  },
  {
    id: 'q111',
    number: 111,
    section: 'Matemáticas',
    topic: 'Aritmética',
    subtopic: 'Problemas',
    difficulty: 4,
    stem: 'Una persona compró una guitarra eléctrica por $15,600 pesos y pagó con 45 billetes de tres denominaciones: $1,000, $200 y $100. ¿Cuál es la combinación de billetes que entregó?',
    choices: {
      A: '12 de $1,000, 20 de $200 y 13 de $100',
      B: '10 de $1,000, 25 de $200 y 10 de $100',
      C: '8 de $1,000, 30 de $200 y 7 de $100',
      D: '9 de $1,000, 24 de $200 y 12 de $100'
    },
    correctChoice: 'D',
    explanation: '9×1000 + 24×200 + 12×100 = 9000 + 4800 + 1200 = 15600. Total billetes: 9+24+12 = 45.',
    source: { pdfPage: 31 }
  },
  {
    id: 'q112',
    number: 112,
    section: 'Matemáticas',
    topic: 'Geometría',
    subtopic: 'Semejanza de triángulos',
    difficulty: 4,
    stem: 'Se desea calcular la profundidad de un pozo. Un observador de 1.6 m de altura se sitúa a 2 m del borde; su visual une el borde con el extremo inferior opuesto. Si el pozo tiene 3 m de ancho, ¿cuál es su profundidad?',
    choices: {
      A: '1.8 m',
      B: '2.4 m',
      C: '3.2 m',
      D: '4.0 m'
    },
    correctChoice: 'B',
    explanation: 'Por semejanza de triángulos: 1.6/2 = h/3, entonces h = (1.6 × 3)/2 = 2.4 m',
    assets: { images: ['/images/reactivos/matematica_112.jpg'] },
    source: { pdfPage: 31 }
  }
];
