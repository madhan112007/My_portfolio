import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import profilePhoto from '../assets/Portfolio about page my photo.jpeg';

const About = () => {
  const { isDarkMode } = useTheme();

  const githubTheme = {
    light: ['#EBEDF0', '#B8860B', '#9B6D0A', '#7A5408', '#593B06'], // Gold shades for magical feel
    dark: ['#1A1209', '#B8860B', '#D4AF37', '#FFD700', '#FFFACD'], // Brighter gold for dark mode
  };

  const activityStats = {
    total: 1191,
    platforms: [
      { name: 'GitHub', count: 353, intensity: 30, color: '#30A14E' },
      { name: 'LeetCode', count: 823, intensity: 69, color: '#FFA116' },
      { name: 'Codeforces', count: 15, intensity: 1, color: '#318CE7' },
    ]
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-12 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        The Chronicler
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="font-body text-xl md:text-2xl leading-relaxed text-[var(--text-primary)]">
            I'm <span className="text-[var(--accent-color)] font-bold">Madhan S</span>, a B.Tech AI & Data Science student at Sri Eshwar College of Engineering, Coimbatore (2024–2028).
          </p>
          <p className="font-body text-lg leading-relaxed text-[var(--text-secondary)]">
            I build production-grade ML systems, full-stack applications, and contribute to open source. I'm driven by a builder's mindset — shipping real things that solve real problems.
          </p>
          <p className="font-body text-lg leading-relaxed text-[var(--text-secondary)] italic border-l-4 border-[var(--accent-color)] pl-6 py-2">
            "The magic isn't in the code itself, but in the impact it creates when unleashed upon the world."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* Portrait Frame */}
          <div className="relative group">
            <div className="w-64 h-80 md:w-80 md:h-[400px] bg-[var(--surface-color)] border-8 border-[var(--border-color)] rounded-sm shadow-2xl overflow-hidden relative transition-transform hover:rotate-1">
              <img 
                src={profilePhoto} 
                alt="Madhan S" 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 to-transparent pointer-events-none" />
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-color)] opacity-50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-color)] opacity-50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-color)] opacity-50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-color)] opacity-50" />
            </div>
            {/* Shadow/Reflection Layer */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--accent-color)]/20 -z-10 rounded-sm" />
          </div>
        </motion.div>
      </div>

      {/* The Grand Chronicle Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-10 bg-[var(--surface-color)]/30 border-2 border-[var(--border-color)]/30 rounded-sm parchment-texture shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-color)] opacity-5 rotate-45 translate-x-16 -translate-y-16" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-[var(--border-color)]/20 pb-8">
          <div>
            <h3 className="font-heading text-3xl font-bold text-[var(--accent-color)] mb-2">The Grand Chronicle</h3>
            <p className="font-mono text-sm uppercase tracking-widest text-[var(--text-secondary)]">Annual Effort & Arcane Mastery</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-5xl font-heading font-bold text-[var(--text-primary)]">{activityStats.total}</div>
            <p className="font-subheading text-[var(--accent-color)] italic uppercase text-xs tracking-tighter">Activities in the last year</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-12">
          {/* Stats Breakdown */}
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <span className="font-heading text-lg">Contribution Realms</span>
              <div className="flex gap-4 font-mono text-xs">
                {activityStats.platforms.map(p => (
                  <span key={p.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name} {p.count}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Intensity Bar */}
            <div className="relative h-4 w-full bg-[var(--bg-color)] rounded-full overflow-hidden flex border border-[var(--border-color)]/20">
              {activityStats.platforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.intensity}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                  style={{ backgroundColor: p.color }}
                  className="h-full relative group"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {p.name}: {p.intensity}%
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between font-mono text-[10px] uppercase tracking-tighter opacity-50">
              <span>CF {activityStats.platforms[2].intensity}%</span>
              <span>GH {activityStats.platforms[0].intensity}%</span>
              <span>LC {activityStats.platforms[1].intensity}%</span>
            </div>
          </div>

          <div className="bg-[var(--bg-color)]/50 p-6 border border-[var(--border-color)]/20 rounded-sm relative group">
            <h4 className="font-heading text-sm mb-4 text-[var(--accent-color)] uppercase tracking-widest">Mastery Intensity</h4>
            <div className="space-y-4 font-body text-sm text-[var(--text-secondary)]">
              <p>Intensity of effort across algorithmic trials and architectural builds.</p>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-heading text-[var(--text-primary)]">69%</span>
                  <span className="text-[8px] uppercase">Logic (LC)</span>
                </div>
                <div className="w-[1px] h-8 bg-[var(--border-color)]/20" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-heading text-[var(--text-primary)]">30%</span>
                  <span className="text-[8px] uppercase">Craft (GH)</span>
                </div>
                <div className="w-[1px] h-8 bg-[var(--border-color)]/20" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-heading text-[var(--text-primary)]">1%</span>
                  <span className="text-[8px] uppercase">Arena (CF)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Visual */}
        <div className="bg-[var(--bg-color)]/30 p-8 border border-[var(--border-color)]/20 rounded-sm">
          <div className="flex justify-center overflow-x-auto py-4">
            <GitHubCalendar 
              username="madhan112007" 
              colorScheme={isDarkMode ? 'dark' : 'light'}
              theme={githubTheme}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
            />
          </div>
          <p className="text-center font-subheading text-[10px] uppercase tracking-[0.2em] opacity-40 mt-4">
            The Flow of Magic (Aggregated Activity Heatmap)
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
