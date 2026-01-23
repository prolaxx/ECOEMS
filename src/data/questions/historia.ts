import type { ServerQuestion } from '@/types/exam';

export const historiaQuestions: ServerQuestion[] = [
  // Historia Universal (37-42)
  {
    id: 'q037',
    number: 37,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Organizaciones internacionales',
    difficulty: 2,
    stem: 'Tras la Segunda Guerra Mundial, ¿qué organismo se fundó con el propósito de sustituir a la Sociedad de Naciones y mantener la paz?',
    choices: {
      A: 'OTAN',
      B: 'ONU',
      C: 'OCDE',
      D: 'OEA'
    },
    correctChoice: 'B',
    explanation: 'La ONU (Organización de las Naciones Unidas) fue fundada en 1945 para mantener la paz y seguridad internacional, sustituyendo a la Sociedad de Naciones.',
    source: { pdfPage: 10 }
  },
  {
    id: 'q038',
    number: 38,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Independencia de Estados Unidos',
    difficulty: 3,
    stem: '¿Cuál fue una de las causas principales que detonó el movimiento de independencia de las Trece Colonias de Norteamérica a finales del siglo XVIII?',
    choices: {
      A: 'El apoyo militar y financiero recibido por parte de la Unión Soviética',
      B: 'La imposición de nuevos impuestos por parte de la Corona Británica para pagar las deudas de la Guerra de los Siete Años',
      C: 'El deseo de los colonos de establecer una monarquía absoluta en el territorio americano',
      D: 'La firma del Tratado de Versalles de 1919 tras el fin de la Primera Guerra Mundial'
    },
    correctChoice: 'B',
    explanation: 'La imposición de impuestos sin representación por parte de Gran Bretaña fue una de las principales causas de la independencia estadounidense.',
    source: { pdfPage: 10 }
  },
  {
    id: 'q039',
    number: 39,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Revolución Industrial',
    difficulty: 2,
    stem: '¿Cómo se denomina a la clase social que surgió con el crecimiento de las ciudades industriales, integrada por trabajadores que vendían su fuerza de trabajo a cambio de un salario y carecían de medios de producción?',
    choices: {
      A: 'Los artesanos',
      B: 'El proletariado',
      C: 'La burguesía',
      D: 'Los siervos'
    },
    correctChoice: 'B',
    explanation: 'El proletariado es la clase trabajadora que surgió durante la Revolución Industrial, caracterizada por vender su fuerza de trabajo.',
    source: { pdfPage: 10 }
  },
  {
    id: 'q040',
    number: 40,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Primera Guerra Mundial',
    difficulty: 3,
    stem: 'Selecciona la opción que contiene algunas de las sanciones impuestas a los alemanes, luego de la firma del Tratado de Versalles en 1919.\n\n1. Pago de los gastos y reparaciones producto de la Primera Guerra Mundial.\n2. Pérdida de los territorios de Alsacia y Lorena.\n3. Desmantelamiento de su flota naval y aviación.\n4. Integración inmediata a la Sociedad de Naciones.',
    choices: {
      A: '2, 3, 4',
      B: '1, 3, 4',
      C: '1, 2, 3',
      D: '1, 2, 4'
    },
    correctChoice: 'C',
    explanation: 'El Tratado de Versalles impuso a Alemania: pago de reparaciones, pérdida de territorios (Alsacia y Lorena) y desarme militar. No fue integrada inmediatamente a la Sociedad de Naciones.',
    source: { pdfPage: 11 }
  },
  {
    id: 'q041',
    number: 41,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Siglo XX',
    difficulty: 2,
    stem: '¿Qué impacto tuvieron los avances científicos y tecnológicos en la sociedad de mediados del siglo XX?',
    choices: {
      A: 'Surgimiento de la locomotora y el transporte fabril',
      B: 'Desarrollo de telecomunicaciones y consolidación de la cultura de masas',
      C: 'Invención de la electricidad y el cine mudo',
      D: 'Predominio de la producción artesanal sobre la industrial'
    },
    correctChoice: 'B',
    explanation: 'A mediados del siglo XX, el desarrollo de las telecomunicaciones (radio, televisión) consolidó la cultura de masas.',
    source: { pdfPage: 11 }
  },
  {
    id: 'q042',
    number: 42,
    section: 'Historia',
    topic: 'Historia Universal',
    subtopic: 'Primera Guerra Mundial',
    difficulty: 2,
    stem: 'El detonante de la Primera Guerra Mundial fue el asesinato del Archiduque Francisco Fernando de Habsburgo en la ciudad de:',
    choices: {
      A: 'Berlín',
      B: 'París',
      C: 'Sarajevo',
      D: 'Londres'
    },
    correctChoice: 'C',
    explanation: 'El asesinato del Archiduque Francisco Fernando en Sarajevo, Bosnia, el 28 de junio de 1914, detonó la Primera Guerra Mundial.',
    source: { pdfPage: 11 }
  },
  // Historia de México (43-48)
  {
    id: 'q043',
    number: 43,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'Independencia',
    difficulty: 3,
    stem: 'Bajo la influencia de la Ilustración, maduró una identidad nacionalista que buscaba que la soberanía recayera en el pueblo, principalmente entre los:',
    choices: {
      A: 'Peninsulares',
      B: 'Virreyes',
      C: 'Criollos',
      D: 'Clérigos'
    },
    correctChoice: 'C',
    explanation: 'Los criollos, influenciados por las ideas de la Ilustración, desarrollaron un sentimiento nacionalista que impulsó la Independencia.',
    source: { pdfPage: 12 }
  },
  {
    id: 'q044',
    number: 44,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'Porfiriato',
    difficulty: 2,
    stem: 'Grupo de intelectuales influenciados por el positivismo que asesoraron a Porfirio Díaz durante su dictadura.',
    choices: {
      A: 'Los Jacobinos',
      B: 'Los Contemporáneos',
      C: 'Los Científicos',
      D: 'Los Flores Magón'
    },
    correctChoice: 'C',
    explanation: 'Los Científicos fueron un grupo de intelectuales positivistas que asesoraron a Porfirio Díaz en materia económica y política.',
    source: { pdfPage: 12 }
  },
  {
    id: 'q045',
    number: 45,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'México contemporáneo',
    difficulty: 3,
    stem: '¿Qué presidente mexicano de la década de 1980 inició formalmente la transición del modelo de Sustitución de Importaciones hacia el modelo neoliberal, al firmar el ingreso del país al Acuerdo General sobre Aranceles Aduaneros y Comercio (GATT) en 1986?',
    choices: {
      A: 'Luis Echeverría',
      B: 'Miguel de la Madrid',
      C: 'Vicente Fox',
      D: 'Andrés Manuel López Obrador'
    },
    correctChoice: 'B',
    explanation: 'Miguel de la Madrid Hurtado inició la apertura comercial de México al firmar su ingreso al GATT en 1986.',
    source: { pdfPage: 12 }
  },
  {
    id: 'q046',
    number: 46,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'Colonia',
    difficulty: 3,
    stem: '¿Cuál fue una de las consecuencias políticas y sociales más importantes de la aplicación de las Reformas Borbónicas en la Nueva España a finales del siglo XVIII?',
    choices: {
      A: 'El fortalecimiento de la unidad y la paz entre los peninsulares y los criollos',
      B: 'El descontento de la élite criolla al verse desplazada de los altos cargos públicos y administrativos por funcionarios venidos de España',
      C: 'La inmediata eliminación de las castas y la declaración de igualdad para todos los habitantes del virreinato',
      D: 'El establecimiento de un sistema democrático donde el pueblo elegía a sus propios gobernantes'
    },
    correctChoice: 'B',
    explanation: 'Las Reformas Borbónicas desplazaron a los criollos de cargos importantes, generando descontento que influyó en la Independencia.',
    source: { pdfPage: 12 }
  },
  {
    id: 'q047',
    number: 47,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'Siglo XIX',
    difficulty: 2,
    stem: 'Tratado por el cual México perdió más de la mitad de su territorio ante Estados Unidos en 1848.',
    choices: {
      A: 'Tratado de Velasco',
      B: 'Tratado de Guadalupe-Hidalgo',
      C: 'Tratado de la Mesilla',
      D: 'Tratados de Córdoba'
    },
    correctChoice: 'B',
    explanation: 'El Tratado de Guadalupe-Hidalgo (1848) puso fin a la guerra México-EE.UU., cediendo Texas, California, Nuevo México y otros territorios.',
    source: { pdfPage: 13 }
  },
  {
    id: 'q048',
    number: 48,
    section: 'Historia',
    topic: 'Historia de México',
    subtopic: 'Arte mexicano',
    difficulty: 2,
    stem: 'Muralista mexicano que plasmó temáticas sociales y científicas en el Palacio de Bellas Artes con la obra "Cruce de Caminos":',
    choices: {
      A: 'José Clemente Orozco',
      B: 'David Alfaro Siqueiros',
      C: 'Diego Rivera',
      D: 'José María Velasco'
    },
    correctChoice: 'C',
    explanation: 'Diego Rivera pintó "El hombre controlador del universo" (conocido como "Cruce de Caminos") en el Palacio de Bellas Artes.',
    source: { pdfPage: 13 }
  }
];
