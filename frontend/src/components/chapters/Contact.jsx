import React, { useState } from 'react';
import BookPage from '../BookPage';
import WaxSeal from '../ornaments/WaxSeal';
import axios from 'axios';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ContactChapter = () => {
  const [form, setForm] = useState({ name: '', from: '', subject: '', message: '', email: '' });
  const [status, setStatus] = useState('idle');
  const { playWaxSeal } = useSoundEffects();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    playWaxSeal();
    try {
      await axios.post(`${API_URL}/contact`, {
        name: form.name, email: form.email,
        subject: form.subject, message: form.message,
      });
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 4000);
    } catch { setStatus('error'); }
  };

  const inputStyle = {
    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(139,90,20,0.4)',
    fontFamily: "'EB Garamond',serif", fontSize: 14, color: 'var(--ink)',
    width: '100%', outline: 'none', padding: '2px 4px', lineHeight: '26px',
  };

  return (
    <>
      <BookPage side="left" pageNum={13} watermarkRune="✉">
        <p className="section-header" style={{ marginBottom: 4 }}>Epilogue</p>
        <h2 className="chapter-title">Epistola</h2>
        <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

        {/* Raven illustration */}
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ display: 'block', margin: '0 auto 10px' }}>
          <path d="M40 70 Q30 55 25 40 Q20 28 28 18 Q35 10 45 14 Q55 18 52 30 Q48 42 40 70Z"
            fill="none" stroke="var(--sepia)" strokeWidth="1.2" opacity="0.7"/>
          <path d="M40 70 Q50 50 58 38 Q64 28 55 18" fill="none" stroke="var(--sepia)" strokeWidth="1" opacity="0.5"/>
          <path d="M28 18 Q24 12 18 10 Q22 16 25 22" fill="none" stroke="var(--sepia)" strokeWidth="0.8" opacity="0.5"/>
          <circle cx="44" cy="18" r="2.5" fill="var(--sepia)" opacity="0.7"/>
          <path d="M44 20 L48 24 L44 24" fill="var(--sepia)" opacity="0.5"/>
        </svg>

        <p className="body-text manuscript-para" style={{ fontStyle: 'italic', fontSize: 13 }}>
          "To reach the Scribe, one may employ the following channels of correspondence..."
        </p>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: '✉', label: 'codethetrend@gmail.com',
              href: 'https://mail.google.com/mail/?view=cm&to=codethetrend@gmail.com' },
            { icon: '🔗', label: 'linkedin.com/in/madhan-s-727b85332',
              href: 'https://linkedin.com/in/madhan-s-727b85332/' },
            { icon: '🐙', label: 'github.com/madhan112007',
              href: 'https://github.com/madhan112007' },
            { icon: '📞', label: '+91 9363752394', href: 'tel:+919363752394' },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ display: 'flex', gap: 8, alignItems: 'center',
                fontFamily: "'EB Garamond',serif", fontSize: 12, color: 'var(--ink)',
                textDecoration: 'none' }}>
              <span>{icon}</span>
              <span style={{ borderBottom: '0.5px solid var(--border)', paddingBottom: 1 }}>{label}</span>
            </a>
          ))}
        </div>
      </BookPage>

      <BookPage side="right" pageNum={14} watermarkRune="✉">
        <p className="section-header" style={{ marginBottom: 8 }}>Send Word by Raven</p>
        <form onSubmit={handleSubmit}>
          <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 14, lineHeight: '2.1',
            color: 'var(--sepia)' }}>
            <p>To the Scribe Madhan,</p>
            <br/>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ whiteSpace: 'nowrap' }}>My name is</span>
              <input required style={inputStyle} value={form.name}
                onChange={e => setForm({...form, name: e.target.value})} placeholder="___________"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ whiteSpace: 'nowrap' }}>and I write from</span>
              <input style={inputStyle} value={form.from}
                onChange={e => setForm({...form, from: e.target.value})} placeholder="___________"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ whiteSpace: 'nowrap' }}>Regarding</span>
              <input required style={inputStyle} value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})} placeholder="___________________________"/>
            </div>
            <textarea required rows={3} style={{ ...inputStyle, borderBottom: 'none', resize: 'none',
              borderBottom: '1px solid rgba(139,90,20,0.4)', display: 'block', marginBottom: 4 }}
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              placeholder="___________________________________&#10;___________________________________&#10;___________________________________"/>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ whiteSpace: 'nowrap' }}>You may reply to me at</span>
              <input required type="email" style={inputStyle} value={form.email}
                onChange={e => setForm({...form, email: e.target.value})} placeholder="____________"/>
            </div>
          </div>

          {/* Wax seal submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="submit" disabled={status === 'sending'}
              className={status === 'idle' || status === 'error' ? '' : 'wax-stamp'}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: status === 'sent' ? '#1A6B2A' : '#8B1A1A',
                border: '2px solid #B8860B', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 2,
              }}>
              <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 7,
                color: '#FFD700', letterSpacing: 1 }}>
                {status === 'sent' ? 'SENT ✓' : status === 'sending' ? '...' : 'SEAL'}
              </span>
              <WaxSeal size={28} label="" color="transparent"/>
              <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 7,
                color: '#FFD700', letterSpacing: 1 }}>
                {status === 'sent' ? '' : '& SEND'}
              </span>
            </button>
          </div>
        </form>
      </BookPage>
    </>
  );
};

export default ContactChapter;
