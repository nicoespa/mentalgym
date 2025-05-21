import { motion } from 'framer-motion';
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  animate?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', icon, animate = true, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';
    
    const variants = {
      default: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
      success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
      error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
    };

    const content = (
      <>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </>
    );

    if (animate) {
      return (
        <motion.span
          ref={ref}
          className={twMerge(baseStyles, variants[variant], sizes[size], className)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          {...props}
        >
          {content}
        </motion.span>
      );
    }

    return (
      <span
        ref={ref}
        className={twMerge(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge'; 