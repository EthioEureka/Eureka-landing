import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethio-Eureka — Creative Technology & Digital Studio",
  description:
    "Ethio-Eureka is an independent creative studio helping ambitious businesses build brands, websites, and digital experiences that matter globally.",
  keywords: [
    "Ethio-Eureka",
    "Creative Agency",
    "Digital Studio Ethiopia",
    "Website Design Addis Ababa",
    "Branding Agency Africa",
    "Next.js Development",
    "Visual Identity Studio",
  ],
  authors: [{ name: "Ethio-Eureka" }],
  openGraph: {
    title: "Ethio-Eureka — Digital identities that make businesses matter.",
    description:
      "We build brands, websites, and digital experiences that move businesses forward. Independent creative technology studio based in Ethiopia.",
    url: "https://ethio-eureka.com",
    siteName: "Ethio-Eureka",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-deep-black text-off-white font-sans antialiased min-h-screen flex flex-col selection:bg-eureka-green selection:text-deep-black`}
      >
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
