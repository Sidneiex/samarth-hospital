"use client";

import { useEffect, useRef } from "react";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OPDTimings() {
  const { translations: tr } = useLanguage();
  const opd = tr.opd;
  const c = tr.contact;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".opd-left",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".opd-row", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".opd-right",
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".opd-row", start: "top 80%" },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0A1628] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="opd-row grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* OPD Timings card */}
          <div className="opd-left rounded-3xl bg-gradient-to-br from-[#0E2040] to-[#050E1A] border border-[rgba(201,168,76,0.2)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.15)] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <h3
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {opd.heading}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Mon-Sat */}
              <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.1)]">
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-2">
                  {opd.days}
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{opd.morning}</span>
                    <span className="text-white font-semibold text-sm">{opd.morningTime}</span>
                  </div>
                  <div className="h-px bg-[rgba(255,255,255,0.06)]" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{opd.evening}</span>
                    <span className="text-white font-semibold text-sm">{opd.eveningTime}</span>
                  </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{opd.sunday}</span>
                  <span className="text-[#C9A84C] font-medium text-sm">{opd.sundayNote}</span>
                </div>
              </div>
            </div>

            {/* Emergency note */}
            <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              For emergencies, call any time: <a href="tel:8799918682" className="text-[#C9A84C] font-medium">87999 18682</a>
            </div>
          </div>

          {/* Contact details card */}
          <div className="opd-right space-y-4">
            <div className="p-6 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.12)]">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Address</p>
                  <p className="text-white text-sm leading-relaxed">{c.address}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.12)]">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:8799918682" className="block text-white text-sm hover:text-[#C9A84C] transition-colors font-medium">{c.phone2}</a>
                  <a href="tel:02422295588" className="block text-gray-300 text-sm hover:text-white transition-colors">{c.phone1}</a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.12)]">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${c.email}`} className="text-white text-sm hover:text-[#C9A84C] transition-colors break-all">
                    {c.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
