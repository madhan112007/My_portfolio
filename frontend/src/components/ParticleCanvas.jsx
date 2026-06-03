import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useParticles from '../hooks/useParticles';
import { useTheme } from '../context/ThemeContext';

const ParticleCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();
  const { burst } = useParticles(canvasRef, isDarkMode);

  useImperativeHandle(ref, () => ({
    triggerBurst: (x, y) => {
      burst(x || window.innerWidth / 2, y || window.innerHeight / 2);
    }
  }));

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendingMode: 'screen' }}
    />
  );
});

export default ParticleCanvas;
