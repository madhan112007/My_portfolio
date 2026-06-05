import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const socials = [
  { icon: <Mail size={15} />, link: 'https://mail.google.com/mail/?view=cm&to=codethetrend@gmail.com', label: 'codethetrend@gmail.com' },
  { icon: <FaLinkedin size={15} />, link: 'https://linkedin.com/in/madhan-s-727b85332/', label: 'linkedin.com/in/madhan-s' },
  { icon: <FaGithub size={15} />, link: 'https://github.com/madhan112007', label: 'github.com/madhan112007' },
];

// Wax seal SVG
const WaxSeal = ({ animate }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, y: -40 }}
    animate={animate ? { scale: [0, 1.3, 0.95, 1], opacity: 1, y: 0 } : { scale: 0, opacity: 0 }}
    transition={{ duration: 0.5, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}
    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20, pointerEvents: 'none' }}
  >
    <svg width="90" height="90" viewBox="0 0 100 100">
      {/* Wax circle */}
      <circle cx="50" cy="50" r="44" fill="#8B0000" opacity="0.93" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#FFD700" strokeWidth="2.5" opacity="0.7" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="36" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
      {/* Star/seal emblem */}
      <text x="50" y="57" textAnchor="middle" fontSize="26" fontFamily="Cinzel Decorative, serif" fill="#FFD700" opacity="0.95">M</text>
      {/* Radial lines */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i}
          x1={50 + 37 * Math.cos((deg * Math.PI) / 180)}
          y1={50 + 37 * Math.sin((deg * Math.PI) / 180)}
          x2={50 + 43 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 43 * Math.sin((deg * Math.PI) / 180)}
          stroke="#FFD700" strokeWidth="1.5" opacity="0.6"
        />
      ))}
    </svg>
    {/* Stamp impact glow */}
    <motion.div
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 90, height: 90, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,0,0,0.6) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
      }}
    />
  </motion.div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [phase, setPhase] = useState('idle'); // idle | sealing | folding | flying | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Phase 1: show wax seal stamp
    setPhase('sealing');
    // Phase 2: after seal, fold the paper
    setTimeout(() => setPhase('folding'), 600);
    // Phase 3: fly away
    setTimeout(() => setPhase('flying'), 1100);
    // Send API in background
    try {
      await axios.post(`${API_URL}/contact`, form);
      setTimeout(() => { setPhase('success'); setForm({ name: '', email: '', subject: '', message: '' }); }, 1600);
      setTimeout(() => setPhase('idle'), 4200);
    } catch (err) {
      console.error(err);
      setTimeout(() => { setPhase('error'); }, 1600);
      setTimeout(() => setPhase('idle'), 4000);
    }
  };

  const isBusy = ['sealing', 'folding', 'flying'].includes(phase);

  // Framer variants for the form card folding + flying
  const formVariants = {
    idle:    { rotateX: 0,   y: 0,    scaleX: 1,   opacity: 1,  transition: { duration: 0.3 } },
    sealing: { rotateX: 0,   y: 0,    scaleX: 1,   opacity: 1 },
    folding: { rotateX: 80,  y: 0,    scaleX: 0.7, opacity: 0.7, transition: { duration: 0.5, ease: 'easeIn' } },
    flying:  { rotateX: 80,  y: -320, scaleX: 0.3, opacity: 0,   transition: { duration: 0.55, ease: 'easeIn' } },
    success: { rotateX: 0,   y: 0,    scaleX: 1,   opacity: 1,  transition: { duration: 0.4 } },
    error:   { rotateX: 0,   y: 0,    scaleX: 1,   opacity: 1,  transition: { duration: 0.4 } },
  };

  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 className="section-title" style={{ fontSize: 22 }}>Send a Letter</h2>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
          MAGICAL CORRESPONDENCE
        </p>
      </div>

      {/* Socials */}
      <div className="book-card" style={{ borderRadius: 4, padding: '16px 20px', marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 11, color: 'var(--text-primary)', marginBottom: 14, letterSpacing: '0.12em' }}>
          Registry
        </h3>
        {socials.map((s, i) => (
          <motion.a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
              borderBottom: i < socials.length - 1 ? '1px solid var(--border-faint)' : 'none',
              textDecoration: 'none', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <span style={{ color: 'var(--accent-color)' }}>{s.icon}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{s.label}</span>
          </motion.a>
        ))}
      </div>

      {/* Form with animation wrapper */}
      <div style={{ perspective: 800, position: 'relative' }}>
        <motion.div
          className="book-card"
          style={{ borderRadius: 4, padding: '20px 22px', transformOrigin: 'top center', position: 'relative', overflow: 'hidden' }}
          variants={formVariants}
          animate={phase}
        >
          {/* Wax seal overlay */}
          <WaxSeal animate={phase === 'sealing' || phase === 'folding' || phase === 'flying'} />

          <AnimatePresence mode="wait">
            {(phase === 'success') ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -6, 6, 0], y: [0, -8, 0] }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{ fontSize: 48, marginBottom: 16 }}
                >✉️</motion.div>
                <p style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 13, color: 'var(--accent-color)', letterSpacing: '0.12em' }}>
                  Letter Dispatched!
                </p>
                <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, fontStyle: 'italic' }}>
                  Your message has been sealed & sent.
                </p>
              </motion.div>
            ) : phase === 'error' ? (
              <motion.div key="error"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                <p style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 11, color: '#c0392b', letterSpacing: '0.1em' }}>
                  Dispatch Failed
                </p>
                <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, fontStyle: 'italic' }}>
                  The ravens could not deliver your letter. Try again.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 11, color: 'var(--text-primary)', marginBottom: 18, letterSpacing: '0.12em' }}>
                  Compose Message
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { key: 'name', label: 'Your Name', type: 'text' },
                    { key: 'email', label: 'Your Email', type: 'email' },
                    { key: 'subject', label: 'Subject', type: 'text' },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.2em', color: 'var(--accent-color)', opacity: 0.7, display: 'block', marginBottom: 4 }}>
                        {label.toUpperCase()}
                      </label>
                      <input type={type} required value={form[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="book-input" />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.2em', color: 'var(--accent-color)', opacity: 0.7, display: 'block', marginBottom: 4 }}>
                      MESSAGE
                    </label>
                    <textarea required rows={4} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="book-input" style={{ resize: 'none' }} />
                  </div>

                  <motion.button type="submit" disabled={isBusy}
                    whileHover={!isBusy ? { scale: 1.02 } : {}}
                    whileTap={!isBusy ? { scale: 0.97 } : {}}
                    style={{
                      padding: '10px 24px', background: 'var(--accent-color)', color: '#0D0A06',
                      border: 'none', borderRadius: 2, cursor: isBusy ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cinzel Decorative, serif', fontSize: 11, letterSpacing: '0.12em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 0 16px var(--glow-color)', opacity: isBusy ? 0.6 : 1,
                    }}>
                    {isBusy
                      ? <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}>Sealing...</motion.span>
                      : <><span>Dispatch with Seal</span><Send size={13} /></>
                    }
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20, opacity: 0.35 }}>
        <div className="gold-divider" />
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 8 }}>
          "Your correspondence is valued in all realms."
        </p>
      </div>
    </div>
  );
};

export default Contact;
