"use client";

import { useEffect, useRef } from "react";
import { Baby, Stethoscope, Syringe, ScanLine, FlaskConical, Heart, ShieldCheck, Pill } from "lucide-react";
import { content } from "@/lib/content";

const icons: Record<string, React.ElementType> = { baby:Baby, stethoscope:Stethoscope, scalpel:Syringe, scan:ScanLine, flask:FlaskConical, heart:Heart, shield:ShieldCheck, pill:Pill };
const details: Record<number,string[]> = {
  0:["Natural and painless delivery","High-risk pregnancy management","24/7 fetal monitoring","Post-natal care"],
  1:["OPD consultations","Menstrual disorder management","Infertility evaluation","Gynecological surgery"],
  2:["Major and minor surgeries","Laparoscopic procedures","Pre & post-operative care","Visiting specialist surgeons"],
  3:["Prenatal scans (all trimesters)","Anomaly and growth scans","Pelvic ultrasound","Doppler studies"],
  4:["CBC and panels","Urine routine and culture","Thyroid, liver, kidney tests","Same-day results"],
  5:["Contraceptive counselling","IUD insertion","Tubectomy & sterilisation","Confidential consultations"],
  6:["Cervical cancer screening","Pap smear and HPV testing","Biopsy coordination","Women's health education"],
  7:["Prescribed and OTC medications","Surgical consumables","Infant and maternal products","Open to general public"],
};

export default function AllServices() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".as-card", { opacity: 0, y: 24, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: ".as-grid", start: "top 85%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="site-container">
        <div className="as-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Heart;
            return (
              <div key={i} className="as-card prem-card p-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#0a1628]/70" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[17px] mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-[14px] leading-[1.7] mb-4">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {(details[i]??[]).map((d,j)=>(
                        <li key={j} className="flex items-center gap-2.5 text-[13px] text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-[#0a1628]/15 flex-shrink-0" /> {d}
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
