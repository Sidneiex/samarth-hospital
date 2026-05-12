"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Star, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorsSection() {
  const { translations: tr } = useLanguage();
  const docs = tr.doctors;
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
          ".doc-heading",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".doc-heading", start: "top 85%" },
          }
        );

        gsap.fromTo(
          ".doc-card-1",
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".doc-cards", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".doc-card-2",
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".doc-cards", start: "top 80%" },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  const doctors = [docs.dr1, docs.dr2] as const;

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0A1628] relative overflow-hidden"
    >
      {/* Grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="doc-heading text-center mb-16">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
            Our Specialists
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {docs.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {docs.subheading}
          </p>
        </div>

        {/* Doctor cards */}
        <div className="doc-cards grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Dr. Vikram */}
          <div className="doc-card-1 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0E2040] to-[#050E1A] border border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.4)] transition-all duration-500 p-8">
            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[rgba(201,168,76,0.15)] to-transparent" />
            </div>

            {/* Avatar placeholder */}
            <div className="relative w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.12)] border-2 border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-6 overflow-hidden">
              <span
                className="text-3xl font-bold text-[#C9A84C]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                VN
              </span>
              {/* Photo placeholder note */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(10,22,40,0.7)] flex items-center justify-center">
                <p className="text-[#C9A84C] text-[9px] text-center px-2">Photo coming soon</p>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className="text-white text-xl font-bold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {docs.dr1.name}
                  </h3>
                  <p className="text-[#C9A84C] text-sm font-medium mt-0.5">
                    {docs.dr1.qualification}
                  </p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm mt-1">{docs.dr1.specialty}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A84C]" />
                  {docs.dr1.experience}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  {docs.dr1.reg}
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mt-4 border-t border-[rgba(201,168,76,0.1)] pt-4">
                {docs.dr1.bio}
              </p>

              <a
                href="tel:8799918682"
                className="mt-5 inline-flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Appointment
              </a>
            </div>
          </div>

          {/* Dr. Priti */}
          <div className="doc-card-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0E2040] to-[#050E1A] border border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.4)] transition-all duration-500 p-8">
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[rgba(201,168,76,0.15)] to-transparent" />
            </div>

            <div className="relative w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.12)] border-2 border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-6 overflow-hidden">
              <span
                className="text-3xl font-bold text-[#C9A84C]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                PD
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[rgba(10,22,40,0.7)] flex items-center justify-center">
                <p className="text-[#C9A84C] text-[9px] text-center px-2">Photo coming soon</p>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className="text-white text-xl font-bold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {docs.dr2.name}
                  </h3>
                  <p className="text-[#C9A84C] text-sm font-medium mt-0.5">
                    {docs.dr2.qualification}
                  </p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm mt-1">{docs.dr2.specialty}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A84C]" />
                  {docs.dr2.experience}
                </div>
                {"fellowship" in docs.dr2 && (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C9A84C]" />
                    {(docs.dr2 as typeof docs.dr2 & { fellowship: string }).fellowship}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  {docs.dr2.reg}
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mt-4 border-t border-[rgba(201,168,76,0.1)] pt-4">
                {docs.dr2.bio}
              </p>

              <a
                href="tel:8799918682"
                className="mt-5 inline-flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Appointment
              </a>
            </div>
          </div>
        </div>

        {/* External doctors note */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-[rgba(14,32,64,0.4)] border border-[rgba(201,168,76,0.1)] text-center">
            <p className="text-gray-400 text-sm">
              <span className="text-[#C9A84C] font-medium">Visiting Specialists</span> — Anesthetist and surgical specialists visit regularly for planned procedures. Details shared at time of consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
