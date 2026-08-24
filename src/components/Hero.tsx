"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight, Check, ExternalLink, Sparkles, Layout, Share2, PenTool, Layers } from "lucide-react";

// Card data configuration array
interface HeroCardData {
  id: string;
  title: string;
  category: string;
  type: "website" | "brand" | "dashboard" | "mobile" | "social" | "poster";
  image: string;
  // Positional configuration for desktop canvas
  left: string;
  top: string;
  width: string;
  rotateZ: number;
  rotateY: number;
  rotateX: number;
  zIndex: number;
  depth: number; // 1 = background, 2 = midground, 3 = foreground
  floatDuration: number;
  floatDistance: number;
  delay: number;
  hasLightBar?: boolean;
}

const HERO_CARDS: HeroCardData[] = [
  {
    id: "card-01",
    title: "Abyssinia Craft",
    category: "Luxury E-Commerce & Brand",
    type: "website",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    left: "52%",
    top: "-5%",
    width: "360px",
    rotateZ: -2,
    rotateY: 6,
    rotateX: -3,
    zIndex: 20,
    depth: 3,
    floatDuration: 7,
    floatDistance: 14,
    delay: 0,
  },
  {
    id: "card-02",
    title: "Ethio-Eureka Brand System",
    category: "Identity & Visual Strategy",
    type: "brand",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    left: "48%",
    top: "30%",
    width: "420px",
    rotateZ: 1.5,
    rotateY: -5,
    rotateX: 4,
    zIndex: 30,
    depth: 3,
    floatDuration: 8.5,
    floatDistance: -16,
    delay: 0.2,
    hasLightBar: true,
  },
  {
    id: "card-03",
    title: "Kality Freight Portal",
    category: "Supply Chain & Logistics UI",
    type: "dashboard",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    left: "58%",
    top: "65%",
    width: "390px",
    rotateZ: -3,
    rotateY: 8,
    rotateX: -2,
    zIndex: 25,
    depth: 3,
    floatDuration: 9,
    floatDistance: 18,
    delay: 0.4,
  },
  {
    id: "card-04",
    title: "Nile Capital Mobile App",
    category: "Fintech Mobile Interface",
    type: "mobile",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    left: "25%",
    top: "42%",
    width: "280px",
    rotateZ: 4,
    rotateY: -8,
    rotateX: 5,
    zIndex: 15,
    depth: 2,
    floatDuration: 6.5,
    floatDistance: -12,
    delay: 0.3,
  },
  {
    id: "card-05",
    title: "Zoma Sustainable Monograph",
    category: "Editorial Architecture",
    type: "website",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    left: "75%",
    top: "22%",
    width: "340px",
    rotateZ: -4,
    rotateY: 10,
    rotateX: -4,
    zIndex: 10,
    depth: 1,
    floatDuration: 10,
    floatDistance: 15,
    delay: 0.5,
  },
  {
    id: "card-06",
    title: "Creative Storytelling Grid",
    category: "Social Media Campaign",
    type: "social",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    left: "22%",
    top: "5%",
    width: "300px",
    rotateZ: 3,
    rotateY: -6,
    rotateX: 2,
    zIndex: 8,
    depth: 1,
    floatDuration: 11,
    floatDistance: -18,
    delay: 0.6,
  },
  {
    id: "card-07",
    title: "Design System Tokens",
    category: "Graphic & UI Component Framework",
    type: "poster",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    left: "40%",
    top: "78%",
    width: "320px",
    rotateZ: -2,
    rotateY: 4,
    rotateX: -3,
    zIndex: 12,
    depth: 2,
    floatDuration: 7.8,
    floatDistance: 12,
    delay: 0.4,
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Mouse position state for subtle parallax and radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Handle mouse movement across hero section
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
      
      {/* 8 Vertical Column Lines */}
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

      {/* Dot Matrix Pattern (Lower-Left / Center Area) */}
      <div className="absolute bottom-16 left-12 z-0 pointer-events-none opacity-20 hidden md:block">
        <div className="grid grid-cols-8 gap-3 font-mono text-[10px] text-soft-gray select-none">
          {[...Array(32)].map((_, i) => (
            <span key={`dot-${i}`}>•</span>
          ))}
        </div>
      </div>

      {/* Radial Depth Lighting behind Cards (Green Glow) */}
      <div
        className="absolute top-[25%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.04), transparent 60%)",
        }}
      />

      {/* Dynamic Cursor Light Overlay */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(184, 255, 61, 0.025), transparent 65%)",
          x: smoothMouseX,
          y: smoothMouseY,
          top: "50%",
          left: "50%",
          marginLeft: "-250px",
          marginTop: "-250px",
        }}
      />


      {/* 3. HERO MAIN CONTENT CANVAS (GRID & CARD STAGE) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full my-auto pt-32 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: EDITORIAL COPY, ACTION PILLS & SERVICE MICRO-LIST */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-20">
          
          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase font-semibold">
              ETHIOPIA → THE WORLD
            </span>
            <span className="text-xs font-mono text-white/20">/</span>
            <span className="text-xs font-mono text-soft-gray uppercase tracking-widest">
              CREATIVE DIGITAL STUDIO
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-headline font-normal text-off-white mb-8 tracking-tight max-w-[700px] leading-[0.98]"
          >
            Digital experiences <br />
            that make brands <br />
            <span className="italic font-serif text-soft-gray underline decoration-eureka-green decoration-2 underline-offset-8">
              impossible
            </span>{" "}
            to ignore.
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-base sm:text-lg text-white/60 max-w-[520px] mb-10 leading-relaxed font-normal"
          >
            Ethio-Eureka builds websites, brands, and digital experiences that help ambitious businesses look better, communicate clearly, and grow online.
          </motion.p>

          {/* CTA Buttons: Off-white Primary Pill + Dark Ghost Secondary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-off-white text-deep-black font-medium text-sm rounded-full px-8 py-4 hover:bg-eureka-green transition-all duration-300 group shadow-xl shadow-white/5"
            >
              <span>Start a project</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-3 bg-[#151515] border border-white/15 text-off-white font-medium text-sm rounded-full px-8 py-4 hover:border-eureka-green hover:text-eureka-green transition-all duration-300 group"
            >
              <span>View our work</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Service Micro-List Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/[0.08] max-w-[540px]"
          >
            <div className="flex items-center gap-2.5 text-xs text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green" />
              <span>Website Design & Dev</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green" />
              <span>Branding & Identity</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green" />
              <span>Content & Social Media</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-soft-gray font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-green" />
              <span>Graphic & Editorial Design</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: 3D ANIMATED FLOATING CARD STAGE (.hero-card-stage) */}
        <div className="lg:col-span-6 xl:col-span-6 relative h-[640px] sm:h-[720px] w-full hidden lg:block">
          <div className="hero-card-stage absolute inset-0 w-full h-full">
            {HERO_CARDS.map((card) => (
              <FloatingCard
                key={card.id}
                card={card}
                mouseX={smoothMouseX}
                mouseY={smoothMouseY}
              />
            ))}
          </div>
        </div>

      </div>


      {/* 4. BOTTOM HERO METADATA & SCROLL INDICATOR */}
      <footer className="relative z-40 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-6 flex items-center justify-between text-xs font-mono text-soft-gray border-t border-white/[0.06]">
        {/* Left Info */}
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Web · Brand · Content · Social</span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="text-eureka-green">BUILDING FROM ETHIOPIA → GLOBAL</span>
        </div>

        {/* Center Scroll Indicator Line */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest text-soft-gray/80">Scroll</span>
          <div className="w-px h-6 bg-white/20 relative overflow-hidden">
            <motion.div
              className="w-full h-full bg-eureka-green"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Right Info */}
        <div className="hidden md:block">
          <span>Available for selected projects</span>
        </div>
      </footer>

      {/* Far-Right Edge Illuminated Vertical Accent Bar */}
      <div className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-gradient-to-b from-transparent via-eureka-green/40 to-transparent pointer-events-none hidden lg:block" />
    </section>
  );
}

// ----------------------------------------------------------------------
// INDIVIDUAL FLOATING PROJECT CARD COMPONENT WITH 3D PERSPECTIVE & TILT
// ----------------------------------------------------------------------

interface FloatingCardProps {
  card: HeroCardData;
  mouseX: any;
  mouseY: any;
}

function FloatingCard({ card, mouseX, mouseY }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax offset calculated based on depth (background = 0.02, midground = 0.04, foreground = 0.07)
  const parallaxMultiplier = card.depth === 1 ? 0.02 : card.depth === 2 ? 0.04 : 0.07;
  const parallaxX = useTransform(mouseX, (x: number) => x * parallaxMultiplier);
  const parallaxY = useTransform(mouseY, (y: number) => y * parallaxMultiplier);

  // Opacity & scale based on depth layer
  const depthOpacity = card.depth === 1 ? 0.5 : card.depth === 2 ? 0.8 : 1;
  const depthScale = card.depth === 1 ? 0.88 : card.depth === 2 ? 0.95 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={{
        opacity: depthOpacity,
        y: [0, card.floatDistance, 0],
        scale: depthScale,
      }}
      transition={{
        opacity: { duration: 0.8, delay: card.delay + 0.8 },
        scale: { duration: 0.8, delay: card.delay + 0.8 },
        y: {
          duration: card.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.delay,
        },
      }}
      style={{
        position: "absolute",
        left: card.left,
        top: card.top,
        width: card.width,
        zIndex: card.zIndex,
        x: parallaxX,
        y: parallaxY,
      }}
      className="transform-gpu transition-all duration-300"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          rotateZ: isHovered ? 0 : card.rotateZ,
          rotateY: isHovered ? 0 : card.rotateY,
          rotateX: isHovered ? 0 : card.rotateX,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
        className={`group relative bg-[#151515] border ${
          isHovered ? "border-eureka-green/80 shadow-2xl shadow-eureka-green/10" : "border-white/10"
        } rounded-[18px] p-3 transition-colors duration-300 shadow-2xl backdrop-blur-md cursor-pointer`}
      >
        {/* Optional Green Edge Light Bar (Inspired by reference) */}
        {card.hasLightBar && (
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-eureka-green rounded-full shadow-[0_0_20px_rgba(184,255,61,0.6)] z-30" />
        )}

        <Link href="/work" className="block">
          {/* Card Technical Display Bezel Frame */}
          <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl p-2.5 relative overflow-hidden">
            
            {/* Top Bar Status Dots & Category */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] font-mono text-[10px] text-soft-gray">
              <div className="flex items-center gap-1.2">
                <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
              </div>
              <span className="text-white/40 truncate max-w-[120px]">{card.category}</span>
            </div>

            {/* Inner Project Visual Container */}
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/50">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Hover Badge Indicator "VIEW PROJECT →" */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-eureka-green text-deep-black font-semibold font-mono text-[10px] uppercase px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
                <span>VIEW PROJECT</span>
                <ArrowRight size={10} />
              </div>
            </div>

            {/* Bottom Card Title Banner */}
            <div className="flex items-center justify-between pt-2.5 px-1">
              <div>
                <h4 className="text-xs font-semibold text-off-white group-hover:text-eureka-green transition-colors">
                  {card.title}
                </h4>
                <p className="text-[10px] font-mono text-soft-gray">{card.category}</p>
              </div>
              <ExternalLink size={12} className="text-soft-gray group-hover:text-eureka-green transition-colors" />
            </div>

          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
