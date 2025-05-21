"use client";
import { motion } from 'framer-motion';
import { TrophyIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  completed: boolean;
  xpReward: number;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Logros</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              achievement.completed
                ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  achievement.completed
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        className={`h-full ${
                          achievement.completed ? 'bg-yellow-500' : 'bg-primary-500'
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                {achievement.completed && (
                  <div className="mt-2 flex items-center gap-1 text-sm text-yellow-600">
                    <StarIcon className="w-4 h-4" />
                    <span>+{achievement.xpReward} XP</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 