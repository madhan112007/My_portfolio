import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <div className="container mx-auto px-6 py-20 relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-20 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        Journeys through the Realm
      </motion.h2>

      <div className="relative">
        {/* The Golden Thread (Vertical Line) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--accent-color)] to-transparent opacity-30 hidden md:block" />

        <div className="space-y-24">
          {experience.map((exp, i) => (
            <div key={exp._id || i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-[45%] bg-[var(--surface-color)] p-8 border-2 border-[var(--border-color)]/30 rounded-sm parchment-texture relative"
              >
                <div className="absolute top-4 right-6 text-[var(--accent-color)] font-mono text-sm font-bold uppercase tracking-widest">
                  {exp.date}
                </div>
                <h3 className="font-heading text-2xl font-bold mb-1 text-[var(--text-primary)]">{exp.role}</h3>
                <h4 className="font-subheading text-lg text-[var(--accent-color)] mb-6">{exp.company}</h4>
                
                <ul className="space-y-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-4 font-body text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-color)] mt-1.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Wax Seal Decoration */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-red-900 rounded-full border-4 border-red-800 shadow-lg flex items-center justify-center -z-10 opacity-20 hidden md:flex ${
                  i % 2 === 0 ? '-right-14' : '-left-14'
                }`}>
                  <div className="w-6 h-6 border-2 border-red-700 rounded-full" />
                </div>
              </motion.div>

              {/* Central Node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[var(--accent-color)] bg-[var(--bg-color)] z-10 magical-glow" />
              
              <div className="w-full md:w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
