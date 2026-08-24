"use client";

import { motion } from "framer-motion";

export default function WhySection() {
  const cards = [
    {
      num: "01",
      title: "Think beyond the template",
      desc: "We don't start with a template and force your business into it. Every solution is custom-architected.",
    },
    {
      num: "02",
      title: "Design with purpose",
      desc: "Every visual decision serves a clear brand objective or user experience goal — no superficial decoration.",
    },
    {
      num: "03",
      title: "Built for growth",
      desc: "Your website and brand identity are engineered to evolve effortlessly as your company expands globally.",
    },
    {
      num: "04",
      title: "One creative partner",
      desc: "Strategy, visual design, development, content, and social media management connected seamlessly under one roof.",
    },
  ];

  return (
    <section className="py-24 md:py-36 border-b border-border-gray/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
            05 // THE ETHIO-EUREKA DIFFERENCE
          </span>
          <h2 className="text-section-headline font-semibold text-off-white">
            Why work with us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-dark-gray/40 border border-border-gray/70 p-8 flex flex-col justify-between hover:border-eureka-green/70 transition-colors group"
            >
              <div>
                <span className="text-4xl font-mono font-light text-eureka-green/70 group-hover:text-eureka-green block mb-6 transition-colors">
                  {card.num}
                </span>
                <h3 className="text-xl font-medium text-off-white mb-3 group-hover:text-eureka-green transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-soft-gray leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border-gray/40 font-mono text-[10px] text-soft-gray uppercase tracking-widest">
                PRINCIPLE // {card.num}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
