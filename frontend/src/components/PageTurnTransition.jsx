import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTurnTransition = ({ children, onTransitionStart }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('idle');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('turning');
      onTransitionStart?.();
    }
  }, [location, displayLocation, onTransitionStart]);

  const variants = {
    initial: {
      rotateY: -180,
      opacity: 0,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    exit: {
      rotateY: -180,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ perspective: '1200px' }}>
      <AnimatePresence mode="wait" onExitComplete={() => {
        setDisplayLocation(location);
        setTransitionStage('idle');
      }}>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen origin-left bg-[var(--bg-color)]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTurnTransition;
