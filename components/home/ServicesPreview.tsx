"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Baby, Stethoscope, Syringe, ScanLine, FlaskConical, Heart, ShieldCheck, Pill, ArrowRight } from "lucide-react";
import { content } from "@/lib/content";

const icons: Record<string, React.ElementType> = {
  baby: Baby, stethoscope: Stethoscope, scalpel: Syringe, scan: ScanLine,
  flask: FlaskConical, heart: Heart, shield: ShieldCheck, pill: Pill,
};

export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".sp-head", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".sp-head", start: "top 88%" }
        });
        gsap.fromTo(".sp-card", { opacity: 0, y: 30, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: ".sp-grid", start: "top 85%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="site-container">
        <div className="sp-head flex items-end justify-between mb-14">
          <h2 className="text-2xl sm:text-[2rem] font-bold tracking-tight">{content.services.heading}</h2>
          <Link href="/services" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#0a1628]/40 hover:text-[#0a1628] transition-colors group">
            {content.services.viewAll} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="sp-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.services.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Heart;
            return (
              <div key={i} className="sp-card prem-card p-7">
                <div className="w-11 h-11 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center mb-5 group-hover:bg-[#0a1628] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#0a1628]/70" strokeWidth={1.6} />
                </div>
                <h3 className="font-semibold text-[15px] mb-2 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-[13px] leading-[1.7]">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <Link href="/services" className="sm:hidden mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-[#0a1628]">
          {content.services.viewAll} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
