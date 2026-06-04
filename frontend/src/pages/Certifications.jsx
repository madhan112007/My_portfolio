import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';

const ribbonColors = { red: '#8B1A1A', emerald: '#064E3B', brightRed: '#DC2626', blue: '#1D4ED8', navy: '#1E3A8A' };

const Certifications = () => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="section-title" style={{ fontSize: 22 }}>Scrolls & Seals</h2>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
        ARCANE CREDENTIALS
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {certifications.map((cert, i) => (
        <motion.div key={cert._id || i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="book-card"
          style={{ borderRadius: 4, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}
        >
          {/* Colored seal */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: ribbonColors[cert.color] || '#B8860B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.15)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>✦</span>
          </div>

          {/* Scroll icon line */}
          <div style={{
            width: 1, height: 36, flexShrink: 0,
            background: 'linear-gradient(180deg, transparent, var(--accent-color), transparent)',
            opacity: 0.3,
          }} />

          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 11, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>
              {cert.name}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 12, color: 'var(--accent-color)', fontStyle: 'italic' }}>
                {cert.issuer}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'var(--text-secondary)', opacity: 0.7, letterSpacing: '0.1em' }}>
                {cert.date}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ textAlign: 'center', marginTop: 24, opacity: 0.4 }}>
      <div className="gold-divider" />
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 8 }}>
        "Verified through the Great Archives"
      </p>
    </div>
  </div>
);

export default Certifications;
