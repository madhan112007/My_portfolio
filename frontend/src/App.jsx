import React, { useRef, Suspense, lazy, useState } from 'react';
import BookLanding from './components/BookLanding';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import CursorTrail from './components/CursorTrail';
import ThreeBook from './components/ThreeBook';
import SidePanels from './components/SidePanels';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Contact = lazy(() => import('./pages/Contact'));

const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-[#0A0704]">
    <div className="w-16 h-16 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PortfolioContent = () => {
  const particleRef = useRef();
  
  const pages = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/projects', element: <Projects /> },
    { path: '/experience', element: <Experience /> },
    { path: '/skills', element: <Skills /> },
    { path: '/achievements', element: <Achievements /> },
    { path: '/certifications', element: <Certifications /> },
    { path: '/contact', element: <Contact /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', position: 'relative' }}
      className="selection:bg-[#B8860B] selection:text-white">
      <Navbar />
      <ParticleCanvas ref={particleRef} />
      <CursorTrail />
      <SidePanels />

      <Suspense fallback={<Loading />}>
        <ThreeBook pages={pages} />
      </Suspense>

      <footer className="fixed bottom-4 w-full text-center font-subheading opacity-60 pointer-events-none z-50"
        style={{ color: 'var(--accent-color)' }}>
        <p>Madhan S · 2026</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [entered, setEntered] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          {!entered ? (
            <motion.div
              key="landing"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookLanding onEnter={() => setEntered(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <PortfolioContent />
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
};

export default App;
