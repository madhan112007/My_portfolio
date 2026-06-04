import React from 'react';
import BookPage from '../BookPage';
import { certifications } from '../../data/certifications';

const ROMAN = ['I','II','III','IV','V','VI','VII'];
const RIBBON_COLORS = { red:'#8B1A1A', emerald:'#1A6B2A', brightRed:'#CC2222',
  blue:'#1A3B8C', navy:'#0D1E5C' };

const CertificationsChapter = () => (
  <>
    <BookPage side="left" pageNum={11} watermarkRune="📜">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter VI</p>
      <h2 className="chapter-title">Diplomata</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

      {/* Scroll illustration */}
      <svg width="100" height="90" viewBox="0 0 100 90" style={{ display: 'block', margin: '0 auto 12px' }}>
        <rect x="15" y="15" width="70" height="60" rx="3" fill="none" stroke="var(--sepia)" strokeWidth="1.2" opacity="0.7"/>
        <ellipse cx="50" cy="15" rx="35" ry="7" fill="none" stroke="var(--sepia)" strokeWidth="1" opacity="0.6"/>
        <ellipse cx="50" cy="75" rx="35" ry="7" fill="none" stroke="var(--sepia)" strokeWidth="1" opacity="0.6"/>
        {[25,32,39,46,53,60].map(y => (
          <line key={y} x1="22" y1={y} x2="78" y2={y} stroke="var(--sepia)" strokeWidth="0.5" opacity="0.3"/>
        ))}
        <rect x="42" y="38" width="16" height="14" rx="2" fill="none" stroke="#8B1A1A" strokeWidth="1.2"/>
        <line x1="50" y1="52" x2="50" y2="65" stroke="#8B1A1A" strokeWidth="2"/>
        <text x="50" y="81" textAnchor="middle" fontFamily="'EB Garamond',serif"
          fontSize="8" fill="var(--sepia)" fontStyle="italic">sealed</text>
      </svg>

      <p className="body-text" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 14 }}>
        "VII Seals of Learning"
      </p>
      <p className="body-text" style={{ textAlign: 'center', fontSize: 12, color: 'var(--sepia)', marginTop: 6 }}>
        Issued by the great houses of knowledge —<br/>
        NPTEL, Oracle, HackerRank, IIT Bombay
      </p>
    </BookPage>

    <BookPage side="right" pageNum={12} watermarkRune="📜">
      <p className="section-header" style={{ marginBottom: 10 }}>Scrolls of Knowledge</p>
      <div style={{
        background: 'rgba(139,90,20,0.04)', border: '1px solid rgba(139,105,20,0.25)',
        padding: '12px 14px', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {certifications.map((cert, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: i < certifications.length-1 ? 10 : 0,
            paddingBottom: i < certifications.length-1 ? 10 : 0,
            borderBottom: i < certifications.length-1 ? '0.5px solid rgba(139,90,20,0.2)' : 'none',
          }}>
            {/* Ribbon */}
            <div style={{ width: 4, height: 36, background: RIBBON_COLORS[cert.color] || '#8B1A1A',
              borderRadius: 2, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 8.5,
                color: 'var(--gold)', marginRight: 6 }}>{ROMAN[i]}.</span>
              <span className="body-text" style={{ fontSize: 12 }}>{cert.name}</span>
              <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 10,
                fontStyle: 'italic', color: 'var(--sepia)', marginTop: 1 }}>
                {cert.issuer} · {cert.date}
              </p>
            </div>
            {/* Issuer seal */}
            <svg width="22" height="22" viewBox="0 0 22 22">
              <circle cx="11" cy="11" r="10" fill={RIBBON_COLORS[cert.color] || '#8B1A1A'}
                stroke="#B8860B" strokeWidth="1" opacity="0.7"/>
              <text x="11" y="15" textAnchor="middle" fontSize="7" fill="#FFD700"
                fontFamily="'Cinzel Decorative',serif">{cert.issuer.slice(0,3)}</text>
            </svg>
          </div>
        ))}
      </div>
    </BookPage>
  </>
);

export default CertificationsChapter;
