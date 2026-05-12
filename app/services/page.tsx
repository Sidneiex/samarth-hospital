"use client";

import AllServices from "@/components/services/AllServices";

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy">Our Services</h1>
          <p className="text-slate-500 text-lg mt-3 max-w-xl leading-relaxed">
            Everything from your first prenatal visit to post-surgical recovery — all under one roof.
          </p>
        </div>
      </div>
      <AllServices />
    </>
  );
}
