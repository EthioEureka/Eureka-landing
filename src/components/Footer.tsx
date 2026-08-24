"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="bg-deep-black text-off-white border-t border-border-gray/70 pt-16 relative overflow-hidden">
      
      {/* Footer Marquee Banner */}
      <div className="mb-16">
        <Marquee speed="slow" />
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        
        {/* Top Callout */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-16 border-b border-border-gray/60 gap-8">
          <div>
            <span className="text-xs font-mono text-eureka-green tracking-[0.2em] uppercase block mb-3">
              LET&apos;S COLLABORATE
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-off-white">
              Let&apos;s make something useful.
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-eureka-green text-deep-black font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors group shrink-0"
          >
            <span>Start a project</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-b border-border-gray/60 font-mono text-xs text-soft-gray">
          
          {/* Brand info */}
          <div className="space-y-4">
            <span className="text-off-white font-bold tracking-widest text-base block font-sans">
              ETHIO-EUREKA
            </span>
            <p className="leading-relaxed text-[11px] text-soft-gray">
              Independent creative technology & digital design studio based in Addis Ababa, Ethiopia.
            </p>
            <p className="text-eureka-green text-[11px]">
              ETHIOPIA → AFRICA → THE WORLD
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-4 border-b border-border-gray/40 pb-2">
              Explore
            </h4>
            <ul className="space-y-3">
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

          {/* Services */}
          <div>
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-4 border-b border-border-gray/40 pb-2">
              Services
            </h4>
            <ul className="space-y-3">
              <li>Web Design & Dev</li>
              <li>Brand Identity</li>
              <li>Content Systems</li>
              <li>Social Strategy</li>
              <li>Graphic & Editorial</li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className="text-off-white font-semibold uppercase tracking-wider mb-4 border-b border-border-gray/40 pb-2">
              Connect
            </h4>
            <ul className="space-y-3">
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
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-soft-gray gap-4">
          <p>© 2026 Ethio-Eureka. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:text-eureka-green">CMS Admin</Link>
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
