import type { ServerQuestion } from '@/types/exam';

export const habilidadMatematicaQuestions: ServerQuestion[] = [
  {
    id: 'q113',
    number: 113,
    section: 'Habilidad Matemática',
    topic: 'Series numéricas',
    subtopic: 'Sucesiones',
    difficulty: 3,
    stem: '¿Qué número sigue en la sucesión numérica: 4, 9, 19, 39, ___?',
    choices: {
      A: '59',
      B: '69',
      C: '78',
      D: '79'
    },
    correctChoice: 'D',
    explanation: 'El patrón es ×2 + 1: 4×2+1=9, 9×2+1=19, 19×2+1=39, 39×2+1=79',
    source: { pdfPage: 31 }
  },
  {
    id: 'q114',
    number: 114,
    section: 'Habilidad Matemática',
    topic: 'Patrones y secuencias',
    subtopic: 'Secuencias visuales',
    difficulty: 3,
    stem: 'Identifica la figura que completa lógicamente la secuencia mostrada.',
    choices: {
      A: 'Opción A',
      B: 'Opción B',
      C: 'Opción C',
      D: 'Opción D'
    },
    correctChoice: 'D',
    explanation: 'La secuencia sigue un patrón de rotación y transformación visual.',
    assets: { images: ['/images/reactivos/habilidad_matematica_114.jpg'] },
    source: { pdfPage: 32 }
  },
  {
    id: 'q115',
    number: 115,
    section: 'Habilidad Matemática',
    topic: 'Razonamiento lógico',
    subtopic: 'Ordenamiento',
    difficulty: 2,
    stem: 'Si Carlos es más alto que Jorge, y Jorge es más bajo que Roberto, pero más alto que Saúl. ¿Quién es el más bajo de todos?',
    choices: {
      A: 'Carlos',
      B: 'Jorge',
      C: 'Roberto',
      D: 'Saúl'
    },
    correctChoice: 'D',
    explanation: 'De la información: Carlos > Jorge, Roberto > Jorge > Saúl. Por lo tanto, Saúl es el más bajo.',
    source: { pdfPage: 32 }
  },
  {
    id: 'q116',
    number: 116,
    section: 'Habilidad Matemática',
    topic: 'Patrones y secuencias',
    subtopic: 'Dobleces de papel',
    difficulty: 3,
    stem: 'Se muestra una hoja de papel cuadrada que ha sido doblada dos veces y luego perforada con un círculo en el centro. ¿Cómo se verá la hoja al desdoblarla completamente?',
    choices: {
      A: 'Opción D',
      B: 'Opción C',
      C: 'Opción B',
      D: 'Opción A'
    },
    correctChoice: 'A',
    explanation: 'Al doblar dos veces y perforar, se crean 4 agujeros simétricos al desdoblar.',
    assets: { images: ['/images/reactivos/habilidad_matematica_116.jpg'] },
    source: { pdfPage: 32 }
  },
  {
    id: 'q117',
    number: 117,
    section: 'Habilidad Matemática',
    topic: 'Problemas matemáticos',
    subtopic: 'Problemas de relojes',
    difficulty: 4,
    stem: 'Un reloj se adelanta 2 minutos cada hora. Si se sincroniza correctamente a las 12:00 p.m., ¿qué hora marcará realmente cuando el reloj indique las 6:12 p.m. del mismo día?',
    choices: {
      A: '6:00 p.m.',
      B: '5:58 p.m.',
      C: '6:24 p.m.',
      D: '5:48 p.m.'
    },
    correctChoice: 'A',
    explanation: 'En 6 horas reales, el reloj se adelanta 12 minutos, así que marca 6:12 cuando realmente son las 6:00.',
    source: { pdfPage: 32 }
  },
  {
    id: 'q118',
    number: 118,
    section: 'Habilidad Matemática',
    topic: 'Patrones y secuencias',
    subtopic: 'Conteo de cubos',
    difficulty: 3,
    stem: '¿Cuántos cubos pequeños conforman el siguiente cuerpo geométrico, considerando los que no se ven a simple vista?',
    choices: {
      A: '21',
      B: '22',
      C: '23',
      D: '24'
    },
    correctChoice: 'C',
    explanation: 'Se deben contar todos los cubos, incluyendo los ocultos en la base de la figura.',
    assets: { images: ['/images/reactivos/habilidad_matematica_118.jpg'] },
    source: { pdfPage: 33 }
  },
  {
    id: 'q119',
    number: 119,
    section: 'Habilidad Matemática',
    topic: 'Problemas matemáticos',
    subtopic: 'Perímetro algebraico',
    difficulty: 3,
    stem: 'El perímetro del siguiente rectángulo se expresa algebraicamente como 24x + 10. Si la base mide 8x + 3, ¿cuál es la expresión algebraica que corresponde a la altura (h)?',
    choices: {
      A: '16x + 4',
      B: '4x + 2',
      C: '8x + 2',
      D: '4x + 4'
    },
    correctChoice: 'B',
    explanation: 'P = 2(base + altura). 24x + 10 = 2(8x + 3 + h). 12x + 5 = 8x + 3 + h. h = 4x + 2.',
    assets: { images: ['/images/reactivos/habilidad_matematica_119.jpg'] },
    source: { pdfPage: 33 }
  },
  {
    id: 'q120',
    number: 120,
    section: 'Habilidad Matemática',
    topic: 'Patrones y secuencias',
    subtopic: 'Conteo de figuras',
    difficulty: 4,
    stem: '¿Cuántos triángulos de cualquier tamaño se pueden contabilizar en la siguiente estructura geométrica?',
    choices: {
      A: '32',
      B: '18',
      C: '16',
      D: '18'
    },
    correctChoice: 'A',
    explanation: 'Se deben contar triángulos de diferentes tamaños: pequeños, medianos y grandes.',
    assets: { images: ['/images/reactivos/habilidad_matematica_120.jpg'] },
    source: { pdfPage: 33 }
  },
  {
    id: 'q121',
    number: 121,
    section: 'Habilidad Matemática',
    topic: 'Series numéricas',
    subtopic: 'Patrones numéricos',
    difficulty: 3,
    stem: 'Identifica el número que rompe el patrón o continúa la serie en la siguiente secuencia: 3, 6, 8, 16, 18, 36, …',
    choices: {
      A: '38',
      B: '40',
      C: '72',
      D: '54'
    },
    correctChoice: 'A',
    explanation: 'El patrón alterna ×2 y +2: 3×2=6, 6+2=8, 8×2=16, 16+2=18, 18×2=36, 36+2=38.',
    source: { pdfPage: 34 }
  },
  {
    id: 'q122',
    number: 122,
    section: 'Habilidad Matemática',
    topic: 'Razonamiento lógico',
    subtopic: 'Problemas de edades',
    difficulty: 3,
    stem: 'En el árbol genealógico de la familia Martínez, si el abuelo tuvo su primer hijo a los 25 años y su nieto nació 30 años después, ¿qué edad tiene el abuelo cuando el nieto cumple 15 años?',
    choices: {
      A: '55 años',
      B: '60 años',
      C: '70 años',
      D: '75 años'
    },
    correctChoice: 'C',
    explanation: 'Cuando nació el nieto, el abuelo tenía 25 + 30 = 55 años. Cuando el nieto cumple 15: 55 + 15 = 70 años.',
    source: { pdfPage: 34 }
  },
  {
    id: 'q123',
    number: 123,
    section: 'Habilidad Matemática',
    topic: 'Problemas matemáticos',
    subtopic: 'Promedios ponderados',
    difficulty: 3,
    stem: 'El promedio de bateo de 5 jugadores es de .250 y el de otros 10 jugadores es de .310. ¿Cuál es el promedio general de los 15 jugadores?',
    choices: {
      A: '.270',
      B: '.280',
      C: '.290',
      D: '.300'
    },
    correctChoice: 'C',
    explanation: 'Promedio ponderado = (5×0.250 + 10×0.310) / 15 = (1.25 + 3.10) / 15 = 4.35 / 15 = 0.290',
    source: { pdfPage: 34 }
  },
  {
    id: 'q124',
    number: 124,
    section: 'Habilidad Matemática',
    topic: 'Problemas matemáticos',
    subtopic: 'Porcentajes compuestos',
    difficulty: 3,
    stem: 'En una oficina, el 70% de los empleados usa anteojos. De ellos, la mitad también usa lentes de contacto. ¿Qué porcentaje del total de la oficina usa ambos?',
    choices: {
      A: '15%',
      B: '35%',
      C: '45%',
      D: '70%'
    },
    correctChoice: 'B',
    explanation: '70% usan anteojos, la mitad de ellos (50% de 70%) = 35% usan ambos.',
    source: { pdfPage: 34 }
  },
  {
    id: 'q125',
    number: 125,
    section: 'Habilidad Matemática',
    topic: 'Problemas matemáticos',
    subtopic: 'Promedios ponderados',
    difficulty: 3,
    stem: 'Un equipo de baloncesto tiene un promedio de altura de 1.90 m para 8 jugadores y un promedio de altura de 1.85 m para los otros 7 jugadores. ¿Cuál es el promedio de altura general del equipo?',
    choices: {
      A: '1.8767 m',
      B: '1.8812 m',
      C: '1.8901 m',
      D: '1.9092 m'
    },
    correctChoice: 'A',
    explanation: 'Promedio = (8×1.90 + 7×1.85) / 15 = (15.20 + 12.95) / 15 = 28.15 / 15 = 1.8767 m',
    source: { pdfPage: 35 }
  },
  {
    id: 'q126',
    number: 126,
    section: 'Habilidad Matemática',
    topic: 'Series numéricas',
    subtopic: 'Secuencias complejas',
    difficulty: 4,
    stem: 'Determina el valor que completa la secuencia lógica en la siguiente secuencia: 4, 7, 9, 32, 56, ?',
    choices: {
      A: '64',
      B: '72',
      C: '81',
      D: '90'
    },
    correctChoice: 'B',
    explanation: 'El patrón involucra operaciones que llevan al siguiente número = 72.',
    source: { pdfPage: 35 }
  },
  {
    id: 'q127',
    number: 127,
    section: 'Habilidad Matemática',
    topic: 'Estadística',
    subtopic: 'Moda',
    difficulty: 2,
    stem: 'En un grupo de amigos, las edades son: 14, 15, 14, 16, 15, 14, 14, 17, 14. Determina la moda de este conjunto de datos.',
    choices: {
      A: '14',
      B: '15',
      C: '16',
      D: '17'
    },
    correctChoice: 'A',
    explanation: 'La moda es el valor que más se repite. El 14 aparece 5 veces, más que cualquier otro.',
    source: { pdfPage: 35 }
  },
  {
    id: 'q128',
    number: 128,
    section: 'Habilidad Matemática',
    topic: 'Series numéricas',
    subtopic: 'Sucesiones',
    difficulty: 3,
    stem: 'Determina qué número continúa lógicamente la siguiente secuencia: 3, 4, 7, 12, 19, ?',
    choices: {
      A: '28',
      B: '26',
      C: '30',
      D: '32'
    },
    correctChoice: 'A',
    explanation: 'Las diferencias son: +1, +3, +5, +7, +9 (números impares). 19 + 9 = 28.',
    source: { pdfPage: 35 }
  }
];
