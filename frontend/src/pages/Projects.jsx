import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, Box } from 'lucide-react';
import { techIcons } from '../data/techIcons';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[var(--surface-color)] p-8 border-2 border-[var(--border-color)]/30 rounded-sm overflow-hidden hover:border-[var(--accent-color)] hover:-translate-y-2 transition-all duration-300 parchment-texture"
    >
      <div className="absolute top-0 right-0 p-4">
        <span className={`px-3 py-1 text-xs font-mono uppercase tracking-widest rounded-full ${
          project.status === 'Live' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'
        }`}>
          {project.status}
        </span>
      </div>

      <Box className="text-[var(--accent-color)] mb-6 opacity-30 group-hover:opacity-100 transition-opacity" size={40} />
      
      <h3 className="font-subheading text-2xl font-bold mb-4 text-[var(--text-primary)]">
        {project.title}
      </h3>

      <div className="flex flex-wrap gap-3 mb-6">
        {project.stack.map(tech => {
          const techData = techIcons[tech];
          const Icon = techData?.icon;
          
          return (
            <div 
              key={tech} 
              className="flex items-center gap-2 px-2 py-1 bg-[var(--border-color)]/10 text-[var(--text-secondary)] text-xs font-mono rounded border border-[var(--border-color)]/20 hover:border-[var(--accent-color)]/50 transition-all duration-300 group/tech"
            >
              {Icon && (
                <Icon 
                  className="text-[var(--accent-color)]/50 group-hover/tech:text-[var(--accent-color)] transition-colors duration-300"
                  size={14} 
                />
              )}
              <span className="group-hover/tech:text-[var(--text-primary)] transition-colors">{tech}</span>
            </div>
          );
        })}
      </div>

      <p className="font-body text-[var(--text-secondary)] mb-8 line-clamp-3">
        {project.description}
      </p>

      <div className="flex items-center gap-6 mt-auto">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
            <FaGithub size={20} />
          </a>
        )}
        <button className="text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
          <ExternalLink size={20} />
        </button>
      </div>

      {/* Torn paper effect corner */}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--bg-color)] rotate-45 border-l border-[var(--border-color)]/30" />
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        Arcane Artifacts
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project._id || i} project={project} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <a
          href="https://github.com/madhan112007"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 border-2 border-[var(--accent-color)] text-[var(--accent-color)] font-bold hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] transition-all rounded-sm"
        >
          View All on GitHub <FaGithub size={20} />
        </a>
      </motion.div>
    </div>
  );
};

export default Projects;
