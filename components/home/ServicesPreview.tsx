"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Baby, Stethoscope, Syringe, ScanLine, FlaskConical, Heart, ShieldCheck, Pill, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons: Record<string, React.ElementType> = {
  baby: Baby, stethoscope: Stethoscope, scalpel: Syringe, scan: ScanLine,
  flask: FlaskConical, heart: Heart, shield: ShieldCheck, pill: Pill,
};

export default function ServicesPreview() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".svc-heading", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".svc-heading", start: "top 88%" } });
        gsap.fromTo(".svc-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ".svc-grid", start: "top 82%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="svc-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">{tr.services.heading}</h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:gap-2.5 transition-all duration-200 group whitespace-nowrap">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tr.services.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Heart;
            return (
              <div key={i} className="svc-card card-hover p-6 rounded-xl border border-slate-100 bg-white">
                <div className="w-10 h-10 rounded-lg bg-navy-light flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-navy" strokeWidth={1.75} />
                </div>
                <h3 className="text-navy font-semibold text-[15px] mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
