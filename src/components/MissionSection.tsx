"use client";

import { motion } from "framer-motion";
import { siteData } from "@/lib/data";

export default function MissionSection() {
  const { mission } = siteData;

  return (
    <section id="mission" className="py-24 md:py-36 bg-white border-b border-eureka-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Tag */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {mission.sectionTag}
          </span>
        </div>

        {/* Large Narrative Headline */}
        <div className="max-w-5xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-eureka-dark leading-[1.2]">
            {mission.headline}
          </h2>
        </div>

        {/* Narrative Description & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-eureka-border">
          
          <div className="lg:col-span-5 text-editorial-sub text-eureka-slate leading-relaxed space-y-6">
            <p className="font-medium text-eureka-dark">
              {mission.description}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {mission.pillars.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl border border-eureka-border flex flex-col justify-between shadow-eureka-sm"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-eureka-blue mb-3 block">{item.number}</span>
                  <h3 className="text-lg font-bold text-eureka-dark mb-2">{item.title}</h3>
                  <p className="text-xs text-eureka-slate leading-relaxed font-normal">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

