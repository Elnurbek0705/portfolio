import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const springConfig = { type: 'spring', stiffness: 500, damping: 30 };

  const variants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0,
      x: position === 'left' ? 5 : position === 'right' ? -5 : 0
    },
    animate: { opacity: 1, scale: 1, y: 0, x: 0 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && text && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={springConfig}
            className={`absolute z-[100] px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-theme-secondary border border-theme-accent/30 text-theme-text shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
          >
            {text}
            <div className={`absolute border-4 border-transparent ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-theme-accent/30' : position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-theme-accent/30' : position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-theme-accent/30' : 'right-full top-1/2 -translate-y-1/2 border-r-theme-accent/30'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;