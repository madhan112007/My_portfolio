import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookLanding = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | reacting | opening | flash | done
  const [showParticles, setShowParticles] = useState(false);

  // ── BACKGROUND STARS ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let stars = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      // ~60 stars + 5-8 key stars
      const count = 60 + 8;
      for (let i = 0; i < count; i++) {
        const isKey = i >= 60;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: isKey ? 2 + Math.random() : 0.4 + Math.random() * 1.2,
          color: Math.random() > 0.5 ? '#FFD700' : '#FFF8DC',
          phase: Math.random() * Math.PI * 2,
          speed: 0.05 + Math.random() * 0.1,
          baseOpacity: isKey ? 0.4 + Math.random() * 0.3 : 0.2 + Math.random() * 0.5,
        });
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const opacity = s.baseOpacity * (0.6 + 0.4 * Math.sin(time * 0.002 * s.speed * 10 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });
      rafId = requestAnimationFrame(animate);
    };

    init();
    rafId = requestAnimationFrame(animate);
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', init);
    };
  }, []);

  // ── PARTICLE BURST ─────────────────────────────────────────────
  useEffect(() => {
    if (showParticles) {
      const colors = ['#FFD700', '#FFA500', '#FFFACD', '#FF8C00', '#FFE55C'];
      const container = document.getElementById('particle-container');
      if (!container) return;

      for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        const size = 2 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 160;
        const delay = Math.random() * 150;
        const duration = 1000 + Math.random() * 600;

        p.style.position = 'absolute';
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = '50%';
        p.style.top = '50%';
        p.style.left = '50%';
        p.style.transform = 'translate(-50%, -50%) scale(1)';
        p.style.opacity = '1';
        p.style.transition = `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`;
        p.style.pointerEvents = 'none';

        container.appendChild(p);

        requestAnimationFrame(() => {
          setTimeout(() => {
            p.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`;
            p.style.opacity = '0';
          }, 10);
        });

        setTimeout(() => p.remove(), duration + delay + 100);
      }
    }
  }, [showParticles]);

  // ── CLICK HANDLER ──────────────────────────────────────────────
  const handleClick = () => {
    if (phase !== 'idle') return;

    // PHASE 1 — BOOK REACTS
    setPhase('reacting');

    setTimeout(() => {
      // PHASE 2 — GLOW EXPLOSION
      setShowParticles(true);
      setPhase('opening');
    }, 300);

    // PHASE 4 — WHITE FLASH
    setTimeout(() => {
      setPhase('flash');
    }, 1100);

    // PHASE 5 — PORTFOLIO APPEARS
    setTimeout(() => {
      onEnter();
    }, 1700);
  };

  const isIdle = phase === 'idle';
  const isReacting = phase === 'reacting';
  const isOpening = phase === 'opening' || phase === 'flash' || phase === 'done';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0A0704',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: isIdle ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes flashIn {
          0% { opacity: 0; }
          40% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        .animate-float {
          animation: bookFloat 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }
        .animate-hint {
          animation: hintPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Stars Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Particle Container */}
      <div
        id="particle-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Book Wrapper */}
      <motion.div
        animate={
          isReacting
            ? {
                scale: 1.08,
                rotate: [-4, 4, -2],
                transition: { duration: 0.3 },
              }
            : hovered && isIdle
            ? { scale: 1.04, rotate: -2 }
            : { rotate: -2 }
        }
        className={isIdle && !hovered ? 'animate-float' : ''}
        style={{ position: 'relative', zIndex: 2, transform: isIdle && hovered ? 'translateY(-7px) rotate(-2deg)' : undefined }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow Behind Book */}
        <div
          className={!isOpening ? 'animate-glow' : ''}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '340px',
            height: '420px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.22) 0%, rgba(139,90,20,0.10) 40%, transparent 70%)',
            zIndex: -1,
            opacity: isOpening ? 0 : hovered && isIdle ? 1 : 0.7,
            transition: isOpening ? 'transform 0.5s ease-out, opacity 0.5s ease-out' : 'opacity 0.3s ease, transform 0.3s ease',
            transform: isOpening ? 'translate(-50%, -50%) scale(2.5)' : 'translate(-50%, -50%)',
          }}
        />

        {/* The Book SVG Container */}
        <div style={{ position: 'relative', width: '220px', height: '300px', perspective: '1000px' }}>
          {/* Static layers: Back cover, spine, pages side, ribbon */}
          <svg
            width="220"
            height="300"
            viewBox="0 0 220 300"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              <pattern id="leatherPattern" patternUnits="userSpaceOnUse" width="6" height="6">
                <path d="M0 6L6 0" stroke="black" strokeOpacity="0.12" strokeWidth="0.4" fill="none" />
                <path d="M-1 1L1 -1" stroke="black" strokeOpacity="0.12" strokeWidth="0.4" fill="none" />
                <path d="M5 7L7 5" stroke="black" strokeOpacity="0.12" strokeWidth="0.4" fill="none" />
              </pattern>
            </defs>

            {/* 1. DROP SHADOW / GROUND GLOW */}
            <ellipse cx="110" cy="295" rx="75" ry="10" fill="url(#groundGlow)" />
            <radialGradient id="groundGlow" cx="110" cy="295" r="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFB400" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFB400" stopOpacity="0" />
            </radialGradient>

            {/* 13. SPINE */}
            <rect x="10" y="10" width="6" height="288" rx="2" fill="#1A0402" />
            <rect x="15" y="10" width="1" height="288" fill="#3D1A08" />

            {/* 2. BACK COVER */}
            <rect x="16" y="10" width="200" height="286" rx="6" fill="#1A0604" />

            {/* 3. PAGES SIDE */}
            <rect x="210" y="14" width="14" height="278" rx="2" fill="#E8D5A3" />
            {[...Array(8)].map((_, i) => (
              <line key={i} x1="210" y1={25 + i * 35} x2="224" y2={25 + i * 35} stroke="#C9B07A" strokeWidth="0.4" />
            ))}

            {/* 12. BOOKMARK RIBBON */}
            <rect x="106" y="270" width="6" height="28" fill="#8B1A1A" />
            <polygon points="106,298 112,298 109,308" fill="#6B1A1A" />
            <line x1="107" y1="298" x2="107" y2="306" stroke="#5C1414" strokeWidth="1" />
            <line x1="109" y1="298" x2="109" y2="306" stroke="#5C1414" strokeWidth="1" />
            <line x1="111" y1="298" x2="111" y2="306" stroke="#5C1414" strokeWidth="1" />
          </svg>

          {/* FRONT COVER — Animated with rotateY */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '220px',
              height: '300px',
              transformOrigin: 'left center',
              zIndex: 5,
              transformStyle: 'preserve-3d',
            }}
            animate={isOpening ? { rotateY: -180 } : { rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Front side of cover */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden' }}>
              <svg width="220" height="300" viewBox="0 0 220 300">
                {/* 4. FRONT COVER */}
                <rect x="14" y="8" width="200" height="288" rx="6" fill="#6B1A1A" />
                {/* 5. LEATHER TEXTURE */}
                <rect x="14" y="8" width="200" height="288" rx="6" fill="url(#leatherPattern)" opacity="0.4" />
                {/* 6. GOLD OUTER BORDER */}
                <rect x="18" y="12" width="192" height="280" rx="4" fill="none" stroke="#B8860B" strokeWidth="1.8" />
                {/* 7. GOLD INNER BORDER */}
                <rect x="26" y="20" width="176" height="264" rx="3" fill="none" stroke="#8B6914" strokeWidth="0.8" />
                {/* 8. CORNER ORNAMENTS */}
                {/* Top Left */}
                <path d="M30 28 Q36 24 42 28 M30 28 Q26 34 30 40" stroke="#B8860B" fill="none" strokeWidth="1" />
                {/* Top Right */}
                <path d="M198 28 Q192 24 186 28 M198 28 Q202 34 198 40" stroke="#B8860B" fill="none" strokeWidth="1" />
                {/* Bottom Left */}
                <path d="M30 272 Q36 276 42 272 M30 272 Q26 266 30 260" stroke="#B8860B" fill="none" strokeWidth="1" />
                {/* Bottom Right */}
                <path d="M198 272 Q192 276 186 272 M198 272 Q202 266 198 260" stroke="#B8860B" fill="none" strokeWidth="1" />

                {/* 10. TITLE TEXT */}
                <text x="114" y="72" textAnchor="middle" fill="#FFD700" fontFamily="Cinzel Decorative" fontSize="13" letterSpacing="4">MADHAN S</text>
                <text x="114" y="90" textAnchor="middle" fill="#C9A84C" fontFamily="Cinzel Decorative" fontSize="8" letterSpacing="3">PORTFOLIO</text>

                {/* 9. CENTER MEDALLION */}
                <circle cx="114" cy="158" r="44" fill="#4A0E0E" stroke="#B8860B" strokeWidth="1.8" />
                <circle cx="114" cy="158" r="36" fill="none" stroke="#8B6914" strokeWidth="0.8" />
                <line x1="114" y1="118" x2="114" y2="198" stroke="#B8860B" strokeWidth="1" />
                <line x1="74" y1="158" x2="154" y2="158" stroke="#B8860B" strokeWidth="1" />
                <circle cx="114" cy="158" r="18" fill="#8B1A1A" stroke="#FFD700" strokeWidth="1.5" />
                <circle cx="114" cy="158" r="10" fill="#B8860B" />
                <circle cx="114" cy="158" r="5" fill="#FFD700">
                  <animate attributeName="r" values="5;7;5" dur={hovered ? "0.8s" : "2s"} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.7;1" dur={hovered ? "0.8s" : "2s"} repeatCount="indefinite" />
                </circle>

                {/* Ripple on hover */}
                {hovered && isIdle && (
                  <circle cx="114" cy="158" r="44" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="r" values="44;70" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* 11. DATE TEXT */}
                <text x="114" y="270" textAnchor="middle" fill="#8B6914" fontFamily="Cinzel Decorative" fontSize="8" letterSpacing="3">MCMXXVI</text>
              </svg>
            </div>
            {/* Back side of cover */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <svg width="220" height="300" viewBox="0 0 220 300">
                <rect x="14" y="8" width="200" height="288" rx="6" fill="#1A0604" />
              </svg>
            </div>
          </motion.div>

          {/* Golden light shafts when opening */}
          {isOpening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: '14px',
                width: '8px',
                height: '300px',
                background: 'linear-gradient(180deg, transparent, #FFD700, transparent)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* ✦ CLICK TO OPEN ✦ TEXT */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 28, zIndex: 2 }}
          >
            <p
              className="animate-hint"
              style={{
                fontFamily: 'Cinzel Decorative',
                fontSize: '13px',
                letterSpacing: '4px',
                color: '#C9A84C',
              }}
            >
              ✦ CLICK TO OPEN ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHITE FLASH OVERLAY */}
      {phase === 'flash' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#FFF8DC',
            zIndex: 100,
            animation: 'flashIn 0.6s ease-in-out forwards',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default BookLanding;
