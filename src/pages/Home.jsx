import React, { useState, useEffect, useContext } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const Home = () => {
  const { t } = useContext(LanguageContext);
  const roles = t('home.roles');
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles || !roles[roleIdx]) return;
    const current = roles[roleIdx];

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }, 0);
      return () => clearTimeout(t);
    }

    const next = deleting ? charIdx - 1 : charIdx + 1;
    const t = setTimeout(
      () => {
        setText(current.slice(0, next));
        setCharIdx(next);
      },
      deleting ? 40 : 80,
    );

    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx, roles]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-theme-secondary/60 backdrop-blur-sm rounded-3xl p-10 md:p-14 text-center border border-theme-accent/15 shadow-2xl"
      >
        {/* Avatar */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-linear-to-br from-theme-accent/30 to-theme-secondary border-2 border-theme-accent/40 flex items-center justify-center overflow-hidden shadow-[0_0_32px_rgba(0,0,0,0.4)]">
              <svg
                className="w-16 h-16 text-theme-accent/50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-theme-secondary shadow" />
          </div>
        </Motion.div>

        {/* Name */}
        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold text-theme-text mb-4"
        >
          {t('home.greeting')} <span className="text-theme-accent bold-font">Elnurbek</span>
        </Motion.h1>

        {/* Typewriter */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="cutive-mono text-xl md:text-2xl text-theme-muted mb-6 h-9 flex items-center justify-center"
        >
          <span>{t('home.im')}&nbsp;</span>
          <span className="text-theme-accent">{text}</span>
          <span className="text-theme-accent font-thin animate-pulse">|</span>
        </Motion.div>

        {/* Description */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-theme-muted text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
        >
          {t('home.desc')}
        </Motion.p>

        {/* Buttons */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            to="/portfolio"
            className="flex items-center gap-2 px-7 py-3 bg-theme-accent text-theme-bg font-semibold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            {t('home.viewWork')} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/cv.pdf"
            className="flex items-center gap-2 px-7 py-3 border border-theme-accent/50 text-theme-text font-semibold rounded-full hover:bg-theme-accent/10 active:scale-95 transition-all"
          >
            {t('home.downloadCV')} <Download className="w-4 h-4" />
          </a>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default Home;
