import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DoctorsSection from "@/components/home/DoctorsSection";
import FacilitiesBanner from "@/components/home/FacilitiesBanner";
import Testimonials from "@/components/home/Testimonials";
import OPDTimings from "@/components/home/OPDTimings";
import MapContact from "@/components/home/MapContact";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <DoctorsSection />
      <FacilitiesBanner />
      <Testimonials />
      <OPDTimings />
      <MapContact />
    </>
  );
}
