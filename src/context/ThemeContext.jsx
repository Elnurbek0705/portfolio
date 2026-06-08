/* eslint-disable react-refresh/only-export-components */
// ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-steel');

  const [isHighPerf, setIsHighPerf] = useState(() => {
    return localStorage.getItem('perf-mode') === 'high';
  });

  useEffect(() => {
    // Atributni butun hujjatga (html/body) qo'llaymiz
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-perf', isHighPerf ? 'high' : 'low');
    localStorage.setItem('perf-mode', isHighPerf ? 'high' : 'low');
  }, [isHighPerf]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isHighPerf, setIsHighPerf }}>
      {children}
    </ThemeContext.Provider>
  );
};
