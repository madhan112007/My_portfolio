import React from 'react';

const OrnamentalDivider = () => {
  return (
    <div className="flex items-center justify-center gap-4 my-16 opacity-30">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[var(--accent-color)]" />
      <svg width="40" height="40" viewBox="0 0 100 100" className="fill-[var(--accent-color)]">
        <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
      </svg>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[var(--accent-color)]" />
    </div>
  );
};

export default OrnamentalDivider;
