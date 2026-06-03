import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border-2 border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors group"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="dark"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            className="text-orange-500"
          >
            <div className="relative">
              <Flame size={24} className="fill-orange-500" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 
                }}
                className="absolute inset-0 bg-orange-400 blur-md rounded-full -z-10"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
            className="text-[var(--accent-color)]"
          >
            <Sun size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
