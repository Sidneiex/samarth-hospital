"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

const navLinks = (labels: {
  home: string;
  services: string;
  about: string;
  appointment: string;
}) => [
  { href: "/", label: labels.home },
  { href: "/services", label: labels.services },
  { href: "/about", label: labels.about },
  { href: "/appointment", label: labels.appointment },
];

export default function Navbar() {
  const { lang, translations: tr, toggle } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = navLinks(tr.nav);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A1628]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[rgba(201,168,76,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <SamarthLogo className="w-10 h-10 flex-shrink-0" />
              <div>
                <p
                  className="font-[var(--font-playfair)] text-lg font-700 leading-tight text-white group-hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Samarth Hospital
                </p>
                <p className="text-[10px] text-[#C9A84C] tracking-widest uppercase leading-none">
                  & Maternity Home
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium tracking-wide transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-[#C9A84C] active"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.3)] text-xs font-medium text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200"
              >
                <span className={lang === "en" ? "font-semibold" : "text-gray-400"}>EN</span>
                <span className="text-gray-500">|</span>
                <span className={lang === "hi" ? "font-semibold" : "text-gray-400"}>HI</span>
              </button>

              {/* Phone quick-dial */}
              <a
                href="tel:8799918682"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C] text-[#0A1628] text-sm font-semibold hover:bg-[#D4B06A] transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                87999 18682
              </a>

              {/* Caduceus decoration top-right (doctors sign) */}
              <SamarthLogo className="w-8 h-8 opacity-40" />
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggle}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[rgba(201,168,76,0.3)] text-xs font-medium text-[#C9A84C]"
              >
                <span className={lang === "en" ? "font-semibold" : "opacity-50"}>EN</span>
                <span className="opacity-40">|</span>
                <span className={lang === "hi" ? "font-semibold" : "opacity-50"}>HI</span>
              </button>
              <button
                className="p-2 text-white"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "open" : ""} fixed top-0 right-0 bottom-0 w-72 z-40 bg-[#050E1A] border-l border-[rgba(201,168,76,0.15)] pt-24 px-6`}
      >
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-[rgba(201,168,76,0.12)] text-[#C9A84C]"
                  : "text-gray-300 hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 space-y-3">
          <a
            href="tel:8799918682"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C9A84C] text-[#0A1628] font-semibold"
          >
            <Phone className="w-4 h-4" />
            87999 18682
          </a>
          <a
            href="tel:02422295588"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[rgba(201,168,76,0.3)] text-[#C9A84C] font-medium text-sm"
          >
            <Phone className="w-4 h-4" />
            (02422) 295588
          </a>
        </div>

        {/* Decorative bottom */}
        <div className="absolute bottom-8 left-6 right-6 text-center">
          <SamarthLogo className="w-10 h-10 mx-auto opacity-20 mb-2" />
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            Samarth Hospital
          </p>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
