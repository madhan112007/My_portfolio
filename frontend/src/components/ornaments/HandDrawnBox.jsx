import React from 'react';

const wave = (x1, y1, x2, y2, amp = 1.5, segs = 8) => {
  const dx = (x2 - x1) / segs, dy = (y2 - y1) / segs;
  let d = `M ${x1} ${y1}`;
  for (let i = 0; i < segs; i++) {
    const mx = x1 + dx * (i + 0.5) + (Math.random() - 0.5) * amp;
    const my = y1 + dy * (i + 0.5) + (Math.random() - 0.5) * amp;
    d += ` Q ${mx} ${my} ${x1 + dx * (i + 1)} ${y1 + dy * (i + 1)}`;
  }
  return d;
};

const HandDrawnBox = ({ width = 280, height = 140, children }) => {
  const p = 4;
  const w = width - p * 2, h = height - p * 2;
  const top    = wave(p, p,     p + w, p);
  const right  = wave(p + w, p, p + w, p + h);
  const bottom = wave(p + w, p + h, p, p + h);
  const left   = wave(p, p + h, p, p);

  return (
    <div style={{ position: 'relative', width, height, minHeight: height }}>
      <svg style={{ position: 'absolute', inset: 0, overflow: 'visible' }} width={width} height={height}>
        <path d={`${top} ${right} ${bottom} ${left} Z`}
          stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.7"/>
      </svg>
      <div style={{ position: 'relative', padding: '12px 14px', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default HandDrawnBox;
