import React from 'react';
import BookPage from '../BookPage';
import StarMap from '../ornaments/StarMap';
import { skillGroups } from '../../data/skills';

const DOTS = (n, max = 5) =>
  Array.from({ length: max }, (_, i) => (
    <span key={i} style={{ color: i < n ? 'var(--gold)' : 'var(--border)', fontSize: 10 }}>●</span>
  ));

const PROFICIENCY = { 'Python':5,'TensorFlow':4,'PyTorch':4,'FastAPI':4,'Flutter':3,'YOLOv8':4,
  'React':4,'Node.js':4,'AWS (EC2/RDS)':3,'Docker':3,'OpenCV':4,'Scikit-learn':4 };

const SkillsChapter = () => (
  <>
    <BookPage side="left" pageNum={7} watermarkRune="★">
      <p className="section-header" style={{ marginBottom: 4 }}>Chapter IV</p>
      <h2 className="chapter-title">Artes Magicae</h2>
      <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 12, opacity: 0.6 }}/>

      <p className="section-header" style={{ fontSize: 11, marginBottom: 10, letterSpacing: 3 }}>
        ✦ INGREDIENTS ✦
      </p>

      <div style={{ columns: 2, columnGap: 16 }}>
        {skillGroups.slice(0, 2).map(group => (
          <div key={group.category} style={{ marginBottom: 12, breakInside: 'avoid' }}>
            <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 9,
              color: 'var(--gold)', marginBottom: 4, borderBottom: '0.5px solid var(--border)', paddingBottom: 2 }}>
              {group.category}
            </p>
            {group.skills.slice(0, 5).map(skill => (
              <div key={skill} style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 3 }}>
                <span className="body-text" style={{ fontSize: 11 }}>· {skill}</span>
                <span style={{ marginLeft: 4 }}>{DOTS(PROFICIENCY[skill] || 3)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        {skillGroups.slice(2).map(group => (
          <div key={group.category} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 9,
              color: 'var(--gold)', marginBottom: 3 }}>✦ {group.category}</p>
            <p className="body-text" style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--sepia)' }}>
              {group.skills.join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </BookPage>

    <BookPage side="right" pageNum={8} watermarkRune="★">
      <p className="section-header" style={{ marginBottom: 6 }}>Stellar Skill Manifestations</p>
      <p className="body-text" style={{ fontSize: 11, fontStyle: 'italic', marginBottom: 12, color: 'var(--sepia)' }}>
        A celestial map wherein each star marks a domain of mastery,
        and lines of light connect the kindred arts.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StarMap width={310} height={260} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {[['#B8860B','AI / ML'],['#8B1A1A','Web'],['#1A4B8C','Cloud'],['#2A6B2A','Robotics'],['#6B2A8C','Languages']].map(([c,l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: "'EB Garamond',serif", fontSize: 10, color: 'var(--sepia)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block' }}/>
            {l}
          </span>
        ))}
      </div>
    </BookPage>
  </>
);

export default SkillsChapter;
