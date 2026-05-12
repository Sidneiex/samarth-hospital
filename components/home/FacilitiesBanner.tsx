"use client";

import { useEffect, useRef } from "react";
import { BedDouble, Microscope, Zap, Activity } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const facilities = [
  {
    icon: BedDouble,
    title: "30-Bed Facility",
    desc: "A fully staffed inpatient ward with round-the-clock nursing care for post-surgical and maternity patients.",
  },
  {
    icon: Zap,
    title: "Modern Operation Theatre",
    desc: "A sterile, fully equipped OT with backup power and an experienced surgical team.",
  },
  {
    icon: Microscope,
    title: "In-House Pathology Lab",
    desc: "Same-day results for routine blood, urine, and diagnostic panels — no need to leave the premises.",
  },
  {
    icon: Activity,
    title: "Govt. Sonography Center",
    desc: "Government-approved ultrasound facility for prenatal scans, abdominal imaging, and gynecological assessments.",
  },
];

export default function FacilitiesBanner() {
  const { lang } = useLanguage();
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
          ".fac-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".fac-grid", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".fac-heading",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".fac-heading", start: "top 85%" },
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
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0E2040 0%, #0A1628 100%)",
      }}
    >
      {/* Diagonal stripe */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,168,76,0.5) 30px, rgba(201,168,76,0.5) 31px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fac-heading text-center mb-14">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
            Infrastructure
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {lang === "hi" ? "हमारी सुविधाएं" : "Our Facilities"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {lang === "hi"
              ? "30 बेड की अस्पताल, आधुनिक ऑपरेशन थियेटर और डायग्नोस्टिक सेवाएं — सब कुछ एक ही जगह।"
              : "A 30-bed hospital with a modern operation theatre, diagnostic lab, and sonography center — all within one campus."}
          </p>
        </div>

        <div className="fac-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((fac, i) => {
            const Icon = fac.icon;
            return (
              <div
                key={i}
                className="fac-card group p-6 rounded-2xl bg-[rgba(5,14,26,0.7)] border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.4)] transition-all duration-400 relative overflow-hidden"
              >
                {/* Top shimmer on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />

                <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3
                  className="text-white font-semibold text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {fac.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 p-7 rounded-3xl bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.2)]">
          <div>
            <p
              className="text-white font-bold text-xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Need to visit us?
            </p>
            <p className="text-gray-400 text-sm mt-0.5">
              Book an appointment or call — we'll guide you from there.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/appointment"
              className="px-6 py-3 rounded-full bg-[#C9A84C] text-[#0A1628] font-semibold text-sm hover:bg-[#D4B06A] transition-all duration-200"
            >
              Book Appointment
            </Link>
            <a
              href="tel:8799918682"
              className="px-6 py-3 rounded-full border border-[rgba(201,168,76,0.4)] text-[#C9A84C] font-medium text-sm hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
