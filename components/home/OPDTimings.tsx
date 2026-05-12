"use client";

import { useEffect, useRef } from "react";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OPDTimings() {
  const { translations: tr } = useLanguage();
  const opd = tr.opd;
  const c = tr.contact;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".opd-col", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".opd-row", start: "top 82%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">Visit Us</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">OPD Timings & Contact</h2>
        </div>

        <div className="opd-row grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timings */}
          <div className="opd-col lg:col-span-1 p-7 rounded-2xl border border-slate-100 bg-white">
            <div className="flex items-center gap-2.5 mb-6">
              <Clock className="w-5 h-5 text-navy" strokeWidth={1.75} />
              <p className="text-navy font-semibold text-lg">{opd.heading}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-navy/40 font-semibold uppercase tracking-wider mb-2.5">{opd.days}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{opd.morning}</span>
                    <span className="text-navy font-medium">{opd.morningTime}</span>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{opd.evening}</span>
                    <span className="text-navy font-medium">{opd.eveningTime}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{opd.sunday}</span>
                  <span className="text-navy font-medium">{opd.sundayNote}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Emergencies: call any time
            </div>
          </div>

          {/* Contact details */}
          <div className="opd-col lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-slate-100 flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-navy mt-0.5 flex-shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-xs text-navy/40 font-semibold uppercase tracking-wider mb-1.5">Address</p>
                <p className="text-slate-600 text-sm leading-relaxed">{c.address}</p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 flex items-start gap-3">
              <Phone className="w-4.5 h-4.5 text-navy mt-0.5 flex-shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-xs text-navy/40 font-semibold uppercase tracking-wider mb-1.5">Phone</p>
                <a href="tel:8799918682" className="block text-navy font-semibold text-sm hover:underline">{c.phone2}</a>
                <a href="tel:02422295588" className="block text-slate-400 text-sm hover:text-navy transition-colors mt-0.5">{c.phone1}</a>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-navy mt-0.5 flex-shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-xs text-navy/40 font-semibold uppercase tracking-wider mb-1.5">Email</p>
                <a href={`mailto:${c.email}`} className="text-slate-600 text-sm hover:text-navy transition-colors break-all">{c.email}</a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-navy-light border border-navy/10 flex flex-col justify-center">
              <p className="text-navy font-semibold text-base mb-1">Need help?</p>
              <p className="text-navy/60 text-sm mb-4">Our team responds quickly during OPD hours.</p>
              <a href="tel:8799918682" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline">
                <Phone className="w-4 h-4" />
                87999 18682
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
