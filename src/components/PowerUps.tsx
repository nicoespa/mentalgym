import { motion } from 'framer-motion';
import { LightBulbIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  used: boolean;
}

interface PowerUpsProps {
  powerUps: PowerUp[];
  onUse: (id: string) => void;
  coins: number;
}

export const PowerUps = ({ powerUps, onUse, coins }: PowerUpsProps) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
        <span className="text-lg">🪙</span>
        <span className="font-semibold">{coins}</span>
      </div>
      <div className="flex gap-2">
        {powerUps.map((powerUp) => (
          <motion.button
            key={powerUp.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUse(powerUp.id)}
            disabled={powerUp.used || coins < powerUp.cost}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
              powerUp.used
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : coins >= powerUp.cost
                ? 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
                : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            {powerUp.icon}
            <span className="text-sm font-medium">{powerUp.name}</span>
            {!powerUp.used && (
              <span className="text-xs px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded-full">
                {powerUp.cost}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}; 