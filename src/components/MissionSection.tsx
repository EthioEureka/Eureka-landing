"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { siteData } from "@/lib/data";

export default function MissionSection() {
  const { mission } = siteData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const pillarContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pillarItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="mission" ref={sectionRef} className="py-24 md:py-40 lg:py-48 bg-white border-b border-eureka-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-eureka-blue/3 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {mission.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight max-w-4xl">
            {mission.headline}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-12 border-t border-eureka-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="lg:col-span-5 text-editorial-sub text-eureka-slate leading-relaxed space-y-8 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative pl-6 border-l-2 border-eureka-blue/30">
              <p className="font-medium text-eureka-dark text-lg md:text-xl leading-relaxed">
                {mission.description}
              </p>
            </div>

        
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            variants={pillarContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {mission.pillars.map((item, idx) => (
                <motion.div
                  key={item.number}
                  variants={pillarItemVariants}
                  className="group relative bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-eureka-border/50 shadow-eureka-sm hover:shadow-eureka-xl hover:border-eureka-blue/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-eureka-blue/5 via-transparent to-eureka-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 space-y-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-eureka-blue/10 to-eureka-indigo/10 border border-eureka-blue/20 flex items-center justify-center"
                    >
                      <span className="text-2xl font-mono font-bold text-eureka-blue">{item.number}</span>
                    </motion.div>

                    <h3 className="text-lg md:text-xl font-bold text-eureka-dark group-hover:text-eureka-blue transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-eureka-slate leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <motion.div
                      className="pt-4 border-t border-eureka-border/30 flex items-center gap-2 font-mono text-[10px] text-eureka-slate uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                    >
                      <span>PRINCIPLE</span>
                      <span className="text-eureka-blue/50">//</span>
                      <span>{item.number}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}