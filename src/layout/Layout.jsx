// layout/Layout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[auto_1fr]">
      {/* Desktop: chap yon sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0 items-center justify-center z-50">
        <Sidebar />
      </aside>

      {/* Kontent: mobileda pastki nav uchun joy qoldirish */}
      <main className="h-screen overflow-y-auto pb-24 md:pb-0">{children}</main>

      {/* Mobile: pastki navigation bg transparent gradient bilan */}
      <nav className="md:hidden fixed bottom-0 pb-2 left-0 right-0 z-50 flex justify-center bg-linear-to-t from-theme-bg/90 to-transparent backdrop-blur-[1px]">
        <Sidebar mobile />
      </nav>
    </div>
  );
};

export default Layout;
