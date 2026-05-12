"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

export default function Footer() {
  const { translations: tr } = useLanguage();
  const c = tr.contact;

  return (
    <footer className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <SamarthLogo className="w-9 h-9 [&_rect]:stroke-white [&_line]:stroke-white [&_path]:stroke-white [&_circle]:fill-white opacity-70" />
              <div>
                <p className="text-white font-semibold text-[15px]">Samarth Hospital</p>
                <p className="text-white/30 text-[10px] tracking-widest uppercase">& Maternity Home</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mt-3">{tr.footer.tagline}</p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">
                Govt. Approved Sonography Center
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">{tr.footer.quickLinks}</p>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: tr.nav.home },
                { href: "/services", label: tr.nav.services },
                { href: "/about", label: tr.nav.about },
                { href: "/appointment", label: tr.nav.appointment },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">OPD Hours</p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Mon – Sat</p>
                  <p className="text-white/70 text-sm">10:00 AM – 2:00 PM</p>
                  <p className="text-white/70 text-sm">5:00 PM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Sunday</p>
                  <p className="text-white/70 text-sm">By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-white/50 text-sm leading-relaxed">{c.address}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white/30 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <a href="tel:8799918682" className="block text-white/70 text-sm hover:text-white transition-colors">{c.phone2}</a>
                  <a href="tel:02422295588" className="block text-white/40 text-sm hover:text-white/70 transition-colors">{c.phone1}</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/30 flex-shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${c.email}`} className="text-white/50 text-sm hover:text-white transition-colors break-all">{c.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">{tr.footer.rights}</p>
          <p className="text-white/15 text-xs">Built for the people of Rahata</p>
        </div>
      </div>
    </footer>
  );
}
