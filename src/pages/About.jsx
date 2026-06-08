import React, { useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Zap, 
  Code2, 
  Monitor, 
  Languages, 
  Palette, 
  Smartphone,
  Info,
  Download
} from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const features = [
  { id: 'perf', icon: Zap, color: 'text-yellow-500' },
  { id: 'tech', icon: Code2, color: 'text-blue-500' },
  { id: 'tauri', icon: Monitor, color: 'text-emerald-500' },
  { id: 'i18n', icon: Languages, color: 'text-purple-500' },
  { id: 'theme', icon: Palette, color: 'text-pink-500' },
  { id: 'responsive', icon: Smartphone, color: 'text-orange-500' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const About = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-theme-accent/10 text-theme-accent border border-theme-accent/20">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-theme-text mb-4">
          {t('about.title')} <span className="text-theme-accent bold-font">{t('about.subtitle')}</span>
        </h2>
        <p className="text-theme-muted max-w-2xl mx-auto text-lg leading-relaxed">
          {t('about.desc')}
        </p>
      </Motion.div>

      {/* Features Grid */}
      <Motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <Motion.div
            key={feature.id}
            variants={item}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative p-8 rounded-3xl bg-theme-secondary/40 border border-theme-accent/10 backdrop-blur-xl hover:border-theme-accent/40 transition-all duration-300"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-3xl bg-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
            
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-theme-bg/80 flex items-center justify-center mb-6 shadow-inner border border-theme-accent/5 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-theme-text mb-3">
                {t(`about.${feature.id}.title`)}
              </h3>
              
              <p className="text-theme-muted leading-relaxed text-sm md:text-base">
                {t(`about.${feature.id}.desc`)}
              </p>

              {feature.id === 'tauri' && (
                <a 
                  href="/app.exe" 
                  download 
                  className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 ${feature.color} hover:bg-emerald-500 hover:text-white transition-all duration-300 text-sm font-semibold group/btn`}
                >
                  <Download className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
                  {t('about.tauri.download')}
                </a>
              )}
            </div>
          </Motion.div>
        ))}
      </Motion.div>

      {/* Technical Footer */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 pt-8 border-t border-theme-accent/10 text-center"
      >
        <p className="text-theme-muted/50 text-sm font-mono tracking-widest uppercase">
            React 19 + Vite + Tailwind CSS 4 + Framer Motion + Tauri
        </p>
      </Motion.div>
    </div>
  );
};

export default About;