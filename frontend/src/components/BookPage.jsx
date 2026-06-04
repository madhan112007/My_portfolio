import React from 'react';

const BookPage = ({ side = 'left', pageNum, watermarkRune = '✦', children, style = {} }) => (
  <div
    className={`parchment-page ${side === 'left' ? 'page-left-shadow' : 'page-right-shadow'}`}
    style={{
      flex: 1,
      padding: side === 'left' ? '44px 32px 52px 48px' : '44px 48px 52px 32px',
      position: 'relative',
      transform: side === 'left' ? 'rotateY(1.5deg)' : 'rotateY(-1.5deg)',
      transformOrigin: side === 'left' ? 'right center' : 'left center',
      minHeight: 700,
      overflow: 'hidden',
      ...style,
    }}
  >
    <div className="page-watermark">{watermarkRune}</div>
    <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
      {children}
    </div>
    {pageNum && (
      <div className="page-number" style={{
        position: 'absolute',
        bottom: 20,
        [side === 'left' ? 'left' : 'right']: 28,
      }}>
        — {pageNum} —
      </div>
    )}
  </div>
);

export default BookPage;
