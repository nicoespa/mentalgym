'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { StarIcon } from '@heroicons/react/24/solid';

interface SessionSuccessProps {
  xpGained: number;
  streakDays: number;
  nextLevelXp: number;
  currentXp: number;
  stars: number;
  level: number;
  onContinue: () => void;
}

export const SessionSuccess = ({
  xpGained,
  streakDays,
  nextLevelXp,
  currentXp,
  stars,
  level,
  onContinue,
}: SessionSuccessProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setShowConfetti(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">¡Sesión Completada!</h2>
          <p className="text-gray-600 mb-6">Has ganado {xpGained} XP</p>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i < stars ? 1 : 0.5 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-yellow-400"
              >
                <StarIcon className="w-8 h-8" />
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Nivel {level}</span>
              <span className="text-sm font-medium text-gray-600">{currentXp}/{nextLevelXp} XP</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentXp / nextLevelXp) * 100}%` }}
                className="h-full bg-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
            <span className="text-xl">🔥</span>
            <span>Racha de {streakDays} días</span>
          </div>

          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold"
          >
            Continuar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
