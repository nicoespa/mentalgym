"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Topics', href: '/topics', icon: '🧠' },
  { label: 'Progress', href: '/progress', icon: '📈' },
  { label: 'Profile', href: '/profile', icon: '👤' },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 sm:relative sm:border-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? '✕' : '☰'}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      layoutId="navigation-underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu */}
          <motion.div
            className="sm:hidden"
            initial={false}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}; 