"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Zap, Globe, Users, Shield, ArrowRight } from "lucide-react";
import { siteData } from "@/lib/data";

const featureIcons = [Zap, Globe, Users, Shield];

export default function WhySection() {
  const { whyUs } = siteData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="why" ref={sectionRef} className="py-24 md:py-40 lg:py-48 bg-slate-50 border-b border-eureka-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-eureka-indigo/3 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="mb-16 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {whyUs.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight max-w-3xl mx-auto">
            {whyUs.headline}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {whyUs.features.map((feature, idx) => {
            const IconComponent = featureIcons[idx % featureIcons.length];
            const numStr = String(idx + 1).padStart(2, "0");
            
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative bg-white/90 backdrop-blur-md border border-eureka-border/50 rounded-3xl p-8 flex flex-col justify-between hover:border-eureka-blue/30 hover:shadow-eureka-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-eureka-blue/5 via-transparent to-eureka-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-5">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-eureka-blue/10 to-eureka-indigo/10 border border-eureka-blue/20 flex items-center justify-center"
                  >
                    <IconComponent size={28} className="text-eureka-blue" />
                  </motion.div>

                  <motion.span
                    className="text-5xl font-mono font-bold text-eureka-blue/20 group-hover:text-eureka-blue/40 transition-colors duration-500 block"
                  >
                    {numStr}
                  </motion.span>

                  <h3 className="text-xl font-bold text-eureka-dark group-hover:text-eureka-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-eureka-slate leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <motion.div
                  className="mt-8 pt-6 border-t border-eureka-border/30 flex items-center justify-between font-mono text-[10px] text-eureka-slate uppercase tracking-wider font-semibold relative z-10"
                >
                  <span>PRINCIPLE // {numStr}</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="text-eureka-blue group-hover:text-eureka-indigo flex items-center gap-1"
                  >
                    <ArrowRight size={12} />
                    <span>Learn more</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-editorial-sub text-eureka-slate max-w-2xl mx-auto mb-8">
            Ready to work with a partner who obsesses over every detail?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:shadow-eureka-xl transition-all duration-500 group"
          >
            <span>Start a Project</span>
            <motion.span whileHover={{ x: 4 }}><ArrowRight size={18} /></motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}