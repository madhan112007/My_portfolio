import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const socials = [
  { icon: <Mail size={15} />, link: 'https://mail.google.com/mail/?view=cm&to=codethetrend@gmail.com', label: 'codethetrend@gmail.com' },
  { icon: <FaLinkedin size={15} />, link: 'https://linkedin.com/in/madhan-s-727b85332/', label: 'linkedin.com/in/madhan-s' },
  { icon: <FaGithub size={15} />, link: 'https://github.com/madhan112007', label: 'github.com/madhan112007' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch { setStatus('error'); }
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

      {/* Form */}
      <div className="book-card" style={{ borderRadius: 4, padding: '20px 22px' }}>
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

          <motion.button type="submit" disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{
              padding: '10px 24px', background: 'var(--accent-color)', color: '#0D0A06',
              border: 'none', borderRadius: 2, cursor: 'pointer',
              fontFamily: 'Cinzel Decorative, serif', fontSize: 11, letterSpacing: '0.12em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 0 16px var(--glow-color)', opacity: status === 'sending' ? 0.6 : 1,
            }}>
            {status === 'sending' ? 'Dispatching...' : status === 'success' ? '✉ Letter Sent!' : <><span>Dispatch with Seal</span><Send size={13} /></>}
          </motion.button>
        </form>
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
