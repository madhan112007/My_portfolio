import React from 'react';
import BookPage from '../BookPage';
import WaxSeal from '../ornaments/WaxSeal';
import { achievements } from '../../data/achievements';

const AchievementsChapter = () => (
  <>
    <BookPage side="left" pageNum={9} watermarkRune="⚜">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter V</p>
      <h2 className="chapter-title">Acta Triumphorum</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

      {/* Laurel wreath */}
      <svg width="100" height="80" viewBox="0 0 100 80" style={{ display: 'block', margin: '0 auto 12px' }}>
        <path d="M10 60 Q5 40 15 25 Q25 15 35 20 Q25 30 20 45 Q15 55 10 60Z"
          fill="none" stroke="var(--sepia)" strokeWidth="1" opacity="0.7"/>
        <path d="M90 60 Q95 40 85 25 Q75 15 65 20 Q75 30 80 45 Q85 55 90 60Z"
          fill="none" stroke="var(--sepia)" strokeWidth="1" opacity="0.7"/>
        {[20,30,40,60,70,80].map((x,i) => (
          <ellipse key={i} cx={x} cy={i<3?50-i*5:50-(5-i)*5} rx="7" ry="4"
            fill="none" stroke="var(--sepia)" strokeWidth="0.8" opacity="0.5"
            transform={`rotate(${i<3?-20+i*10:20-i*10},${x},50)`}/>
        ))}
        <path d="M50 60 L46 75 L50 72 L54 75Z" fill="var(--gold)" opacity="0.7"/>
      </svg>

      <p className="body-text manuscript-para" style={{ fontStyle: 'italic', textAlign: 'center', fontSize: 13 }}>
        "Sealed by judges, witnessed by thousands,<br/>
        these victories are inscribed in the eternal record."
      </p>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ fontFamily: "'UnifrakturMaguntia',serif", fontSize: 36,
          color: 'var(--gold)', opacity: 0.9 }}>VIII</span>
        <p className="section-header" style={{ fontSize: 9, marginTop: 4 }}>Conquests Recorded</p>
      </div>
    </BookPage>

    <BookPage side="right" pageNum={10} watermarkRune="⚜">
      <p className="section-header" style={{ marginBottom: 10 }}>Proclamations of Honour</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {achievements.slice(0, 5).map((ach, i) => (
          <div key={i} style={{
            border: '1px solid var(--gold)', padding: '8px 10px',
            position: 'relative', opacity: 0.95,
          }}>
            <div style={{ position: 'absolute', inset: 2, border: '0.5px solid rgba(184,134,11,0.3)', pointerEvents: 'none' }}/>
            <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 9.5,
              color: 'var(--ink)', textAlign: 'center', marginBottom: 3 }}>{ach.title}</p>
            <p className="body-text" style={{ fontSize: 10.5, textAlign: 'center',
              fontStyle: 'italic', color: 'var(--sepia)', marginBottom: 4 }}>{ach.description}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
              {ach.tags.map(tag => (
                <WaxSeal key={tag} size={26} label={tag.slice(0,4)} color="#6B1A1A"/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BookPage>
  </>
);

export default AchievementsChapter;
