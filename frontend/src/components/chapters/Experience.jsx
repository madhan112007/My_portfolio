import React from 'react';
import BookPage from '../BookPage';
import { experience } from '../../data/experience';

const ExperienceChapter = () => (
  <>
    <BookPage side="left" pageNum={5} watermarkRune="⚔">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter III</p>
      <h2 className="chapter-title">Itinerarium</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

      <p className="body-text manuscript-para" style={{ fontStyle: 'italic', marginBottom: 20 }}>
        A record of apprenticeships, open contributions, and journeys through
        the great halls of craft — each sealed with the mark of completion.
      </p>

      {/* Quill SVG */}
      <svg width="70" height="100" viewBox="0 0 70 100" style={{ display: 'block', margin: '0 auto' }}>
        <path d="M 35 95 Q 30 70 25 50 Q 10 20 5 5 Q 25 15 45 10 Q 60 30 40 55 Q 38 70 35 95Z"
          fill="none" stroke="var(--sepia)" strokeWidth="1.2" opacity="0.7"/>
        <path d="M 35 95 Q 38 80 42 65 Q 48 45 55 30"
          fill="none" stroke="var(--sepia)" strokeWidth="0.8" opacity="0.5"/>
        <path d="M 5 5 Q 20 25 35 95" fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.6"/>
        {[20,35,50,65,80].map(y => (
          <line key={y} x1="20" y1={y} x2="50" y2={y-5} stroke="var(--sepia)" strokeWidth="0.4" opacity="0.4"/>
        ))}
      </svg>

      {/* Seal */}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <svg width="100" height="36" viewBox="0 0 100 36">
          <rect x="2" y="2" width="96" height="32" rx="3" fill="none" stroke="var(--gold)" strokeWidth="1"/>
          <text x="50" y="22" textAnchor="middle" fontFamily="'Cinzel Decorative',serif"
            fontSize="9" fill="var(--gold)" letterSpacing="1">Open Source · 2 Merged PRs</text>
        </svg>
      </div>
    </BookPage>

    <BookPage side="right" pageNum={6} watermarkRune="⚔">
      <p className="section-header" style={{ marginBottom: 12 }}>The Journals</p>
      <div style={{ position: 'relative', paddingLeft: 20 }}>
        {/* Golden thread timeline */}
        <div style={{
          position: 'absolute', left: 6, top: 0, bottom: 0,
          width: 2, background: 'linear-gradient(180deg, #B8860B, #6B4F2A)',
          opacity: 0.6,
        }}/>

        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 22, position: 'relative' }}>
            {/* Timeline node */}
            <div style={{
              position: 'absolute', left: -17, top: 4,
              width: 8, height: 8, borderRadius: '50%',
              background: '#B8860B', border: '1.5px solid #FFD700',
            }}/>

            <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 12, fontStyle: 'italic',
              color: 'var(--gold)', marginBottom: 2 }}>{exp.date}</p>
            <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 4, opacity: 0.4 }}/>
            <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 10,
              color: 'var(--ink)', marginBottom: 1 }}>{exp.role}</p>
            <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 11,
              color: 'var(--sepia)', fontStyle: 'italic', marginBottom: 4 }}>{exp.company}</p>
            {exp.points.slice(0, 2).map((pt, j) => (
              <p key={j} className="body-text" style={{ fontSize: 11, lineHeight: 1.5, marginBottom: 2 }}>
                · {pt}
              </p>
            ))}
            {i < experience.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <svg width="40" height="6"><line x1="0" y1="3" x2="40" y2="3" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5"/></svg>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B1A1A', opacity: 0.6 }}/>
                <svg width="40" height="6"><line x1="0" y1="3" x2="40" y2="3" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </BookPage>
  </>
);

export default ExperienceChapter;
