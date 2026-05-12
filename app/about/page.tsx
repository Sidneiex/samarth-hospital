"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Star, Target, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SamarthLogo from "@/components/shared/SamarthLogo";

const staffMembers = [
  { initials: "VN", name: "Dr. Vikram A. Nalkar", role: "MS (Pune) · Surgeon & Medical Director" },
  { initials: "PD", name: "Dr. Priti Doshi", role: "MBBS, DGO (Gold Medal) · Gynecologist & Obstetrician" },
  { initials: "—", name: "Visiting Anesthetist", role: "OT Specialist · Available for all surgical procedures" },
  { initials: "—", name: "Visiting Surgeons", role: "Specialist surgeons on call for specific procedures" },
  { initials: "—", name: "Lab Technician", role: "Pathology Lab · Blood & diagnostic testing" },
  { initials: "—", name: "Medical Store Staff", role: "Pharmacy · Medications & consumables (2 staff)" },
];

export default function AboutPage() {
  const { translations: tr } = useLanguage();
  const ap = tr.about_page;
  const pageRef = useRef<HTMLDivElement>(null);

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
          ".about-hero-text",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        );

        gsap.fromTo(
          ".story-para",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".story-section", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".mission-card",
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".mission-section", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".staff-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".staff-grid", start: "top 80%" },
          }
        );
      }, pageRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-gradient-to-b from-[#050E1A] to-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.05] hidden lg:block">
          <SamarthLogo className="w-64 h-64" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-hero-text max-w-3xl">
            <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-4">
              Our Story
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {ap.heading}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              {ap.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story-section py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              {ap.story.map((para, i) => (
                <p key={i} className="story-para text-gray-300 text-lg leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-3xl bg-gradient-to-br from-[#0E2040] to-[#050E1A] border border-[rgba(201,168,76,0.2)] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <SamarthLogo className="w-14 h-14" />
                  <div>
                    <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                      Samarth Hospital
                    </p>
                    <p className="text-[#C9A84C] text-xs tracking-widest uppercase">Est. 2007</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Founded", "2007, Kolhar Budruk, Rahata"],
                    ["Specialists", "2 Senior Doctors"],
                    ["Capacity", "30 Beds"],
                    ["Services", "12+ Medical Services"],
                    ["Certification", "Govt. Approved Sonography"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start gap-3 text-sm">
                      <span className="text-[#C9A84C] font-medium w-28 flex-shrink-0">{label}</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section py-20 bg-[#050E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-10 text-center">
            What We Stand For
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="mission-card p-8 rounded-3xl bg-[#0E2040] border border-[rgba(201,168,76,0.15)]">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Mission
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">{ap.mission}</p>
            </div>
            <div className="mission-card p-8 rounded-3xl bg-[#0E2040] border border-[rgba(201,168,76,0.15)]">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Vision
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">{ap.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
              Our People
            </p>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Team Behind Samarth
            </h2>
          </div>

          <div className="staff-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {staffMembers.map((member, i) => (
              <div
                key={i}
                className="staff-card flex items-start gap-4 p-5 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-[#C9A84C] text-sm font-bold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {member.initials}
                  </span>
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-sm group-hover:text-[#C9A84C] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {member.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{member.role}</p>
                  {i < 2 && (
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-2.5 h-2.5 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-xs mt-8">
            * Staff photos will be added once provided.
          </p>
        </div>
      </section>

      {/* Credentials banner */}
      <section className="py-16 bg-[#050E1A] border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, label: "Reg. No.", value: "I-45257-A-I", note: "Dr. Vikram Nalkar" },
              { icon: GraduationCap, label: "Reg. No.", value: "698/02/2001", note: "Dr. Priti Doshi" },
              { icon: Star, label: "Accreditation", value: "Gold Medal", note: "DGO — Dr. Priti Doshi" },
              { icon: Star, label: "Certification", value: "Govt. Approved", note: "Garbhapat & Sonography" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.1)]">
                  <Icon className="w-5 h-5 text-[#C9A84C] mb-2" />
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">{item.label}</p>
                  <p className="text-white font-semibold text-sm mt-0.5" style={{ fontFamily: "var(--font-playfair)" }}>{item.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
