import React from 'react';
import BookPage from '../BookPage';
import HandDrawnBox from '../ornaments/HandDrawnBox';
import { projects } from '../../data/projects';
import { FaGithub } from 'react-icons/fa';

const RUNES = ['⚡','🌾','🗺️','👁'];
const ROMAN = ['I','II','III','IV'];

const ProjectsChapter = () => (
  <>
    <BookPage side="left" pageNum={3} watermarkRune="⚗">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter II</p>
      <h2 className="chapter-title">Opera Arcana</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

      <p className="body-text manuscript-para" style={{ fontStyle: 'italic', marginBottom: 16 }}>
        Four great constructions, each breathing with autonomous intelligence,
        forged from data and deployed upon the living web.
      </p>

      {/* Alchemical circle with 4 quadrant symbols */}
      <svg width="160" height="160" viewBox="0 0 160 160" style={{ display: 'block', margin: '0 auto' }}>
        <circle cx="80" cy="80" r="68" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="80" cy="80" r="44" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4"/>
        <line x1="80" y1="12" x2="80" y2="148" stroke="var(--gold)" strokeWidth="0.6" opacity="0.4"/>
        <line x1="12" y1="80" x2="148" y2="80" stroke="var(--gold)" strokeWidth="0.6" opacity="0.4"/>
        {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sy],i) => (
          <g key={i}>
            <text x={80 + sx*44} y={80 + sy*44 + 5} textAnchor="middle"
              fontSize="18" fill="var(--gold)" opacity="0.8">{RUNES[i]}</text>
          </g>
        ))}
        <text x="80" y="85" textAnchor="middle" fontFamily="'EB Garamond',serif"
          fontSize="9" fill="var(--ink)" fontStyle="italic">4 Constructs</text>
      </svg>

      <p className="margin-note" style={{ marginTop: 12 }}>
        ✦ all breathing · all live · all deployed
      </p>
    </BookPage>

    <BookPage side="right" pageNum={4} watermarkRune="⚗">
      <p className="section-header" style={{ marginBottom: 12 }}>Arcane Constructions</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {projects.slice(0, 4).map((p, i) => (
          <HandDrawnBox key={p.id} width={320} height={110}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 10, color: 'var(--gold)', marginBottom: 4 }}>
                {ROMAN[i]}. {p.title}
              </p>
              <span style={{ fontSize: 14 }}>{RUNES[i]}</span>
            </div>
            <p className="body-text" style={{ fontSize: 11, marginBottom: 4, lineHeight: 1.5 }}>
              {p.description.slice(0, 90)}…
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 10, color: 'var(--sepia)', fontStyle: 'italic' }}>
                {p.stack.slice(0, 3).join(' · ')}
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 9, color: '#2A6B2A', fontFamily: "'Cinzel Decorative',serif" }}>⬤ LIVE</span>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>
                    <FaGithub size={12}/>
                  </a>
                )}
              </div>
            </div>
          </HandDrawnBox>
        ))}
      </div>
    </BookPage>
  </>
);

export default ProjectsChapter;
