import React from 'react';

const CornerClasp = ({ corner = 'tl' }) => {
  const transforms = {
    tl: 'rotate(0)',
    tr: 'rotate(90) translate(0,-16)',
    bl: 'rotate(-90) translate(-16,0)',
    br: 'rotate(180) translate(-16,-16)',
  };
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" className={`clasp clasp-${corner}`}>
      <g transform={transforms[corner]} stroke="#B8860B" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M2 14 L2 2 L14 2"/>
        <rect x="1" y="1" width="5" height="5" rx="1" fill="#8B6914" stroke="#B8860B" strokeWidth="1"/>
      </g>
    </svg>
  );
};

export default CornerClasp;
