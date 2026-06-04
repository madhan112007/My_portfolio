import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
          background: scrolled ? 'var(--nav-bg)' : 'var(--nav-bg)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-faint)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Gold top line */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.div whileHover={{ rotate: 12 }} transition={{ type: 'spring', stiffness: 300 }}>
              <BookOpen size={26} style={{ color: 'var(--accent-color)', filter: 'drop-shadow(0 0 6px var(--glow-color))' }} />
            </motion.div>
            <span style={{
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
            }}>
              M<span style={{ color: 'var(--accent-color)' }}>.</span>S
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 32 }}>
            {links.map(link => (
              <NavLink key={link.path} to={link.path}
                style={({ isActive }) => ({
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  position: 'relative',
                  transition: 'color 0.2s',
                  paddingBottom: 4,
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <motion.span
                      style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                        background: 'var(--accent-color)',
                        transformOrigin: 'left',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setIsOpen(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 4 }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Gold bottom line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border-faint), transparent)' }} />
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'var(--bg-color)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
            }}
            className="lg:hidden"
          >
            {/* Decorative corner */}
            <div style={{ position: 'absolute', top: 20, left: 20, width: 30, height: 30,
              borderTop: '2px solid var(--accent-color)', borderLeft: '2px solid var(--accent-color)', opacity: 0.5 }} />
            <div style={{ position: 'absolute', bottom: 20, right: 20, width: 30, height: 30,
              borderBottom: '2px solid var(--accent-color)', borderRight: '2px solid var(--accent-color)', opacity: 0.5 }} />

            <button onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <X size={36} />
            </button>

            <div style={{ fontFamily: 'Cinzel Decorative', fontSize: 11, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6 }}>
              ✦ NAVIGATE ✦
            </div>
            <div style={{ width: 60, height: 1, background: 'var(--accent-color)', opacity: 0.3 }} />

            {links.map((link, i) => (
              <motion.div key={link.path}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}>
                <NavLink to={link.path} onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'Cinzel Decorative, serif', fontSize: 18,
                    color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                    textDecoration: 'none', letterSpacing: '0.1em',
                  })}>
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
