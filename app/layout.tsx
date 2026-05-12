import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Samarth Hospital & Maternity Home | Rahata, Ahilyanagar",
  description:
    "Samarth Hospital and Maternity Home in Kolhar Budruk, Rahata — offering expert gynecology, maternity care, surgical services, sonography, and pathology lab since 2007. Trusted by thousands of families.",
  keywords:
    "Samarth Hospital, maternity home Rahata, gynecologist Ahilyanagar, Dr Vikram Nalkar, Dr Priti Doshi, hospital Kolhar, sonography Rahata",
  openGraph: {
    title: "Samarth Hospital & Maternity Home",
    description:
      "Expert maternity care, gynecology & surgical services in Rahata since 2007.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0A1628] text-white font-[var(--font-dm-sans)] min-h-screen overflow-x-hidden">
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
