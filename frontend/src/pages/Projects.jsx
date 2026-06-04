import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { techIcons } from '../data/techIcons';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="book-card"
    style={{ borderRadius: 4, padding: '20px 22px', marginBottom: 20 }}
  >
    {/* Status */}
    <div style={{ position: 'absolute', top: 12, right: 14 }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.12em',
        padding: '2px 8px', borderRadius: 20,
        background: project.status === 'Live' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
        color: project.status === 'Live' ? '#16a34a' : '#d97706',
        border: `1px solid ${project.status === 'Live' ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
      }}>{project.status}</span>
    </div>

    <h3 style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 16, color: 'var(--text-primary)', marginBottom: 10, paddingRight: 60, lineHeight: 1.4 }}>
      {project.title}
    </h3>

    {/* Stack tags */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
      {project.stack.slice(0, 5).map(tech => {
        const Icon = techIcons[tech]?.icon;
        return (
          <span key={tech} className="rune-tag" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {Icon && <Icon size={9} style={{ color: 'var(--accent-color)' }} />}
            {tech}
          </span>
        );
      })}
    </div>

    <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
      {project.description}
    </p>

    <div className="gold-divider" />

    <div style={{ display: 'flex', gap: 16, paddingTop: 8 }}>
      {project.github && (
        <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <FaGithub size={17} />
        </motion.a>
      )}
      <motion.div whileHover={{ scale: 1.2 }}
        style={{ color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
        <ExternalLink size={17} />
      </motion.div>
    </div>
  </motion.div>
);

const Projects = () => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="section-title" style={{ fontSize: 22 }}>Arcane Artifacts</h2>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.6, marginTop: 8 }}>
        FORGED INNOVATIONS
      </p>
    </div>

    {projects.map((project, i) => <ProjectCard key={project._id || i} project={project} index={i} />)}

    <div style={{ textAlign: 'center', marginTop: 24 }}>
      <motion.a href="https://github.com/madhan112007" target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 24px', border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)', fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '0.15em', textDecoration: 'none',
          borderRadius: 2, transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--bg-color)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-color)'; }}
      >
        VIEW ALL ARTIFACTS <FaGithub size={13} />
      </motion.a>
    </div>
  </div>
);

export default Projects;
