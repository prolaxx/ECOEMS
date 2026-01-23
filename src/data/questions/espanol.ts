import type { ServerQuestion } from '@/types/exam';

export const espanolQuestions: ServerQuestion[] = [
  {
    id: 'q049',
    number: 49,
    section: 'Español',
    topic: 'Gramática',
    subtopic: 'Funciones de palabras',
    difficulty: 3,
    stem: 'Identifica la función de la palabra subrayada en la siguiente oración: "Si pones atención a las clases, obtendrás mejor calificación."',
    choices: {
      A: 'Causal',
      B: 'Temporal',
      C: 'Adverbial',
      D: 'Condicional'
    },
    correctChoice: 'D',
    explanation: 'La palabra "Si" introduce una condición, por lo que su función es condicional.',
    source: { pdfPage: 13 }
  },
  {
    id: 'q050',
    number: 50,
    section: 'Español',
    topic: 'Géneros periodísticos',
    subtopic: 'Tipos de textos',
    difficulty: 2,
    stem: 'Género periodístico de carácter informativo y documental que investiga a fondo un tema de interés social, proporcionando antecedentes, testimonios y un análisis detallado de los hechos.',
    choices: {
      A: 'Reportaje',
      B: 'Noticia',
      C: 'Entrevista',
      D: 'Artículo de opinión'
    },
    correctChoice: 'A',
    explanation: 'El reportaje es un género periodístico que profundiza en un tema con investigación, testimonios y análisis.',
    source: { pdfPage: 14 }
  },
  {
    id: 'q051',
    number: 51,
    section: 'Español',
    topic: 'Gramática',
    subtopic: 'Recursos gramaticales',
    difficulty: 2,
    stem: '¿Qué recurso se usó para identificar al personaje en el siguiente enunciado? "Gael, el primo de mi mejor amigo, ganó el torneo de ajedrez".',
    choices: {
      A: 'Adjetivos',
      B: 'Participios',
      C: 'Un adverbio',
      D: 'Una aposición'
    },
    correctChoice: 'D',
    explanation: 'La aposición es una construcción que amplía o explica el sustantivo al que se refiere: "el primo de mi mejor amigo" es la aposición de "Gael".',
    source: { pdfPage: 14 }
  },
  {
    id: 'q052',
    number: 52,
    section: 'Español',
    topic: 'Ortografía',
    subtopic: 'Signos de puntuación',
    difficulty: 2,
    stem: '¿Qué signo de puntuación es necesario para enmarcar correctamente la cita textual que aparece al final de la siguiente expresión?\nEl profesor siempre recordaba la frase de Jorge Luis Borges: La lectura es una de las formas de la felicidad.',
    choices: {
      A: 'Comillas',
      B: 'Paréntesis',
      C: 'Signos de exclamación',
      D: 'Signos de interrogación'
    },
    correctChoice: 'A',
    explanation: 'Las comillas se utilizan para enmarcar citas textuales, indicando que son palabras exactas de otra persona.',
    source: { pdfPage: 14 }
  },
  {
    id: 'q053',
    number: 53,
    section: 'Español',
    topic: 'Gramática',
    subtopic: 'Categorías gramaticales',
    difficulty: 2,
    stem: 'Analiza las palabras resaltadas en negritas dentro de la siguiente oración e identifica su categoría gramatical:\n"La casa de campo era muy amplia y antigua"',
    choices: {
      A: 'Verbos',
      B: 'Adjetivos',
      C: 'Sustantivos',
      D: 'Pronombres'
    },
    correctChoice: 'B',
    explanation: '"Amplia" y "antigua" son adjetivos calificativos que describen características de la casa.',
    source: { pdfPage: 14 }
  },
  {
    id: 'q054',
    number: 54,
    section: 'Español',
    topic: 'Gramática',
    subtopic: 'Tipos de oraciones',
    difficulty: 3,
    stem: '¿Cómo se clasifica la segunda oración (la que aparece en negritas) dentro del siguiente fragmento, considerando que está separada por un punto y coma?\n"El sol desapareció tras la montaña; la noche extendió su manto oscuro sobre el pueblo."',
    choices: {
      A: 'Secundaria',
      B: 'Compuesta',
      C: 'Coordinada',
      D: 'Yuxtapuesta'
    },
    correctChoice: 'D',
    explanation: 'Las oraciones yuxtapuestas son aquellas que están unidas por signos de puntuación (como el punto y coma) sin nexos coordinantes.',
    source: { pdfPage: 15 }
  },
  {
    id: 'q055',
    number: 55,
    section: 'Español',
    topic: 'Ortografía',
    subtopic: 'Signos de puntuación',
    difficulty: 2,
    stem: 'Elige el signo de puntuación que hace falta para separar los elementos en la siguiente lista:\n"Para el viaje necesito empacar camisas _ pantalones _ zapatos _ una chamarra_ bloqueador solar y una cámara".',
    choices: {
      A: 'Guiones',
      B: 'Comas',
      C: 'Puntos',
      D: 'Comillas'
    },
    correctChoice: 'B',
    explanation: 'Las comas se utilizan para separar elementos de una enumeración.',
    source: { pdfPage: 15 }
  },
  {
    id: 'q056',
    number: 56,
    section: 'Español',
    topic: 'Publicidad',
    subtopic: 'Recursos publicitarios',
    difficulty: 2,
    stem: 'Recurso utilizado en la publicidad que consiste en una frase corta y memorable para resaltar las virtudes de una marca.',
    choices: {
      A: 'Lema o eslogan',
      B: 'Ícono',
      C: 'Logotipo',
      D: 'Referente'
    },
    correctChoice: 'A',
    explanation: 'El eslogan o lema publicitario es una frase breve y memorable que sintetiza el mensaje de una marca.',
    source: { pdfPage: 15 }
  },
  {
    id: 'q057',
    number: 57,
    section: 'Español',
    topic: 'Tipos de textos',
    subtopic: 'Textos legales',
    difficulty: 3,
    stem: 'Lee el siguiente fragmento e identifica su tipo y propósito:\n"Queda estrictamente prohibido subarrendar el inmueble objeto de este contrato, sin el consentimiento previo y por escrito del propietario".',
    choices: {
      A: 'Periodístico - informar',
      B: 'Legal - regular una relación o actividad',
      C: 'Informativo - difundir una noticia',
      D: 'Administrativo - establecer comunicación institucional'
    },
    correctChoice: 'B',
    explanation: 'El fragmento es de tipo legal y su propósito es regular una relación contractual entre arrendador y arrendatario.',
    source: { pdfPage: 15 }
  },
  {
    id: 'q058',
    number: 58,
    section: 'Español',
    topic: 'Gramática',
    subtopic: 'Nexos',
    difficulty: 2,
    stem: 'Selecciona el nexo que indica que dos acciones ocurren al mismo tiempo: "Ella leía su novela favorita ___ su hermano terminaba la tarea de física".',
    choices: {
      A: 'así pues',
      B: 'por lo tanto',
      C: 'mientras',
      D: 'por consecuencia'
    },
    correctChoice: 'C',
    explanation: '"Mientras" es un nexo temporal que indica simultaneidad entre dos acciones.',
    source: { pdfPage: 16 }
  },
  {
    id: 'q059',
    number: 59,
    section: 'Español',
    topic: 'Comprensión lectora',
    subtopic: 'Ordenamiento de ideas',
    difficulty: 2,
    stem: 'Ordena lógicamente los fragmentos del siguiente microrrelato de Augusto Monterroso:\n1. y cuando despertó\n2. todavía estaba allí\n3. el dinosaurio',
    choices: {
      A: '1, 3, 2',
      B: '3, 2, 1',
      C: '2, 1, 3',
      D: '1, 2, 3'
    },
    correctChoice: 'D',
    explanation: 'El microrrelato de Monterroso en orden es: "Y cuando despertó, el dinosaurio todavía estaba allí" (1, 2, 3).',
    source: { pdfPage: 16 }
  },
  {
    id: 'q060',
    number: 60,
    section: 'Español',
    topic: 'Comprensión lectora',
    subtopic: 'Identificación de ejemplos',
    difficulty: 2,
    stem: 'Identifica en el siguiente fragmento el enunciado que presenta un ejemplo:\n"La astronomía nos permite conocer diversos cuerpos celestes. Algunos de los más cercanos son los planetas, como Marte, Júpiter y Saturno, que pueden observarse incluso con telescopios sencillos".',
    choices: {
      A: 'La astronomía nos permite conocer diversos cuerpos celestes',
      B: 'Algunos de los más cercanos son los planetas',
      C: 'Como Marte, Júpiter y Saturno',
      D: 'Que pueden observarse incluso con telescopios sencillos'
    },
    correctChoice: 'C',
    explanation: '"Como Marte, Júpiter y Saturno" es un ejemplo específico de los planetas mencionados.',
    source: { pdfPage: 16 }
  }
];
