"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { content } from "@/lib/content";
import SamarthLogo from "@/components/shared/SamarthLogo";

export default function Footer() {
  const c = content.contact;
  const f = content.footer;
  const nav = content.nav;

  return (
    <footer className="bg-[#0a1628]">
      <div className="site-container pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <SamarthLogo className="w-9 h-9 [&_rect]:stroke-white [&_line]:stroke-white [&_path]:stroke-white [&_circle]:fill-white opacity-40" />
              <div className="leading-tight">
                <span className="block text-white font-semibold text-[15px]">Samarth Hospital</span>
                <span className="block text-white/15 text-[9px] tracking-[.18em] uppercase">Maternity Home</span>
              </div>
            </div>
            <p className="text-white/25 text-[14px] leading-[1.7] mt-4">{f.tagline}</p>
            <span className="inline-block mt-5 px-3 py-1.5 rounded-full bg-white/[.04] border border-white/[.06] text-white/30 text-[11px]">{f.badge}</span>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/20 text-[10px] font-semibold tracking-[.25em] uppercase mb-6">{f.quickLinks}</p>
            <ul className="space-y-3.5">
              {[{href:"/",label:nav.home},{href:"/services",label:nav.services},{href:"/about",label:nav.about},{href:"/appointment",label:nav.appointment}].map((l)=>(
                <li key={l.href}><Link href={l.href} className="text-white/35 text-[14px] hover:text-white transition-colors duration-300">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-white/20 text-[10px] font-semibold tracking-[.25em] uppercase mb-6">{f.opdHours}</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-white/15 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-white/25 text-[12px]">{f.monSat}</p>
                  <p className="text-white/50 text-[14px] mt-0.5">10:00 AM – 2:00 PM</p>
                  <p className="text-white/50 text-[14px]">5:00 PM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-white/15 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-white/25 text-[12px]">{f.sundayLabel}</p>
                  <p className="text-white/50 text-[14px] mt-0.5">{f.byAppointment}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/20 text-[10px] font-semibold tracking-[.25em] uppercase mb-6">{f.contactTitle}</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-white/15 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-white/35 text-[14px] leading-[1.7]">{c.address}</p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-white/15 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <a href="tel:8799918682" className="block text-white/50 text-[14px] hover:text-white transition-colors">{c.phone2}</a>
                  <a href="tel:02422295588" className="block text-white/25 text-[14px]">{c.phone1}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-white/15 flex-shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${c.email}`} className="text-white/35 text-[14px] break-all hover:text-white transition-colors">{c.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[.04] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/12 text-[12px]">{f.rights}</p>
          <p className="text-white/8 text-[12px]">{f.builtFor}</p>
        </div>
      </div>
    </footer>
  );
}
