"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { content } from "@/lib/content";
import SamarthLogo from "@/components/shared/SamarthLogo";

const staff = [
  { init: "VN", name: "Dr. Vikram A. Nalkar", role: "MS (Pune) · Surgeon & Medical Director" },
  { init: "PD", name: "Dr. Priti Doshi", role: "MBBS, DGO (Gold Medal) · Gynecologist" },
  { init: "—", name: "Visiting Anesthetist", role: "Available for all surgical procedures" },
  { init: "—", name: "Visiting Surgeons", role: "Specialist surgeons on call" },
  { init: "—", name: "Lab Technician", role: "In-house pathology lab" },
  { init: "—", name: "Medical Store Staff", role: "In-house pharmacy · 2 staff" },
];

export default function AboutPage() {
  const a = content.about_page;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".ab-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
        gsap.fromTo(".ab-para", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".ab-story", start: "top 80%" } });
        gsap.fromTo(".ab-mv", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".ab-mv-row", start: "top 85%" } });
        gsap.fromTo(".ab-staff", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: ".ab-staff-grid", start: "top 85%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Header */}
      <section className="pt-28 pb-16 bg-white border-b border-black/[.04]">
        <div className="site-container ab-hero">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{a.heading}</h1>
          <p className="text-gray-400 text-lg mt-3 max-w-lg">{a.subheading}</p>
        </div>
      </section>

      {/* Story */}
      <section className="ab-story py-20 bg-white">
        <div className="site-container grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-3 space-y-5">
            {a.story.map((p, i) => (
              <p key={i} className="ab-para text-gray-500 text-[16px] leading-[1.9]">{p}</p>
            ))}
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden shadow-[0_16px_60px_-12px_rgba(10,22,40,.08)] mb-6">
              <Image src="/images/about-hospital.jpg" alt="Hospital" width={500} height={340} className="w-full h-auto object-cover" />
            </div>
            <div className="prem-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <SamarthLogo className="w-8 h-8 [&_rect]:stroke-[#0a1628] [&_line]:stroke-[#0a1628] [&_path]:stroke-[#0a1628] [&_circle]:fill-[#0a1628]" />
                <div className="leading-tight"><span className="block text-[15px] font-semibold">Samarth Hospital</span><span className="block text-[10px] text-gray-400">Est. 2007</span></div>
              </div>
              {[["Founded","2007"],["Beds","30"],["Specialists","2 Senior Doctors"],["Certification","Govt. Approved Sonography"]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-3 border-b border-black/[.04] last:border-0 text-[14px]">
                  <span className="text-gray-400">{k}</span><span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20 bg-[#fafbfc]">
        <div className="site-container">
          <div className="ab-mv-row grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[{icon:Target,title:"Our Mission",text:a.mission},{icon:Eye,title:"Our Vision",text:a.vision}].map((item)=>{
              const Icon=item.icon;
              return(<div key={item.title} className="ab-mv prem-card p-8 bg-white">
                <Icon className="w-5 h-5 text-[#0a1628] mb-4" strokeWidth={1.75} />
                <h3 className="font-bold text-lg mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-[15px] leading-[1.8]">{item.text}</p>
              </div>);
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="site-container">
          <h2 className="text-2xl font-bold mb-10 tracking-tight">{a.teamHeading}</h2>
          <div className="ab-staff-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {staff.map((m,i)=>(
              <div key={i} className="ab-staff prem-card flex gap-4 p-6">
                <div className="w-11 h-11 rounded-full bg-[#0a1628]/[.04] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0a1628] text-[13px] font-bold">{m.init}</span>
                </div>
                <div><p className="font-semibold text-[14px] tracking-tight">{m.name}</p><p className="text-gray-400 text-[13px] mt-1">{m.role}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
