import React, { useContext, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageContext, LanguageProvider } from "./context/LanguageContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import About from "./pages/About";
import TitleBar from "./components/TitleBar";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
};

const titleMap = {
  "/":          "home",
  "/home":      "home",
  "/portfolio": "portfolio",
  "/skills":    "skills",
  "/about":     "about",
};

const TitleUpdater = () => {
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  useEffect(() => {
    const pageKey = titleMap[location.pathname] || "home";
    document.title = t(`pageTitles.${pageKey}`);
  }, [location.pathname, t]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/home"      element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/skills"    element={<Skills />} />
          <Route path="/about"     element={<About />} />
          <Route path="*" element={<div className="p-10 text-center">Sahifa topilmadi</div>} />
        </Routes>
      </Motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <TitleUpdater />

          {/*
            Yagona wrapper — bg-theme-bg shu yerda.
            aurora-bg ICHKARIDA, lekin z-index 0.
            app-container bg yo'q — transparent.
          */}
          <div
            className="app-container min-h-screen max-h-screen overflow-hidden relative w-full"
            style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}
          >
            {/* Aurora orqa fon — z-index 0, content z-index 10+ */}
            <div className="aurora-bg" aria-hidden="true">
              <div className="aurora-grid" />
              <div className="aurora-orb-1" />
              <div className="aurora-orb-2" />
              <div className="aurora-orb-3" />
              <div className="aurora-orb-4" />
            </div>

            {/* Custom titlebar */}
            <TitleBar />

            {/* Asosiy kontent — z-index 10 */}
            <div className="relative z-10 h-full max-h-screen overflow-hidden transition-colors duration-300">
              <Layout>
                <main className="p-4 w-full">
                  <AnimatedRoutes />
                </main>
              </Layout>
            </div>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;