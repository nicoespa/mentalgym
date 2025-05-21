import { motion } from 'framer-motion';
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max, showValue = true, variant = 'default', size = 'md', ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const baseStyles = 'relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700';
    
    const sizes = {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    };

    const variants = {
      default: 'bg-primary-600',
      success: 'bg-success',
      warning: 'bg-warning',
    };

    return (
      <div ref={ref} className={twMerge(baseStyles, sizes[size], className)} {...props}>
        <motion.div
          className={twMerge('h-full', variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress'; 