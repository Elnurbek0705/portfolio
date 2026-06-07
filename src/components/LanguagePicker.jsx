import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Languages } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const langs = [
  { id: 'uz', label: 'UZ' },
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
];

const LanguagePicker = ({ mobile = false }) => {
  const { setLanguage, language: currentLang } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const langButtons = langs.map((l) => (
    <button
      key={l.id}
      onClick={() => { setLanguage(l.id); setIsOpen(false); }}
      className={`relative px-2 py-1 rounded-md text-xs font-bold transition-all duration-200 hover:scale-110 ${
        currentLang === l.id
          ? 'bg-theme-accent text-theme-secondary shadow-sm'
          : 'text-theme-text hover:bg-theme-accent/10'
      }`}
    >
      {l.label}
    </button>
  ));

  return (
    <div ref={containerRef} className="relative inline-block z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full transition-all duration-300 bg-theme-secondary border border-theme-muted hover:shadow-lg active:scale-90 flex items-center gap-1"
      >
        <Languages className={`${mobile ? 'w-6 h-6' : 'w-7 h-7'} text-theme-accent`} />
        <span className="text-[10px] font-bold text-theme-text uppercase">{currentLang}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: mobile ? 6 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: mobile ? 6 : 10, scale: 0.9 }}
            className={`absolute z-20 p-2 bg-theme-secondary border border-theme-accent/40 rounded-xl shadow-2xl backdrop-blur-md ${
              mobile 
                ? 'bottom-full left-1/2 -translate-x-1/2 mb-3' 
                : 'top-0 left-full ml-3'
            }`}
          >
            <div className={`flex ${mobile ? 'flex-row' : 'flex-col'} gap-2 items-center`}>
              {langButtons}
            </div>
            {/* Arrow */}
            <div className={`absolute border-[6px] border-transparent ${
              mobile 
                ? 'top-full left-1/2 -translate-x-1/2 border-t-theme-accent/40' 
                : 'right-full top-4 -translate-y-1/2 border-r-theme-accent/40'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguagePicker;