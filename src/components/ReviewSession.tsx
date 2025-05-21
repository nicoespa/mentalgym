'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/data/topics';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';

interface ReviewSessionProps {
  failedQuestions: Question[];
  onComplete: () => void;
}

export default function ReviewSession({ failedQuestions, onComplete }: ReviewSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = failedQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / failedQuestions.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < failedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6"
      >
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¡Sesión de repaso completada!</h2>
          <p className="text-lg mb-6">
            Has respondido correctamente {correctAnswers} de {failedQuestions.length} preguntas.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleComplete} variant="primary">
              Continuar
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Progress value={progress} max={100} />
        <p className="text-sm text-gray-500 mt-2">
          Pregunta {currentQuestionIndex + 1} de {failedQuestions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 