"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { content } from "@/lib/content";

const departments = ["Gynecology & Obstetrics","General Surgery","Maternity / Delivery","Sonography","Pathology Lab","Family Planning","Cancer Screening","General Consultation"];
const timeSlots = ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM"];

export default function AppointmentPage() {
  const ap = content.appointment;
  const c = content.contact;
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({name:"",phone:"",date:"",time:"",department:"",message:""});

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        gsap.fromTo(".ap-hero", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        gsap.fromTo(".ap-form", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power3.out" });
        gsap.fromTo(".ap-side", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: "power3.out" });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(()=>{setLoading(false);setSubmitted(true);},1000); };

  const inp = "w-full bg-white border border-black/[.08] rounded-xl px-5 py-3 text-[15px] text-[#0a1628] placeholder-gray-300 transition-all duration-200 focus:border-[#0a1628] focus:shadow-[0_0_0_3px_rgba(10,22,40,.04)] outline-none";
  const lbl = "block text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase mb-2";

  return (
    <div ref={ref}>
      <div className="pt-28 pb-16 bg-white border-b border-black/[.04]">
        <div className="site-container ap-hero">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{ap.heading}</h1>
          <p className="text-gray-400 text-lg mt-3">{ap.subheading}</p>
        </div>
      </div>

      <section className="py-20 bg-[#fafbfc]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-20 bg-white rounded-2xl border border-black/[.04]">
                  <CheckCircle className="w-12 h-12 text-[#0a1628] mb-4" strokeWidth={1.5} />
                  <h2 className="text-xl font-bold mb-2 tracking-tight">{ap.appointmentRequested}</h2>
                  <p className="text-gray-400 text-[15px] max-w-sm mb-6">{ap.success}</p>
                  <div className="flex gap-3">
                    <a href="tel:8799918682" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0a1628] text-white text-sm font-medium"><Phone className="w-3.5 h-3.5" /> {ap.callUs}</a>
                    <button onClick={()=>setSubmitted(false)} className="px-6 py-2.5 rounded-full border-2 border-gray-200 text-sm font-medium">{ap.bookAnother}</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ap-form bg-white rounded-2xl border border-black/[.04] p-8 lg:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2"><label className={lbl}>{ap.name} *</label><input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inp} /></div>
                    <div><label className={lbl}>{ap.phone} *</label><input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="10-digit number" className={inp} /></div>
                    <div><label className={lbl}>{ap.department} *</label><select name="department" required value={form.department} onChange={handleChange} className={inp}><option value="" disabled>Select department</option>{departments.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
                    <div><label className={lbl}>{ap.date} *</label><input type="date" name="date" required value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={inp} /></div>
                    <div><label className={lbl}>{ap.time} *</label><select name="time" required value={form.time} onChange={handleChange} className={inp}><option value="" disabled>Select time</option><optgroup label="Morning">{timeSlots.slice(0,8).map(t=><option key={t} value={t}>{t}</option>)}</optgroup><optgroup label="Evening">{timeSlots.slice(8).map(t=><option key={t} value={t}>{t}</option>)}</optgroup></select></div>
                    <div className="sm:col-span-2"><label className={lbl}>{ap.message}</label><textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Describe your symptoms or reason for visit..." className={`${inp} resize-none`} /></div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="mt-7 w-full flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0a1628] text-white font-semibold text-[15px] hover:bg-[#152244] transition-all duration-300 disabled:opacity-50">
                    {loading ? "Submitting..." : <>{ap.submit} <ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-center text-gray-400 text-[13px] mt-3">{ap.orCall} <a href="tel:8799918682" className="font-semibold text-[#0a1628]">{c.phone2}</a></p>
                </form>
              )}
            </div>

            <div className="ap-side space-y-5">
              <div className="p-8 rounded-2xl bg-[#0a1628] text-white">
                <Phone className="w-5 h-5 mb-4 opacity-30" strokeWidth={1.5} />
                <p className="font-bold text-lg mb-1">{ap.preferCall}</p>
                <p className="text-white/30 text-[14px] mb-5 leading-relaxed">{ap.preferCallDesc}</p>
                <a href="tel:8799918682" className="block text-xl font-bold hover:underline">{c.phone2}</a>
                <a href="tel:02422295588" className="block text-white/25 text-[14px] mt-1">{c.phone1}</a>
              </div>

              <div className="prem-card p-8">
                <Clock className="w-5 h-5 text-[#0a1628] mb-4" strokeWidth={1.75} />
                <p className="font-semibold text-lg mb-4 tracking-tight">OPD Timings</p>
                <div className="space-y-3 text-[14px]">
                  {[["Mon–Sat Morning","10 AM – 2 PM"],["Mon–Sat Evening","5 PM – 8 PM"],["Sunday","By Appointment"]].map(([d,t])=>(
                    <div key={d} className="flex justify-between"><span className="text-gray-400">{d}</span><span className="font-medium">{t}</span></div>
                  ))}
                </div>
              </div>

              <div className="prem-card p-8">
                <p className="font-semibold text-lg mb-2 tracking-tight">{ap.howToReach}</p>
                <p className="text-gray-400 text-[14px] leading-[1.7] mb-4">{c.address}</p>
                <Link href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium hover:underline flex items-center gap-1.5">
                  Open in Maps <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
