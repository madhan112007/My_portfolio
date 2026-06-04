import React from 'react';

const WaxSeal = ({ size = 40, label = '', color = '#8B1A1A' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="18" fill={color} stroke="#B8860B" strokeWidth="1.5"/>
    <circle cx="20" cy="20" r="13" fill="none" stroke="#FFD700" strokeWidth="0.6" opacity="0.6"/>
    <text x="20" y="24" textAnchor="middle" fontFamily="'Cinzel Decorative',serif"
      fontSize="7" fill="#FFD700" letterSpacing="0.5">{label}</text>
  </svg>
);

export default WaxSeal;
