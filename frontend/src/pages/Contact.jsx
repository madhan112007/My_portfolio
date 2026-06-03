import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API_URL}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socials = [
    { icon: <Mail />, link: "https://mail.google.com/mail/?view=cm&to=codethetrend@gmail.com", label: "Email" },

    { icon: <FaLinkedin />, link: "https://linkedin.com/in/madhan-s-727b85332/", label: "LinkedIn" },
    { icon: <FaGithub />, link: "https://github.com/madhan112007", label: "GitHub" },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 border-b-2 border-[var(--border-color)] pb-4 inline-block"
      >
        Send a Letter
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="bg-[var(--surface-color)] p-8 border-2 border-[var(--border-color)]/30 rounded-sm parchment-texture relative">
            <h3 className="font-heading text-2xl font-bold mb-6">Contact Details</h3>
            <div className="space-y-6">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors group"
                >
                  <div className="p-3 bg-[var(--bg-color)] border border-[var(--border-color)]/20 rounded-sm group-hover:magical-glow transition-all">
                    {social.icon}
                  </div>
                  <span className="font-mono text-sm">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <a
            href="tel:+919363752394"
            className="flex items-center justify-center gap-3 w-full py-4 border-2 border-[var(--accent-color)] text-[var(--accent-color)] font-bold rounded-sm hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] transition-all"
          >
            <Phone size={18} /> Book a Call
          </a>

          <div className="p-8 border-2 border-dashed border-[var(--border-color)]/30 rounded-sm">
            <p className="font-body text-lg italic text-[var(--text-secondary)]">
              "I am always eager to collaborate on ambitious projects or discuss the latest in AI and robotics. My quill is ready for your correspondence."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--surface-color)] p-10 border-2 border-[var(--border-color)] shadow-2xl rounded-sm parchment-texture relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-color)]/50 border-b-2 border-[var(--border-color)]/30 focus:border-[var(--accent-color)] outline-none py-2 px-4 font-body transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-color)]/50 border-b-2 border-[var(--border-color)]/30 focus:border-[var(--accent-color)] outline-none py-2 px-4 font-body transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">Subject</label>
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[var(--bg-color)]/50 border-b-2 border-[var(--border-color)]/30 focus:border-[var(--accent-color)] outline-none py-2 px-4 font-body transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">Message</label>
              <textarea
                required
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[var(--bg-color)]/50 border-b-2 border-[var(--border-color)]/30 focus:border-[var(--accent-color)] outline-none py-2 px-4 font-body transition-colors resize-none"
              ></textarea>
            </div>
            
            <button
              disabled={status === 'sending'}
              type="submit"
              className="w-full py-4 bg-[var(--accent-color)] text-[var(--bg-color)] font-bold rounded-sm flex items-center justify-center gap-3 hover:magical-glow transition-all disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Letter Sent! ✉️' : (
                <>Send with a Seal <Send size={18} /></>
              )}
            </button>
          </form>

          {/* Decorative wax seal stamp animation area */}
          {status === 'success' && (
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-32 h-32 bg-red-900/40 rounded-full border-8 border-red-800/20 flex items-center justify-center">
                <span className="text-4xl">SEALED</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
