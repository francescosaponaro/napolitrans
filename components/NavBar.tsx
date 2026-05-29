"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (href: string) =>
    `text-[#f4f4f4] font-medium transition-colors hover:opacity-90 ${
      pathname === href ? "underline underline-offset-4" : ""
    }`;

  const mobileLinkClasses = (href: string) =>
    `block w-full text-left px-6 py-4 text-lg font-medium text-[#f4f4f4] transition-colors hover:bg-[#B71C1C] ${
      pathname === href ? "bg-[#B71C1C]" : ""
    }`;

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#D32F2F] shadow-md flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center focus:outline-none"
          aria-label="Ricarica pagina"
        >
          <img
            src="/logo.png"
            alt="NapoliTrans"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkClasses("/")}>
            Rifornimento
          </Link>
          <Link href="/history" className={linkClasses("/history")}>
            Storico
          </Link>
          {/* <Link href="/scan-test" className={linkClasses("/scan-test")}>
            Test scanner
          </Link> */}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-[#f4f4f4] rounded-full transition-all duration-300 origin-center ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#f4f4f4] rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#f4f4f4] rounded-full transition-all duration-300 origin-center ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Sidebar panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] max-w-[80vw] bg-[#D32F2F] shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar header */}
          <div className="h-[60px] flex items-center px-4 border-b border-white/20">
            <img
              src="/logo.png"
              alt="NapoliTrans"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col pt-4">
            <Link href="/" className={mobileLinkClasses("/")} onClick={() => setIsOpen(false)}>
              Rifornimento
            </Link>
            <Link href="/history" className={mobileLinkClasses("/history")} onClick={() => setIsOpen(false)}>
              Storico
            </Link>
            {/* <Link href="/scan-test" className={mobileLinkClasses("/scan-test")} onClick={() => setIsOpen(false)}>
              Test scanner
            </Link> */}
          </nav>

          {/* Decorative bottom element */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="h-1 w-12 bg-[#f4f4f4]/30 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
