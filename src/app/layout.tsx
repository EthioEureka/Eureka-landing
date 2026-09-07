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
  title: {
    default: "Ethio-Eureka — Creative Technology & Digital Studio",
    template: "%s | Ethio-Eureka Digital Studio",
  },
  description:
    "Ethio-Eureka is an independent creative technology studio helping ambitious businesses build brands, websites, and digital experiences that matter globally.",
  keywords: [
    "Ethio-Eureka",
    "Creative Agency Ethiopia",
    "Digital Studio Addis Ababa",
    "Website Design & Development",
    "Branding Agency Africa",
    "Next.js Development Studio",
    "Visual Identity & Software Engineering",
  ],
  authors: [{ name: "Ethio-Eureka Studio", url: "https://ethio-eureka.com" }],
  creator: "Ethio-Eureka",
  themeColor: "#2563EB",
  openGraph: {
    title: "Ethio-Eureka — Creative Technology & Digital Studio",
    description:
      "Independent creative technology studio based in Ethiopia. We craft brands, high-performance websites, and digital systems.",
    url: "https://ethio-eureka.com",
    siteName: "Ethio-Eureka",
    images: [
      {
        url: "/Eureka-logo.png",
        width: 1200,
        height: 630,
        alt: "Ethio-Eureka Creative Technology Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethio-Eureka — Creative Technology Studio",
    description: "Building modern brands, websites, and software systems that move businesses forward.",
    images: ["/Eureka-logo.png"],
  },
  icons: {
    icon: "/Eureka-logo.png",
    shortcut: "/Eureka-logo.png",
    apple: "/Eureka-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-eureka-dark font-sans antialiased min-h-screen flex flex-col selection:bg-eureka-blue selection:text-white`}
      >
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

