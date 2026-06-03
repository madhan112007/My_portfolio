import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scroll } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get(`${API_URL}/certifications`);
        setCertifications(res.data);
      } catch (err) {
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  const getRibbonColor = (color) => {
    switch (color) {
      case 'red': return 'bg-red-800';
      case 'emerald': return 'bg-emerald-700';
      case 'brightRed': return 'bg-red-600';
      case 'blue': return 'bg-blue-600';
      case 'navy': return 'bg-blue-900';
      default: return 'bg-[var(--accent-color)]';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        Scrolls & Seals
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert._id || i}
            initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[var(--surface-color)] p-8 border border-[var(--border-color)]/20 shadow-xl rounded-sm parchment-texture overflow-hidden hover:-translate-y-2 transition-transform"
          >
            {/* Ribbon */}
            <div className={`absolute top-0 right-8 w-6 h-12 ${getRibbonColor(cert.color)} shadow-lg`}>
              <div className="absolute bottom-[-10px] left-0 right-0 h-0 w-0 border-l-[12px] border-r-[12px] border-t-[10px] border-l-transparent border-r-transparent border-t-current" style={{ color: 'inherit' }} />
            </div>

            <Scroll className="text-[var(--accent-color)] mb-6 opacity-40 group-hover:opacity-100 transition-opacity" size={32} />
            
            <h3 className="font-heading text-lg font-bold mb-2 text-[var(--text-primary)]">
              {cert.name}
            </h3>
            
            <div className="space-y-1">
              <p className="font-subheading text-[var(--accent-color)] font-bold">{cert.issuer}</p>
              <p className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest">{cert.date}</p>
            </div>

            {/* Scroll bottom roll effect */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--border-color)]/10 to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
