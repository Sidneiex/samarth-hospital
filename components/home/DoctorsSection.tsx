"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";

export default function DoctorsSection() {
  const d = content.doctors;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".dc-head", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".dc-head", start: "top 88%" }
        });
        gsap.fromTo(".dc-card", { opacity: 0, y: 30, rotateX: 4 }, {
          opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".dc-grid", start: "top 82%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const doctors = [
    { ...d.dr1, img: "/images/doctor-male.jpg" },
    { ...d.dr2, img: "/images/doctor-female.jpg" },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="site-container">
        <div className="dc-head flex items-end justify-between mb-14">
          <div>
            <h2 className="text-2xl sm:text-[2rem] font-bold tracking-tight">{d.heading}</h2>
            <p className="text-gray-400 text-[15px] mt-2">{d.subheading}</p>
          </div>
          <Link href="/about" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#0a1628]/40 hover:text-[#0a1628] transition-colors group">
            {d.viewTeam} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="dc-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doc, i) => (
            <div key={i} className="dc-card prem-card p-8 flex flex-col sm:flex-row gap-7">
              <div className="w-full sm:w-32 h-40 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src={doc.img} alt={doc.name} width={128} height={160} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase">{doc.role}</p>
                <h3 className="font-bold text-xl mt-1 tracking-tight">{doc.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{doc.qualification}</p>
                <p className="text-gray-400 text-[12px] mt-0.5">{doc.specialty}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-400 text-sm">{doc.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-gray-400 text-[13px] text-center">{d.visitingNote}</p>
      </div>
    </section>
  );
}
