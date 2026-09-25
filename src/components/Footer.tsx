"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowUp, Globe, Mail, Phone, MapPin } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import Marquee from "./Marquee";
import { Partner, SiteSettings } from "@/lib/types";
import { siteData } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const socialLinks = [
    { key: "instagram_url", label: "Instagram", icon: Globe },
    { key: "linkedin_url", label: "LinkedIn", icon: Globe },
    { key: "telegram_url", label: "Telegram", icon: Globe },
    { key: "twitter_url", label: "X / Twitter", icon: Globe },
  ].filter((s) => settings[s.key as keyof typeof settings]) as Array<{ key: string; label: string; icon: React.ComponentType<any> }>;

  return (
    <footer ref={footerRef} className="bg-slate-50 text-eureka-dark border-t border-eureka-border pt-16 sm:pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-eureka-blue/5 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <motion.div
        className="mb-10 sm:mb-16 border-b border-eureka-border/60 pb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Marquee partners={partners} speed="slow" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12 sm:pb-16 relative">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 sm:pb-16 border-b border-eureka-border gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs font-mono text-eureka-blue font-semibold tracking-[0.2em] uppercase block mb-2 sm:mb-3">
              {siteData.footer.callout.eyebrow}
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-eureka-dark">
              {siteData.footer.callout.headline}
            </h3>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:mt-0 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 sm:py-4 rounded-full hover:shadow-eureka-xl transition-all duration-300 group shrink-0 w-full sm:w-auto text-center"
            >
              <span>{siteData.footer.callout.cta}</span>
              <motion.span whileHover={{ x: 4, y: -4 }}><ArrowUpRight size={18} /></motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-10 sm:py-16 border-b border-eureka-border font-sans text-sm text-eureka-slate"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-5 mb-2 md:mb-0" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden border border-eureka-border/50 shadow-sm"
              >
                <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-cover" />
              </motion.div>
              <span className="text-eureka-dark font-extrabold tracking-tight text-base">
                {siteData.footer.brand.name}
              </span>
            </div>
            <p className="leading-relaxed text-sm text-eureka-slate max-w-sm">
              {siteData.footer.brand.description}
            </p>
            <p className="text-eureka-blue text-xs font-mono font-semibold">
              {siteData.footer.brand.tagline}
            </p>
            
            {socialLinks.length > 0 && (
              <div className="pt-4 border-t border-eureka-border/50 flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.key}
                    href={settings[social.key as keyof typeof settings] as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white border border-eureka-border/50 flex items-center justify-center text-eureka-slate hover:bg-eureka-blue hover:text-white hover:border-eureka-blue transition-all duration-300 group"
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-4 sm:mb-5 border-b border-eureka-border/50 pb-2 text-xs font-mono">
              {siteData.footer.nav.title}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              {siteData.footer.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-eureka-blue transition-colors duration-300 relative inline-block"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-eureka-blue transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="col-span-1" variants={itemVariants}>
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-4 sm:mb-5 border-b border-eureka-border/50 pb-2 text-xs font-mono">
              {siteData.footer.services.title}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              {siteData.footer.services.items.map((service) => (
                <li key={service} className="hover:text-eureka-blue transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-eureka-border/50" variants={itemVariants}>
            <h4 className="text-eureka-dark font-bold uppercase tracking-wider mb-4 sm:mb-5 border-b border-eureka-border/50 pb-2 text-xs font-mono">
              {siteData.footer.connect.title}
            </h4>
            <div className="space-y-3">
              {settings.location && (
                <a href="#" className="flex items-center gap-3 text-sm hover:text-eureka-blue transition-colors group">
                  <MapPin size={18} className="text-eureka-blue shrink-0" />
                  <span>{settings.location}</span>
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm hover:text-eureka-blue transition-colors group">
                  <Mail size={18} className="text-eureka-blue shrink-0" />
                  <span>{settings.email}</span>
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm hover:text-eureka-blue transition-colors group">
                  <Phone size={18} className="text-eureka-blue shrink-0" />
                  <span>{settings.phone}</span>
                </a>
              )}
              {socialLinks.map((social, idx) => (
                <a
                  key={social.key}
                  href={settings[social.key as keyof typeof settings] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-eureka-blue transition-colors group"
                >
                  <social.icon size={18} className="text-eureka-blue shrink-0" />
                  <span>{social.label}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-eureka-slate gap-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} {settings.company_name || "Ethio-Eureka"}. All rights reserved.</p>
          
          <div className="flex gap-6 items-center">
            <Link href={siteData.footer.bottom.adminHref} className="hover:text-eureka-blue transition-colors flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider">{siteData.footer.bottom.adminLink}</span>
              <ArrowUpRight size={12} />
            </Link>
            {settings.location && <span className="hidden sm:inline">{settings.location}</span>}
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white border border-eureka-border/50 hover:border-eureka-blue hover:text-eureka-blue shadow-sm transition-all"
              title="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}