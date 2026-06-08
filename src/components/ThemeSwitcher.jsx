import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Palette } from 'lucide-react'; 
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'light-steel', color: '#adb5bd' },
  { id: 'vivid-nightfall', color: '#5a189a' },
  { id: 'purple-cascade', color: '#a100f2' },
  { id: 'fresh-greens', color: '#2d6a4f' },
  { id: 'pink-ombre', color: '#ff85a1' },
];

const ThemePicker = ({ mobile = false }) => {
  const { setTheme, theme: currentTheme } = useContext(ThemeContext);
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

  const colorButtons = themes.map((t) => (
    <button
      key={t.id}
      onClick={() => { setTheme(t.id); setIsOpen(false); }}
      className={`relative p-1 rounded-full transition-all duration-200 hover:scale-110 ${
        currentTheme === t.id
          ? 'ring-1 ring-theme-accent ring-offset-1 ring-offset-theme-secondary'
          : 'hover:bg-theme-accent/10'
      }`}
    >
      <div
        style={{ backgroundColor: t.color }}
        className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
      />
    </button>
  ));

  return (
    <div ref={containerRef} className={`relative flex ${mobile ? 'flex-row' : 'flex-col'} gap-3 items-center z-50`}>


      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full transition-all duration-300 bg-theme-secondary border border-theme-muted hover:shadow-lg hover:rotate-30 active:scale-90"
      >
        <Palette className={`${mobile ? 'w-7 h-7' : 'w-10 h-10'} text-theme-accent`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>

            {mobile ? (
              /* Mobile: tepaga, gorizontal, hech qanday rotate yo'q */
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 bg-theme-secondary border border-theme-accent/40 rounded-full shadow-2xl backdrop-blur-md"
              >
                <div className="flex flex-row gap-2 items-center px-1">
                  {colorButtons}
                </div>
                {/* Pastga yo'nalgan arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-theme-accent/40" />
              </motion.div>
            ) : (
              /* Desktop: o'ngga, rotate-90 */
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute z-100 top-20 left-full mb-4 -translate-x-1/3 rotate-90 p-2 bg-theme-secondary border border-theme-accent/40 rounded-full shadow-2xl backdrop-blur-md"
              >
                <div className="flex flex-row gap-2 items-center px-1">
                  {colorButtons}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-theme-accent/40" />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;