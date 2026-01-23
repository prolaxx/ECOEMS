import type { ServerQuestion } from '@/types/exam';

export const geografiaQuestions: ServerQuestion[] = [
  {
    id: 'q001',
    number: 1,
    section: 'Geografía',
    topic: 'Población y cultura',
    subtopic: 'Multiculturalidad',
    difficulty: 2,
    stem: '¿Cuál es el concepto que se refiere a la coexistencia de diversas culturas en un mismo espacio, donde se reconoce y respeta su diversidad?',
    choices: {
      A: 'Autodeterminación',
      B: 'Multiculturalidad',
      C: 'Interculturalidad',
      D: 'Etnonacionalismo'
    },
    correctChoice: 'B',
    explanation: 'La multiculturalidad se refiere a la coexistencia de diferentes culturas en un mismo territorio, reconociendo y respetando la diversidad cultural de cada grupo.',
    source: { pdfPage: 1 }
  },
  {
    id: 'q002',
    number: 2,
    section: 'Geografía',
    topic: 'Riesgos y desastres',
    subtopic: 'Actividad sísmica',
    difficulty: 3,
    stem: 'De acuerdo con el mapa, ¿qué grupo de estados se localiza en la región de mayor actividad sísmica en México?',
    choices: {
      A: 'Yucatán y Quintana Roo',
      B: 'Nuevo León y Chihuahua',
      C: 'Guerrero, Oaxaca, Jalisco y Morelos',
      D: 'Hidalgo, Tlaxcala y Querétaro'
    },
    correctChoice: 'C',
    explanation: 'La zona de mayor actividad sísmica en México se encuentra a lo largo de la costa del Pacífico, donde interactúan las placas tectónicas de Cocos y Norteamericana.',
    assets: { images: ['/images/reactivos/geografia_2.jpg'] },
    source: { pdfPage: 1 }
  },
  {
    id: 'q003',
    number: 3,
    section: 'Geografía',
    topic: 'Espacio geográfico',
    subtopic: 'Componentes sociales',
    difficulty: 2,
    stem: '¿Cuál de los siguientes incisos ejemplifica un componente social dentro del análisis del espacio geográfico?',
    choices: {
      A: 'La práctica de la agricultura',
      B: 'El flujo migratorio de una población',
      C: 'El establecimiento de zonas industriales',
      D: 'La creencia en una religión específica'
    },
    correctChoice: 'B',
    explanation: 'El flujo migratorio es un componente social del espacio geográfico, ya que implica el movimiento de personas y grupos humanos.',
    source: { pdfPage: 1 }
  },
  {
    id: 'q004',
    number: 4,
    section: 'Geografía',
    topic: 'Población y cultura',
    subtopic: 'Indicadores de desarrollo',
    difficulty: 2,
    stem: '¿Cuál es el indicador usado por la ONU para medir la calidad de vida en un país, considerando la esperanza de vida, el nivel de escolaridad y el ingreso per cápita?',
    choices: {
      A: 'Producto Interno Bruto (PIB)',
      B: 'Tasa de Natalidad',
      C: 'Índice de Desarrollo Humano (IDH)',
      D: 'Deuda Externa'
    },
    correctChoice: 'C',
    explanation: 'El IDH (Índice de Desarrollo Humano) es el indicador de la ONU que considera esperanza de vida, educación e ingreso para medir el desarrollo de un país.',
    source: { pdfPage: 1 }
  },
  {
    id: 'q005',
    number: 5,
    section: 'Geografía',
    topic: 'Desarrollo sustentable',
    subtopic: 'Minería sustentable',
    difficulty: 3,
    stem: 'Para que la extracción minera en México sea considerada una actividad de desarrollo sustentable, se debe:',
    choices: {
      A: 'Agotar los yacimientos actuales lo más rápido posible',
      B: 'Realizar la explotación garantizando recursos para las próximas generaciones',
      C: 'Exportar el 100% de los minerales para obtener divisas',
      D: 'Invertir solo en excavaciones de gran profundidad'
    },
    correctChoice: 'B',
    explanation: 'El desarrollo sustentable implica satisfacer las necesidades actuales sin comprometer la capacidad de las generaciones futuras.',
    source: { pdfPage: 2 }
  },
  {
    id: 'q006',
    number: 6,
    section: 'Geografía',
    topic: 'Riesgos y desastres',
    subtopic: 'Fenómenos meteorológicos',
    difficulty: 2,
    stem: '¿Cuál es el fenómeno meteorológico que representa el riesgo natural más frecuente para los habitantes de la costa de Guerrero?',
    choices: {
      A: 'Terremotos de gran magnitud',
      B: 'Erupciones volcánicas',
      C: 'Tsunamis de gran altura',
      D: 'Huracanes'
    },
    correctChoice: 'D',
    explanation: 'La costa de Guerrero, en el Pacífico mexicano, es frecuentemente afectada por huracanes durante la temporada de ciclones tropicales.',
    source: { pdfPage: 2 }
  },
  {
    id: 'q007',
    number: 7,
    section: 'Geografía',
    topic: 'Recursos naturales',
    subtopic: 'Ciclo del agua',
    difficulty: 3,
    stem: '¿Qué fases del ciclo del agua son las responsables directas de que existan los ríos y corrientes superficiales en la Tierra?',
    choices: {
      A: 'Condensación y evaporación',
      B: 'Precipitación y escurrimiento',
      C: 'Almacenamiento e infiltración',
      D: 'Fusión y sublimación'
    },
    correctChoice: 'B',
    explanation: 'La precipitación proporciona el agua y el escurrimiento la transporta formando ríos y corrientes superficiales.',
    source: { pdfPage: 2 }
  },
  {
    id: 'q008',
    number: 8,
    section: 'Geografía',
    topic: 'Espacio geográfico',
    subtopic: 'Regiones industriales',
    difficulty: 3,
    stem: 'En México, la región industrial que se ha especializado en la industria maquiladora y automotriz y es sede de importantes siderúrgicas, es la...',
    choices: {
      A: 'Región Occidente-Bajío (Jalisco y Aguascalientes)',
      B: 'Región del Bajío (Guanajuato y Querétaro)',
      C: 'Región Norte (Monterrey y Coahuila)',
      D: 'Región Noreste (Nuevo León y Tamaulipas)'
    },
    correctChoice: 'C',
    explanation: 'Monterrey y Coahuila conforman una de las principales zonas industriales de México, especialmente en siderurgia y manufactura.',
    source: { pdfPage: 2 }
  },
  {
    id: 'q009',
    number: 9,
    section: 'Geografía',
    topic: 'Recursos naturales',
    subtopic: 'Tipos de recursos',
    difficulty: 3,
    stem: 'Relaciona el tipo de recurso con su característica principal y su ejemplo.\n\n1. Renovables - a. Se agotan con el uso, tardan millones de años en formarse (Petróleo y minerales)\n2. No Renovables - b. Se regeneran a corto plazo, si se explotan racionalmente (bosques y animales)\n3. Inagotables - c. Existen en abundancia y no se agotan con el uso humano (Energía solar y viento)',
    choices: {
      A: '1a, 2b, 3c',
      B: '1b, 2a, 3c',
      C: '1b, 2c, 3a',
      D: '1c, 2b, 3a'
    },
    correctChoice: 'B',
    explanation: 'Los recursos renovables se regeneran (1b), los no renovables se agotan (2a), y los inagotables no se agotan con el uso (3c).',
    source: { pdfPage: 2 }
  },
  {
    id: 'q010',
    number: 10,
    section: 'Geografía',
    topic: 'Riesgos y desastres',
    subtopic: 'Vulnerabilidad',
    difficulty: 2,
    stem: '¿Cuál es el factor socioeconómico que incrementa la vulnerabilidad de una comunidad ante la llegada de un desastre natural?',
    choices: {
      A: 'El desempleo',
      B: 'La pobreza extrema',
      C: 'La corrupción',
      D: 'La contaminación ambiental'
    },
    correctChoice: 'B',
    explanation: 'La pobreza extrema incrementa la vulnerabilidad porque limita la capacidad de preparación, respuesta y recuperación ante desastres.',
    source: { pdfPage: 3 }
  },
  {
    id: 'q011',
    number: 11,
    section: 'Geografía',
    topic: 'Desarrollo sustentable',
    subtopic: 'Ecotecnias',
    difficulty: 2,
    stem: 'Asocia cada técnica ecológica (ecotecnia) con su función:\n1. Hidroponía\n2. Composta\n3. Letrina seca\n\na. Abono orgánico para suelos\nb. Cultivo de plantas sin usar tierra\nc. Baño que procesa desechos sin agua',
    choices: {
      A: '1b, 2a, 3c',
      B: '1c, 2b, 3a',
      C: '1a, 2b, 3c',
      D: '1b, 2c, 3a'
    },
    correctChoice: 'A',
    explanation: 'La hidroponía es cultivo sin tierra (1b), la composta es abono orgánico (2a), y la letrina seca procesa desechos sin agua (3c).',
    source: { pdfPage: 3 }
  },
  {
    id: 'q012',
    number: 12,
    section: 'Geografía',
    topic: 'Población y cultura',
    subtopic: 'Pueblos originarios',
    difficulty: 2,
    stem: '¿Qué pueblos originarios habitan principalmente en la zona central del país (Hidalgo, Estado de México y Tlaxcala)?',
    choices: {
      A: 'Mayas y Yaquis',
      B: 'Tarahumaras y Mayas',
      C: 'Mazahuas, Otomíes y Náhuatl',
      D: 'Yaquis y Náhuatl'
    },
    correctChoice: 'C',
    explanation: 'Los Mazahuas, Otomíes y hablantes de Náhuatl son los principales grupos indígenas del centro de México.',
    assets: { images: ['/images/reactivos/geografia_12.jpg'] },
    source: { pdfPage: 3 }
  }
];
