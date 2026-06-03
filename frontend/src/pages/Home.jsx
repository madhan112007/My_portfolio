import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Download, Feather } from 'lucide-react';

const Home = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const phrases = [
    "AI & Data Science Engineer",
    "Full Stack Developer",
    "Open Source Contributor",
    "ML / Computer Vision Builder"
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length + (isDeleting ? -1 : 1)));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, phraseIndex]);

  const name = "Madhan S";

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 relative">
      <div className="text-center z-10">
        <div className="flex justify-center mb-4">
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="font-heading text-6xl md:text-8xl font-bold text-[var(--text-primary)]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <div className="h-8 mb-6">
          <p className="font-mono text-xl md:text-2xl text-[var(--accent-color)]">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-subheading text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
        >
          I build intelligent systems and ship real products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <NavLink
            to="/projects"
            className="group relative px-8 py-4 bg-[var(--accent-color)] text-[var(--bg-color)] font-bold rounded-sm flex items-center gap-2 overflow-hidden transition-all hover:magical-glow"
          >
            View My Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </NavLink>
          
          <a
            href="https://drive.google.com/file/d/18e5Niu9k4434ysMrLNqg-MAODUvM-PJn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 border-2 border-[var(--accent-color)] text-[var(--accent-color)] font-bold rounded-sm flex items-center gap-2 hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] transition-all"
          >
            Download Resume <Download size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--accent-color)] opacity-50 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-mono uppercase tracking-widest">Scroll</span>
        <Feather className="rotate-180" size={24} />
      </motion.div>
    </section>
  );
};

export default Home;
