import type { ServerQuestion } from '@/types/exam';

export const formacionCivicaQuestions: ServerQuestion[] = [
  {
    id: 'q013',
    number: 13,
    section: 'Formación Cívica y Ética',
    topic: 'Democracia y participación',
    subtopic: 'Conducta democrática',
    difficulty: 2,
    stem: '¿Qué opción muestra una conducta democrática en la vida cotidiana?',
    choices: {
      A: 'Cerrar una avenida para realizar una fiesta patronal',
      B: 'Escuchar y respetar la postura de los vecinos sobre un tema común',
      C: 'Insultar a quienes profesan una fe distinta',
      D: 'Dejar basura en espacios públicos limpios'
    },
    correctChoice: 'B',
    explanation: 'La conducta democrática implica respeto a las opiniones de los demás y la participación en decisiones colectivas.',
    source: { pdfPage: 4 }
  },
  {
    id: 'q014',
    number: 14,
    section: 'Formación Cívica y Ética',
    topic: 'Identidad y diversidad',
    subtopic: 'Identidad social',
    difficulty: 2,
    stem: 'Fernanda se siente orgullosa porque en su comunidad el Día de Muertos se celebra con tradiciones únicas y ferias que no existen en otros lados. Esto desarrolla en ella:',
    choices: {
      A: 'identidad social sólida',
      B: 'sentimiento de superioridad',
      C: 'sentimiento de inferioridad',
      D: 'patriotismo fanático'
    },
    correctChoice: 'A',
    explanation: 'El orgullo por las tradiciones propias fortalece la identidad social de manera positiva.',
    source: { pdfPage: 4 }
  },
  {
    id: 'q015',
    number: 15,
    section: 'Formación Cívica y Ética',
    topic: 'Normas y leyes',
    subtopic: 'Normas convencionales',
    difficulty: 3,
    stem: 'En el ámbito familiar, ¿cuáles de las siguientes acciones corresponden a normas de tipo convencional o social?\n\n1. Pedir permiso antes de tomar objetos que no son propios\n2. No conducir al ingerir bebidas alcohólicas\n3. Saludar a los miembros de la familia al llegar a casa\n4. Respetar los horarios establecidos para las comidas',
    choices: {
      A: '1, 3, 4',
      B: '2, 3, 4',
      C: '1, 2, 3',
      D: 'Solo 2'
    },
    correctChoice: 'A',
    explanation: 'Las normas convencionales son reglas sociales no escritas que regulan la convivencia. No conducir ebrio es una norma jurídica.',
    source: { pdfPage: 4 }
  },
  {
    id: 'q016',
    number: 16,
    section: 'Formación Cívica y Ética',
    topic: 'Valores y ciudadanía',
    subtopic: 'Asertividad',
    difficulty: 2,
    stem: 'Un estudiante que es víctima de acoso escolar, responde a su agresor diciendo: "Entiendo tu punto, pero mis derechos también son valiosos", está actuando de forma:',
    choices: {
      A: 'empática',
      B: 'reflexiva',
      C: 'asertiva',
      D: 'indiferente'
    },
    correctChoice: 'C',
    explanation: 'La asertividad es la capacidad de expresar opiniones y defender derechos de manera respetuosa pero firme.',
    source: { pdfPage: 4 }
  },
  {
    id: 'q017',
    number: 17,
    section: 'Formación Cívica y Ética',
    topic: 'Normas y leyes',
    subtopic: 'Niveles de gobierno',
    difficulty: 2,
    stem: '¿Qué nivel de gobierno tiene la obligación de proporcionar a la población servicios básicos como el agua potable y la seguridad pública?',
    choices: {
      A: 'Federal',
      B: 'Estatal',
      C: 'Municipal',
      D: 'Judicial'
    },
    correctChoice: 'C',
    explanation: 'El gobierno municipal es responsable de servicios básicos como agua potable, alumbrado y seguridad pública local.',
    source: { pdfPage: 4 }
  },
  {
    id: 'q018',
    number: 18,
    section: 'Formación Cívica y Ética',
    topic: 'Valores y ciudadanía',
    subtopic: 'Valores cívicos',
    difficulty: 3,
    stem: 'Relaciona el valor ciudadano con su aplicación práctica:\n1. Pluralidad\n2. Corresponsabilidad\n3. Igualdad\n\na. Participar juntos en la solución de problemas.\nb. Aceptar que existan opiniones diferentes.\nc. Trato justo sin discriminación.',
    choices: {
      A: '1b, 2a, 3c',
      B: '1c, 2b, 3a',
      C: '1a, 2c, 3b',
      D: '1b, 2c, 3a'
    },
    correctChoice: 'A',
    explanation: 'Pluralidad es aceptar la diversidad (1b), corresponsabilidad es participación conjunta (2a), igualdad es trato equitativo (3c).',
    source: { pdfPage: 5 }
  },
  {
    id: 'q019',
    number: 19,
    section: 'Formación Cívica y Ética',
    topic: 'Valores y ciudadanía',
    subtopic: 'Tipos de valores',
    difficulty: 2,
    stem: 'Un padre aconseja a su hijo enfocarse en la "riqueza interior" y los valores en lugar de solo buscar el dinero. Este consejo promueve un valor de tipo:',
    choices: {
      A: 'Económico',
      B: 'Estético',
      C: 'Moral',
      D: 'Intelectual'
    },
    correctChoice: 'C',
    explanation: 'Los valores morales se refieren a principios éticos y la riqueza interior, en contraposición a valores materiales o económicos.',
    source: { pdfPage: 5 }
  },
  {
    id: 'q020',
    number: 20,
    section: 'Formación Cívica y Ética',
    topic: 'Valores y ciudadanía',
    subtopic: 'Empatía',
    difficulty: 2,
    stem: 'La habilidad que permite a una persona "ponerse en el lugar" de otro y compartir sus sentimientos para construir la conciencia moral se conoce como:',
    choices: {
      A: 'Solidaridad',
      B: 'Asertividad',
      C: 'Honestidad',
      D: 'Empatía'
    },
    correctChoice: 'D',
    explanation: 'La empatía es la capacidad de comprender y compartir los sentimientos de otra persona, poniéndose en su lugar.',
    source: { pdfPage: 5 }
  },
  {
    id: 'q021',
    number: 21,
    section: 'Formación Cívica y Ética',
    topic: 'Democracia y participación',
    subtopic: 'Sistema electoral',
    difficulty: 2,
    stem: 'En un sistema democrático, el voto para elegir representantes debe ser obligatoriamente:',
    choices: {
      A: 'Público y por sorteo',
      B: 'Directo, libre y secreto',
      C: 'Solo para quienes tienen propiedades',
      D: 'Familiar y voluntario'
    },
    correctChoice: 'B',
    explanation: 'El voto democrático debe ser directo (sin intermediarios), libre (sin presiones) y secreto (privado).',
    source: { pdfPage: 5 }
  },
  {
    id: 'q022',
    number: 22,
    section: 'Formación Cívica y Ética',
    topic: 'Derechos humanos',
    subtopic: 'Libertad de expresión',
    difficulty: 3,
    stem: '¿En cuál de las siguientes situaciones se ejemplifica una violación al derecho humano de libertad de expresión?',
    choices: {
      A: 'Cuando un oficial de policía agrede físicamente a un detenido con el fin de obtener una confesión.',
      B: 'Cuando una autoridad gubernamental censura o clausura un medio de comunicación por publicar críticas hacia el gobierno.',
      C: 'Cuando una institución educativa le niega el ingreso a una joven debido a su estado de embarazo.',
      D: 'Cuando el estado aplica una multa económica a un ciudadano por tirar desechos en la vía pública.'
    },
    correctChoice: 'B',
    explanation: 'La censura de medios de comunicación por criticar al gobierno es una violación directa a la libertad de expresión.',
    source: { pdfPage: 5 }
  },
  {
    id: 'q023',
    number: 23,
    section: 'Formación Cívica y Ética',
    topic: 'Normas y leyes',
    subtopic: 'División de poderes',
    difficulty: 3,
    stem: 'En la División de Poderes en México, la facultad de elaborar y modificar las leyes, aprobar el Presupuesto de Egresos y ratificar los Tratados Internacionales corresponde al:',
    choices: {
      A: 'Poder Ejecutivo',
      B: 'Poder Judicial',
      C: 'Poder Federal',
      D: 'Poder Legislativo'
    },
    correctChoice: 'D',
    explanation: 'El Poder Legislativo (Congreso de la Unión) tiene la facultad de crear leyes, aprobar el presupuesto y ratificar tratados.',
    source: { pdfPage: 6 }
  },
  {
    id: 'q024',
    number: 24,
    section: 'Formación Cívica y Ética',
    topic: 'Derechos humanos',
    subtopic: 'Constitución Mexicana',
    difficulty: 2,
    stem: 'El Artículo de la Constitución Política de los Estados Unidos Mexicanos (CPEUM) que garantiza el derecho de toda persona a la libre manifestación de sus ideas y exige al Estado que asegure el acceso a la información es el:',
    choices: {
      A: 'Artículo 6°',
      B: 'Artículo 24°',
      C: 'Artículo 1°',
      D: 'Artículo 27°'
    },
    correctChoice: 'A',
    explanation: 'El Artículo 6° de la CPEUM garantiza la libertad de expresión y el derecho a la información.',
    source: { pdfPage: 6 }
  }
];
