"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Target, PenTool, Code, Rocket, Layers } from "lucide-react";
import { siteData } from "@/lib/data";

const stageIcons = [Target, PenTool, Code, Rocket];

export default function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState(0);
  const { process } = siteData;
  const stages = process.stages;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && activeStage < stages.length - 1) {
      const timer = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % stages.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isInView, activeStage]);

  return (
    <section id="process" ref={sectionRef} className="py-24 md:py-40 lg:py-48 bg-white border-b border-eureka-border relative overflow-hidden">
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
            {process.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
            {process.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-32 space-y-3">
              {stages.map((stage, idx) => (
                <motion.button
                  key={stage.num}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-400 flex items-center justify-between group ${
                    activeStage === idx
                      ? "bg-slate-50/80 backdrop-blur-sm border-eureka-blue text-eureka-dark shadow-eureka-md"
                      : "bg-white border-eureka-border/50 text-eureka-slate hover:border-eureka-blue/50 hover:text-eureka-dark hover:shadow-eureka-sm"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-semibold ${
                        activeStage === idx
                          ? "bg-gradient-to-br from-eureka-blue to-eureka-indigo text-white shadow-eureka-md"
                          : "bg-slate-50 border border-eureka-border/50 text-eureka-slate"
                      }`}
                      whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
                    >
                      {stage.num}
                    </motion.div>
                    <h3 className="text-lg font-bold tracking-tight">{stage.name}</h3>
                  </div>

                  <motion.div
                    className={`w-3 h-3 rounded-full transition-all duration-400 ${
                      activeStage === idx
                        ? "bg-eureka-blue scale-125 shadow-[0_0_0_4px_rgba(37,99,235,0.3)]"
                        : "bg-slate-300"
                    }`}
                    animate={{ scale: activeStage === idx ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 2, repeat: activeStage === idx ? Infinity : 0 }}
                  />
                </motion.button>
              ))}

              <motion.div
                className="mt-8 p-6 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-eureka-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                
                <p className="text-xs text-eureka-slate mt-2 text-center">
                  Stage {activeStage + 1} of {stages.length}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={detailsRef}
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-eureka-border/50 p-8 md:p-12 relative min-h-[420px] flex flex-col justify-between shadow-eureka-sm"
            >
              <div className="flex justify-between items-center border-b border-eureka-border/50 pb-4 mb-8">
                <span className="font-mono text-xs text-eureka-blue font-semibold uppercase tracking-wider">
                  STAGE {stages[activeStage].num} // {stages[activeStage].name.toUpperCase()}
                </span>
                <span className="font-mono text-xs font-semibold text-eureka-slate">
                  0{activeStage + 1} / 0{stages.length}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-eureka-blue/10 to-eureka-indigo/10 border border-eureka-blue/20 flex items-center justify-center shrink-0">
                    {(() => {
                      const Icon = stageIcons[activeStage];
                      return <Icon size={28} className="text-eureka-blue" />;
                    })()}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-eureka-blue uppercase tracking-wider font-semibold mb-1 block">
                      {stages[activeStage].name}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-eureka-dark">
                      {stages[activeStage].title}
                    </h3>
                  </div>
                </motion.div>

                <p className="text-base md:text-lg text-eureka-slate leading-relaxed font-normal max-w-3xl">
                  {stages[activeStage].description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border-t border-eureka-border/50 pt-8"
              >
                <h4 className="font-mono text-xs text-eureka-dark font-extrabold uppercase tracking-wider mb-6 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-eureka-blue" />
                  {process.deliverablesLabel}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stages[activeStage].deliverables.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + dIdx * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/90 border border-eureka-border/50 hover:border-eureka-blue/50 hover:shadow-eureka-sm transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-8 h-8 rounded-lg bg-eureka-blue/10 flex items-center justify-center shrink-0 text-eureka-blue"
                      >
                        <CheckCircle2 size={18} />
                      </motion.div>
                      <span className="font-medium text-eureka-dark group-hover:text-eureka-blue transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}