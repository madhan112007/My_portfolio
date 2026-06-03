import React, { useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import CursorTrail from './components/CursorTrail';
import PageTurnTransition from './components/PageTurnTransition';
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
  <div className="flex items-center justify-center h-screen bg-[var(--bg-color)]">
    <div className="w-16 h-16 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  const particleRef = useRef();

  const handleTransition = () => {
    particleRef.current?.triggerBurst();
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen parchment-texture selection:bg-[var(--accent-color)] selection:text-white">
          <Navbar />
          <ParticleCanvas ref={particleRef} />
          <CursorTrail />
          
          <Suspense fallback={<Loading />}>
            <PageTurnTransition onTransitionStart={handleTransition}>
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </PageTurnTransition>
          </Suspense>

          <footer className="py-8 text-center font-subheading text-[var(--text-secondary)] border-t border-[var(--border-color)]/30 mt-auto">
            <p>Crafted with ink & code by Madhan S · 2026</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
