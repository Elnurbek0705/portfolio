// layout/Layout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    // min-h-screen o'rniga h-screen, overflow hidden — faqat main scroll qiladi
    <div className="flex h-screen overflow-hidden md:flex-row flex-col">

      {/* Desktop: chap sidebar — fixed height, no scroll */}
      <aside className="hidden md:flex h-screen shrink-0 items-center justify-center z-50">
        <Sidebar />
      </aside>

      {/* Asosiy kontent — faqat shu joy scroll qiladi */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile: pastki nav */}
      <nav className="md:hidden fixed bottom-0 pb-2 left-0 right-0 z-50 flex justify-center bg-linear-to-t from-theme-bg/90 to-transparent backdrop-blur-[1px]">
        <Sidebar mobile />
      </nav>
    </div>
  );
};

export default Layout;