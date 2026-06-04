import React, { useEffect, useRef, useState } from 'react';

const BookLanding = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | reacting | opening | flash | done
  const animFrameRef = useRef(null);
  const bookWrapperRef = useRef(null);

  // ── Stars Canvas ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    const stars = [];
    const KEY_STAR_COUNT = 7;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      for (let i = 0; i < 60 + KEY_STAR_COUNT; i++) {
        const isKey = i >= 60;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: isKey ? 2 + Math.random() : 0.4 + Math.random() * 1.2,
          color: Math.random() > 0.5 ? '#FFD700' : '#FFF8DC',
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
          baseOpacity: isKey ? 0.5 + Math.random() * 0.5 : 0.2 + Math.random() * 0.5,
        });
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = t * 0.001;
      stars.forEach(s => {
        const opacity = s.baseOpacity * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    init();
    rafId = requestAnimationFrame(draw);
    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, []);

  // ── Particle Burst ────────────────────────────────────────────
  const spawnParticles = () => {
    const colors = ['#FFD700', '#FFA500', '#FFFACD', '#FF8C00', '#FFE55C'];
    const container = document.getElementById('particle-container');
    if (!container) return;
    for (let i = 0; i < 65; i++) {
      const el = document.createElement('div');
      const size = 2 + Math.random() * 4;
      const angle = Math.random() * 360;
      const dist = 60 + Math.random() * 160;
      const delay = Math.random() * 150;
      const dur = 1000 + Math.random() * 600;
      el.style.cssText = `
        position:absolute; border-radius:50%;
        width:${size}px; height:${size}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:50%; top:50%;
        transform:translate(-50%,-50%);
        opacity:1;
        transition: transform ${dur}ms ease-out ${delay}ms, opacity ${dur}ms ease-out ${delay}ms;
        pointer-events:none;
      `;
      container.appendChild(el);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const rad = (angle * Math.PI) / 180;
          el.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0)`;
          el.style.opacity = '0';
        });
      });
      setTimeout(() => el.remove(), dur + delay + 100);
    }
  };

  // ── Click Handler ─────────────────────────────────────────────
  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('reacting');

    // Phase 1 – shake (handled via CSS class in render)
    setTimeout(() => {
      // Phase 2 – particles + glow
      spawnParticles();
      setPhase('opening');
    }, 300);

    // Phase 4 – white flash
    setTimeout(() => setPhase('flash'), 1100);

    // Phase 5 – enter
    setTimeout(() => {
      setPhase('done');
      onEnter();
    }, 1700);
  };

  const isOpening = phase === 'opening' || phase === 'flash' || phase === 'done';

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#0A0704',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', userSelect: 'none',
    }}>
      <style>{`
        @keyframes bookFloat {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes bookShake {
          0%   { transform: rotate(-2deg) scale(1.08); }
          25%  { transform: rotate(-4deg) scale(1.08); }
          75%  { transform: rotate(4deg) scale(1.08); }
          100% { transform: rotate(-2deg) scale(1.08); }
        }
        @keyframes glowPulse {
          0%,100% { opacity:0.7; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.08); }
        }
        @keyframes glowExplode {
          0%   { opacity:1; transform:scale(1.08); }
          100% { opacity:0; transform:scale(2.5); }
        }
        @keyframes hintPulse {
          0%,100% { opacity:0.35; }
          50%      { opacity:1; }
        }
        @keyframes gemPulse {
          0%,100% { r:5; opacity:1; }
          50%      { r:7; opacity:0.7; }
        }
        @keyframes ripple {
          0%   { r:44; opacity:0.4; }
          100% { r:70; opacity:0; }
        }
        @keyframes coverOpen {
          0%   { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(-180deg); }
        }
        @keyframes lightShaft {
          0%,100% { opacity:0; }
          50%      { opacity:1; }
        }
        @keyframes flashIn {
          0%   { opacity:0; }
          40%  { opacity:0.9; }
          100% { opacity:0; }
        }
        .book-float  { animation: bookFloat 4s ease-in-out infinite; }
        .book-shake  { animation: bookShake 0.3s ease-in-out forwards; }
        .gem-pulse   { animation: gemPulse 2s ease-in-out infinite; }
        .gem-fast    { animation: gemPulse 0.8s ease-in-out infinite; }
      `}</style>

      {/* Stars canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />

      {/* Particle container */}
      <div id="particle-container" style={{ position:'absolute', top:'50%', left:'50%', zIndex:10, pointerEvents:'none' }} />

      {/* Book wrapper */}
      <div
        ref={bookWrapperRef}
        className={phase === 'reacting' ? 'book-shake' : 'book-float'}
        style={{ position:'relative', zIndex:2, cursor:'pointer',
          transform: hovered && phase === 'idle' ? 'scale(1.04) rotate(-2deg)' : undefined,
          transition: 'transform 0.3s ease',
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={handleClick}
      >
        {/* Glow behind book */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          width:340, height:420,
          transform:'translate(-50%,-50%)',
          background:'radial-gradient(ellipse at center, rgba(184,134,11,0.22) 0%, rgba(139,90,20,0.10) 40%, transparent 70%)',
          animation: isOpening ? 'glowExplode 0.5s ease-out forwards' : `glowPulse 3s ease-in-out infinite`,
          opacity: hovered && phase === 'idle' ? 1 : undefined,
          zIndex:1,
          pointerEvents:'none',
        }} />

        {/* Book SVG */}
        <div style={{ position:'relative', zIndex:2 }}>
          <svg width="220" height="330" viewBox="0 0 220 330" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leather" patternUnits="userSpaceOnUse" width="6" height="6">
                <path d="M0 6 L6 0" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none"/>
                <path d="M-1 1 L1 -1" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none"/>
                <path d="M5 7 L7 5" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" fill="none"/>
              </pattern>
              <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,180,0,0.25)"/>
                <stop offset="100%" stopColor="rgba(255,180,0,0)"/>
              </radialGradient>
            </defs>

            {/* Ground glow */}
            <ellipse cx="110" cy="300" rx="75" ry="10" fill="url(#groundGlow)"/>

            {/* Spine */}
            <rect x="10" y="10" width="6" height="288" rx="2" fill="#1A0402"/>
            <line x1="16" y1="10" x2="16" y2="298" stroke="#3D1A08" strokeWidth="1"/>

            {/* Back cover */}
            <rect x="16" y="10" width="200" height="286" rx="6" fill="#1A0604"/>

            {/* Pages side */}
            <rect x="210" y="14" width="14" height="278" rx="2" fill="#E8D5A3"/>
            {[0,1,2,3,4,5,6,7].map(i => (
              <line key={i} x1="210" y1={30 + i*32} x2="224" y2={30 + i*32} stroke="#C9B07A" strokeWidth="0.4"/>
            ))}

            {/* Front cover */}
            <rect x="14" y="8" width="200" height="288" rx="6" fill="#6B1A1A"/>

            {/* Leather texture */}
            <rect x="14" y="8" width="200" height="288" rx="6" fill="url(#leather)" opacity="0.4"/>

            {/* Gold outer border */}
            <rect x="18" y="12" width="192" height="280" rx="4" fill="none" stroke="#B8860B" strokeWidth="1.8"/>

            {/* Gold inner border */}
            <rect x="26" y="20" width="176" height="264" rx="3" fill="none" stroke="#8B6914" strokeWidth="0.8"/>

            {/* Corner ornaments */}
            <path d="M30 28 Q36 24 42 28 M30 28 Q26 34 30 40" stroke="#B8860B" fill="none" strokeWidth="1"/>
            <path d="M198 28 Q192 24 186 28 M198 28 Q202 34 198 40" stroke="#B8860B" fill="none" strokeWidth="1"/>
            <path d="M30 276 Q36 280 42 276 M30 276 Q26 270 30 264" stroke="#B8860B" fill="none" strokeWidth="1"/>
            <path d="M198 276 Q192 280 186 276 M198 276 Q202 270 198 264" stroke="#B8860B" fill="none" strokeWidth="1"/>

            {/* Title */}
            <text x="114" y="72" textAnchor="middle" fontFamily="'Cinzel Decorative', Georgia, serif"
              fontSize="13" fill="#FFD700" letterSpacing="4">MADHAN S</text>
            <text x="114" y="90" textAnchor="middle" fontFamily="'Cinzel Decorative', Georgia, serif"
              fontSize="8" fill="#C9A84C" letterSpacing="3">PORTFOLIO</text>

            {/* Medallion */}
            <circle cx="114" cy="158" r="44" fill="#4A0E0E" stroke="#B8860B" strokeWidth="1.8"/>
            <circle cx="114" cy="158" r="36" fill="none" stroke="#8B6914" strokeWidth="0.8"/>
            <line x1="114" y1="118" x2="114" y2="198" stroke="#B8860B" strokeWidth="1"/>
            <line x1="74" y1="158" x2="154" y2="158" stroke="#B8860B" strokeWidth="1"/>
            <circle cx="114" cy="158" r="18" fill="#8B1A1A" stroke="#FFD700" strokeWidth="1.5"/>
            <circle cx="114" cy="158" r="10" fill="#B8860B"/>
            <circle cx="114" cy="158" r="5" fill="#FFD700"
              className={hovered ? 'gem-fast' : 'gem-pulse'}>
              <animate attributeName="r" values="5;7;5" dur={hovered ? "0.8s" : "2s"} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.7;1" dur={hovered ? "0.8s" : "2s"} repeatCount="indefinite"/>
            </circle>

            {/* Ripple on hover */}
            {hovered && (
              <circle cx="114" cy="158" r="44" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0">
                <animate attributeName="r" values="44;70" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0" dur="1.2s" repeatCount="indefinite"/>
              </circle>
            )}

            {/* Date */}
            <text x="114" y="270" textAnchor="middle" fontFamily="'Cinzel Decorative', Georgia, serif"
              fontSize="8" fill="#8B6914" letterSpacing="3">MCMXXVI</text>

            {/* Bookmark */}
            <rect x="106" y="290" width="6" height="28" fill="#8B1A1A"/>
            <polygon points="106,318 112,318 109,328" fill="#6B1A1A"/>
            <line x1="107" y1="318" x2="107" y2="326" stroke="#5C1414" strokeWidth="1"/>
            <line x1="109" y1="318" x2="109" y2="326" stroke="#5C1414" strokeWidth="1"/>
            <line x1="111" y1="318" x2="111" y2="326" stroke="#5C1414" strokeWidth="1"/>
          </svg>

          {/* Cover open flap */}
          {isOpening && (
            <div style={{
              position:'absolute', top:0, left:0, width:200, height:288,
              background:'linear-gradient(135deg, #2A0A0A 0%, #1A0604 100%)',
              borderRadius:6,
              transformOrigin:'left center',
              animation:'coverOpen 0.8s ease-in-out forwards',
              zIndex:3,
            }}/>
          )}

          {/* Light shaft */}
          {isOpening && (
            <div style={{
              position:'absolute', top:0, left:'calc(50% - 4px)', width:8, height:288,
              background:'linear-gradient(180deg, transparent, #FFD700, transparent)',
              animation:'lightShaft 0.8s ease-in-out',
              pointerEvents:'none', zIndex:4,
            }}/>
          )}
        </div>
      </div>

      {/* Hint text */}
      {phase === 'idle' && (
        <p style={{
          marginTop:28, fontFamily:"'Cinzel Decorative', Georgia, serif",
          fontSize:13, letterSpacing:4, color:'#C9A84C',
          animation:'hintPulse 2.5s ease-in-out infinite',
          zIndex:2, pointerEvents:'none',
        }}>✦ CLICK TO OPEN ✦</p>
      )}

      {/* White flash overlay */}
      {phase === 'flash' && (
        <div style={{
          position:'fixed', inset:0, background:'#FFF8DC', zIndex:100,
          animation:'flashIn 0.6s ease-in-out forwards',
          pointerEvents:'none',
        }}/>
      )}
    </div>
  );
};

export default BookLanding;
