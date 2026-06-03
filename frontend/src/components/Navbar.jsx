import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ];

  const navVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-[var(--surface-color)]/80 border-b border-[var(--border-color)] py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 group">
          <Book className="text-[var(--accent-color)] group-hover:rotate-12 transition-transform" size={28} />
          <span className="font-heading text-2xl font-bold tracking-tighter">M.S</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                relative font-subheading text-lg transition-colors hover:text-[var(--accent-color)]
                ${isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)]'}
                after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] 
                after:bg-[var(--accent-color)] after:transition-all after:duration-300
                ${isActive ? 'after:w-full' : 'hover:after:w-full'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--text-primary)]">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ rotateY: -180, x: '100%', opacity: 0 }}
            animate={{ rotateY: 0, x: 0, opacity: 1 }}
            exit={{ rotateY: -180, x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 bg-[var(--bg-color)] z-[110] flex flex-col items-center justify-center gap-8 lg:hidden parchment-texture origin-left"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-[var(--text-primary)]">
              <X size={40} />
            </button>
            {links.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-heading text-3xl hover:text-[var(--accent-color)] transition-colors"
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
