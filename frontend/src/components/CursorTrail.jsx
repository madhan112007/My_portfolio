import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setTrail(prev => [...prev.slice(-6), { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }]);

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setVisible(false), 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="cursor"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: mousePos.x,
              top: mousePos.y,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'var(--accent-color)',
              boxShadow: '0 0 10px var(--glow-color), 0 0 20px var(--glow-color)',
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Trail dots */}
      {visible && trail.map((dot, i) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            left: dot.x,
            top: dot.y,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent-color)',
            opacity: (i / trail.length) * 0.5,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
