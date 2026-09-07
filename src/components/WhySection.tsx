"use client";

import { motion } from "framer-motion";
import { siteData } from "@/lib/data";

export default function WhySection() {
  const { whyUs } = siteData;

  return (
    <section className="py-24 md:py-36 bg-slate-50 border-b border-eureka-border relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {whyUs.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
            {whyUs.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.features.map((feature, idx) => {
            const numStr = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-eureka-border rounded-2xl p-8 flex flex-col justify-between hover:border-eureka-blue hover:shadow-eureka-md transition-all group"
              >
                <div>
                  <span className="text-4xl font-mono font-bold text-eureka-blue block mb-6 transition-colors">
                    {numStr}
                  </span>
                  <h3 className="text-xl font-bold text-eureka-dark mb-3 group-hover:text-eureka-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-eureka-slate leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-eureka-border font-mono text-[10px] text-eureka-slate uppercase tracking-wider font-semibold">
                  PRINCIPLE // {numStr}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

