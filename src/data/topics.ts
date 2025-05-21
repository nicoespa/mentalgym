export type QuestionType = 'multiple_choice' | 'open' | 'true_false' | 'order' | 'match' | 'fill_in_blank' | 'listen_and_write';

export interface QuestionBase {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  xpReward: number;
  explanation: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple_choice';
  options: { id: string; text: string; isCorrect: boolean }[];
}

export interface OpenQuestion extends QuestionBase {
  type: 'open';
  placeholder?: string;
}

export interface TrueFalseQuestion extends QuestionBase {
  type: 'true_false';
  statement: string;
  answer: boolean;
}

export interface OrderQuestion extends QuestionBase {
  type: 'order';
  items: string[];
  correctOrder: string[];
}

export interface MatchQuestion extends QuestionBase {
  type: 'match';
  pairs: { left: string; right: string }[];
  correctMatches: { [left: string]: string };
}

export interface FillInTheBlankQuestion extends QuestionBase {
  type: 'fill_in_blank';
  text: string;
  blanks: string[];
  correctAnswers: string[];
}

export interface ListenAndWriteQuestion extends QuestionBase {
  type: 'listen_and_write';
  audioUrl: string;
  correctAnswer: string;
}

export type Question =
  | MultipleChoiceQuestion
  | OpenQuestion
  | TrueFalseQuestion
  | OrderQuestion
  | MatchQuestion
  | FillInTheBlankQuestion
  | ListenAndWriteQuestion;

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export const topics: Topic[] = [
  {
    id: 'creatividad',
    title: 'Creatividad',
    description: 'Desarrolla tu pensamiento creativo y aprende a ver problemas desde nuevas perspectivas.',
    icon: '🎨',
    difficulty: 'beginner',
    xpReward: 100,
    questions: [
      {
        id: 'c1',
        type: 'multiple_choice',
        text: '¿Cuál de estas técnicas NO es comúnmente usada para estimular la creatividad?',
        options: [
          { id: 'a', text: 'Brainstorming', isCorrect: false },
          { id: 'b', text: 'Pensamiento crítico', isCorrect: true },
          { id: 'c', text: 'Mind mapping', isCorrect: false },
          { id: 'd', text: 'Pensamiento lateral', isCorrect: false }
        ],
        explanation: 'El pensamiento crítico es más analítico y evaluativo, mientras que las otras opciones son técnicas específicamente diseñadas para estimular la creatividad.',
        difficulty: 'easy',
        category: 'Técnicas Creativas',
        xpReward: 10
      },
      {
        id: 'c2',
        type: 'open',
        text: 'Contá una situación donde tuviste que ser creativo para resolver un problema.',
        placeholder: 'Escribí tu experiencia...',
        explanation: 'Reflexionar sobre experiencias propias ayuda a fortalecer la creatividad.',
        difficulty: 'medium',
        category: 'Reflexión',
        xpReward: 15
      },
      {
        id: 'c3',
        type: 'true_false',
        text: 'El pensamiento lateral es una técnica para estimular la creatividad.',
        statement: 'El pensamiento lateral es una técnica para estimular la creatividad.',
        answer: true,
        explanation: 'Correcto, el pensamiento lateral es ampliamente usado para fomentar la creatividad.',
        difficulty: 'easy',
        category: 'Técnicas Creativas',
        xpReward: 10
      },
      {
        id: 'c4',
        type: 'order',
        text: 'Ordená los pasos para una sesión de brainstorming efectiva.',
        items: [
          'Seleccionar un facilitador',
          'Definir el problema',
          'Generar ideas libremente',
          'Evaluar y seleccionar ideas'
        ],
        correctOrder: [
          'Definir el problema',
          'Seleccionar un facilitador',
          'Generar ideas libremente',
          'Evaluar y seleccionar ideas'
        ],
        explanation: 'El orden correcto ayuda a que la sesión sea productiva y enfocada.',
        difficulty: 'hard',
        category: 'Técnicas Creativas',
        xpReward: 20
      },
      {
        id: 'c5',
        type: 'match',
        text: 'Relacioná cada técnica con su descripción.',
        pairs: [
          { left: 'Brainstorming', right: 'Generar ideas en grupo sin juzgar' },
          { left: 'Mind mapping', right: 'Organizar ideas visualmente' },
          { left: 'Pensamiento lateral', right: 'Buscar soluciones no convencionales' }
        ],
        correctMatches: {
          'Brainstorming': 'Generar ideas en grupo sin juzgar',
          'Mind mapping': 'Organizar ideas visualmente',
          'Pensamiento lateral': 'Buscar soluciones no convencionales'
        },
        explanation: 'Cada técnica tiene un propósito específico en el proceso creativo.',
        difficulty: 'medium',
        category: 'Técnicas Creativas',
        xpReward: 15
      }
    ],
    completed: false
  },
  {
    id: 'libertad',
    title: 'Libertad',
    description: 'Reflexiona sobre el significado de la libertad y cómo influye en tu vida.',
    icon: '🕊️',
    difficulty: 'intermediate',
    xpReward: 150,
    questions: [
      {
        id: 'l1',
        type: 'multiple_choice',
        text: '¿Cuál de estas afirmaciones sobre la libertad es más precisa?',
        options: [
          { id: 'a', text: 'La libertad es hacer lo que uno quiere sin límites', isCorrect: false },
          { id: 'b', text: 'La libertad implica responsabilidad por las propias decisiones', isCorrect: true },
          { id: 'c', text: 'La libertad es un concepto puramente individual', isCorrect: false },
          { id: 'd', text: 'La libertad no tiene relación con la ética', isCorrect: false }
        ],
        explanation: 'La libertad verdadera implica responsabilidad, ya que nuestras decisiones afectan no solo a nosotros sino también a los demás.',
        difficulty: 'medium',
        category: 'Filosofía',
        xpReward: 15
      },
      {
        id: 'l2',
        type: 'multiple_choice',
        text: '¿Qué tipo de libertad es más fundamental para el desarrollo personal?',
        options: [
          { id: 'a', text: 'Libertad económica', isCorrect: false },
          { id: 'b', text: 'Libertad de expresión', isCorrect: false },
          { id: 'c', text: 'Libertad de pensamiento', isCorrect: true },
          { id: 'd', text: 'Libertad de movimiento', isCorrect: false }
        ],
        explanation: 'La libertad de pensamiento es la base de todas las demás libertades, ya que permite cuestionar, analizar y formar nuestras propias ideas.',
        difficulty: 'hard',
        category: 'Desarrollo Personal',
        xpReward: 20
      },
      {
        id: 'l3',
        type: 'fill_in_blank',
        text: 'La libertad [libertad] es un derecho fundamental que implica [responsabilidad] por nuestras acciones y respeto por la [dignidad] de los demás.',
        blanks: ['libertad', 'responsabilidad', 'dignidad'],
        correctAnswers: ['individual', 'responsabilidad', 'dignidad'],
        explanation: 'La libertad individual es un derecho fundamental que debe ejercerse con responsabilidad y respeto hacia los demás.',
        difficulty: 'medium',
        category: 'Filosofía',
        xpReward: 15
      }
    ],
    completed: false
  }
];
  