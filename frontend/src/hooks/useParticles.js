import { useCallback, useEffect, useRef } from 'react';

const useParticles = (canvasRef, isDarkMode) => {
  const particles = useRef([]);
  const requestRef = useRef();

  const createParticle = useCallback((x, y, isBurst = false) => {
    const size = isBurst ? Math.random() * 4 + 2 : Math.random() * 2 + 1;
    const speedX = isBurst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.5;
    const speedY = isBurst ? (Math.random() - 1) * 4 : (Math.random() - 0.5) * 0.5;
    const life = isBurst ? 1.5 : Infinity;
    const opacity = isBurst ? 1 : (isDarkMode ? Math.random() * 0.3 + 0.15 : 0);

    return {
      x,
      y,
      size,
      speedX,
      speedY,
      life,
      maxLife: life,
      opacity,
      color: ['#FFD700', '#FFA500', '#FFFACD'][Math.floor(Math.random() * 3)],
    };
  }, [isDarkMode]);

  const initAmbient = useCallback(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const isMobile = width < 768;
    const count = isMobile ? 15 : 30;
    particles.current = Array.from({ length: count }, () => 
      createParticle(Math.random() * width, Math.random() * height)
    );
  }, [canvasRef, createParticle]);

  const burst = useCallback((x, y) => {
    const count = 50;
    for (let i = 0; i < count; i++) {
      particles.current.push(createParticle(x, y, true));
    }
  }, [createParticle]);

  const animate = useCallback((time) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;

    ctx.clearRect(0, 0, width, height);

    particles.current.forEach((p, index) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.life !== Infinity) {
        p.life -= 0.016; // Approx 60fps
        p.opacity = p.life / p.maxLife;
        if (p.life <= 0) {
          particles.current.splice(index, 1);
          return;
        }
      } else {
        // Ambient wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [canvasRef]);

  useEffect(() => {
    initAmbient();
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [initAmbient, animate]);

  return { burst };
};

export default useParticles;
