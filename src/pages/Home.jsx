import React, { useState, useEffect, useContext } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";

// Har bir theme uchun mos avatar rasmlarni import qilish
import lightSteelAvatar from "../assets/avatars/light-steel-avatar.png";
import vividNightfallAvatar from "../assets/avatars/vivid-nightfall-avatar.png";
import purpleCascadeAvatar from "../assets/avatars/purple-cascade-avatar.png";
import freshGreensAvatar from "../assets/avatars/fresh-greens-avatar.png";
import pinkOmbreAvatar from "../assets/avatars/pink-ombre-avatar.png";

const Home = () => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const roles = t("home.roles");
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const avatarMap = {
    "light-steel": lightSteelAvatar,
    "vivid-nightfall": vividNightfallAvatar,
    "purple-cascade": purpleCascadeAvatar,
    "fresh-greens": freshGreensAvatar,
    "pink-ombre": pinkOmbreAvatar,
  };

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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-2 md:p-4">
      <Motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-theme-secondary/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 text-center border border-theme-accent/15 shadow-2xl"
      >
        {/* Avatar */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          {/* 1. O'rab turuvchi div-ga rasm bilan bir xil o'lchamlarni beramiz */}
          <div className="relative w-58 h-58 md:w-64 md:h-64">
            {/* 2. Rasm joylashgan blok endi otasining o'lchamini (w-full h-full) toliq oladi */}
            <div className="w-full h-full rounded-full bg-linear-to-br from-theme-accent/30 to-theme-secondary border-2 border-theme-accent/40 flex items-center justify-center overflow-hidden shadow-[0_0_32px_rgba(0,0,0,0.4)]">
              <img
                src={avatarMap[theme] || lightSteelAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-5 right-5 w-4 h-4 md:bottom-4 md:right-4 md:w-6 md:h-6 bg-emerald-400 rounded-full border-2 border-theme-secondary shadow-md z-10" />
          </div>
        </Motion.div>

        {/* Name */}
        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl font-bold text-theme-text mb-4"
        >
          {t("home.greeting")} <span className="text-theme-accent bold-font">Elnurbek</span>
        </Motion.h1>

        {/* Typewriter */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="cutive-mono text-xl md:text-2xl text-theme-muted mb-6 h-9 flex items-center justify-center"
        >
          <span>{t("home.im")}&nbsp;</span>
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
          {t("home.desc")}
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
            {t("home.viewWork")} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/cv.pdf"
            className="flex items-center gap-2 px-7 py-3 border border-theme-accent/50 text-theme-text font-semibold rounded-full hover:bg-theme-accent/10 active:scale-95 transition-all"
          >
            {t("home.downloadCV")} <Download className="w-4 h-4" />
          </a>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default Home;
