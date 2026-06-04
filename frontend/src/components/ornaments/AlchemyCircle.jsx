import React from 'react';

const AlchemyCircle = ({ size = 220 }) => {
  const cx = size / 2, cy = size / 2;
  const rings = [
    { r: size * 0.44, items: ['Python','Java','C++','SQL','Dart'], color: '#B8860B' },
    { r: size * 0.31, items: ['TensorFlow','PyTorch','FastAPI','Flutter'], color: '#8B6914' },
    { r: size * 0.19, items: ['AWS','Docker','PostgreSQL'], color: '#6B4F2A' },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        {rings.map((ring, i) => (
          <path key={i} id={`arc${i}`}
            d={`M ${cx - ring.r} ${cy} A ${ring.r} ${ring.r} 0 1 1 ${cx + ring.r - 0.01} ${cy}`}
            fill="none"/>
        ))}
      </defs>

      {/* Concentric rings */}
      {rings.map((ring, i) => (
        <circle key={i} cx={cx} cy={cy} r={ring.r} fill="none" stroke={ring.color} strokeWidth="1.2" opacity="0.7"/>
      ))}

      {/* Cross lines */}
      <line x1={cx} y1={cy - size*0.44} x2={cx} y2={cy + size*0.44} stroke="#B8860B" strokeWidth="0.6" opacity="0.4"/>
      <line x1={cx - size*0.44} y1={cy} x2={cx + size*0.44} y2={cy} stroke="#B8860B" strokeWidth="0.6" opacity="0.4"/>
      <line x1={cx - size*0.31} y1={cy - size*0.31} x2={cx + size*0.31} y2={cy + size*0.31} stroke="#B8860B" strokeWidth="0.5" opacity="0.3"/>
      <line x1={cx + size*0.31} y1={cy - size*0.31} x2={cx - size*0.31} y2={cy + size*0.31} stroke="#B8860B" strokeWidth="0.5" opacity="0.3"/>

      {/* Text on rings */}
      {rings.map((ring, i) => (
        <text key={i} fontFamily="'EB Garamond',serif" fontSize={size * 0.045} fill={ring.color} letterSpacing="1">
          <textPath href={`#arc${i}`} startOffset="5%">
            {ring.items.join('  ✦  ')}
          </textPath>
        </text>
      ))}

      {/* Center */}
      <circle cx={cx} cy={cy} r={size*0.09} fill="#4A0E0E" stroke="#FFD700" strokeWidth="1.2"/>
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="'Cinzel Decorative',serif"
        fontSize={size*0.042} fill="#FFD700">Full Stack</text>

      {/* Small star nodes at intersections */}
      {[0,1,2,3].map(i => {
        const angle = (i * 90 - 45) * Math.PI / 180;
        return <circle key={i} cx={cx + Math.cos(angle)*size*0.44} cy={cy + Math.sin(angle)*size*0.44}
          r="3" fill="#FFD700" opacity="0.8"/>;
      })}
    </svg>
  );
};

export default AlchemyCircle;
