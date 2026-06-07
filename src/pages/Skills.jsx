import React, { useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import {
  SiReact, SiTailwindcss, SiJavascript, SiTypescript,
  SiVuedotjs, SiNodedotjs, SiGit, SiHtml5, SiGithub,
} from 'react-icons/si';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'JavaScript', level: 88 },
  { name: 'TypeScript', level: 72 },
  { name: 'Vue.js', level: 68 },
  { name: 'Node.js', level: 60 },
];

const techIcons = [
  { Icon: SiReact,       color: '#61DAFB', label: 'React' },
  { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind' },
  { Icon: SiJavascript,  color: '#F7DF1E', label: 'JS' },
  { Icon: SiTypescript,  color: '#3178C6', label: 'TS' },
  { Icon: SiVuedotjs,    color: '#42B883', label: 'Vue' },
  { Icon: SiNodedotjs,   color: '#339933', label: 'Node' },
  { Icon: SiGit,         color: '#F05032', label: 'Git' },
  { Icon: SiHtml5,       color: '#E34F26', label: 'HTML5' },
  { Icon: SiGithub,      color: '#ffffff', label: 'GitHub' },
];

const Skills = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl bg-theme-secondary/60 backdrop-blur-sm rounded-3xl border border-theme-accent/15 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Chap: suzuvchi tech ikonkalar */}
          <div className="flex items-center justify-center p-10 bg-theme-bg/30 border-b md:border-b-0 md:border-r border-theme-accent/10">
            <div className="grid grid-cols-3 gap-4">
               {/* eslint-disable-next-line no-unused-vars */}
              {techIcons.map(({ Icon, color, label }, i) => (
                <Motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                    <Motion.div
                    animate={{ y: [0, -(6 + (i % 3) * 4), 0] }}
                    transition={{
                      duration: 2.4 + i * 0.2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: i * 0.15,
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-theme-secondary/80 border border-theme-accent/10 shadow-md"
                    >
                    <Icon size={28} color={color} />
                    <span className="text-[10px] text-theme-muted font-medium">{label}</span>
                  </Motion.div>
                </Motion.div>
              ))}
            </div>
          </div>

          {/* O'ng: skill progress barlar */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <Motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-theme-text mb-2">
                {t('skills.title')}{' '}
                <span className="text-theme-accent bold-font">{t('skills.subtitle')}</span>
              </h2>
              <p className="text-theme-muted mb-8 text-sm leading-relaxed">
                {t('skills.desc')}
              </p>

              <div className="flex flex-col gap-5">
                {skills.map(({ name, level }, i) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-theme-text font-medium">{name}</span>
                      <span className="text-theme-accent font-semibold">{level}%</span>
                    </div>
                    <div className="h-1.5 bg-theme-bg/60 rounded-full overflow-hidden">
                      <Motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-theme-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Skills;