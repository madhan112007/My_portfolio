import React from 'react';
import { motion } from 'framer-motion';
import { techIcons } from '../data/techIcons';
import { skillGroups } from '../data/skills';

const Skills = () => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="section-title" style={{ fontSize: 22 }}>The Arcane Arts</h2>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
        MASTERED DISCIPLINES
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {skillGroups.map((group, i) => (
        <motion.div key={group._id || i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="book-card"
          style={{ borderRadius: 4, padding: '16px 20px' }}
        >
          {/* Category header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 3, height: 18, background: 'var(--accent-color)', borderRadius: 2, boxShadow: '0 0 8px var(--glow-color)' }} />
            <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 15, color: 'var(--text-primary)', letterSpacing: '0.12em' }}>
              {group.category}
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {group.skills.map(skill => {
              const Icon = techIcons[skill]?.icon;
              return (
                <motion.span key={skill}
                  whileHover={{ scale: 1.08, y: -1 }}
                  className="rune-tag"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'default' }}
                >
                  {Icon && <Icon size={10} style={{ color: 'var(--accent-color)' }} />}
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ marginTop: 28, textAlign: 'center', opacity: 0.35 }}>
      <div className="gold-divider" />
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.25em', color: 'var(--text-secondary)', marginTop: 8 }}>
        MAGICAL APTITUDE INDEX
      </p>
    </div>
  </div>
);

export default Skills;
