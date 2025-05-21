'use client';
import { XPProgressBar } from '@/components/XPProgressBar';
import { StreakBadge } from '@/components/StreakBadge';
import { Achievements, Achievement } from '@/components/Achievements';
import { motion } from 'framer-motion';

// Simulación de historial de sesiones
const sessionHistory = [
  { date: '2024-05-20', topic: 'Creatividad', xp: 10 },
  { date: '2024-05-19', topic: 'Libertad', xp: 10 },
  { date: '2024-05-18', topic: 'Creatividad', xp: 10 },
  { date: '2024-05-17', topic: 'Libertad', xp: 10 },
  { date: '2024-05-16', topic: 'Creatividad', xp: 10 },
];

const achievements: Achievement[] = [
  { id: '1', title: 'Primer día', description: 'Completá tu primer sesión', icon: '🎉', progress: 1, total: 1, completed: true, xpReward: 10 },
  { id: '2', title: 'Racha 3 días', description: '3 días seguidos', icon: '🔥', progress: 3, total: 3, completed: true, xpReward: 20 },
  { id: '3', title: '100 XP', description: 'Alcanza 100 XP', icon: '💡', progress: 80, total: 100, completed: false, xpReward: 30 },
];

export default function ProgressPage() {
  // Datos de ejemplo, reemplaza por datos reales del usuario
  const xp = 350;
  const level = 1;
  const nextLevelXP = 1000;
  const streak = 3;
  const progressHistory = [50, 80, 120, 200, 350];

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Progreso</h1>
      <XPProgressBar currentXP={xp} nextLevelXP={nextLevelXP} level={level} />
      <StreakBadge days={streak} />
      <div className="my-6">
        <h2 className="text-lg font-semibold mb-2">Historial de XP</h2>
        <div className="flex items-end gap-2 h-32 mb-4">
          {progressHistory.map((val, i) => (
            <motion.div
              key={i}
              className="flex-1 flex flex-col items-center"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: 'bottom' }}
            >
              <div className="w-8 bg-blue-400 rounded-t" style={{ height: `${val / 4}px` }} />
              <span className="text-xs mt-1">Día {i + 1}</span>
            </motion.div>
          ))}
        </div>
        <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Tema</th>
              <th className="p-2 text-left">XP</th>
            </tr>
          </thead>
          <tbody>
            {sessionHistory.map((s, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2">{s.date}</td>
                <td className="p-2">{s.topic}</td>
                <td className="p-2">+{s.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Achievements achievements={achievements} />
    </div>
  );
} 