import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LABELS = {
  '/': 'Prologue', '/about': 'The Chronicler', '/projects': 'Arcane Artifacts',
  '/experience': 'Journeys', '/skills': 'Arcane Arts', '/achievements': 'Valor',
  '/certifications': 'Scrolls & Seals', '/contact': 'Correspondence',
};

const CornerOrnament = ({ pos }) => {
  const s = {
    tl: { top: 10, left: 10, borderWidth: '2px 0 0 2px' },
    tr: { top: 10, right: 10, borderWidth: '2px 2px 0 0' },
    bl: { bottom: 10, left: 10, borderWidth: '0 0 2px 2px' },
    br: { bottom: 10, right: 10, borderWidth: '0 2px 2px 0' },
  }[pos];
  return (
    <div style={{
      position: 'absolute', width: 20, height: 20, pointerEvents: 'none',
      borderStyle: 'solid', borderColor: 'var(--accent-color)', opacity: 0.45, ...s,
    }} />
  );
};

const ThreeBook = ({ pages }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playPageTurn } = useSoundEffects();

  const currentIndex = pages.findIndex(p => p.path === location.pathname);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const [direction, setDirection] = useState(1);
  const prevIndexRef = React.useRef(0);

  useEffect(() => {
    if (safeIndex !== prevIndexRef.current) {
      setDirection(safeIndex > prevIndexRef.current ? 1 : -1);
      playPageTurn();
      prevIndexRef.current = safeIndex;
    }
  }, [safeIndex]);

  const goTo = (index) => navigate(pages[index].path);

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < pages.length - 1;

  const variants = {
    enter: (d) => ({
      rotateY: d > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: d > 0 ? 'left center' : 'right center',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: 'center center',
    },
    exit: (d) => ({
      rotateY: d > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: d > 0 ? 'right center' : 'left center',
    }),
  };

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      paddingTop: 58, paddingLeft: 16, paddingRight: 16,
      display: 'flex', justifyContent: 'center',
      alignItems: 'stretch', boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', minHeight: 'calc(100vh - 58px)' }}>

        {/* Leather spine */}
        <div style={{
          width: 28, flexShrink: 0,
          background: 'linear-gradient(180deg,#2A0A02 0%,#4A1208 20%,#3A0E06 50%,#4A1208 80%,#2A0A02 100%)',
          borderRadius: '6px 0 0 6px',
          boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.5),inset 2px 0 4px rgba(255,140,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden', zIndex: 4,
        }}>
          {[15, 85].map(p => (
            <div key={p} style={{
              position: 'absolute', top: `${p}%`, left: 4, right: 4, height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(184,134,11,0.6),transparent)',
            }} />
          ))}
          <span style={{
            writingMode: 'vertical-rl', fontFamily: 'Cinzel Decorative,serif',
            fontSize: 7, letterSpacing: '0.3em', color: 'rgba(184,134,11,0.7)',
            transform: 'rotate(180deg)', userSelect: 'none',
          }}>MADHAN S</span>
        </div>

        {/* Page area */}
        <div style={{
          flex: 1, position: 'relative',
          borderRadius: '0 6px 6px 0',
          overflow: 'hidden',
          boxShadow: '4px 0 30px rgba(0,0,0,0.4),0 8px 40px rgba(0,0,0,0.3)',
          perspective: '1400px',
        }}>
          {/* Page background always visible */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--surface-color)',
            backgroundImage: 'repeating-linear-gradient(transparent,transparent 31px,var(--border-faint) 31px,var(--border-faint) 32px)',
          }} />
          <div style={{ position: 'absolute', inset: 8, border: '1px solid var(--border-color)', opacity: 0.4, borderRadius: 2, pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 13, border: '1px solid var(--border-faint)', borderRadius: 1, pointerEvents: 'none', zIndex: 1 }} />
          <CornerOrnament pos="tl" /><CornerOrnament pos="tr" />
          <CornerOrnament pos="bl" /><CornerOrnament pos="br" />

          {/* Animated page content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Section label */}
              <div style={{
                position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'Cinzel Decorative,serif', fontSize: 8,
                letterSpacing: '0.35em', color: 'var(--accent-color)', opacity: 0.55,
                whiteSpace: 'nowrap', zIndex: 3,
              }}>
                ✦ {LABELS[location.pathname] || ''} ✦
              </div>

              {/* Page content */}
              <div style={{ padding: '36px 32px 72px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
                {pages[safeIndex]?.element}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav — always on top */}
          <div style={{
            position: 'absolute', bottom: 12, left: 0, right: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
          }}>
            <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
              onClick={() => canPrev && goTo(safeIndex - 1)}
              style={{
                background: 'none', border: '1px solid var(--border-faint)', borderRadius: 2,
                color: canPrev ? 'var(--accent-color)' : 'var(--border-faint)',
                cursor: canPrev ? 'pointer' : 'default', padding: '2px 8px',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'JetBrains Mono,monospace', fontSize: 9, letterSpacing: '0.1em',
              }}>
              <ChevronLeft size={12} /> PREV
            </motion.button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: 'var(--accent-color)', opacity: 0.5, letterSpacing: '0.2em' }}>
                {safeIndex + 1} / {pages.length}
              </span>
              <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 5 }}>
                {pages.map((_, i) => (
                  <motion.div key={i} onClick={() => goTo(i)}
                    animate={{ scale: i === safeIndex ? 1.5 : 1, opacity: i === safeIndex ? 1 : 0.3 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-color)', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
              onClick={() => canNext && goTo(safeIndex + 1)}
              style={{
                background: 'none', border: '1px solid var(--border-faint)', borderRadius: 2,
                color: canNext ? 'var(--accent-color)' : 'var(--border-faint)',
                cursor: canNext ? 'pointer' : 'default', padding: '2px 8px',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'JetBrains Mono,monospace', fontSize: 9, letterSpacing: '0.1em',
              }}>
              NEXT <ChevronRight size={12} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeBook;
