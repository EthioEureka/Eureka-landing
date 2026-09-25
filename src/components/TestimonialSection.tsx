"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { siteData } from "@/lib/data";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  // Duplicate items 4x to guarantee a seamless 50% infinite marquee loop
  const marqueeCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 md:py-36 bg-slate-50 border-b border-eureka-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-eureka-blue rounded-full" />
          {siteData.testimonials.sectionTag}
        </span>
        <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
          {siteData.testimonials.headline}
        </h2>
      </div>

      {/* Infinite Horizontal Moving Loop Ticker Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-10" />

        {/* Continuous 50% X Infinite Motion Ticker (No hover stop) */}
        <motion.div
          className="flex gap-6 md:gap-8 items-stretch"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: Math.max(25, testimonials.length * 8),
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {marqueeCards.map((t, idx) => (
            <div
              key={`${t.id || idx}-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 bg-white border border-eureka-border rounded-2xl p-8 flex flex-col justify-between relative shadow-eureka-sm hover:border-eureka-blue hover:shadow-eureka-md transition-all"
            >
              <Quote className="text-eureka-blue/40 mb-6 shrink-0" size={32} />

              <p className="text-sm md:text-base text-eureka-dark font-normal leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-eureka-border pt-6 mt-auto">
                {t.photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-eureka-border shrink-0 shadow-sm">
                    <Image src={t.photo} alt={t.client_name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-eureka-border flex items-center justify-center font-mono text-xs text-eureka-blue font-bold shrink-0">
                    {t.client_name.substring(0, 2).toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-extrabold text-eureka-dark">{t.client_name}</h4>
                  <p className="text-xs font-sans text-eureka-slate">
                    {t.role} {t.company && `· ${t.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

