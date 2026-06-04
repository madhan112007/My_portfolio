import React from 'react';
import { useBook, CHAPTERS, CHAPTER_META } from '../context/BookContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

const ChapterTabs = () => {
  const { chapter, goTo } = useBook();
  const { playHover, playPageTurn } = useSoundEffects();

  return (
    <div className="chapter-tabs">
      {CHAPTERS.map(ch => {
        const meta = CHAPTER_META[ch];
        const active = chapter === ch;
        return (
          <div
            key={ch}
            className={`chapter-tab${active ? ' active' : ''}`}
            onClick={() => goTo(ch, playPageTurn)}
            onMouseEnter={playHover}
            title={meta.latin}
          >
            {active && <div className="tab-dot"/>}
            <span>{meta.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChapterTabs;
