"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function IntroSection() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const words = [
    { text: "Ethio-Eureka", highlight: false },
    { text: "is", highlight: false },
    { text: "a", highlight: false },
    { text: "creative", highlight: false },
    { text: "digital", highlight: false },
    { text: "studio", highlight: false },
    { text: "helping", highlight: false },
    { text: "ambitious", highlight: false },
    { text: "businesses", highlight: false },
    { text: "turn", highlight: false },
    { text: "ideas", highlight: false },
    { text: "into", highlight: false },
    { text: "brands,", highlight: true, key: "brands" },
    { text: "websites,", highlight: true, key: "websites" },
    { text: "and", highlight: false },
    { text: "digital", highlight: true, key: "digital experiences" },
    { text: "experiences", highlight: true, key: "digital experiences" },
    { text: "people", highlight: false },
    { text: "remember.", highlight: true, key: "remember" },
  ];

  return (
    <section className="py-24 md:py-36 bg-dark-gray/40 border-b border-border-gray/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Metadata Tag */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono tracking-[0.2em] text-soft-gray uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
              01 // POSITIONING
            </span>
            <p className="mt-4 text-xs font-mono text-soft-gray/80 leading-relaxed max-w-xs">
              Studio philosophy centered around strategic clarity, visual restraint, and structural longevity.
            </p>
          </div>

          {/* Right Large Editorial Paragraph */}
          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-off-white"
            >
              {words.map((item, idx) => (
                <span
                  key={idx}
                  onMouseEnter={() => item.key && setHoveredWord(item.key)}
                  onMouseLeave={() => setHoveredWord(null)}
                  className={`inline-block mr-[0.28em] transition-all duration-300 ${
                    item.highlight
                      ? hoveredWord === item.key
                        ? "text-eureka-green font-semibold scale-105 underline decoration-eureka-green underline-offset-8"
                        : "text-off-white border-b border-eureka-green/50 cursor-pointer"
                      : "text-soft-gray hover:text-off-white"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </motion.div>

            {/* Bottom highlight footnote indicator */}
            <div className="mt-12 pt-8 border-t border-border-gray/50 flex flex-wrap justify-between items-center text-xs font-mono text-soft-gray">
              <span></span>
              <span className="text-eureka-green">ETHIO-EUREKA CREATIVE TEAM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
