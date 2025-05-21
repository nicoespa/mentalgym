"use client";
import { motion } from 'framer-motion';

export function StreakBadge({ days }: { days: number }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-semibold shadow-sm mb-4 animate-float"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <span className="text-xl">🔥</span>
      <span>Racha: {days} día{days === 1 ? '' : 's'}</span>
    </motion.div>
  );
} 