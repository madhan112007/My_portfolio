import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import profilePhoto from '../assets/Portfolio about page my photo.jpeg';

const About = () => {
  const { isDarkMode } = useTheme();

  const githubTheme = {
    light: ['#EDE0C4', '#C9A84C', '#B8860B', '#8B6010', '#593B06'],
    dark:  ['#1C1208', '#6B4F1A', '#B8860B', '#FFD700', '#FFFACD'],
  };

  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 className="section-title" style={{ fontSize: 22 }}>The Chronicler</h2>
      </div>

      {/* Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 28 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          {/* Outer ornate frame */}
          <div style={{
            width: 160, height: 200, border: '2px solid var(--border-color)',
            borderRadius: 4, overflow: 'hidden', position: 'relative',
            boxShadow: '0 0 0 4px var(--surface-color), 0 0 0 6px var(--border-faint), 0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <img src={profilePhoto} alt="Madhan S"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(15%) contrast(1.05)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(13,10,6,0.5))' }} />
          </div>
          {/* Corner ornaments on photo */}
          {[{t:4,l:4,b:'auto',r:'auto',bw:'2px 0 0 2px'},{t:4,l:'auto',b:'auto',r:4,bw:'2px 2px 0 0'},
            {t:'auto',l:4,b:4,r:'auto',bw:'0 0 2px 2px'},{t:'auto',l:'auto',b:4,r:4,bw:'0 2px 2px 0'}]
            .map((s,i) => (
              <div key={i} style={{ position:'absolute', width:14, height:14, borderStyle:'solid',
                borderColor:'var(--accent-color)', opacity:0.7, top:s.t, left:s.l, bottom:s.b, right:s.r, borderWidth:s.bw }} />
            ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: 400 }}
        >
          <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>
            Madhan S
          </h3>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: 'var(--accent-color)', fontStyle: 'italic', marginBottom: 14 }}>
            B.Tech AI & Data Science Engineer
          </p>
          <div className="gold-divider" />
          <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 12 }}>
            I build production-grade ML systems and full-stack applications.
            Driven by a builder's mindset and obsessed with turning arcane ideas into real products.
          </p>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontStyle: 'italic', color: 'var(--accent-color)', marginTop: 14, opacity: 0.8 }}>
            "The magic isn't in the code itself, but in the impact it creates."
          </p>
        </motion.div>
      </div>

      {/* Stats + GitHub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="book-card"
        style={{ borderRadius: 4, padding: '20px 22px' }}
      >
        <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 15, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.15em', textAlign: 'center' }}>
          Grand Chronicle
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 20 }}>
          {[['350+', 'GitHub Commits'], ['800+', 'LeetCode Solved'], ['8', 'Hackathon Wins']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 20, color: 'var(--accent-color)', textShadow: '0 0 12px var(--glow-color)' }}>
                {val}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.15em', color: 'var(--text-secondary)', opacity: 0.7, marginTop: 3 }}>
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="gold-divider" />

        <div style={{ marginTop: 16, overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <GitHubCalendar
            username="madhan112007"
            colorScheme={isDarkMode ? 'dark' : 'light'}
            theme={githubTheme}
            fontSize={10}
            blockSize={9}
            blockMargin={3}
            hideColorLegend
            hideTotalCount
          />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
