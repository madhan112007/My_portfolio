import React from 'react';
import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';
import { achievements } from '../data/achievements';

const Achievements = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        Proclamations of Valor
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement._id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-10 bg-[var(--surface-color)] border-2 border-[var(--border-color)]/40 rounded-sm parchment-texture hover:magical-glow transition-all duration-300"
          >
            {/* Wax Seal */}
            <div className="absolute top-[-20px] left-10 w-12 h-12 bg-red-800 rounded-full border-4 border-red-900 shadow-md flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
              <div className="text-[var(--accent-color)] opacity-50"><Medal size={24} /></div>
            </div>

            <h3 className="font-heading text-xl font-bold mb-4 mt-4 text-[var(--text-primary)]">
              {achievement.title}
            </h3>
            
            <p className="font-body text-[var(--text-secondary)] mb-8">
              {achievement.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {achievement.tags.map(tag => (
                <span key={tag} className="text-xs font-mono px-3 py-1 bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20 rounded-sm">
                  [{tag}]
                </span>
              ))}
            </div>

            {/* Ornamental border */}
            <div className="absolute inset-2 border border-[var(--border-color)]/10 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
