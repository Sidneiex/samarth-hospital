"use client";

import { useEffect, useRef } from "react";
import {
  Baby,
  Stethoscope,
  Syringe,
  ScanLine,
  FlaskConical,
  Heart,
  ShieldCheck,
  Pill,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  baby: Baby,
  stethoscope: Stethoscope,
  scalpel: Syringe,
  scan: ScanLine,
  flask: FlaskConical,
  heart: Heart,
  shield: ShieldCheck,
  pill: Pill,
};

const extendedDetails: Record<number, string[]> = {
  0: [
    "Natural, painless, and assisted deliveries",
    "24/7 fetal monitoring and care",
    "High-risk pregnancy management",
    "Mission Delivery programme",
    "Post-natal mother and newborn care",
    "Lactation support and counselling",
  ],
  1: [
    "Routine OPD gynecology consultations",
    "Menstrual disorder diagnosis and management",
    "Infertility evaluation and treatment",
    "Fibroid, cyst, and PCOS management",
    "Colposcopy and Pap smear screening",
    "Minimally invasive gynecological surgery",
  ],
  2: [
    "Fully equipped, sterile operation theatre",
    "All major and minor surgical procedures",
    "Laparoscopic surgeries",
    "Pre-operative and post-operative care",
    "Visiting anesthetist and specialist support",
    "Emergency surgical capability",
  ],
  3: [
    "Government-approved sonography center",
    "Obstetric / prenatal scans (all trimesters)",
    "Gynecological pelvic ultrasound",
    "Abdominal and organ sonography",
    "Anomaly scan and growth scans",
    "Doppler studies",
  ],
  4: [
    "Complete blood count (CBC) and panels",
    "Urine routine and culture",
    "Blood glucose, lipid, liver and kidney panels",
    "Thyroid function tests",
    "Rapid diagnostic tests",
    "Results on the same day for most tests",
  ],
  5: [
    "OCP and contraceptive counselling",
    "IUD / copper-T insertion",
    "Tubectomy and other sterilisation procedures",
    "Post-partum family planning advice",
    "Confidential consultations",
  ],
  6: [
    "Cervical and uterine cancer screening",
    "Pap smear and HPV testing",
    "Early detection ultrasound",
    "Biopsy referral and coordination",
    "Women's health awareness and education",
  ],
  7: [
    "All prescribed and OTC medications",
    "Surgical consumables and dressings",
    "Infant and maternal care products",
    "Open to outpatients and general public",
    "Staffed by trained pharmacy personnel",
  ],
};

export default function AllServices() {
  const { translations: tr } = useLanguage();
  const svc = tr.services;
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
          ".asvc-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".asvc-grid",
              start: "top 80%",
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="asvc-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {svc.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Heart;
            const details = extendedDetails[i] ?? [];
            return (
              <div
                key={i}
                className="asvc-card service-card group rounded-3xl bg-[#0E2040] border border-[rgba(201,168,76,0.1)] p-8 relative overflow-hidden"
              >
                {/* Number badge */}
                <div className="absolute top-5 right-6 text-5xl font-bold text-white/[0.03] pointer-events-none select-none"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  0{i + 1}
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(201,168,76,0.2)] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-white text-xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {item.desc}
                    </p>

                    {details.length > 0 && (
                      <ul className="grid grid-cols-1 gap-y-1.5">
                        {details.map((d, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-3xl border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/20 transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
