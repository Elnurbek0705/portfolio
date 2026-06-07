import React, { useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { ExternalLink, GitFork } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const projects = [
  {
    id: 'ecommerce',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    gradient: 'from-blue-500/25 via-cyan-500/10 to-theme-secondary',
    emoji: '🛒',
    link: '#',
    github: '#',
  },
  {
    id: 'task',
    tags: ['Vue.js', 'Firebase', 'Tailwind'],
    gradient: 'from-purple-500/25 via-pink-500/10 to-theme-secondary',
    emoji: '✅',
    link: '#',
    github: '#',
  },
  {
    id: 'weather',
    tags: ['React', 'Chart.js', 'REST API'],
    gradient: 'from-orange-500/25 via-yellow-500/10 to-theme-secondary',
    emoji: '🌤️',
    link: '#',
    github: '#',
  },
  {
    id: 'social',
    tags: ['React', 'GraphQL', 'PostgreSQL'],
    gradient: 'from-emerald-500/25 via-teal-500/10 to-theme-secondary',
    emoji: '💬',
    link: '#',
    github: '#',
  },
  {
    id: 'blog',
    tags: ['Next.js', 'Prisma', 'TypeScript'],
    gradient: 'from-red-500/25 via-orange-500/10 to-theme-secondary',
    emoji: '✍️',
    link: '#',
    github: '#',
  },
  {
    id: 'portfolio',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    gradient: 'from-violet-500/25 via-purple-500/10 to-theme-secondary',
    emoji: '🎨',
    link: '#',
    github: '#',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Portfolio = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="min-h-screen py-10 px-4 md:px-8">
      {/* Sarlavha */}
      <Motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-theme-text mb-2">
          {t('portfolio.title')} <span className="text-theme-accent bold-font">{t('portfolio.subtitle')}</span>
        </h2>
        <p className="text-theme-muted text-sm md:text-base">
          {t('portfolio.desc')}
        </p>
      </Motion.div>

      {/* Loyiha grid */}
      <Motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto pb-8"
      >
        {projects.map((project) => (
          <Motion.div
            key={project.id}
            variants={card}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-theme-secondary/70 border border-theme-accent/10 rounded-2xl overflow-hidden shadow-lg hover:border-theme-accent/30 hover:shadow-2xl transition-shadow"
          >
            {/* Karta banner */}
            <div className={`h-40 bg-linear-to-br ${project.gradient} flex items-center justify-center border-b border-theme-accent/10`}>
              <span className="text-6xl drop-shadow-lg">{project.emoji}</span>
            </div>

            {/* Karta body */}
            <div className="p-5">
              <h3 className="text-theme-text font-semibold text-lg mb-1.5">
                {t(`portfolio.projects.${project.id}.title`)}
              </h3>
              <p className="text-theme-muted text-sm mb-4 leading-relaxed">
                {t(`portfolio.projects.${project.id}.desc`)}
              </p>

              {/* Tech teglar */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-theme-accent/15 text-theme-accent border border-theme-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Havolalar */}
              <div className="flex gap-4">
                <a
                  href={project.link}
                  className="flex items-center gap-1.5 text-xs text-theme-accent hover:text-theme-text transition-colors font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {t('portfolio.demo')}
                </a>
                <a
                  href={project.github}
                  className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-theme-text transition-colors font-medium"
                >
                  <GitFork className="w-3.5 h-3.5" /> {t('portfolio.github')}
                </a>
              </div>
            </div>
          </Motion.div>
        ))}
      </Motion.div>
    </div>
  );
};

export default Portfolio;
