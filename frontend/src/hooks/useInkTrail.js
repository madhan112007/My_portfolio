import { useEffect } from 'react';

export const useInkTrail = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    const dots = [];

    const onMove = (e) => {
      const dot = document.createElement('div');
      dot.className = 'ink-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      dot.style.opacity = '0.45';
      document.body.appendChild(dot);
      dots.push(dot);

      requestAnimationFrame(() => { dot.style.opacity = '0'; });
      setTimeout(() => { dot.remove(); dots.splice(dots.indexOf(dot), 1); }, 500);

      if (dots.length > 8) {
        const old = dots.shift();
        old?.remove();
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);
};
