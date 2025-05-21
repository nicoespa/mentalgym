import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  completed?: boolean;
}

interface TopicSelectionProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
  userLevel: number;
}

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
} as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const TopicSelection = ({ topics, onSelectTopic, userLevel }: TopicSelectionProps) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {topics.map((topic) => (
        <motion.div key={topic.id} variants={item}>
          <Card
            variant="elevated"
            className="group relative cursor-pointer overflow-hidden p-6"
            onClick={() => onSelectTopic(topic.id)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 transition-opacity group-hover:opacity-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />

            <div className="relative">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {topic.title}
                </h3>
                <Badge
                  variant={difficultyColors[topic.difficulty]}
                  size="sm"
                >
                  {topic.difficulty}
                </Badge>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {topic.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary-600">
                    +{topic.xpReward} XP
                  </span>
                  {topic.completed && (
                    <Badge variant="success" size="sm">
                      Completed
                    </Badge>
                  )}
                </div>

                <motion.div
                  className="text-primary-600"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  →
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}; 