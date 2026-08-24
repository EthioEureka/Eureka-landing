"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-border-gray/50">
      {/* Background Subtle Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-eureka-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end z-10 my-auto">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          {/* Metadata Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-eureka-green green-dot-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase font-semibold">
              ETHIOPIA → THE WORLD
            </span>
            <span className="text-xs font-mono text-border-gray">/</span>
            <span className="text-xs font-mono text-soft-gray uppercase tracking-widest hidden sm:inline">
              ADDIS ABABA STUDIO
            </span>
          </motion.div>

          {/* Staggered Statement Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-headline font-semibold text-off-white mb-8 max-w-4xl tracking-tight"
          >
            Digital experiences built to make your business{" "}
            <span className="italic font-light text-soft-gray underline decoration-eureka-green decoration-2 underline-offset-8">
              impossible
            </span>{" "}
            to ignore.
          </motion.h1>

          {/* Subheading / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-editorial-sub text-soft-gray max-w-2xl mb-10 font-normal"
          >
            We build brands, websites, and digital experiences that move businesses forward.
            Independent creative studio combining strategy, design, and modern technology.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-eureka-green text-deep-black font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300 group shadow-lg shadow-eureka-green/10"
            >
              <span>Start a project</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#work"
              className="inline-flex items-center gap-3 border border-border-gray text-off-white font-mono text-xs uppercase tracking-widest px-8 py-4 hover:border-eureka-green hover:text-eureka-green transition-all duration-300 group"
            >
              <span>View our work</span>
              <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Abstract Geometric Studio Visual Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-4 relative flex flex-col justify-end items-end hidden lg:flex"
        >
          <div className="w-full aspect-square border border-border-gray bg-dark-gray/60 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm group">
            
            {/* Top metadata corner */}
            <div className="flex justify-between items-center text-[11px] font-mono text-soft-gray border-b border-border-gray/40 pb-3 w-full">
              <span>SYS // 2026</span>
              <span className="text-eureka-green">STATUS: ACTIVE</span>
            </div>

            {/* Geometric interactive graphic composition */}
            <div className="relative my-auto flex flex-col items-center justify-center w-full py-8">
              <div className="w-32 h-32 rounded-full border border-eureka-green/40 flex items-center justify-center relative animate-pulseSlow">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-eureka-green/20 rounded-full flex items-center justify-center border border-eureka-green">
                    <div className="w-3 h-3 bg-eureka-green rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating coordinates badge */}
              <div className="mt-6 text-center font-mono text-xs text-soft-gray">
                <p className="text-off-white font-semibold tracking-wider">9.0300° N, 38.7400° E</p>
                <p className="text-[10px] text-soft-gray/70">ADDIS ABABA / GLOBAL DIGITAL SERVICES</p>
              </div>
            </div>

            {/* Bottom info caption */}
            <div className="flex justify-between items-center text-[10px] font-mono text-soft-gray pt-3 border-t border-border-gray/40 w-full">
              <span>01 / DESIGN</span>
              <span>02 / DEV</span>
              <span>03 / IDENTITY</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Hero Status Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex justify-between items-center text-xs font-mono text-soft-gray">
        <div className="flex items-center gap-4">
          <span className="text-eureka-green">↓ SCROLL TO EXPLORE</span>
        </div>
        <div className="hidden sm:block">
          <span>ETHIO-EUREKA © 2026</span>
        </div>
      </div>
    </section>
  );
}
