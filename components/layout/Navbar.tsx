"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

export default function Navbar() {
  const { lang, translations: tr, toggle } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/services", label: tr.nav.services },
    { href: "/about", label: tr.nav.about },
    { href: "/appointment", label: tr.nav.appointment },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_#E2E8F0]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <SamarthLogo className="w-9 h-9 flex-shrink-0 [&_rect]:stroke-navy [&_line]:stroke-navy [&_path]:stroke-navy [&_circle]:fill-navy" />
              <div>
                <p className="text-navy font-bold text-[15px] leading-tight tracking-tight">
                  Samarth Hospital
                </p>
                <p className="text-[10px] text-navy/50 tracking-widest uppercase leading-none">
                  & Maternity Home
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium ${
                    pathname === link.href
                      ? "text-navy active"
                      : "text-slate-500 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggle}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-500 hover:border-navy hover:text-navy transition-all duration-200"
              >
                <span className={lang === "en" ? "text-navy font-semibold" : ""}>EN</span>
                <span className="mx-1 text-slate-300">|</span>
                <span className={lang === "hi" ? "text-navy font-semibold" : ""}>HI</span>
              </button>
              <a
                href="tel:8799918682"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy text-white text-sm font-medium hover:bg-navy-mid transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Appointment
              </a>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggle}
                className="px-2.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-500"
              >
                <span className={lang === "en" ? "text-navy font-semibold" : ""}>EN</span>
                <span className="mx-1 text-slate-300">|</span>
                <span className={lang === "hi" ? "text-navy font-semibold" : ""}>HI</span>
              </button>
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="p-1.5 text-navy"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""} fixed top-0 right-0 bottom-0 w-64 z-40 bg-white border-l border-slate-100 pt-20 px-5`}
      >
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-navy-light text-navy"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href="tel:8799918682"
          className="mt-5 flex items-center gap-2 px-4 py-3 rounded-lg bg-navy text-white font-medium text-sm"
        >
          <Phone className="w-4 h-4" />
          87999 18682
        </a>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
