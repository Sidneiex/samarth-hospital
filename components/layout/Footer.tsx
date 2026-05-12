"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

export default function Footer() {
  const { translations: tr } = useLanguage();
  const c = tr.contact;
  const opd = tr.opd;

  return (
    <footer className="bg-[#050E1A] border-t border-[rgba(201,168,76,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SamarthLogo className="w-10 h-10" />
              <div>
                <p
                  className="text-white font-semibold text-base"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Samarth Hospital
                </p>
                <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase">
                  & Maternity Home
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              {tr.footer.tagline}
            </p>
            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.25)] text-[#C9A84C] text-xs">
                🏛 Govt. Approved Sonography Center
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {tr.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: tr.nav.home },
                { href: "/services", label: tr.nav.services },
                { href: "/about", label: tr.nav.about },
                { href: "/appointment", label: tr.nav.appointment },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OPD Timings */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {opd.heading}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wide mb-0.5">
                    {opd.days}
                  </p>
                  <p className="text-white text-sm">{opd.morningTime}</p>
                  <p className="text-white text-sm">{opd.eveningTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wide mb-0.5">
                    {opd.sunday}
                  </p>
                  <p className="text-[#C9A84C] text-sm">{opd.sundayNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {tr.footer.contact}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">{c.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <div>
                  <a
                    href={`tel:${c.phone2.replace(/\s/g, "")}`}
                    className="block text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    {c.phone2}
                  </a>
                  <a
                    href={`tel:${c.phone1.replace(/[()]/g, "").replace(/\s/g, "")}`}
                    className="block text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    {c.phone1}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <a
                  href={`mailto:${c.email}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors break-all"
                >
                  {c.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{tr.footer.rights}</p>
          <p className="text-gray-600 text-xs">
            Built with care for the people of Rahata
          </p>
        </div>
      </div>
    </footer>
  );
}
