import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

/* ── TYPEWRITER ─────────────────────────────────────────── */
const useTypewriter = (phrases) => {
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    const id = setTimeout(() => {
      if (!del && text === cur) { setTimeout(() => setDel(true), 1800); return; }
      if (del && text === '') { setDel(false); setPi(p => (p + 1) % phrases.length); return; }
      setText(cur.substring(0, text.length + (del ? -1 : 1)));
    }, del ? 45 : 90);
    return () => clearTimeout(id);
  }, [text, del, pi]);
  return text;
};

/* ── ARCANE SIGIL (large, behind content) ───────────────── */
const Sigil = () => (
  <svg width="440" height="440" viewBox="0 0 440 440" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
    {/* Outermost dashed ring */}
    <motion.circle cx="220" cy="220" r="208" fill="none" stroke="var(--accent-color)" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="6 8"
      animate={{ rotate: 360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} />

    {/* Outer ring */}
    <motion.circle cx="220" cy="220" r="186" fill="none" stroke="var(--accent-color)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 5"
      animate={{ rotate: -360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} />

    {/* Mid ring */}
    <motion.circle cx="220" cy="220" r="148" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeOpacity="0.3"
      animate={{ rotate: 360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }} />

    {/* Outer triangle */}
    <motion.polygon points="220,42 378,302 62,302" fill="none" stroke="var(--accent-color)" strokeWidth="0.9" strokeOpacity="0.3"
      animate={{ rotate: 360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }} />

    {/* Inverted triangle */}
    <motion.polygon points="220,398 62,138 378,138" fill="none" stroke="var(--accent-color)" strokeWidth="0.9" strokeOpacity="0.25"
      animate={{ rotate: -360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }} />

    {/* Inner triangle */}
    <motion.polygon points="220,100 330,280 110,280" fill="none" stroke="var(--accent-color)" strokeWidth="0.7" strokeOpacity="0.2"
      animate={{ rotate: 360 }} style={{ transformOrigin: '220px 220px' }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} />

    {/* Inner ring */}
    <circle cx="220" cy="220" r="60" fill="none" stroke="var(--accent-color)" strokeWidth="0.8" strokeOpacity="0.35" />
    <circle cx="220" cy="220" r="38" fill="none" stroke="var(--accent-color)" strokeWidth="0.6" strokeOpacity="0.25" />

    {/* Cross */}
    <line x1="220" y1="42" x2="220" y2="398" stroke="var(--accent-color)" strokeWidth="0.5" strokeOpacity="0.15" />
    <line x1="42" y1="220" x2="398" y2="220" stroke="var(--accent-color)" strokeWidth="0.5" strokeOpacity="0.15" />
    <line x1="88" y1="88" x2="352" y2="352" stroke="var(--accent-color)" strokeWidth="0.4" strokeOpacity="0.1" />
    <line x1="352" y1="88" x2="88" y2="352" stroke="var(--accent-color)" strokeWidth="0.4" strokeOpacity="0.1" />

    {/* Node dots on outer ring */}
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      return (
        <motion.g key={i} style={{ transformOrigin: '220px 220px' }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.25 }}>
          <circle cx={220 + Math.cos(a) * 148} cy={220 + Math.sin(a) * 148} r="3" fill="var(--accent-color)" />
        </motion.g>
      );
    })}

    {/* Center pulse */}
    <motion.g style={{ transformOrigin: '220px 220px' }}
      animate={{ scale: [1, 1.6, 1], opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 2.2, repeat: Infinity }}>
      <circle cx="220" cy="220" r="6" fill="var(--accent-color)" />
    </motion.g>
    <motion.g style={{ transformOrigin: '220px 220px' }}
      animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}>
      <circle cx="220" cy="220" r="6" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
    </motion.g>
  </svg>
);

/* ── FLOATING RUNE ───────────────────────────────────────── */
const FloatRune = ({ rune, x, y, dur, delay }) => (
  <motion.span
    style={{ position: 'absolute', left: x, top: y, fontFamily: 'serif', fontSize: 14, color: 'var(--accent-color)', pointerEvents: 'none', userSelect: 'none' }}
    animate={{ y: [0, -10, 0], opacity: [0.12, 0.35, 0.12] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
  >{rune}</motion.span>
);

const RUNE_POSITIONS = [
  { rune: 'ᚠ', x: '4%',  y: '8%',  dur: 4.2, delay: 0 },
  { rune: 'ᚢ', x: '88%', y: '10%', dur: 3.8, delay: 0.6 },
  { rune: 'ᚦ', x: '6%',  y: '82%', dur: 4.8, delay: 1.2 },
  { rune: 'ᚨ', x: '90%', y: '80%', dur: 3.5, delay: 0.3 },
  { rune: 'ᚱ', x: '48%', y: '4%',  dur: 5.0, delay: 0.9 },
  { rune: 'ᛁ', x: '2%',  y: '45%', dur: 4.0, delay: 1.5 },
  { rune: 'ᚹ', x: '92%', y: '44%', dur: 3.6, delay: 0.4 },
  { rune: 'ᚲ', x: '48%', y: '90%', dur: 4.5, delay: 1.8 },
];

/* ── HOME PAGE ───────────────────────────────────────────── */
const Home = () => {
  const typewriter = useTypewriter(['AI & Data Science Engineer', 'Full Stack Developer', 'ML / CV Builder', 'Open Source Contributor']);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px 80px',
      overflow: 'hidden',
    }}>

      {/* Sigil background */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: 'easeOut' }}>
          <Sigil />
        </motion.div>
      </div>

      {/* Floating runes */}
      {RUNE_POSITIONS.map((r, i) => <FloatRune key={i} {...r} />)}

      {/* Gold divider top */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }}
        style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)', marginBottom: 20, transformOrigin: 'center' }} />

      {/* Subtitle above name */}
      <motion.p initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.45em', color: 'var(--accent-color)', opacity: 0.7, marginBottom: 16, textTransform: 'uppercase' }}>
        Portfolio · MMXXVI
      </motion.p>

      {/* NAME — big and gold shimmer */}
      <div style={{ marginBottom: 16, position: 'relative' }}>
        {'MADHAN S'.split('').map((char, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 'clamp(28px, 6vw, 52px)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '0.12em',
              lineHeight: 1.1,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        {/* Underline glow */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)', marginTop: 6, transformOrigin: 'center' }} />
      </div>

      {/* Typewriter role */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ height: 28, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--accent-color)', letterSpacing: '0.06em' }}>
          {typewriter}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>|</motion.span>
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
        style={{
          fontFamily: 'Playfair Display, serif', fontSize: 14, fontStyle: 'italic',
          color: 'var(--text-secondary)', maxWidth: 320, lineHeight: 1.8,
          marginBottom: 36, letterSpacing: '0.02em',
        }}>
        "I build intelligent systems and ship real products.<br />
        Master of arcane code and digital alchemy."
      </motion.p>

      {/* Gold divider */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
        style={{ width: 120, height: 1, background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)', marginBottom: 32, transformOrigin: 'center' }} />

      {/* CTA Buttons */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
        style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <NavLink to="/projects">
          <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(184,134,11,0.5)' }} whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px 28px',
              background: 'var(--accent-color)',
              color: 'var(--bg-color)',
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.15em',
              borderRadius: 2,
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', userSelect: 'none',
              boxShadow: '0 0 12px rgba(184,134,11,0.3)',
            }}>
            <Sparkles size={13} /> VIEW MY WORK <ArrowRight size={13} />
          </motion.div>
        </NavLink>

        <a href="https://drive.google.com/file/d/18e5Niu9k4434ysMrLNqg-MAODUvM-PJn/view?usp=sharing"
          target="_blank" rel="noopener noreferrer">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px 28px',
              border: '1px solid var(--accent-color)',
              color: 'var(--accent-color)',
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.15em',
              borderRadius: 2,
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', userSelect: 'none',
            }}>
            <Download size={13} /> RESUME
          </motion.div>
        </a>
      </motion.div>


      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 16, fontFamily: 'Cinzel Decorative, serif', fontSize: 8, letterSpacing: '0.4em', color: 'var(--accent-color)' }}>
        ✦ MCMXXVI ✦
      </motion.p>
    </div>
  );
};

export default Home;
