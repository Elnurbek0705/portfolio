import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Briefcase, Code2 } from "lucide-react";
import { motion as Motion } from "framer-motion";
import ThemePicker from "./ThemeSwitcher";
import PerformanceToggle from "./PerformanceToggle";
import LanguagePicker from "./LanguagePicker";
import Tooltip from "./Tooltip";
import { LanguageContext } from "../context/LanguageContext";

const Sidebar = ({ mobile = false }) => {
  const location = useLocation();
  const { t } = useContext(LanguageContext);

  const menuItems = [
    { path: "/", icon: <Home className="w-6 h-6" />, label: t('nav.home') },
    { path: "/portfolio", icon: <Briefcase className="w-6 h-6" />, label: t('nav.portfolio') },
    { path: "/skills", icon: <Code2 className="w-6 h-6" />, label: t('nav.skills') },
  ];

  const navItems = menuItems.map((item) => {
    const isActive =
      location.pathname === item.path || (item.path === "/" && location.pathname === "/home");

    return (
      <Tooltip key={item.path} text={item.label} position={mobile ? "top" : "right"}>
        <NavLink
          to={item.path}
          className={`relative ${mobile ? 'p-2.5' : 'p-3'} rounded-full transition-colors duration-300 z-20`}
        >
          {isActive && (
            <Motion.div
              layoutId={mobile ? "activePill-mobile" : "activePill"}
              className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <div
            className={`transition-transform duration-300 ${isActive ? "text-theme-secondary scale-110" : "text-theme-text opacity-70 hover:opacity-100"}`}
          >
            {item.icon}
          </div>
        </NavLink>
      </Tooltip>
    );
  });

  if (mobile) {
    return (
      <div className="flex flex-row items-center gap-0.5 bg-theme-secondary/85 backdrop-blur-md border border-theme-accent/20 rounded-full px-1.5 py-1 shadow-xl w-fit mx-auto">
        <div className="mr-1.5 pr-1.5 border-r border-theme-accent/20">
          <PerformanceToggle mobile />
        </div>
        <nav className="flex flex-row gap-0.5 relative">{navItems}</nav>
        <div className="ml-1.5 pl-1.5 border-l border-theme-accent/20">
          <ThemePicker mobile />
        </div>
        <div className="ml-0.5 pl-0.5">
          <LanguagePicker mobile />
        </div>
      </div>
    );
  }

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
