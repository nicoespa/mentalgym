'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Topic } from '@/data/topics';

export default function ResultsClient({ topic, score }: { topic: Topic, score: string }) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            💔
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">¡Se acabaron las vidas!</h1>
          <p className="text-gray-600">No te preocupes, puedes intentarlo de nuevo.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <HeartIcon className="w-6 h-6 text-red-500" />
            <span className="text-xl font-semibold">0 vidas restantes</span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Puntuación final</h2>
            <p className="text-4xl font-bold text-primary-600">{score} XP</p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/session/${topic.id}`)}
              className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold"
            >
              Intentar de nuevo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/topics')}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold"
            >
              Volver a temas
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600"
        >
          <p className="mb-2">¿Necesitas ayuda?</p>
          <p>Practica más en temas más fáciles para ganar confianza.</p>
        </motion.div>
      </div>
    </main>
  );
} 