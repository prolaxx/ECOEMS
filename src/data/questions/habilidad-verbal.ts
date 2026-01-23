import type { ServerQuestion } from '@/types/exam';

export const habilidadVerbalQuestions: ServerQuestion[] = [
  {
    id: 'q061',
    number: 61,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Antónimos',
    difficulty: 2,
    stem: 'Selecciona el antónimo de la palabra en mayúsculas: "La habitación estaba TOTALMENTE oscura".',
    choices: {
      A: 'Sombría',
      B: 'Clara',
      C: 'Opaca',
      D: 'Tenue'
    },
    correctChoice: 'B',
    explanation: 'El antónimo de "oscura" es "clara". La pregunta pide el antónimo del estado descrito.',
    source: { pdfPage: 17 }
  },
  {
    id: 'q062',
    number: 62,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Antónimos',
    difficulty: 2,
    stem: 'Selecciona la palabra que exprese lo OPUESTO a la palabra en mayúsculas en la siguiente frase:\n"Aunque suele ser muy paciente, esta vez se mostró IMPACIENTE ante la situación"',
    choices: {
      A: 'Ansioso',
      B: 'Nervioso',
      C: 'Sereno',
      D: 'Desesperado'
    },
    correctChoice: 'C',
    explanation: '"Sereno" es lo opuesto a "impaciente", ya que implica calma y tranquilidad.',
    source: { pdfPage: 17 }
  },
  {
    id: 'q063',
    number: 63,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Sinónimos',
    difficulty: 2,
    stem: 'Identifica el sinónimo de la palabra en mayúsculas: "El estudiante entregó su proyecto final con una PULCRITUD admirable, cuidando cada detalle de la presentación".',
    choices: {
      A: 'Rapidez',
      B: 'Suciedad',
      C: 'Esmero',
      D: 'Descuido'
    },
    correctChoice: 'C',
    explanation: '"Esmero" es sinónimo de "pulcritud", ambos refieren al cuidado y atención al detalle.',
    source: { pdfPage: 17 }
  },
  {
    id: 'q064',
    number: 64,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Sinónimos',
    difficulty: 2,
    stem: 'Elige la opción que tenga un significado SIMILAR a la palabra resaltada en el enunciado:\n"El fenómeno astronómico fue EFÍMERO, pues el destello del meteoro apenas pudo apreciarse durante un par de segundos en el firmamento".',
    choices: {
      A: 'Duradero',
      B: 'Fugaz',
      C: 'Teatral',
      D: 'Destellante'
    },
    correctChoice: 'B',
    explanation: '"Fugaz" significa de corta duración, igual que "efímero".',
    source: { pdfPage: 18 }
  },
  {
    id: 'q065',
    number: 65,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Sinónimos',
    difficulty: 2,
    stem: 'Sinónimo de la palabra en mayúsculas: "El arqueólogo fue muy SAGAZ al descubrir la entrada oculta de la pirámide, basándose únicamente en la posición de las sombras al atardecer".',
    choices: {
      A: 'Lento',
      B: 'Despistado',
      C: 'Astuto',
      D: 'Ingenuo'
    },
    correctChoice: 'C',
    explanation: '"Astuto" es sinónimo de "sagaz", ambos refieren a agudeza e inteligencia.',
    source: { pdfPage: 18 }
  },
  {
    id: 'q066',
    number: 66,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Sinónimos',
    difficulty: 2,
    stem: 'Selecciona la opción que presenta un significado similar a la palabra resaltada en el siguiente enunciado:\n"Al cruzar la cordillera, los viajeros se sintieron pequeños ante el vasto horizonte que se desplegaba frente a ellos".',
    choices: {
      A: 'Estrecho',
      B: 'Diminuto',
      C: 'Limitado',
      D: 'Extenso'
    },
    correctChoice: 'D',
    explanation: '"Extenso" es sinónimo de "vasto", ambos refieren a algo muy amplio o grande.',
    source: { pdfPage: 18 }
  },
  {
    id: 'q067',
    number: 67,
    section: 'Habilidad Verbal',
    topic: 'Sinónimos y antónimos',
    subtopic: 'Sinónimos',
    difficulty: 2,
    stem: 'Sinónimo de la palabra en mayúsculas: "La danza de la bailarina era muy DELICADA".',
    choices: {
      A: 'Ágil',
      B: 'Tosco',
      C: 'Pesado',
      D: 'Sutil'
    },
    correctChoice: 'D',
    explanation: '"Sutil" es sinónimo de "delicada", ambos refieren a algo fino y refinado.',
    source: { pdfPage: 18 }
  },
  {
    id: 'q068',
    number: 68,
    section: 'Habilidad Verbal',
    topic: 'Analogías',
    subtopic: 'Relaciones de asociación',
    difficulty: 3,
    stem: 'Grito es a Independencia como:',
    choices: {
      A: 'Árbol es a esfera',
      B: 'Ofrenda es a Día de Muertos',
      C: 'Cena es a familia',
      D: 'Escuela es a fiestas patrias'
    },
    correctChoice: 'B',
    explanation: 'La relación es símbolo-celebración. El Grito es símbolo de la Independencia, como la Ofrenda es símbolo del Día de Muertos.',
    source: { pdfPage: 19 }
  },
  {
    id: 'q069',
    number: 69,
    section: 'Habilidad Verbal',
    topic: 'Analogías',
    subtopic: 'Relaciones funcionales',
    difficulty: 3,
    stem: 'Combustible es a motor como:',
    choices: {
      A: 'Planta es a plaga',
      B: 'Carne es a león',
      C: 'Gusano es a tierra',
      D: 'Comida es a agua'
    },
    correctChoice: 'B',
    explanation: 'La relación es alimento-consumidor/máquina. El combustible alimenta al motor, como la carne alimenta al león.',
    source: { pdfPage: 19 }
  },
  // Lectura 1 - El cerebro y la realidad (preguntas 70-73)
  {
    id: 'q070',
    number: 70,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 1 - Significado',
    difficulty: 3,
    stem: 'LECTURA 1 (Fragmento de "El cerebro y la realidad" de Ruy Pérez Tamayo):\n\n"El cerebro no solo recibe información del mundo exterior, sino que la interpreta basándose en sus experiencias previas. Lo que llamamos \'realidad\' es en gran medida una construcción mental. Por ello, dos personas pueden presenciar el mismo evento y recordarlo de maneras distintas. Esta capacidad de interpretación es lo que nos permite aprender y adaptarnos, pero también es la fuente de nuestros prejuicios".\n\nEl término "interpretación" en el texto se refiere a...',
    choices: {
      A: 'La recepción pasiva de datos sensoriales',
      B: 'El proceso mental de dar significado a la información',
      C: 'Un error de la memoria a largo plazo',
      D: 'La capacidad de hablar varios idiomas'
    },
    correctChoice: 'B',
    explanation: 'En el contexto del texto, "interpretación" se refiere al proceso activo del cerebro de dar significado a la información recibida.',
    source: { pdfPage: 19 }
  },
  {
    id: 'q071',
    number: 71,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 1 - Conclusiones',
    difficulty: 3,
    stem: 'LECTURA 1 (Fragmento de "El cerebro y la realidad"):\n\n¿Cuál es una conclusión que se puede extraer del texto?',
    choices: {
      A: 'La realidad es un concepto absoluto e igual para todos',
      B: 'El cerebro construye nuestra percepción de lo que nos rodea',
      C: 'Los prejuicios son imposibles de eliminar',
      D: 'Dos personas siempre recordarán lo mismo si el evento fue importante'
    },
    correctChoice: 'B',
    explanation: 'El texto concluye que la realidad es una construcción mental, por lo tanto el cerebro construye nuestra percepción.',
    source: { pdfPage: 20 }
  },
  {
    id: 'q072',
    number: 72,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 1 - Ideas del autor',
    difficulty: 3,
    stem: 'LECTURA 1 (Fragmento de "El cerebro y la realidad"):\n\nSegún el autor...',
    choices: {
      A: 'El cerebro es un espejo perfecto de la realidad externa',
      B: 'Las experiencias pasadas influyen en cómo percibimos el presente',
      C: 'El aprendizaje no depende de la interpretación cerebral',
      D: 'Los eventos externos no afectan al cerebro'
    },
    correctChoice: 'B',
    explanation: 'El autor afirma que el cerebro interpreta la información "basándose en sus experiencias previas".',
    source: { pdfPage: 20 }
  },
  {
    id: 'q073',
    number: 73,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 1 - Análisis',
    difficulty: 3,
    stem: 'LECTURA 1 (Fragmento de "El cerebro y la realidad"):\n\n¿Qué ventaja ofrece la capacidad interpretativa del cerebro?',
    choices: {
      A: 'Generar prejuicios innecesarios',
      B: 'La capacidad de adaptación y aprendizaje',
      C: 'Olvidar eventos traumáticos rápidamente',
      D: 'Ver el mundo sin filtros mentales'
    },
    correctChoice: 'B',
    explanation: 'El texto menciona que "Esta capacidad de interpretación es lo que nos permite aprender y adaptarnos".',
    source: { pdfPage: 20 }
  },
  // Lectura 2 - Balún Canán (preguntas 74-76)
  {
    id: 'q074',
    number: 74,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 2 - Sentimientos',
    difficulty: 3,
    stem: 'LECTURA 2 (Fragmento inspirado en "Balún Canán" de Rosario Castellanos):\n\n"Mi nana me decía que los antepasados nos observan desde las raíces de los ceibas, pero que sus voces solo se escuchan cuando el viento guarda silencio. Yo sentía un temor profundo ante ese silencio; me parecía una boca inmensa dispuesta a devorar mis preguntas. Me quedé inmóvil, mirando cómo sus manos, nudosas como la tierra misma, preparaban el café. Ella notó mi inquietud y, sin mirarme, murmuró: \'Hija, el miedo es un perro que solo muerde a quien corre\'. En ese instante, comprendí que la verdadera fuerza no estaba en los gritos, sino en la capacidad de permanecer de pie frente a lo que no conocemos".\n\n¿Cómo se siente la narradora al inicio del fragmento?',
    choices: {
      A: 'Curiosa por conocer las historias de sus antepasados',
      B: 'Atemorizada ante el silencio y lo desconocido',
      C: 'Orgullosa de las raíces culturales de su familia',
      D: 'Impaciente por terminar sus labores en la cocina'
    },
    correctChoice: 'B',
    explanation: 'El texto indica que la narradora "sentía un temor profundo ante ese silencio".',
    source: { pdfPage: 21 }
  },
  {
    id: 'q075',
    number: 75,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 2 - Interpretación',
    difficulty: 3,
    stem: 'LECTURA 2 (Fragmento de "Balún Canán"):\n\n¿Qué intenta transmitir la nana con la frase: "El miedo es un perro que solo muerde a quien corre"?',
    choices: {
      A: 'Que los animales salvajes son el peligro principal en la selva',
      B: 'Que huir de los problemas o temores solo los hace más peligrosos',
      C: 'Que la rapidez es la mejor herramienta para evitar el sufrimiento',
      D: 'Que el miedo es una emoción natural que todos debemos sentir'
    },
    correctChoice: 'B',
    explanation: 'La frase metafórica sugiere que enfrentar los miedos es mejor que huir de ellos.',
    source: { pdfPage: 21 }
  },
  {
    id: 'q076',
    number: 76,
    section: 'Habilidad Verbal',
    topic: 'Comprensión lectora',
    subtopic: 'Lectura 2 - Análisis de personajes',
    difficulty: 3,
    stem: 'LECTURA 2 (Fragmento de "Balún Canán"):\n\n¿Cuál es la actitud de la nana ante la inquietud de la niña?',
    choices: {
      A: 'De rechazo y severidad ante las dudas infantiles',
      B: 'De sabiduría serena y guía espiritual',
      C: 'De indiferencia, ya que prefiere concentrarse en su trabajo',
      D: 'De burla hacia los temores imaginarios de la menor'
    },
    correctChoice: 'B',
    explanation: 'La nana muestra sabiduría y guía al compartir una enseñanza profunda con la niña de manera serena.',
    source: { pdfPage: 21 }
  }
];
