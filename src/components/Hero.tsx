"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowDownRight, ExternalLink, Sparkles } from "lucide-react";

import { Project } from "@/lib/types";

interface HeroProps {
  projects?: Project[];
}

// 3D Animated Logo Showcase Card Component
function Logo3DCard() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center p-6 bg-slate-50/90 rounded-3xl border border-eureka-border shadow-eureka-lg overflow-hidden group">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />

      {/* Animated Floating Rings */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[440px] h-[440px] rounded-full border border-eureka-blue/20 border-dashed opacity-60 pointer-events-none"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.08, 0.95, 1.08],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[320px] h-[320px] rounded-full border border-eureka-indigo/30 opacity-40 pointer-events-none"
      />

      {/* 3D Floating Glass Card */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotateX: [4, -4, 4],
          rotateY: [-8, 8, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative z-10 w-full max-w-sm bg-white/95 border border-eureka-border rounded-2xl p-8 shadow-eureka-lg flex flex-col items-center text-center space-y-6 group-hover:border-eureka-blue transition-colors duration-500"
      >
        {/* Floating Logo Badge */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className="relative w-36 h-36 flex items-center justify-center rounded-2xl bg-slate-50 border border-eureka-border shadow-eureka-md group-hover:shadow-eureka-glow transition-all duration-500 overflow-hidden"
        >
          <div className="relative w-28 h-28 filter drop-shadow-[0_10px_20px_rgba(37,99,235,0.25)]">
            <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo Badge" fill className="object-contain" />
          </div>
        </div>

        {/* 3D Typography */}
        <div style={{ transform: "translateZ(25px)" }} className="space-y-2 font-sans">
          <span className="text-[11px] font-mono text-eureka-blue tracking-[0.2em] uppercase block font-semibold">
            ETHIO-EUREKA // DIGITAL STUDIO
          </span>
          <h3 className="text-xl font-extrabold text-eureka-dark tracking-tight">
            Creative Technology Partner
          </h3>
          <p className="text-xs text-eureka-slate max-w-xs leading-relaxed">
            Crafting world-class visual identities, web products, and dynamic CMS engines for growing brands.
          </p>
        </div>

        {/* Status Badge */}
        <div style={{ transform: "translateZ(15px)" }}>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-eureka-blue border border-blue-200 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-eureka-blue blue-dot-pulse" />
            Taking New Projects
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ projects }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const displayCards = React.useMemo(() => {
    if (!projects || projects.length === 0) {
      return [];
    }
    return projects.map((p) => ({
      id: p.id || p.slug,
      title: p.title,
      category: p.category,
      slug: p.slug,
      image: p.cover_image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    }));
  }, [projects]);

  const marqueeCards = [...displayCards, ...displayCards, ...displayCards];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-white text-eureka-dark overflow-hidden flex flex-col justify-between pt-24 pb-12"
      style={{ minHeight: "100svh" }}
    >
      {/* Background Dot Pattern & Ambient Depth */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none z-0" />

      {/* Radial Soft Light Glow */}
      <div
        className="absolute top-[15%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.08), transparent 70%)",
        }}
      />

      {/* Dynamic Cursor Light Overlay */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.06), transparent 70%)",
          x: smoothMouseX,
          y: smoothMouseY,
          top: "50%",
          left: "50%",
          marginLeft: "-250px",
          marginTop: "-250px",
        }}
      />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto pt-6 sm:pt-10 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-eureka-blue text-xs font-mono font-semibold uppercase tracking-wider mb-6 w-fit shadow-sm"
          >
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-blue-300">
              <Image src="/Eureka-logo.png" alt="Ethio-Eureka Icon" fill className="object-cover" />
            </div>
            <span>EUREKA DIGITAL STUDIO</span>
            <span className="text-blue-300">•</span>
            <span className="text-eureka-slate font-sans text-[11px]">GLOBAL CREATIVE AGENCY</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero-headline font-extrabold text-eureka-dark mb-6 sm:mb-8 tracking-tight max-w-[660px]"
          >
            If your business moves{" "}
            <span className="bg-gradient-to-r from-eureka-blue to-eureka-indigo bg-clip-text text-transparent italic font-serif">
              fast
            </span>
            ,<br />
            Your website <br />
            <span className="underline underline-offset-8 decoration-eureka-blue decoration-4 text-eureka-dark">
              should lead.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base sm:text-xl text-eureka-slate max-w-[540px] mb-8 sm:mb-10 leading-relaxed font-normal"
          >
            Ethio-Eureka is an independent studio crafting bespoke brand identities, ultra-smooth web applications, and dynamic CMS engines.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-sm rounded-full px-8 py-4 hover:shadow-eureka-lg transition-all duration-300 group text-center"
            >
              <span>Start a Project</span>
              <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center justify-center gap-3 bg-slate-50 border border-eureka-border text-eureka-dark font-semibold text-sm rounded-full px-8 py-4 hover:border-eureka-blue hover:text-eureka-blue hover:bg-white transition-all duration-300 group text-center shadow-sm"
            >
              <span>Explore Portfolio</span>
              <ArrowDownRight size={17} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Feature Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="grid grid-cols-2 gap-3 pt-6 border-t border-eureka-border max-w-[540px] w-full"
          >
            <div className="flex items-center gap-2 bg-slate-50 border border-eureka-border px-3.5 py-2.5 rounded-xl text-xs text-eureka-slate font-medium shadow-sm">
              <Sparkles size={14} className="text-eureka-blue shrink-0" />
              <span className="truncate">Rapid 4-Week Delivery</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-eureka-border px-3.5 py-2.5 rounded-xl text-xs text-eureka-slate font-medium shadow-sm">
              <Sparkles size={14} className="text-eureka-indigo shrink-0" />
              <span className="truncate">Full Supabase CMS Engine</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-eureka-border px-3.5 py-2.5 rounded-xl text-xs text-eureka-slate font-medium shadow-sm">
              <Sparkles size={14} className="text-eureka-blue shrink-0" />
              <span className="truncate">Brand Strategy & Design</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-eureka-border px-3.5 py-2.5 rounded-xl text-xs text-eureka-slate font-medium shadow-sm">
              <Sparkles size={14} className="text-eureka-indigo shrink-0" />
              <span className="truncate">Global Performance SEO</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Showcase Vertical Marquee or 3D Logo Badge */}
        <div className="lg:col-span-6 xl:col-span-6 relative h-[620px] w-full hidden lg:block overflow-hidden rounded-3xl border border-eureka-border bg-slate-50/80 shadow-eureka-md">
          {displayCards.length === 0 ? (
            <Logo3DCard />
          ) : (
            <>
              {/* Fade Gradients */}
              <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

              {/* Vertical Marquee */}
              <div className="w-full h-full p-4 overflow-hidden">
                <div className="animate-marquee-vertical flex flex-col gap-6">
                  {marqueeCards.map((card, idx) => (
                    <Link
                      key={`${card.id}-${idx}`}
                      href={card.slug ? `/work/${card.slug}` : "/work"}
                      className="group relative bg-white border border-eureka-border rounded-2xl p-4 transition-all duration-300 hover:border-eureka-blue hover:shadow-eureka-lg cursor-pointer block shadow-sm"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-mono text-xs text-eureka-slate border-b border-eureka-border pb-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          </div>
                          <span className="font-semibold text-eureka-blue truncate max-w-[180px]">{card.category}</span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                          {/* Hover Action */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-eureka-blue text-white font-semibold text-[11px] uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <span>VIEW</span>
                            <ExternalLink size={12} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 font-sans">
                          <div>
                            <h4 className="font-bold text-eureka-dark text-base group-hover:text-eureka-blue transition-colors">
                              {card.title}
                            </h4>
                            <p className="text-xs text-eureka-slate">{card.category}</p>
                          </div>
                          <ExternalLink size={16} className="text-eureka-slate group-hover:text-eureka-blue transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Hero Bottom Bar */}
      <footer className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-4 flex flex-row items-center justify-between text-xs font-mono text-eureka-slate border-t border-eureka-border gap-3">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-semibold">Web · Brand · CMS · Engineering</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-eureka-blue flex items-center gap-2 text-xs font-semibold">
            <span className="w-2 h-2 bg-eureka-blue rounded-full blue-dot-pulse shrink-0" />
            Taking New Clients
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-eureka-slate font-semibold">(SCROLL)</span>
          <div className="w-px h-6 bg-slate-300 relative overflow-hidden">
            <motion.div
              className="w-full h-full bg-eureka-blue"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="hidden md:block">
          <span>Available for global partnerships</span>
        </div>
      </footer>
    </section>
  );
}

