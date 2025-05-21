"use client";
import { motion } from 'framer-motion';

export function XPProgressBar({ currentXP, nextLevelXP, level }: { currentXP: number, nextLevelXP: number, level: number }) {
  const percent = Math.min(100, (currentXP / nextLevelXP) * 100);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold">Nivel {level}</span>
        <span>{currentXP} / {nextLevelXP} XP</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, type: 'spring' }}
        />
      </div>
    </div>
  );
} 