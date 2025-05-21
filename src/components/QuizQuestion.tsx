import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/data/topics';
import { useState, useRef } from 'react';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

// Subcomponente para Multiple Choice
function MultipleChoice({ question, onAnswer, onNext }: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    // @ts-ignore
    const option = question.options.find((opt) => opt.id === optionId);
    const correct = option?.isCorrect ?? false;
    setIsCorrect(correct);
    onAnswer(correct);
    setTimeout(() => setShowExplanation(true), 1000);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
    onNext();
  };

  // @ts-ignore
  const options = question.options;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
      </div>
      <div className="space-y-3 mb-6">
        {options.map((option: any) => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={selectedOption !== null}
            className={`w-full p-4 text-left rounded-lg border transition-all ${selectedOption === option.id ? option.isCorrect ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 hover:border-primary-500'}`}
            whileHover={selectedOption === null ? { scale: 1.02 } : {}}
            whileTap={selectedOption === null ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 font-semibold">{option.id.toUpperCase()}</span>
              <span>{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button onClick={handleNext} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Pregunta Abierta
function OpenQuestion({ question, onAnswer, onNext }: QuizQuestionProps) {
  const [input, setInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    onAnswer(true); // Siempre correcto, fomenta reflexión
    setShowExplanation(true);
  };

  const handleNext = () => {
    setInput('');
    setShowExplanation(false);
    onNext();
  };

  // @ts-ignore
  const placeholder = question.placeholder || '';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
      </div>
      <textarea className="w-full p-3 border rounded mb-4" rows={4} placeholder={placeholder} value={input} onChange={e => setInput(e.target.value)} disabled={showExplanation} />
      {!showExplanation && (
        <motion.button onClick={handleSubmit} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!input.trim()}>
          Enviar
        </motion.button>
      )}
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">¡Gracias por tu reflexión! 🧠</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button onClick={handleNext} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Verdadero/Falso
function TrueFalse({ question, onAnswer, onNext }: QuizQuestionProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // @ts-ignore
  const statement = question.statement;
  // @ts-ignore
  const answer = question.answer;

  const handleSelect = (val: boolean) => {
    if (selected !== null) return;
    setSelected(val);
    const correct = val === answer;
    setIsCorrect(correct);
    onAnswer(correct);
    setTimeout(() => setShowExplanation(true), 1000);
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
        <div className="mb-4 text-lg font-medium text-gray-800">{statement}</div>
      </div>
      <div className="flex gap-4 mb-6">
        <motion.button onClick={() => handleSelect(true)} disabled={selected !== null} className={`flex-1 py-3 rounded-lg font-semibold border ${selected === true ? (answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'bg-white border-gray-200 hover:border-primary-500'}`}>Verdadero</motion.button>
        <motion.button onClick={() => handleSelect(false)} disabled={selected !== null} className={`flex-1 py-3 rounded-lg font-semibold border ${selected === false ? (!answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'bg-white border-gray-200 hover:border-primary-500'}`}>Falso</motion.button>
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button onClick={handleNext} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Ordenar (Order)
function OrderQuestion({ question, onAnswer, onNext }: QuizQuestionProps) {
  const orderQuestion = question as import('@/data/topics').OrderQuestion;
  const initialItems = orderQuestion.items;
  const correctOrder = orderQuestion.correctOrder;
  const [items, setItems] = useState<string[]>(initialItems);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };
  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };
  const handleDrop = () => {
    const copy = [...items];
    const dragIdx = dragItem.current;
    const overIdx = dragOverItem.current;
    if (dragIdx === null || overIdx === null) return;
    const [removed] = copy.splice(dragIdx, 1);
    copy.splice(overIdx, 0, removed);
    setItems(copy);
    dragItem.current = null;
    dragOverItem.current = null;
  };
  const handleSubmit = () => {
    const correct = JSON.stringify(items) === JSON.stringify(correctOrder);
    setIsCorrect(correct);
    onAnswer(correct);
    setShowExplanation(true);
  };
  const handleNext = () => {
    setShowExplanation(false);
    setIsCorrect(null);
    setItems(initialItems);
    onNext();
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
      </div>
      <ul className="mb-6">
        {items.map((item: string, idx: number) => (
          <li
            key={item}
            draggable={!showExplanation}
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => handleDragEnter(idx)}
            onDragEnd={handleDrop}
            className={`p-3 mb-2 rounded-lg border bg-gray-50 cursor-move ${showExplanation ? 'opacity-60 cursor-default' : 'hover:bg-primary-50'}`}
          >
            <span className="font-semibold mr-2">{idx + 1}.</span> {item}
          </li>
        ))}
      </ul>
      {!showExplanation && (
        <motion.button onClick={handleSubmit} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Verificar orden
        </motion.button>
      )}
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button onClick={handleNext} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Relacionar (Match)
function MatchQuestion({ question, onAnswer, onNext }: QuizQuestionProps) {
  const matchQuestion = question as import('@/data/topics').MatchQuestion;
  const pairs = matchQuestion.pairs;
  const correctMatches = matchQuestion.correctMatches;
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [left: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const leftItems = pairs.map((p: { left: string; right: string }) => p.left);
  const rightItems = pairs.map((p: { left: string; right: string }) => p.right);

  const handleSelect = (left: string, right: string) => {
    setMatches(prev => ({ ...prev, [left]: right }));
    setSelectedLeft(null);
  };

  const handleLeftClick = (left: string) => {
    setSelectedLeft(left);
  };

  const handleRightClick = (right: string) => {
    if (selectedLeft) {
      handleSelect(selectedLeft, right);
    }
  };

  const handleSubmit = () => {
    const correct = leftItems.every((left: string) => matches[left] === correctMatches[left]);
    setIsCorrect(correct);
    onAnswer(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setIsCorrect(null);
    setMatches({});
    setSelectedLeft(null);
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
      </div>
      <div className="flex gap-8 mb-6">
        <div className="flex-1">
          <h4 className="font-semibold mb-2">Técnica</h4>
          {leftItems.map((left: string) => (
            <div key={left} className={`p-2 mb-2 rounded border ${selectedLeft === left ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-gray-50'} cursor-pointer`} onClick={() => handleLeftClick(left)}>
              {left}
              {matches[left] && (
                <span className="ml-2 text-xs text-gray-500">→ {matches[left]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2">Descripción</h4>
          {rightItems.map((right: string) => (
            <div key={right} className={`p-2 mb-2 rounded border border-gray-200 bg-gray-50 cursor-pointer`} onClick={() => handleRightClick(right)}>
              {right}
            </div>
          ))}
        </div>
      </div>
      {!showExplanation && (
        <motion.button onClick={handleSubmit} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={Object.keys(matches).length !== leftItems.length}>
          Verificar respuestas
        </motion.button>
      )}
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button onClick={handleNext} className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Completar Espacios
function FillInTheBlank({ question, onAnswer, onNext }: QuizQuestionProps) {
  const fillQuestion = question as import('@/data/topics').FillInTheBlankQuestion;
  const [answers, setAnswers] = useState<string[]>(Array(fillQuestion.blanks.length).fill(''));
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correct = answers.every((answer, index) => 
      answer.toLowerCase().trim() === fillQuestion.correctAnswers[index].toLowerCase().trim()
    );
    setIsCorrect(correct);
    onAnswer(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setAnswers(Array(fillQuestion.blanks.length).fill(''));
    setShowExplanation(false);
    setIsCorrect(null);
    onNext();
  };

  // Dividir el texto en partes (texto normal y espacios en blanco)
  const parts = fillQuestion.text.split(/(\[.*?\])/).filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <div className="text-lg font-medium text-gray-800 mb-4">
          {parts.map((part, index) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              const blankIndex = fillQuestion.blanks.indexOf(part.slice(1, -1));
              return (
                <span key={index} className="inline-flex items-center mx-1">
                  <input
                    type="text"
                    value={answers[blankIndex]}
                    onChange={(e) => handleInputChange(blankIndex, e.target.value)}
                    disabled={showExplanation}
                    className={`w-32 px-2 py-1 border rounded ${
                      showExplanation
                        ? answers[blankIndex].toLowerCase().trim() === fillQuestion.correctAnswers[blankIndex].toLowerCase().trim()
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                        : 'border-gray-300 focus:border-primary-500'
                    }`}
                  />
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </div>
      </div>
      {!showExplanation && (
        <motion.button
          onClick={handleSubmit}
          disabled={answers.some(answer => !answer.trim())}
          className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Verificar
        </motion.button>
      )}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-gray-50"
          >
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
            {!isCorrect && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Respuestas correctas:</h4>
                <ul className="list-disc list-inside">
                  {fillQuestion.blanks.map((blank, index) => (
                    <li key={index} className="text-gray-700">
                      {blank}: {fillQuestion.correctAnswers[index]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.button
          onClick={handleNext}
          className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

// Subcomponente para Escuchar y Escribir
function ListenAndWrite({ question, onAnswer, onNext }: QuizQuestionProps) {
  const listenQuestion = question as import('@/data/topics').ListenAndWriteQuestion;
  const [input, setInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    const correct = input.toLowerCase().trim() === listenQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    onAnswer(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setInput('');
    setShowExplanation(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">{question.category}</span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{question.difficulty}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
      </div>

      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlay}
          disabled={isPlaying}
          className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 ${
            isPlaying
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <span className="text-xl">🔊</span>
          {isPlaying ? 'Reproduciendo...' : 'Escuchar'}
        </motion.button>
        <audio ref={audioRef} src={listenQuestion.audioUrl} className="hidden" />
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={showExplanation}
          placeholder="Escribe lo que escuchaste..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {!showExplanation && (
        <motion.button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Verificar
        </motion.button>
      )}

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-gray-50"
          >
            <h3 className="font-semibold mb-2">{isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕'}</h3>
            <p className="text-gray-700">{question.explanation}</p>
            {!isCorrect && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Respuesta correcta:</h4>
                <p className="text-gray-700">{listenQuestion.correctAnswer}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && (
        <motion.button
          onClick={handleNext}
          className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Siguiente pregunta
        </motion.button>
      )}
    </motion.div>
  );
}

export const QuizQuestion = ({ question, onAnswer, onNext }: QuizQuestionProps) => {
  if (question.type === 'multiple_choice') {
    return <MultipleChoice question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'open') {
    return <OpenQuestion question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'true_false') {
    return <TrueFalse question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'order') {
    return <OrderQuestion question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'match') {
    return <MatchQuestion question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'fill_in_blank') {
    return <FillInTheBlank question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  if (question.type === 'listen_and_write') {
    return <ListenAndWrite question={question} onAnswer={onAnswer} onNext={onNext} />;
  }
  return <div>Tipo de pregunta no soportado aún.</div>;
}; 