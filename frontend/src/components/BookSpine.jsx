import React from 'react';

const BookSpine = () => (
  <div className="book-spine">
    <div className="spine-ribbon" />
    <svg width="24" height="60" viewBox="0 0 24 60" style={{ marginTop: 12, opacity: 0.4 }}>
      <line x1="12" y1="0" x2="12" y2="60" stroke="#B8860B" strokeWidth="0.8"/>
      {[10,20,30,40,50].map(y => (
        <line key={y} x1="6" y1={y} x2="18" y2={y} stroke="#B8860B" strokeWidth="0.4" opacity="0.5"/>
      ))}
    </svg>
  </div>
);

export default BookSpine;
