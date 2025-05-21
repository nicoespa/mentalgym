'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { SessionSuccess } from '@/components/SessionSuccess';
import { QuizQuestion } from '@/components/QuizQuestion';
import { LevelProgress } from '@/components/LevelProgress';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewSession from '@/components/ReviewSession';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Question, Topic } from '@/data/topics';

export default function SessionClient({ topic }: { topic: Topic }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [failedQuestions, setFailedQuestions] = useState<Question[]>([]);
  const { xp, streak, setXp, setStreak } = useUserStore();
  const [hearts, setHearts] = useState(3);
  const [level, setLevel] = useState(1);
  const [stars, setStars] = useState(0);

  // Crear usuario si no existe
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      const newId = crypto.randomUUID();
      localStorage.setItem('user_id', newId);
      supabase.from('users').insert({ id: newId });
    }
  }, []);

  const handleAnswer = async (isCorrect: boolean) => {
    if (isCorrect) {
      const question = topic?.questions[currentQuestionIndex];
      setScore(prev => prev + (question?.xpReward ?? 0));
      // Actualizar estrellas basado en el progreso
      const progress = (currentQuestionIndex + 1) / (topic?.questions.length ?? 1);
      if (progress >= 0.8) setStars(3);
      else if (progress >= 0.6) setStars(2);
      else if (progress >= 0.4) setStars(1);
    } else {
      setHearts(prev => prev - 1);
      if (topic?.questions[currentQuestionIndex]) {
        setFailedQuestions(prev => [...prev, topic.questions[currentQuestionIndex]]);
      }
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < (topic?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (failedQuestions.length > 0) {
        setShowReview(true);
      } else {
        // Sesión completada
        const userId = localStorage.getItem('user_id');
        const today = new Date().toISOString().split('T')[0];
        // Guardar sesión en Supabase
        await supabase.from('sessions').insert({
          user_id: userId,
          topic: topic?.title,
          score: score,
          completed_at: today,
          level: level,
          stars: stars
        });
        // Actualizar XP y racha
        const { data: userRow } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        if (userRow) {
          const lastDate = userRow.last_session?.split('T')[0];
          const isSameDay = lastDate === today;
          const newStreak = isSameDay ? userRow.streak : userRow.streak + 1;
          const newXp = userRow.xp + score;
          await supabase.from('users').update({
            xp: newXp,
            streak: newStreak,
            last_session: today
          }).eq('id', userId);
          setXp(newXp);
          setStreak(newStreak);
        }
        setShowSuccess(true);
      }
    }
  };

  const handleReviewComplete = () => {
    setShowSuccess(true);
  };

  const handleContinue = () => {
    router.push('/dashboard');
  };

  if (hearts <= 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¡Se acabaron los corazones! 💔</h2>
          <p className="text-lg mb-6">
            Has perdido todas tus vidas. ¿Quieres intentar de nuevo?
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push('/dashboard')} variant="secondary">
              Volver al Dashboard
            </Button>
            <Button onClick={() => router.refresh()} variant="primary">
              Intentar de nuevo
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showReview) {
    return (
      <ReviewSession
        failedQuestions={failedQuestions}
        onComplete={handleReviewComplete}
      />
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{topic.title}</h2>
        <div className="flex items-center gap-4">
          <span className="text-3xl">{topic.icon}</span>
          <p className="text-gray-600">{topic.description}</p>
        </div>
      </div>
      <LevelProgress
        level={level}
        hearts={hearts}
        maxHearts={3}
        stars={stars}
        maxStars={3}
      />
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
            Pregunta {currentQuestionIndex + 1} de {topic.questions.length}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            Puntos: {score}
          </span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SessionSuccess
              xpGained={xp}
              streakDays={streak}
              nextLevelXp={1000}
              currentXp={xp}
              stars={stars}
              level={level}
              onContinue={handleContinue}
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizQuestion
              question={topic.questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 