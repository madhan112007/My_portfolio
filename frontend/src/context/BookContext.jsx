import React, { createContext, useContext, useState, useCallback } from 'react';

const BookContext = createContext();

export const CHAPTERS = ['about', 'projects', 'experience', 'skills', 'achievements', 'certifications', 'contact'];

export const CHAPTER_META = {
  about:          { label: 'ABOUT',    latin: 'De Scriba',          roman: 'I',   rune: '✦', pageNum: 1  },
  projects:       { label: 'PROJECTS', latin: 'Opera Arcana',       roman: 'II',  rune: '⚗', pageNum: 3  },
  experience:     { label: 'EXPRNCE',  latin: 'Itinerarium',        roman: 'III', rune: '⚔', pageNum: 5  },
  skills:         { label: 'SKILLS',   latin: 'Artes Magicae',      roman: 'IV',  rune: '★', pageNum: 7  },
  achievements:   { label: 'HONOURS',  latin: 'Acta Triumphorum',   roman: 'V',   rune: '⚜', pageNum: 9  },
  certifications: { label: 'SCROLLS',  latin: 'Diplomata',          roman: 'VI',  rune: '📜', pageNum: 11 },
  contact:        { label: 'CONTACT',  latin: 'Epistola',           roman: 'VII', rune: '✉', pageNum: 13 },
};

export const BookProvider = ({ children }) => {
  const [chapter, setChapter]   = useState('about');
  const [turning, setTurning]   = useState(false);
  const [direction, setDirection] = useState('forward');
  const [soundOn, setSoundOn]   = useState(
    localStorage.getItem('bookSound') !== 'off'
  );
  const [isDark, setIsDark]     = useState(
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const goTo = useCallback((target, onSound) => {
    if (turning || target === chapter) return;
    const fromIdx = CHAPTERS.indexOf(chapter);
    const toIdx   = CHAPTERS.indexOf(target);
    setDirection(toIdx > fromIdx ? 'forward' : 'backward');
    setTurning(true);
    onSound?.();
    setTimeout(() => {
      setChapter(target);
      setTurning(false);
    }, 700);
  }, [chapter, turning]);

  const toggleSound = useCallback(() => {
    setSoundOn(prev => {
      localStorage.setItem('bookSound', !prev ? 'on' : 'off');
      return !prev;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  return (
    <BookContext.Provider value={{ chapter, goTo, turning, direction, soundOn, toggleSound, isDark, toggleTheme }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
