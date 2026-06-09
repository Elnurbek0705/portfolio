import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, Code2, Info, Settings, Menu, X, Zap, ZapOff, Palette, Languages } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ThemePicker from "./ThemeSwitcher";
import PerformanceToggle from "./PerformanceToggle";
import LanguagePicker from "./LanguagePicker";
import Tooltip from "./Tooltip";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";

/* ── Mobile uchun alohida Settings panel ── */
const MobileSettingsPanel = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const { t } = useContext(LanguageContext);
  const { isHighPerf, setIsHighPerf, setTheme, theme: currentTheme } = useContext(ThemeContext);
  const { setLanguage, language: currentLang } = useContext(LanguageContext);

  // Tashqariga bosish — yopish
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!panelRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const themes = [
    { id: "light-steel",    color: "#adb5bd" },
    { id: "vivid-nightfall",color: "#9d4edd" },
    { id: "purple-cascade", color: "#a100f2" },
    { id: "fresh-greens",   color: "#52b788" },
    { id: "pink-ombre",     color: "#ff477e" },
  ];

  const langs = [
    { id: "uz", label: "UZ" },
    { id: "en", label: "EN" },
    { id: "ru", label: "RU" },
  ];

  return (
    <div ref={panelRef} className="relative flex items-center">
      {/* Asosiy Settings tugmasi */}
      <Tooltip text={t("nav.settings") || "Settings"} position="top">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`p-2.5 rounded-full transition-all duration-300 bg-theme-secondary border hover:shadow-lg active:scale-90 ${
            open
              ? "border-theme-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_20%,transparent)]"
              : "border-theme-muted"
          }`}
        >
          <Motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Settings className="w-5 h-5 text-theme-accent" />
          </Motion.div>
        </button>
      </Tooltip>

      {/* Chiqadigan panel — yuqoriga, vertikal */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute bottom-full right-0 mb-3 z-200
                       bg-theme-secondary/95 backdrop-blur-md
                       border border-theme-accent/30
                       rounded-2xl shadow-2xl
                       p-3 flex flex-col gap-3 min-w-45 "
          >
            {/* ─── Performance ─── */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-theme-muted font-medium">
                {isHighPerf ? t("perf.high") : t("perf.low")}
              </span>
              <button
                onClick={() => setIsHighPerf(!isHighPerf)}
                className={`p-1.5 rounded-full border transition-all active:scale-90 ${
                  isHighPerf
                    ? "border-theme-accent bg-theme-accent/10"
                    : "border-theme-muted bg-transparent"
                }`}
              >
                {isHighPerf ? (
                  <Zap className="w-4 h-4 text-theme-accent" />
                ) : (
                  <ZapOff className="w-4 h-4 text-theme-muted" />
                )}
              </button>
            </div>

            <div className="h-px bg-theme-accent/15" />

            {/* ─── Theme ─── */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-theme-muted font-medium flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Theme
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {themes.map((t_) => (
                  <button
                    key={t_.id}
                    onClick={() => setTheme(t_.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
                      currentTheme === t_.id
                        ? "border-theme-text scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: t_.color }}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-theme-accent/15" />

            {/* ─── Language ─── */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-theme-muted font-medium flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" /> Language
              </span>
              <div className="flex gap-1.5">
                {langs.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id)}
                    className={`px-2 py-0.5 rounded-md text-xs font-bold transition-all hover:scale-105 ${
                      currentLang === l.id
                        ? "bg-theme-accent text-theme-secondary"
                        : "text-theme-text hover:bg-theme-accent/10"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow — pastga yo'nalgan */}
            <div className="absolute top-full right-3 border-[6px] border-transparent border-t-theme-accent/30" />
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Asosiy Sidebar komponenti ── */
const Sidebar = ({ mobile = false }) => {
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { path: "/",          icon: <Home      className="w-6 h-6" />, label: t("nav.home") },
    { path: "/portfolio", icon: <Briefcase className="w-6 h-6" />, label: t("nav.portfolio") },
    { path: "/skills",    icon: <Code2     className="w-6 h-6" />, label: t("nav.skills") },
    { path: "/about",     icon: <Info      className="w-6 h-6" />, label: t("nav.about") },
  ];

  const navItems = menuItems.map((item) => {
    const isActive =
      location.pathname === item.path ||
      (item.path === "/" && location.pathname === "/home");

    return (
      <Tooltip key={item.path} text={item.label} position={mobile ? "top" : "right"}>
        <NavLink
          to={item.path}
          className={`relative ${mobile ? "p-2.5" : "p-3"} rounded-full transition-colors duration-300 z-20`}
        >
          {isActive && (
            <Motion.div
              layoutId={mobile ? "activePill-mobile" : "activePill"}
              className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <div
            className={`transition-transform duration-300 ${
              isActive
                ? "text-theme-secondary scale-110"
                : "text-theme-text opacity-70 hover:opacity-100"
            }`}
          >
            {item.icon}
          </div>
        </NavLink>
      </Tooltip>
    );
  });

  /* ── MOBILE ── */
  if (mobile) {
    return (
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {isExpanded && (
            <Motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              className="flex flex-row items-center gap-0.5 bg-theme-secondary/95 backdrop-blur-xl border border-theme-accent/30 rounded-full px-1.5 py-1 shadow-2xl"
            >
              {/* Nav links */}
              <nav className="flex flex-row gap-0.5 relative">{navItems}</nav>

              {/* Ajratuvchi chiziq */}
              <div className="w-px h-6 bg-theme-accent/20 mx-1" />

              {/* Birlashgan Settings tugmasi */}
              <MobileSettingsPanel />
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-4 rounded-full transition-all duration-500 shadow-2xl active:scale-90 flex items-center justify-center z-50 ${
            isExpanded 
              ? "bg-theme-secondary border border-theme-accent/30 text-theme-accent" 
              : "bg-theme-accent text-theme-bg animate-[menu-button-pulse_2s_infinite]"
          }`}
        >
          <AnimatePresence mode="wait">
            <Motion.div
              key={isExpanded ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              {isExpanded ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </Motion.div>
          </AnimatePresence>
        </button>
      </div>
    );
  }

  /* ── DESKTOP ── */
  return (
    <div className="w-18 bg-theme-secondary/80 flex flex-col items-center justify-center pb-8 pt-2 ml-4 border rounded-full border-theme-accent/20 backdrop-blur-md z-10">
      <div className="mb-4">
        <PerformanceToggle />
      </div>
      <div className="mb-5">
        <ThemePicker />
      </div>
      <div className="pb-3 border-b border-theme-accent/20">
        <LanguagePicker />
      </div>
      <nav className="flex flex-col gap-6 relative mt-3">{navItems}</nav>
    </div>
  );
};

export default Sidebar;