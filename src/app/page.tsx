'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';
import { topics } from '@/data/topics';
import { XPProgressBar } from '@/components/XPProgressBar';
import { StreakBadge } from '@/components/StreakBadge';
import { Achievements, Achievement } from '@/components/Achievements';
import { TopicCard } from '@/components/TopicCard';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const mentorMessages = [
  '¡Hoy es un gran día para entrenar tu mente! 💡',
  'Recuerda: la constancia es la clave del progreso. 🔑',
  '¡Sigue así! Cada día sumás más claridad y creatividad. 🚀',
  'Tu mente es tu mejor herramienta. ¡Entrénala! 🧠',
];

export default function Home() {
  const { streak, xp, setStreak, setXp } = useUserStore();
  const router = useRouter();
  const [mentorMood] = useState(() => Math.floor(Math.random() * mentorMessages.length));
  const [showMentorMsg, setShowMentorMsg] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) return;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setStreak(data.streak);
        setXp(data.xp);
      }
    };
    fetchUser();
  }, []);

  // Lógica simple de nivel (puedes mejorarla luego)
  const level = Math.floor((xp || 0) / 1000) + 1;
  const nextLevelXP = level * 1000;

  // Ejemplo de logros (puedes luego traerlos de la base de datos)
  const achievements: Achievement[] = [
    { id: '1', title: 'Primer día', description: 'Completá tu primer sesión', icon: '🎉', unlocked: streak > 0 },
    { id: '2', title: 'Racha 3 días', description: '3 días seguidos', icon: '🔥', unlocked: streak >= 3 },
    { id: '3', title: '100 XP', description: 'Alcanza 100 XP', icon: '💡', unlocked: xp >= 100 },
  ];

  // Sugerencias inteligentes: temas no completados, prioriza los de menor dificultad y los menos recientes
  const incompleteTopics = topics.filter(t => !t.completed);
  let suggestedTopics = incompleteTopics.slice(0, 2);
  if (incompleteTopics.length === 0) {
    // Si todos están completos, sugiere el que menos XP dio (simulado)
    suggestedTopics = [topics[0]];
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="text-5xl cursor-pointer"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          onClick={() => setShowMentorMsg(!showMentorMsg)}
        >
          🧑‍🏫
        </motion.div>
        {showMentorMsg && (
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="block text-base text-gray-700 dark:text-gray-200 font-medium">
              {mentorMessages[mentorMood]}
            </span>
            <span className="absolute left-2 -bottom-2 text-2xl select-none">▼</span>
          </motion.div>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4">Mental Gym <span className="animate-float">🧠</span></h1>
      <XPProgressBar currentXP={xp} nextLevelXP={nextLevelXP} level={level} />
      <StreakBadge days={streak} />
      <Achievements achievements={achievements} />

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p>🔥 Racha: <strong>{streak}</strong> días</p>
        <p>💡 XP Mental: <strong>{xp}</strong></p>
      </div>

      {suggestedTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sugerencias para hoy</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedTopics.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.04, boxShadow: '0 4px 24px rgba(80,80,200,0.10)' }}
                whileTap={{ scale: 0.98 }}
                className="transition"
              >
                <TopicCard
                  title={topic.title}
                  description={topic.description}
                  icon={topic.icon}
                  completed={topic.completed}
                  onClick={() => router.push(`/session/${topic.id}`)}
                />
                <motion.button
                  className="mt-2 w-full rounded-lg bg-primary-600 px-4 py-2 text-white font-semibold shadow focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  onClick={() => router.push(`/session/${topic.id}`)}
                >
                  ¡Entrenar este tema!
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 24px rgba(80,80,200,0.10)' }}
            whileTap={{ scale: 0.98 }}
            className="transition"
          >
            <TopicCard
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              completed={topic.completed}
              onClick={() => router.push(`/session/${topic.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
