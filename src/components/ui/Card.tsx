import { motion } from 'framer-motion';
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 transition-all duration-200';
    
    const variants = {
      default: 'bg-white dark:bg-gray-800',
      elevated: 'bg-white dark:bg-gray-800 shadow-lg',
      outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
    };

    const hoverStyles = hoverEffect
      ? 'hover:shadow-xl hover:-translate-y-1'
      : '';

    return (
      <motion.div
        ref={ref}
        className={twMerge(baseStyles, variants[variant], hoverStyles, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card'; 