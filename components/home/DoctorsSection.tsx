"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorsSection() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".doc-card", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".doc-grid", start: "top 82%" } });
        gsap.fromTo(".doc-heading", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".doc-heading", start: "top 88%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const docs = tr.doctors;

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="doc-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">Our Specialists</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">{docs.heading}</h2>
          </div>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:gap-2.5 transition-all duration-200 group whitespace-nowrap">
            Full team <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="doc-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dr. Vikram */}
          <div className="doc-card flex flex-col sm:flex-row gap-6 p-7 rounded-2xl border border-slate-100 bg-white card-hover">
            <div className="img-placeholder w-full sm:w-28 h-40 sm:h-28 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-navy/40 font-semibold uppercase tracking-widest mb-1.5">Surgeon & Medical Director</p>
              <h3 className="text-navy font-bold text-xl">{docs.dr1.name}</h3>
              <p className="text-slate-500 text-sm mt-0.5">{docs.dr1.qualification}</p>
              <p className="text-slate-400 text-xs mt-0.5 mb-3">{docs.dr1.reg}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{docs.dr1.experience}</p>
            </div>
          </div>

          {/* Dr. Priti */}
          <div className="doc-card flex flex-col sm:flex-row gap-6 p-7 rounded-2xl border border-slate-100 bg-white card-hover">
            <div className="img-placeholder w-full sm:w-28 h-40 sm:h-28 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-navy/40 font-semibold uppercase tracking-widest mb-1.5">Gynecologist & Obstetrician</p>
              <h3 className="text-navy font-bold text-xl">{docs.dr2.name}</h3>
              <p className="text-slate-500 text-sm mt-0.5">{docs.dr2.qualification}</p>
              <p className="text-slate-400 text-xs mt-0.5 mb-3">{docs.dr2.reg}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{docs.dr2.experience}</p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-slate-400 text-sm">
          Visiting specialists (anesthetist + surgical consultants) available for planned procedures.
        </p>
      </div>
    </section>
  );
}
