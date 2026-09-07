"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import Marquee from "./Marquee";
import { Partner, SiteSettings } from "@/lib/types";
import { siteData } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPartners(data);
      })
      .catch((err) => console.error("Error loading partners:", err));

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
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
              {siteData.footer.callout.eyebrow}
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-eureka-dark">
              {siteData.footer.callout.headline}
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 sm:py-4 rounded-full hover:shadow-eureka-lg transition-all duration-300 group shrink-0 w-full sm:w-auto text-center"
          >
            <span>{siteData.footer.callout.cta}</span>
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
                {siteData.footer.brand.name}
              </span>
            </div>
            <p className="leading-relaxed text-xs text-eureka-slate max-w-sm">
              {siteData.footer.brand.description}
            </p>
            <p className="text-eureka-blue text-xs font-mono font-semibold">
              {siteData.footer.brand.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              {siteData.footer.nav.title}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs">
              {siteData.footer.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-eureka-blue transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              {siteData.footer.services.title}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs">
              {siteData.footer.services.items.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-eureka-border">
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b border-eureka-border pb-2 text-xs font-mono">
              {siteData.footer.connect.title}
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3 text-xs">
              {settings.instagram_url && (
                <li>
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                    <span>Instagram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
              {settings.linkedin_url && (
                <li>
                  <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
              {settings.telegram_url && (
                <li>
                  <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                    <span>Telegram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
              {settings.twitter_url && (
                <li>
                  <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue flex items-center justify-between">
                    <span>X / Twitter</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Back to top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-eureka-slate gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {settings.company_name || "Ethio-Eureka"}. All rights reserved.</p>
          
          <div className="flex gap-6 items-center">
            <Link href={siteData.footer.bottom.adminHref} className="hover:text-eureka-blue transition-colors">
              {siteData.footer.bottom.adminLink}
            </Link>
            {settings.location && <span>{settings.location}</span>}
            
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
