"use client";

import { motion } from "framer-motion";

export default function MissionSection() {
  const principles = [
    {
      num: "01",
      title: "Creative Thinking",
      desc: "Every project starts with deep inquiry, challenging defaults and uncovering brand truth.",
    },
    {
      num: "02",
      title: "Digital Execution",
      desc: "Immaculate front-end engineering, Swiss typography grids, and ultra-fast responsive platforms.",
    },
    {
      num: "03",
      title: "Long-term Partnerships",
      desc: "We build digital identities designed to adapt, scale, and thrive for years to come.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-dark-gray/40 border-b border-border-gray/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Tag */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
            04 // MISSION & PHILOSOPHY
          </span>
        </div>

        {/* Large Narrative Headline */}
        <div className="max-w-5xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-off-white leading-[1.15]">
            We believe good digital work should do more than look good.{" "}
            <span className="text-soft-gray">
              It must build clarity, command authority, and move businesses forward.
            </span>
          </h2>
        </div>

        {/* Narrative Description & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-border-gray/50">
          
          <div className="lg:col-span-5 text-editorial-sub text-soft-gray leading-relaxed space-y-6">
            <p>
              Ethio-Eureka exists to help businesses communicate better, look more credible, and compete in a digital-first world.
            </p>
            <p className="text-sm font-mono text-soft-gray/80">
              Operating out of Addis Ababa with a global aesthetic standard, we craft digital platforms that balance creative courage with technical precision.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {principles.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-deep-black/60 p-6 border border-border-gray/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-eureka-green mb-3 block">{item.num}</span>
                  <h3 className="text-lg font-semibold text-off-white mb-2">{item.title}</h3>
                  <p className="text-xs text-soft-gray leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
