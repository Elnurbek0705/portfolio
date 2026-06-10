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

      {/* Asosiy kontent — pb-24 ni kamaytiramiz, chunki endi to'liq bottom bar yo'q */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden pb-8 md:pb-0">
        {children}
      </main>

      {/* Mobile: pastki nav */}
      <nav className="md:hidden fixed bottom-2 right-4 z-50 flex justify-end items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Sidebar mobile />
        </div>
      </nav>
    </div>
  );
};

export default Layout;

