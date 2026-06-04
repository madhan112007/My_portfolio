import React, { useRef, useEffect, useState } from 'react';
import { useBook } from '../context/BookContext';

const PageTurner = ({ children, nextChildren }) => {
  const { turning, direction } = useBook();
  const pageRef = useRef(null);
  const [showCurlHint, setShowCurlHint] = useState(false);
  const [autoHinted, setAutoHinted] = useState(false);

  // Auto curl hint after 3s on first load
  useEffect(() => {
    if (autoHinted) return;
    const t = setTimeout(() => {
      setShowCurlHint(true);
      setAutoHinted(true);
      setTimeout(() => setShowCurlHint(false), 700);
    }, 3000);
    return () => clearTimeout(t);
  }, [autoHinted]);

  // Page turn animation
  useEffect(() => {
    const el = pageRef.current;
    if (!el || !turning) return;

    el.style.transition = 'none';
    el.style.transform = 'rotateY(0deg)';

    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.65s cubic-bezier(0.4, 0.0, 0.2, 1.0)';
      el.style.transform = direction === 'forward' ? 'rotateY(-180deg)' : 'rotateY(180deg)';
    });

    return () => {
      if (el) {
        el.style.transition = 'none';
        el.style.transform = 'rotateY(0deg)';
      }
    };
  }, [turning, direction]);

  return (
    <div style={{ display: 'flex', flex: 1, position: 'relative', transformStyle: 'preserve-3d' }}>
      {/* Static back (left) content + turning right page */}
      <div style={{ display: 'flex', flex: 1, width: '100%' }}>
        {children}
      </div>

      {/* Turning page overlay */}
      {turning && (
        <div
          ref={pageRef}
          style={{
            position: 'absolute',
            top: 0, right: 0,
            width: '50%', height: '100%',
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {/* Front of turning page */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            background: 'var(--page-bg)',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 26px, rgba(139,90,20,0.10) 26px, rgba(139,90,20,0.10) 27px)',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.35)',
          }}>
            {/* Crease gradient that sweeps as page turns */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 30%)',
              pointerEvents: 'none',
            }}/>
          </div>

          {/* Back of turning page (next content preview) */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--page-bg)',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 26px, rgba(139,90,20,0.10) 26px, rgba(139,90,20,0.10) 27px)',
            filter: 'brightness(0.92)',
          }}/>
        </div>
      )}

      {/* Page curl hint corner */}
      <div
        className={`page-curl-hint${showCurlHint ? ' curl-hint-auto' : ''}`}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      />
    </div>
  );
};

export default PageTurner;
