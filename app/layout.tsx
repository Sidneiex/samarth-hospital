import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import LoadingScreen from "@/components/shared/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Samarth Hospital & Maternity Home | Rahata, Ahilyanagar",
  description:
    "Samarth Hospital and Maternity Home in Kolhar Budruk, Rahata — expert gynecology, maternity care, surgical services, sonography, and pathology lab since 2007.",
  keywords:
    "Samarth Hospital, maternity home Rahata, gynecologist Ahilyanagar, Dr Vikram Nalkar, Dr Priti Doshi, hospital Kolhar, sonography Rahata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-[#0a1628] font-[family-name:var(--font-inter)] antialiased">
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
