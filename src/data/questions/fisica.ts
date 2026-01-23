import type { ServerQuestion } from '@/types/exam';

export const fisicaQuestions: ServerQuestion[] = [
  {
    id: 'q077',
    number: 77,
    section: 'Física',
    topic: 'Mecánica',
    subtopic: 'Leyes de Newton',
    difficulty: 2,
    stem: '¿Qué concepto físico explica por qué un pasajero sale proyectado hacia adelante cuando el autobús en el que viaja frena de manera repentina?',
    choices: {
      A: 'Aceleración',
      B: 'Fuerza de fricción',
      C: 'Inercia',
      D: 'Impulso'
    },
    correctChoice: 'C',
    explanation: 'La inercia es la tendencia de los cuerpos a mantener su estado de movimiento. Al frenar, el pasajero tiende a seguir moviéndose.',
    source: { pdfPage: 21 }
  },
  {
    id: 'q078',
    number: 78,
    section: 'Física',
    topic: 'Ondas',
    subtopic: 'Velocidad de onda',
    difficulty: 3,
    stem: 'Identifica las variables que se deben conocer para calcular la rapidez con la que se propaga una onda mecánica o electromagnética:',
    choices: {
      A: 'Frecuencia y longitud de onda',
      B: 'Amplitud y aceleración',
      C: 'Energía cinética y energía potencial',
      D: 'Voltaje y resistencia'
    },
    correctChoice: 'A',
    explanation: 'La velocidad de una onda se calcula con v = f × λ (frecuencia × longitud de onda).',
    source: { pdfPage: 22 }
  },
  {
    id: 'q079',
    number: 79,
    section: 'Física',
    topic: 'Estructura atómica',
    subtopic: 'Partes del átomo',
    difficulty: 2,
    stem: 'Relaciona las partes del átomo con su descripción fundamental:\n\n1. Electrón | 2. Protón | 3. Núcleo\n\na. Posee carga positiva de 1.6 × 10⁻¹⁹ C.\nb. Concentra casi toda la masa y contiene protones y neutrones.\nc. Tiene carga negativa y órbita alrededor del centro.',
    choices: {
      A: '1a, 2b, 3c',
      B: '1c, 2a, 3b',
      C: '1b, 2c, 3a',
      D: '1c, 2b, 3a'
    },
    correctChoice: 'B',
    explanation: 'El electrón tiene carga negativa (1c), el protón tiene carga positiva (2a), y el núcleo concentra la masa (3b).',
    assets: { images: ['/images/reactivos/fisica_79.jpg'] },
    source: { pdfPage: 22 }
  },
  {
    id: 'q080',
    number: 80,
    section: 'Física',
    topic: 'Energía',
    subtopic: 'Energía potencial',
    difficulty: 3,
    stem: 'Si una carga de 10 paquetes (con una masa total de 5 kg) se sube a una repisa situada a 4 metros de altura, ¿cuál es la energía potencial almacenada? (Considera g = 10 m/s²)',
    choices: {
      A: '20 J',
      B: '200 J',
      C: '2,000 J',
      D: '20,000 J'
    },
    correctChoice: 'B',
    explanation: 'Energía potencial Ep = mgh = 5 kg × 10 m/s² × 4 m = 200 J.',
    source: { pdfPage: 22 }
  },
  {
    id: 'q081',
    number: 81,
    section: 'Física',
    topic: 'Mecánica',
    subtopic: 'Tercera Ley de Newton',
    difficulty: 2,
    stem: 'Cuando un martillo golpea un clavo, el martillo ejerce una fuerza sobre el clavo, pero simultáneamente el clavo ejerce una fuerza sobre el martillo con:',
    choices: {
      A: 'Diferente magnitud e igual sentido',
      B: 'Igual magnitud y sentido contrario',
      C: 'Menor magnitud y sentido igual',
      D: 'Igual magnitud y el mismo sentido'
    },
    correctChoice: 'B',
    explanation: 'Según la tercera ley de Newton, las fuerzas de acción y reacción son iguales en magnitud y opuestas en dirección.',
    source: { pdfPage: 23 }
  },
  {
    id: 'q082',
    number: 82,
    section: 'Física',
    topic: 'Termodinámica',
    subtopic: 'Transferencia de calor',
    difficulty: 2,
    stem: 'Al mezclar café caliente a 80°C con leche fría a 10°C, después de un tiempo ambos alcanzan la misma temperatura. Este fenómeno ocurre porque:',
    choices: {
      A: 'El fluido frío cedió su temperatura al caliente',
      B: 'Se produjo una transferencia de energía en forma de calor',
      C: 'El café absorbió el frío de la leche',
      D: 'La energía desapareció al mezclarse los líquidos'
    },
    correctChoice: 'B',
    explanation: 'El equilibrio térmico se alcanza por transferencia de energía en forma de calor del cuerpo caliente al frío.',
    source: { pdfPage: 23 }
  },
  {
    id: 'q083',
    number: 83,
    section: 'Física',
    topic: 'Mecánica',
    subtopic: 'Rapidez',
    difficulty: 3,
    stem: '¿En cuál de las siguientes situaciones se observa que dos objetos se desplazan con la misma rapidez?',
    choices: {
      A: 'Un auto recorre 100 km en 2 horas y otro 150 km en 2 horas',
      B: 'Un ciclista recorre 30 km en 1 hora y un corredor 15 km en 30 minutos',
      C: 'Un tren recorre 200 km en 4 horas y un avión 400 km en 2 horas',
      D: 'Una bicicleta recorre 10 km en 1 hora y un patinador 20 km en 1 hora'
    },
    correctChoice: 'B',
    explanation: 'El ciclista tiene rapidez de 30 km/h y el corredor 15 km / 0.5 h = 30 km/h. Ambos tienen la misma rapidez.',
    assets: { images: ['/images/reactivos/fisica_83.jpg'] },
    source: { pdfPage: 23 }
  },
  {
    id: 'q084',
    number: 84,
    section: 'Física',
    topic: 'Electricidad',
    subtopic: 'Carga eléctrica',
    difficulty: 2,
    stem: 'Un objeto adquiere una carga eléctrica cuando se acerca a otro cuerpo ya cargado sin que exista un contacto físico entre ellos. Este proceso se llama:',
    choices: {
      A: 'Conducción',
      B: 'Convección',
      C: 'Inducción',
      D: 'Polarización'
    },
    correctChoice: 'C',
    explanation: 'La inducción electrostática es el proceso por el cual un cuerpo adquiere carga sin contacto directo.',
    source: { pdfPage: 23 }
  },
  {
    id: 'q085',
    number: 85,
    section: 'Física',
    topic: 'Mecánica',
    subtopic: 'Masa y peso',
    difficulty: 2,
    stem: '¿Cuál es la diferencia fundamental entre la masa y el peso de un objeto?',
    choices: {
      A: 'La masa es una fuerza y el peso es la cantidad de materia',
      B: 'La masa depende de la gravedad y el peso es constante',
      C: 'La masa es la cantidad de materia y el peso es la fuerza de atracción gravitacional',
      D: 'Ambas son medidas de volumen expresadas en Newtons'
    },
    correctChoice: 'C',
    explanation: 'La masa es la cantidad de materia (kg), mientras que el peso es la fuerza gravitacional sobre esa masa (N).',
    source: { pdfPage: 24 }
  },
  {
    id: 'q086',
    number: 86,
    section: 'Física',
    topic: 'Astronomía',
    subtopic: 'Leyes de Kepler',
    difficulty: 3,
    stem: '¿Cuál es la ley que establece que los planetas se mueven en órbitas elípticas alrededor del Sol?',
    choices: {
      A: 'Ley de la Gravitación Universal',
      B: 'Segunda Ley de Kepler',
      C: 'Primera Ley de Kepler',
      D: 'Ley de Inercia'
    },
    correctChoice: 'C',
    explanation: 'La Primera Ley de Kepler (Ley de las Órbitas) establece que los planetas describen órbitas elípticas con el Sol en un foco.',
    source: { pdfPage: 24 }
  },
  {
    id: 'q087',
    number: 87,
    section: 'Física',
    topic: 'Termodinámica',
    subtopic: 'Temperatura',
    difficulty: 2,
    stem: '¿Cuál es la propiedad física que se mide en grados Celsius o Fahrenheit, y es crucial para determinar el calor o frío de un objeto?',
    choices: {
      A: 'Volumen',
      B: 'Masa',
      C: 'Temperatura',
      D: 'Densidad'
    },
    correctChoice: 'C',
    explanation: 'La temperatura es la propiedad que mide el nivel de calor de un cuerpo y se expresa en grados Celsius o Fahrenheit.',
    source: { pdfPage: 24 }
  },
  {
    id: 'q088',
    number: 88,
    section: 'Física',
    topic: 'Ondas',
    subtopic: 'Características de ondas',
    difficulty: 3,
    stem: '¿En qué consiste la descripción completa de una onda en términos de sus características fundamentales?',
    choices: {
      A: 'Frecuencia y elongación',
      B: 'Longitud de onda y velocidad',
      C: 'Periodo y amplitud',
      D: 'Frecuencia y longitud de onda'
    },
    correctChoice: 'C',
    explanation: 'El periodo (tiempo de un ciclo) y la amplitud (máximo desplazamiento) son características fundamentales de una onda.',
    source: { pdfPage: 24 }
  }
];
