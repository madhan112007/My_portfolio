import React from 'react';
import BookPage from '../BookPage';
import AlchemyCircle from '../ornaments/AlchemyCircle';

const AboutChapter = () => (
  <>
    <BookPage side="left" pageNum={1} watermarkRune="✦">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter I</p>
      <h2 className="chapter-title">De Scriba</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 16, opacity: 0.6 }}/>

      <p className="body-text drop-cap manuscript-para">
        I am Madhan S, a practitioner of artificial intelligence and data sciences,
        enrolled at Sri Eshwar College of Engineering, Coimbatore, in the year of
        our craft 2024. I wield Python and neural architectures to build intelligent
        systems that breathe — from parametric insurance platforms to precision
        agriculture pipelines, each construct forged in fire and tested in the field.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {[
          { label: 'B.Tech · AI & DS', angle: -3 },
          { label: 'CGPA: 8.40',        angle: 2  },
          { label: '2024 – 2028',        angle: -2 },
          { label: 'Coimbatore',         angle: 3  },
        ].map(({ label, angle }) => (
          <span key={label} className="margin-note" style={{ transform: `rotate(${angle}deg)` }}>
            ✦ {label}
          </span>
        ))}
      </div>

      {/* Mini constellation */}
      <div style={{ marginTop: 20 }}>
        <svg width="140" height="70" viewBox="0 0 140 70">
          {[[20,50],[45,20],[70,40],[100,15],[125,45]].map(([x,y],i,a) => (
            <g key={i}>
              {i < a.length-1 && <line x1={x} y1={y} x2={a[i+1][0]} y2={a[i+1][1]} stroke="#B8860B" strokeWidth="0.6" opacity="0.5"/>}
              <circle cx={x} cy={y} r={i===2?4:2.5} fill="#B8860B" opacity="0.8"/>
            </g>
          ))}
          <text x="70" y="65" textAnchor="middle" fontFamily="'EB Garamond',serif"
            fontSize="9" fill="var(--sepia)" fontStyle="italic">Navigator of Systems</text>
        </svg>
      </div>

      {/* Stats */}
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)', opacity: 0.8 }}>
        <p className="body-text" style={{ fontSize: 12, fontStyle: 'italic' }}>
          ✦ 8+ Projects &nbsp;·&nbsp; 10+ Hackathons &nbsp;·&nbsp; 2 Open Source PRs &nbsp;·&nbsp; CGPA 8.40
        </p>
      </div>
    </BookPage>

    <BookPage side="right" pageNum={2} watermarkRune="⊕">
      <p className="section-header" style={{ marginBottom: 8 }}>The Arcane Codex</p>
      <p className="body-text" style={{ fontStyle: 'italic', marginBottom: 16, fontSize: 13 }}>
        A celestial map of all craft domains mastered by the Scribe
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <AlchemyCircle size={200} />
      </div>

      <div style={{ marginTop: 8 }}>
        {[
          { ring: 'Outer', desc: 'Core Languages — Python, Java, C++, SQL, Dart' },
          { ring: 'Middle', desc: 'AI & Web Frameworks' },
          { ring: 'Inner',  desc: 'Cloud & Infrastructure' },
        ].map(({ ring, desc }) => (
          <p key={ring} className="body-text" style={{ fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: 'var(--gold)', fontFamily: "'Cinzel Decorative',serif", fontSize: 10 }}>{ring}:</span>{' '}
            <span style={{ fontStyle: 'italic' }}>{desc}</span>
          </p>
        ))}
      </div>
    </BookPage>
  </>
);

export default AboutChapter;
