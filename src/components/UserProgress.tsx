import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface UserProgressProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  totalXp: number;
  achievements: Achievement[];
}

export const UserProgress = ({
  level,
  currentXp,
  nextLevelXp,
  streakDays,
  totalXp,
  achievements,
}: UserProgressProps) => {
  return (
    <div className="space-y-6">
      <Card variant="elevated" className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Level {level}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {totalXp} total XP
            </p>
          </div>
          <Badge variant="warning" size="lg" icon="🔥">
            {streakDays} Day Streak
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress to level {level + 1}</span>
            <span>
              {currentXp}/{nextLevelXp} XP
            </span>
          </div>
          <Progress
            value={currentXp}
            max={nextLevelXp}
            variant="default"
            size="lg"
          />
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Achievements
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                className={`rounded-lg p-4 ${
                  achievement.unlockedAt
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                {achievement.unlockedAt && (
                  <Badge
                    variant="success"
                    size="sm"
                    className="mt-2"
                  >
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}; 