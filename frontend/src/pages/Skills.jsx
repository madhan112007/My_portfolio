import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { techIcons } from '../data/techIcons';
import { Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Skills = () => {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${API_URL}/skills`);
        setSkillGroups(res.data);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        The Arcane Arts
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group._id || i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 border-2 border-[var(--border-color)]/20 rounded-sm bg-[var(--surface-color)]/30 parchment-texture relative group hover:border-[var(--accent-color)] transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-[var(--accent-color)]" size={24} />
              <h3 className="font-heading text-xl font-bold tracking-tight">{group.category}</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, j) => {
                const techData = techIcons[skill];
                const Icon = techData?.icon;

                return (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="relative group/pill"
                  >
                    <div className="px-4 py-2 bg-[var(--bg-color)] border border-[var(--border-color)]/30 rounded-full text-sm font-mono text-[var(--text-primary)] relative overflow-hidden flex items-center gap-2 transition-all duration-300">
                      {Icon && (
                        <Icon 
                          className="text-[var(--accent-color)]/50 group-hover/pill:text-[var(--accent-color)] transition-colors duration-300"
                          size={16} 
                        />
                      )}
                      {skill}
                      {/* Shimmer sweep animation */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/pill:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-[var(--accent-color)]/20 to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-12 h-12 opacity-5 pointer-events-none">
              <Sparkles size={48} className="rotate-45" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
