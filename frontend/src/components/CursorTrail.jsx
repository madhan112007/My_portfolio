import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setTrail(prev => [...prev.slice(-7), newDot]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-[var(--accent-color)] rounded-full pointer-events-none z-[9999] magical-glow -translate-x-1/2 -translate-y-1/2"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 w-2 h-2 bg-[var(--accent-color)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{ left: dot.x, top: dot.y }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
