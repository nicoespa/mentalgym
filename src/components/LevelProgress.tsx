import { motion } from 'framer-motion';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';

interface LevelProgressProps {
  level: number;
  hearts: number;
  maxHearts: number;
  stars: number;
  maxStars: number;
  onHeartLost?: () => void;
}

export const LevelProgress = ({ level, hearts, maxHearts, stars, maxStars, onHeartLost }: LevelProgressProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">Nivel {level}</span>
        <div className="flex gap-1">
          {Array.from({ length: maxStars }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i < stars ? 1 : 0.5 }}
              className="text-yellow-400"
            >
              <StarIcon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i < hearts ? 1 : 0.5 }}
              className="text-red-500"
            >
              <HeartIcon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 