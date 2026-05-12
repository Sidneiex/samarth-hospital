"use client";

import { useEffect, useRef } from "react";
import { Target, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

const staffMembers = [
  { initials: "VN", name: "Dr. Vikram A. Nalkar", role: "MS (Pune) · Surgeon & Medical Director" },
  { initials: "PD", name: "Dr. Priti Doshi", role: "MBBS, DGO (Gold Medal) · Gynecologist & Obstetrician" },
  { initials: "—", name: "Visiting Anesthetist", role: "Available for all surgical procedures" },
  { initials: "—", name: "Visiting Surgeons", role: "Specialist surgeons on call as required" },
  { initials: "—", name: "Lab Technician", role: "In-house pathology lab" },
  { initials: "—", name: "Medical Store Staff", role: "In-house pharmacy · 2 staff" },
];

export default function AboutPage() {
  const { translations: tr } = useLanguage();
  const ap = tr.about_page;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".about-hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
        gsap.fromTo(".story-para", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".story-section", start: "top 82%" } });
        gsap.fromTo(".mission-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".mission-row", start: "top 84%" } });
        gsap.fromTo(".staff-card", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ".staff-grid", start: "top 84%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Header */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-hero-text">
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4">{ap.heading}</h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">{ap.subheading}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
            <div className="lg:col-span-3 space-y-5">
              {ap.story.map((para, i) => (
                <p key={i} className="story-para text-slate-600 text-[17px] leading-[1.8]">{para}</p>
              ))}
            </div>
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="img-placeholder w-full rounded-2xl mb-5" style={{ aspectRatio: "3/4" }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-slate-400 mt-2">Hospital photo</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <SamarthLogo className="w-8 h-8 [&_rect]:stroke-navy [&_line]:stroke-navy [&_path]:stroke-navy [&_circle]:fill-navy" />
                  <div>
                    <p className="text-navy font-semibold text-sm">Samarth Hospital</p>
                    <p className="text-slate-400 text-xs">Est. 2007</p>
                  </div>
                </div>
                {[["Founded", "2007"], ["Beds", "30"], ["Specialists", "2 Senior Doctors"], ["Certification", "Govt. Approved Sonography"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-navy font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-10">What We Stand For</p>
          <div className="mission-row grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {[
              { icon: Target, title: "Our Mission", text: ap.mission },
              { icon: Eye, title: "Our Vision", text: ap.vision },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="mission-card p-8 rounded-2xl bg-white border border-slate-100">
                  <Icon className="w-5 h-5 text-navy mb-4" strokeWidth={1.75} />
                  <h3 className="text-navy font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-base leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-3">Our People</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-10">The Team</h2>
          <div className="staff-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffMembers.map((m, i) => (
              <div key={i} className="staff-card flex items-start gap-4 p-5 rounded-xl border border-slate-100 hover:border-navy/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center flex-shrink-0">
                  <span className="text-navy text-sm font-bold">{m.initials}</span>
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">{m.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-xs mt-6">* Staff photos will be added once provided.</p>
        </div>
      </section>
    </div>
  );
}
