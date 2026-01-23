import type { ServerQuestion } from '@/types/exam';

export const quimicaQuestions: ServerQuestion[] = [
  {
    id: 'q089',
    number: 89,
    section: 'Química',
    topic: 'Tabla periódica',
    subtopic: 'Clasificación de elementos',
    difficulty: 2,
    stem: 'Basándote en la organización de la Tabla Periódica, ¿qué elementos se encuentran en los bloques señalados?\n\n[Imagen: Tabla periódica con bloques A, B y C señalados]',
    choices: {
      A: 'A: No metales, B: Metales, C: Metaloides',
      B: 'A: Metales, B: Metaloides, C: No metales',
      C: 'A: Gases nobles, B: Metales, C: Halógenos',
      D: 'A: Metaloides, B: No metales, C: Metales'
    },
    correctChoice: 'B',
    explanation: 'En la tabla periódica, los metales están a la izquierda (A), los metaloides en la línea divisoria (B) y los no metales a la derecha (C).',
    assets: { images: ['/images/reactivos/quimica_89.jpg'] },
    source: { pdfPage: 24 }
  },
  {
    id: 'q090',
    number: 90,
    section: 'Química',
    topic: 'Reacciones químicas',
    subtopic: 'Reacciones REDOX',
    difficulty: 3,
    stem: 'Analiza la siguiente reacción química: 2Mg(s) + O₂(g) → 2MgO(s). En este proceso de óxido-reducción (REDOX), sucede lo siguiente:',
    choices: {
      A: 'El Magnesio gana electrones y se reduce',
      B: 'El Oxígeno pierde electrones y se oxida',
      C: 'El Magnesio pierde electrones (se oxida) y el Oxígeno gana electrones (se reduce)',
      D: 'Ambos elementos ganan electrones para estabilizarse'
    },
    correctChoice: 'C',
    explanation: 'En esta reacción REDOX, el Mg pierde electrones (oxidación) y el O₂ gana electrones (reducción).',
    source: { pdfPage: 25 }
  },
  {
    id: 'q091',
    number: 91,
    section: 'Química',
    topic: 'Estructura atómica',
    subtopic: 'Electrones de valencia',
    difficulty: 2,
    stem: '¿En qué región del átomo se sitúan los electrones de valencia, que son los responsables de la formación de enlaces químicos?',
    choices: {
      A: 'En el núcleo',
      B: 'En el nivel más cercano al núcleo',
      C: 'En la órbita o nivel de energía más externo',
      D: 'Distribuidos uniformemente en los neutrones'
    },
    correctChoice: 'C',
    explanation: 'Los electrones de valencia se encuentran en el nivel de energía más externo del átomo y participan en los enlaces.',
    source: { pdfPage: 25 }
  },
  {
    id: 'q092',
    number: 92,
    section: 'Química',
    topic: 'Enlaces químicos',
    subtopic: 'Tipos de enlaces',
    difficulty: 3,
    stem: '¿Qué sucede con los electrones en los enlaces iónicos y covalentes?',
    choices: {
      A: 'En el iónico se comparten electrones; en el covalente se transfieren',
      B: 'En el iónico se transfieren electrones formando iones; en el covalente se comparten pares de electrones',
      C: 'En ambos se forman nubes electrónicas metálicas',
      D: 'En el iónico solo participan gases nobles'
    },
    correctChoice: 'B',
    explanation: 'En el enlace iónico hay transferencia de electrones (formando iones), mientras que en el covalente se comparten.',
    source: { pdfPage: 25 }
  },
  {
    id: 'q093',
    number: 93,
    section: 'Química',
    topic: 'Estequiometría',
    subtopic: 'Mol',
    difficulty: 3,
    stem: 'Un mol de cualquier sustancia química representa una cantidad de materia cuya masa en gramos es numéricamente igual a su:',
    choices: {
      A: 'Número atómico',
      B: 'Valencia química',
      C: 'Masa atómica',
      D: 'Electronegatividad'
    },
    correctChoice: 'C',
    explanation: 'La masa de un mol de cualquier sustancia (masa molar) es numéricamente igual a su masa atómica expresada en gramos.',
    source: { pdfPage: 26 }
  },
  {
    id: 'q094',
    number: 94,
    section: 'Química',
    topic: 'Ácidos y bases',
    subtopic: 'Modelo de Arrhenius',
    difficulty: 3,
    stem: 'De acuerdo con el modelo de Arrhenius, ¿cómo se definen los ácidos y las bases?',
    choices: {
      A: 'Los ácidos liberan iones hidroxilo (OH⁻) y las bases iones hidrógeno (H⁺)',
      B: 'Los ácidos liberan iones hidrógeno (H⁺) en solución acuosa y las bases liberan iones hidroxilo (OH⁻)',
      C: 'Ambos liberan neutrones al disolverse en agua',
      D: 'Los ácidos son siempre sólidos y las bases siempre gaseosas'
    },
    correctChoice: 'B',
    explanation: 'Según Arrhenius, los ácidos liberan H⁺ en solución acuosa y las bases liberan OH⁻.',
    source: { pdfPage: 26 }
  },
  {
    id: 'q095',
    number: 95,
    section: 'Química',
    topic: 'Enlaces químicos',
    subtopic: 'Modelo de Lewis',
    difficulty: 2,
    stem: 'El modelo propuesto por Gilbert N. Lewis para representar los enlaces químicos se caracteriza por:',
    choices: {
      A: 'Dibujar el total de electrones del átomo usando puntos',
      B: 'Usar símbolos químicos rodeados de puntos y guiones que representan solo los electrones de valencia',
      C: 'Representar únicamente el núcleo del átomo',
      D: 'Utilizar colores para diferenciar protones de neutrones'
    },
    correctChoice: 'B',
    explanation: 'El modelo de Lewis representa los electrones de valencia mediante puntos alrededor del símbolo químico.',
    source: { pdfPage: 26 }
  },
  {
    id: 'q096',
    number: 96,
    section: 'Química',
    topic: 'Propiedades de la materia',
    subtopic: 'Propiedades intensivas y extensivas',
    difficulty: 2,
    stem: 'Indica qué ejemplo corresponde a una propiedad intensiva y cuál a una extensiva de la materia:\n1. La densidad del alcohol es menor a la del agua.\n2. Un bloque de hierro pesa 5 kilogramos.',
    choices: {
      A: '1: Extensiva, 2: Intensiva',
      B: '1: Intensiva, 2: Extensiva',
      C: 'Ambas son extensivas',
      D: 'Ambas son intensivas'
    },
    correctChoice: 'B',
    explanation: 'La densidad es una propiedad intensiva (no depende de la cantidad), el peso es extensiva (depende de la cantidad).',
    source: { pdfPage: 27 }
  },
  {
    id: 'q097',
    number: 97,
    section: 'Química',
    topic: 'Reacciones químicas',
    subtopic: 'Interpretación de ecuaciones',
    difficulty: 3,
    stem: 'Interpreta la siguiente ecuación química: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. ¿Qué información nos proporciona sobre las cantidades de reactivos y productos?',
    choices: {
      A: '1 mol de glucosa reacciona con 6 moles de oxígeno para producir 6 moles de dióxido de carbono y 6 moles de agua',
      B: '6 moles de glucosa producen 6 moles de agua y 12 moles de dióxido de carbono',
      C: 'Se requieren 12 moles de oxígeno para iniciar la reacción',
      D: 'La reacción produce únicamente sustancias líquidas'
    },
    correctChoice: 'A',
    explanation: 'Los coeficientes indican que 1 mol de C₆H₁₂O₆ + 6 mol de O₂ producen 6 mol de CO₂ y 6 mol de H₂O.',
    source: { pdfPage: 27 }
  },
  {
    id: 'q098',
    number: 98,
    section: 'Química',
    topic: 'Tabla periódica',
    subtopic: 'Historia',
    difficulty: 2,
    stem: 'Mendeleiev logró organizar la primera tabla periódica funcional utilizando como criterio principal:',
    choices: {
      A: 'El orden alfabético de los nombres',
      B: 'El número de neutrones en el núcleo',
      C: 'El orden creciente de sus masas atómicas y la similitud en sus propiedades (valencia)',
      D: 'La fecha de descubrimiento de cada elemento'
    },
    correctChoice: 'C',
    explanation: 'Mendeleiev ordenó los elementos por masa atómica creciente y agrupó los de propiedades similares.',
    source: { pdfPage: 27 }
  },
  {
    id: 'q099',
    number: 99,
    section: 'Química',
    topic: 'Enlaces químicos',
    subtopic: 'Enlace covalente',
    difficulty: 3,
    stem: 'Si la diferencia de electronegatividad entre dos átomos de Cloro (Cl - Cl) es igual a cero (3.0 - 3.0 = 0), ¿qué tipo de enlace químico forman?',
    choices: {
      A: 'Enlace iónico',
      B: 'Enlace metálico',
      C: 'Enlace covalente no polar',
      D: 'Enlace covalente polar'
    },
    correctChoice: 'C',
    explanation: 'Cuando la diferencia de electronegatividad es cero, el enlace es covalente no polar (los electrones se comparten por igual).',
    source: { pdfPage: 28 }
  },
  {
    id: 'q100',
    number: 100,
    section: 'Química',
    topic: 'Reacciones químicas',
    subtopic: 'Componentes de una ecuación',
    difficulty: 2,
    stem: '¿Cuál de los siguientes componentes de una ecuación química representa el producto final de la reacción?',
    choices: {
      A: 'Reactivos',
      B: 'Catalizador',
      C: 'Disolvente',
      D: 'Productos'
    },
    correctChoice: 'D',
    explanation: 'Los productos son las sustancias que se obtienen al final de una reacción química, escritas después de la flecha.',
    source: { pdfPage: 28 }
  }
];
