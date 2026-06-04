import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];

const Achievements = () => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="section-title" style={{ fontSize: 22 }}>Proclamations of Valor</h2>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
        HONORS & ACCOLADES
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {achievements.map((achievement, i) => (
        <motion.div key={achievement._id || i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="book-card"
          style={{ borderRadius: 4, padding: '18px 22px', paddingLeft: 60 }}
        >
          {/* Roman numeral medallion */}
          <div style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-color), #8B6010)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px var(--glow-color), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>
            <span style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 8, color: '#1A0A00', fontWeight: 700 }}>
              {ROMAN[i] || i + 1}
            </span>
          </div>

          <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 15, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>
            {achievement.title}
          </h3>

          <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            {achievement.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {achievement.tags.slice(0, 3).map(tag => (
              <span key={tag} className="rune-tag">#{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ textAlign: 'center', marginTop: 24, opacity: 0.4 }}>
      <div className="gold-divider" />
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 8 }}>
        "Witnessed and Sealed"
      </p>
    </div>
  </div>
);

export default Achievements;
