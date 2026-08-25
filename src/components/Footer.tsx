"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Marquee from "./Marquee";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-deep-black text-off-white border-t border-border-gray/70 pt-10 sm:pt-16 relative overflow-hidden">
      
      {/* Footer Marquee Banner */}
      <div className="mb-10 sm:mb-16">
        <Marquee speed="slow" />
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12 sm:pb-16">
        
        {/* Top Callout */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 sm:pb-16 border-b border-border-gray/60 gap-6 sm:gap-8">
          <div>
            <span className="text-[11px] sm:text-xs font-mono text-eureka-green tracking-[0.2em] uppercase block mb-2 sm:mb-3">
              LET&apos;S COLLABORATE
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-off-white">
              Let&apos;s make something useful.
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-eureka-green text-deep-black font-semibold text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 sm:py-4 hover:bg-white transition-colors group shrink-0 w-full sm:w-auto text-center rounded-full sm:rounded-none"
          >
            <span>Start a project</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-10 sm:py-16 border-b border-border-gray/60 font-mono text-xs text-soft-gray">
          
          {/* Brand info - full width (2 cols) on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4 mb-2 md:mb-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                <Image src="/logo.svg" alt="Ethio-Eureka Logo" fill className="object-contain" />
              </div>
              <span className="text-off-white font-bold tracking-widest text-sm sm:text-base font-sans">
                ETHIO-EUREKA
              </span>
            </div>
            <p className="leading-relaxed text-[11px] text-soft-gray max-w-sm">
              Independent creative technology & digital design studio based in Addis Ababa, Ethiopia.
            </p>
            <p className="text-eureka-green text-[11px] font-mono">
              ETHIOPIA → AFRICA → THE WORLD
            </p>
          </div>

          {/* Navigation Links (Explore) - Col 1 on mobile */}
          <div className="col-span-1">
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-3 sm:mb-4 border-b border-border-gray/40 pb-2 text-[11px] sm:text-xs">
              Explore
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link href="/" className="hover:text-eureka-green transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-eureka-green transition-colors">Work</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-eureka-green transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-eureka-green transition-colors">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-eureka-green transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services - Col 2 on mobile */}
          <div className="col-span-1">
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-3 sm:mb-4 border-b border-border-gray/40 pb-2 text-[11px] sm:text-xs">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs">
              <li>Web Design & Dev</li>
              <li>Brand Identity</li>
              <li>Content Systems</li>
              <li>Social Strategy</li>
              <li>Graphic & Editorial</li>
            </ul>
          </div>

          {/* Direct Channels (Connect) - Col 1/2 on mobile */}
          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border-gray/40">
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-3 sm:mb-4 border-b border-border-gray/40 pb-2 text-[11px] sm:text-xs">
              Connect
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3">
              <li>
                <a href="https://instagram.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green flex items-center justify-between">
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green flex items-center justify-between">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://t.me/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green flex items-center justify-between">
                  <span>Telegram</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://x.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green flex items-center justify-between">
                  <span>X / Twitter</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-soft-gray gap-3 text-center sm:text-left">
          <p>© 2026 Ethio-Eureka. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="/admin/login" className="hover:text-eureka-green">CMS Admin</Link>
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
