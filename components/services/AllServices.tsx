"use client";

import { useEffect, useRef } from "react";
import { Baby, Stethoscope, Syringe, ScanLine, FlaskConical, Heart, ShieldCheck, Pill } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons: Record<string, React.ElementType> = {
  baby: Baby, stethoscope: Stethoscope, scalpel: Syringe, scan: ScanLine,
  flask: FlaskConical, heart: Heart, shield: ShieldCheck, pill: Pill,
};

const details: Record<number, string[]> = {
  0: ["Natural and painless delivery options", "High-risk pregnancy management", "24/7 fetal monitoring", "Post-natal mother and newborn care"],
  1: ["OPD consultations", "Menstrual disorder management", "Infertility evaluation", "Gynecological surgery"],
  2: ["All major and minor surgeries", "Laparoscopic procedures", "Pre and post-operative care", "Visiting specialist surgeons"],
  3: ["Prenatal scans (all trimesters)", "Anomaly and growth scans", "Pelvic ultrasound", "Doppler studies"],
  4: ["Complete blood count and panels", "Urine routine and culture", "Thyroid, liver, kidney function tests", "Same-day results for most tests"],
  5: ["OCP and contraceptive counselling", "IUD insertion", "Tubectomy and sterilisation", "Confidential consultations"],
  6: ["Cervical cancer screening", "Pap smear and HPV testing", "Biopsy coordination", "Women's health education"],
  7: ["All prescribed and OTC medications", "Surgical consumables", "Infant and maternal care products", "Open to general public"],
};

export default function AllServices() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".asvc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ".asvc-grid", start: "top 82%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="asvc-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {tr.services.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Heart;
            return (
              <div key={i} className="asvc p-8 rounded-2xl border border-slate-100 bg-white card-hover">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-navy" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-lg mb-1.5">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {(details[i] ?? []).map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-navy/30 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
