import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const Experience = () => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="section-title" style={{ fontSize: 20 }}>Journeys Through the Realm</h2>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
        PROFESSIONAL CHRONOLOGY
      </p>
    </div>

    <div style={{ position: 'relative', paddingLeft: 32 }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute', left: 7, top: 8, bottom: 8, width: 1,
        background: 'linear-gradient(180deg, transparent, var(--accent-color), transparent)',
        opacity: 0.3,
      }} />

      {experience.map((exp, i) => (
        <motion.div key={exp._id || i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          style={{ position: 'relative', marginBottom: 28 }}
        >
          {/* Node */}
          <div style={{
            position: 'absolute', left: -27, top: 16,
            width: 12, height: 12, borderRadius: '50%',
            background: 'var(--accent-color)',
            boxShadow: '0 0 0 3px var(--surface-color), 0 0 0 5px var(--border-color), 0 0 10px var(--glow-color)',
          }} />

          <div className="book-card" style={{ borderRadius: 4, padding: '16px 20px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--accent-color)', letterSpacing: '0.15em', opacity: 0.8 }}>
              {exp.date}
            </span>
            <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 16, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
              {exp.role}
            </h3>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: 'var(--accent-color)', fontStyle: 'italic', marginBottom: 12 }}>
              {exp.company}
            </p>
            <div className="gold-divider" />
            <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {exp.points.map((point, j) => (
                <li key={j} style={{ display: 'flex', gap: 10, fontFamily: 'EB Garamond, serif', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent-color)', flexShrink: 0 }}>◆</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ textAlign: 'center', marginTop: 24, opacity: 0.4 }}>
      <div className="gold-divider" />
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 8 }}>
        "Documented in the Great Registry"
      </p>
    </div>
  </div>
);

export default Experience;
