import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CandleLight = () => {
  const { isDarkMode } = useTheme();
  const glowRef = useRef(null);

  // Flicker the ambient page glow randomly like a real candle
  useEffect(() => {
    if (!isDarkMode) return;
    let raf;
    let t = 0;
    const flicker = () => {
      t += 0.04;
      const intensity = 0.13 + 0.06 * Math.sin(t * 2.3) + 0.04 * Math.sin(t * 5.7) + 0.02 * (Math.random() - 0.5);
      if (glowRef.current) {
        glowRef.current.style.opacity = intensity.toFixed(3);
      }
      raf = requestAnimationFrame(flicker);
    };
    raf = requestAnimationFrame(flicker);
    return () => cancelAnimationFrame(raf);
  }, [isDarkMode]);

  return (
    <AnimatePresence>
      {isDarkMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            top: 54,
            right: 80,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Ambient room glow — large soft radial behind everything */}
          <div
            ref={glowRef}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '520px',
              height: '420px',
              background: 'radial-gradient(ellipse at 80% 5%, rgba(255,160,20,0.18) 0%, rgba(255,100,0,0.07) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Candle assembly */}
          <svg width="28" height="72" viewBox="0 0 28 72" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="candleGlow" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="#FFF176" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#FFB300" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF6F00" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="waxGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F5E6C8" />
                <stop offset="100%" stopColor="#C8A96E" />
              </radialGradient>
            </defs>

            {/* Halo glow behind flame */}
            <ellipse cx="14" cy="18" rx="22" ry="26"
              fill="url(#candleGlow)" opacity="0.55"
            >
              <animate attributeName="rx" values="22;26;20;24;22" dur="2.1s" repeatCount="indefinite" />
              <animate attributeName="ry" values="26;30;24;28;26" dur="2.1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0.7;0.45;0.65;0.55" dur="1.7s" repeatCount="indefinite" />
            </ellipse>

            {/* Flame outer */}
            <path d="M14 8 Q18 14 16 22 Q14 26 12 22 Q10 14 14 8Z" fill="#FF8C00" opacity="0.9">
              <animate attributeName="d"
                values="M14 8 Q18 14 16 22 Q14 26 12 22 Q10 14 14 8Z;
                        M14 7 Q19 13 17 21 Q14 25 11 21 Q9 13 14 7Z;
                        M14 9 Q17 15 15 23 Q14 27 13 23 Q11 15 14 9Z;
                        M14 8 Q18 14 16 22 Q14 26 12 22 Q10 14 14 8Z"
                dur="0.35s" repeatCount="indefinite" />
            </path>
            {/* Flame inner bright core */}
            <path d="M14 12 Q16 16 15 21 Q14 23 13 21 Q12 16 14 12Z" fill="#FFF9C4" opacity="0.95">
              <animate attributeName="d"
                values="M14 12 Q16 16 15 21 Q14 23 13 21 Q12 16 14 12Z;
                        M14 11 Q17 15 16 20 Q14 22 12 20 Q11 15 14 11Z;
                        M14 13 Q15 17 14 22 Q14 24 14 22 Q13 17 14 13Z;
                        M14 12 Q16 16 15 21 Q14 23 13 21 Q12 16 14 12Z"
                dur="0.35s" repeatCount="indefinite" />
            </path>

            {/* Wick */}
            <line x1="14" y1="24" x2="14" y2="28" stroke="#3E2723" strokeWidth="1.2" strokeLinecap="round" />

            {/* Wax body */}
            <rect x="8" y="28" width="12" height="42" rx="2" fill="url(#waxGrad)" />
            {/* Wax drip left */}
            <path d="M8 34 Q6 38 7 42 Q8 44 8 46" stroke="#D4B896" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Wax drip right */}
            <path d="M20 38 Q22 42 21 46 Q20 48 20 50" stroke="#D4B896" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Candle shine */}
            <rect x="10" y="30" width="2" height="18" rx="1" fill="white" opacity="0.18" />
          </svg>

          {/* Table surface line */}
          <div style={{
            width: 40,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)',
            marginTop: -1,
            borderRadius: 2,
          }} />

          {/* Candle table glow pool */}
          <div style={{
            width: 80,
            height: 12,
            background: 'radial-gradient(ellipse, rgba(255,160,30,0.2) 0%, transparent 70%)',
            marginTop: 2,
            borderRadius: '50%',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CandleLight;
