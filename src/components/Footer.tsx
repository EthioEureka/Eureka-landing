"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import Marquee from "./Marquee";
import { Partner } from "@/lib/types";

export default function Footer() {
  const pathname = usePathname();
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPartners(data);
      })
      .catch((err) => console.error("Error loading partners:", err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-slate-50 text-eureka-dark border-t border-eureka-border pt-10 sm:pt-16 relative overflow-hidden">
      {/* Footer Marquee Banner */}
      <div className="mb-10 sm:mb-16 border-b border-eureka-border/60 pb-8 ">
        <Marquee partners={partners} speed="slow" />
      </div>


      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12 sm:pb-16">
        {/* Top Callout */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 sm:pb-16 border-b border-eureka-border gap-6 sm:gap-8">
          <div>
            <span className="text-xs font-mono text-eureka-blue font-semibold tracking-[0.2em] uppercase block mb-2 sm:mb-3">
              LET&apos;S COLLABORATE
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-eureka-dark">
              Let&apos;s build something extraordinary.
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 sm:py-4 rounded-full hover:shadow-eureka-lg transition-all duration-300 group shrink-0 w-full sm:w-auto text-center"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-10 sm:py-16 border-b border-eureka-border font-sans text-sm text-eureka-slate">
          {/* Brand info */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4 mb-2 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 shrink-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-cover" />
              </div>
              <span className="text-eureka-dark font-extrabold tracking-tight text-base">
                ETHIO-EUREKA
              </span>
            </div>
            <p className="leading-relaxed text-xs text-eureka-slate max-w-sm">
              Independent creative technology & digital design studio based in Addis Ababa, Ethiopia.
            </p>
            <p className="text-eureka-blue text-xs font-mono font-semibold">
              ETHIOPIA → AFRICA → GLOBAL
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs">
              <li>
                <Link href="/" className="hover:text-eureka-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-eureka-blue transition-colors">Work</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-eureka-blue transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-eureka-blue transition-colors">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-eureka-blue transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs">
              <li>Web Design & Dev</li>
              <li>Brand Identity Systems</li>
              <li>Content & CMS Platforms</li>
              <li>Digital Strategy</li>
              <li>Graphic & UI/UX Design</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-eureka-border">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              Connect
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3 text-xs">
              <li>
                <a href="https://instagram.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                  <span>Instagram</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://t.me/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                  <span>Telegram</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://x.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                  <span>X / Twitter</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Back to top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-eureka-slate gap-4 text-center sm:text-left">
          <p>© 2026 Ethio-Eureka Digital Studio. All rights reserved.</p>
          
          <div className="flex gap-6 items-center">
            <Link href="/admin/login" className="hover:text-eureka-blue transition-colors">CMS Admin</Link>
            <span>Addis Ababa, Ethiopia</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white border border-eureka-border hover:border-eureka-blue hover:text-eureka-blue shadow-sm transition-all"
              title="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

