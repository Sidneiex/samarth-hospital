"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { content } from "@/lib/content";
import SamarthLogo from "@/components/shared/SamarthLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/", label: content.nav.home },
    { href: "/services", label: content.nav.services },
    { href: "/about", label: content.nav.about },
    { href: "/appointment", label: content.nav.appointment },
  ];

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,.05)]" : "bg-white"}`}>
        <div className="site-container flex items-center justify-between h-20">
          {/* Logo — generous gap */}
          <Link href="/" className="flex items-center gap-3">
            <SamarthLogo className="w-9 h-9 [&_rect]:stroke-[#0a1628] [&_line]:stroke-[#0a1628] [&_path]:stroke-[#0a1628] [&_circle]:fill-[#0a1628]" />
            <div className="leading-tight">
              <span className="block text-[15px] font-bold tracking-tight">Samarth Hospital</span>
              <span className="block text-[9px] text-[#0a1628]/35 tracking-[.18em] uppercase">Maternity Home</span>
            </div>
          </Link>

          {/* Desktop nav — wider gaps */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={`nav-link text-[13px] font-medium tracking-wide transition-colors ${
                  pathname === l.href ? "text-[#0a1628] active" : "text-[#0a1628]/35 hover:text-[#0a1628]"
                }`}
              >{l.label}</Link>
            ))}
          </div>

          {/* CTA */}
          <Link href="/appointment"
            className="hidden md:flex items-center gap-2 text-[13px] font-semibold bg-[#0a1628] text-white pl-5 pr-6 py-2.5 rounded-full hover:bg-[#152244] transition-colors"
          ><Phone className="w-3.5 h-3.5" /> {content.nav.bookNow}</Link>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-[#0a1628]" aria-label="menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${open ? "open" : ""} fixed top-0 right-0 bottom-0 w-72 z-40 bg-white pt-24 px-7`}>
        <div className="space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`block px-4 py-3.5 rounded-xl text-[15px] font-medium ${
                pathname === l.href ? "bg-[#0a1628]/[.04] text-[#0a1628]" : "text-gray-400 hover:bg-gray-50"
              }`}
            >{l.label}</Link>
          ))}
        </div>
        <Link href="/appointment" className="mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#0a1628] text-white text-[15px] font-semibold">
          <Phone className="w-4 h-4" /> {content.nav.bookNow}
        </Link>
      </div>
      {open && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}
