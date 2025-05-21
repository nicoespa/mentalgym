import { motion } from 'framer-motion';

export interface TopicCardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
  completed?: boolean;
}

export function TopicCard({ title, description, icon, onClick, completed }: TopicCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, boxShadow: '0 4px 24px rgba(80,80,200,0.10)' }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-5 rounded-2xl border bg-white shadow-sm transition relative group focus:outline-none ${completed ? 'ring-2 ring-green-400' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-lg font-bold">{title}</span>
        {completed && <span className="ml-2 text-green-600 text-xs font-semibold">✔ Completado</span>}
      </div>
      <p className="text-gray-600 text-sm mb-1">{description}</p>
    </motion.button>
  );
} 