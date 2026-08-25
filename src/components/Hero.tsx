"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowDownRight, ExternalLink } from "lucide-react";

import { Project } from "@/lib/types";

interface HeroProps {
  projects?: Project[];
}

// 3D Animated Logo Showcase Component when no projects are present
function Logo3DCard() {
  return (
    <div className="relative w-full h-[620px] flex items-center justify-center p-6 bg-[#0E0E0E]/80 rounded-2xl border border-white/[0.08] backdrop-blur-md overflow-hidden group">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,255,61,0.14),transparent_70%)] pointer-events-none" />
      
      {/* Animated 3D Floating Rings */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[460px] h-[460px] rounded-full border border-eureka-green/20 border-dashed opacity-40 pointer-events-none"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.95, 1.1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[340px] h-[340px] rounded-full border border-eureka-green/30 opacity-30 pointer-events-none"
      />

      {/* 3D Floating Glass Pedestal Card */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotateX: [6, -6, 6],
          rotateY: [-10, 10, -10],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative z-10 w-full max-w-sm bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] border border-white/20 rounded-2xl p-8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(184,255,61,0.18)] flex flex-col items-center text-center space-y-6 group-hover:border-eureka-green/80 transition-colors duration-500"
      >
        {/* Floating 3D Logo Element */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative w-36 h-36 flex items-center justify-center rounded-2xl bg-deep-black border border-eureka-green/60 shadow-[0_0_35px_rgba(184,255,61,0.35)] group-hover:shadow-[0_0_60px_rgba(184,255,61,0.6)] transition-shadow duration-500"
        >
          <div className="relative w-24 h-24 filter drop-shadow-[0_12px_24px_rgba(184,255,61,0.5)]">
            <Image src="/logo.svg" alt="Ethio-Eureka 3D Logo" fill className="object-contain animate-pulse" />
          </div>

          <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-eureka-green" />
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-eureka-green" />
          <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-eureka-green" />
          <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-eureka-green" />
        </div>

        {/* 3D Typography */}
        <div style={{ transform: "translateZ(30px)" }} className="space-y-2 font-mono">
          <span className="text-[10px] text-eureka-green tracking-[0.25em] uppercase block font-semibold">
            ETHIO-EUREKA // Creative Digital Studio
          </span>
          <h3 className="text-xl font-sans font-bold text-off-white tracking-tight">
            Creative Technology Studio
          </h3>
          <p className="text-xs text-soft-gray max-w-xs leading-relaxed font-sans">
            Independent design & digital engineering agency crafting high-performance web products.
          </p>
        </div>

        {/* Status Badge */}
        <div style={{ transform: "translateZ(20px)" }}>
          <span className="inline-flex items-center gap-2 bg-eureka-green/10 text-eureka-green border border-eureka-green/40 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-eureka-green animate-ping" />
            Contact Us Now
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ projects }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Map real CMS projects to showcase card array (empty array if no DB projects exist)
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

  // Duplicate list for seamless infinite loop scroll
  const marqueeCards = [...displayCards, ...displayCards, ...displayCards];

  // Mouse position state for subtle radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

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
      className="relative min-h-screen w-full bg-[#0A0A0A] text-off-white overflow-hidden flex flex-col justify-between pt-6 pb-12"
      style={{ minHeight: "100svh" }}
    >
      {/* 1. TECHNICAL BACKGROUND GRID & AMBIENT DEPTH LAYER */}
      
      {/* Vertical Grid Column Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 pointer-events-none flex justify-between z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-grid-${i}`}
            className="w-px h-full bg-white/[0.04] hidden sm:block"
          />
        ))}
      </div>

      {/* Horizontal Baseline Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between opacity-40">
        <div className="w-full h-px bg-white/[0.04] mt-32" />
        <div className="w-full h-px bg-white/[0.04] mb-48" />
        <div className="w-full h-px bg-white/[0.04] mb-20" />
      </div>

      {/* Radial Depth Lighting */}
      <div
        className="absolute top-[20%] right-[10%] w-[650px] h-[650px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.05), transparent 65%)",
        }}
      />

      {/* Dynamic Cursor Light Overlay */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.03), transparent 65%)",
          x: smoothMouseX,
          y: smoothMouseY,
          top: "50%",
          left: "50%",
          marginLeft: "-250px",
          marginTop: "-250px",
        }}
      />

      {/* 2. HERO MAIN CONTENT CANVAS */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full my-auto pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: EDITORIAL COPY & BRANDING */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20 pt-0 sm:pt-2">
          
          {/* Eyebrow with Brand Logo Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6"
          >
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
              <Image src="/logo.svg" alt="Ethio-Eureka Icon" fill className="object-contain" />
            </div>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] text-eureka-green uppercase font-semibold">
              EUREKA CREATIVE
            </span>
            <span className="text-xs font-mono text-white/20">/</span>
            <span className="text-[11px] sm:text-xs font-mono text-soft-gray uppercase tracking-widest">
              DIGITAL STUDIO
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-headline font-normal text-off-white mb-6 sm:mb-8 tracking-tight max-w-[650px] leading-[1.04]"
          >
           If your product moves{" "}
            <span className="italic font-serif text-eureka-green decoration-2 underline-offset-8">
              fast
            </span>
            <br />
            Your website <br />
            <span className="italic font-serif text-soft-gray underline decoration-eureka-green decoration-2 underline-offset-8">
              should too.
            </span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-sm sm:text-lg text-white/60 max-w-[520px] mb-8 sm:mb-10 leading-relaxed font-normal"
          >
            Ethio-Eureka is a partner for ambitious brands helping them build, improve, and grow digital experiences that keep pace with their products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-off-white text-deep-black font-semibold text-sm rounded-full px-8 py-3.5 sm:py-4 hover:bg-eureka-green transition-all duration-300 group shadow-xl shadow-white/5 w-full sm:w-auto text-center"
            >
              <span>Start partnership</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-3 bg-[#151515] border border-white/15 text-off-white font-medium text-sm rounded-full px-8 py-3.5 sm:py-4 hover:border-eureka-green hover:text-eureka-green transition-all duration-300 group w-full sm:w-auto text-center"
            >
              <span>View work</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Feature Micro List */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 pt-6 border-t border-white/[0.08] max-w-[540px] w-full"
          >
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-lg text-[11px] text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green shrink-0" />
              <span className="truncate">Launch in 4-6 wks</span>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-lg text-[11px] text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green shrink-0" />
              <span className="truncate">Web & App Design</span>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-lg text-[11px] text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green shrink-0" />
              <span className="truncate">Brand Systems</span>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-lg text-[11px] text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green shrink-0" />
              <span className="truncate">High Growth Tech</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: SHOWCASE OR 3D LOGO FALLBACK */}
        <div className="lg:col-span-6 xl:col-span-6 relative h-[650px] w-full hidden lg:block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0E0E]/60 backdrop-blur-sm">
          
          {displayCards.length === 0 ? (
            <Logo3DCard />
          ) : (
            <>
              {/* Top & Bottom Fade Gradients */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-20 pointer-events-none" />

              {/* Vertical Continuous Marquee Container */}
              <div className="w-full h-full p-4 overflow-hidden">
                <div className="animate-marquee-vertical flex flex-col gap-6">
                  {marqueeCards.map((card, idx) => (
                    <Link
                      key={`${card.id}-${idx}`}
                      href={card.slug ? `/work/${card.slug}` : "/work"}
                      className="group relative bg-[#141414] border border-white/10 rounded-2xl p-3.5 transition-all duration-300 hover:border-eureka-green hover:scale-[1.01] hover:shadow-2xl hover:shadow-eureka-green/10 cursor-pointer block"
                    >
                      {/* Card macOS Window Bar */}
                      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-2.5 space-y-2.5">
                        
                        <div className="flex items-center justify-between font-mono text-[10px] text-soft-gray border-b border-white/[0.06] pb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>
                          <span className="text-white/40 truncate max-w-[160px] font-mono">{card.category}</span>
                        </div>

                        {/* Screenshot Preview */}
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/60">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                          {/* Hover Action Pill */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-eureka-green text-deep-black font-semibold font-mono text-[10px] uppercase px-3 py-1.5 rounded shadow-xl flex items-center gap-1.5">
                            <span>VIEW PROJECT</span>
                            <ExternalLink size={10} />
                          </div>
                        </div>

                        {/* Card Title Bar */}
                        <div className="flex items-center justify-between pt-1.5 px-1 font-mono text-xs">
                          <div>
                            <h4 className="font-semibold text-off-white group-hover:text-eureka-green transition-colors">
                              {card.title}
                            </h4>
                            <p className="text-[10px] text-soft-gray">{card.category}</p>
                          </div>
                          <ExternalLink size={14} className="text-soft-gray group-hover:text-eureka-green transition-colors" />
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

      {/* 3. BOTTOM HERO METADATA & SCROLL INDICATOR */}
      <footer className="relative z-40 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-4 sm:pt-6 flex flex-row items-center justify-between text-xs font-mono text-soft-gray border-t border-white/[0.06] gap-3">
        {/* Left Info */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Web · Brand · Content · Systems</span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="text-eureka-green flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full animate-pulse shrink-0" />
            Contact us now
          </span>
        </div>

        {/* Center Scroll Indicator Line */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-soft-gray/80">(SCROLL)</span>
          <div className="w-px h-5 sm:h-6 bg-white/20 relative overflow-hidden">
            <motion.div
              className="w-full h-full bg-eureka-green"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Right Info */}
        <div className="hidden md:block">
          <span>Available for selected partnerships</span>
        </div>
      </footer>

    </section>
  );
}
