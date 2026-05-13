"use client";

import AllServices from "@/components/services/AllServices";
import { content } from "@/lib/content";

export default function ServicesPage() {
  const sp = content.services_page;
  return (
    <>
      <div className="pt-28 pb-16 bg-white border-b border-black/[.04]">
        <div className="site-container">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{sp.heading}</h1>
          <p className="text-gray-400 text-lg mt-3 max-w-lg">{sp.subheading}</p>
        </div>
      </div>
      <AllServices />
    </>
  );
}
