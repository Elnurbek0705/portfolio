import React, { useContext, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion} from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import ThemePicker from "./components/ThemeSwitcher";
import { LanguageProvider } from "./context/LanguageContext";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
};

const titleMap = {
  "/": "home",
  "/home": "home",
  "/portfolio": "portfolio",
  "/skills": "skills",
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
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/skills" element={<Skills />} />
          <Route
            path="*"
            element={<div className="p-10 text-center">Sahifa topilmadi</div>}
          />
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
        <div className="app-container min-h-screen bg-theme-bg text-theme-text transition-colors duration-300 max-h-screen overflow-hidden relative w-full">
          <Layout>
            <main className="p-4 z-10 relative w-full">
              <AnimatedRoutes />
            </main>
          </Layout>
        </div>
      </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
