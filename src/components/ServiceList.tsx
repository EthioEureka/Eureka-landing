"use client";

import { motion, Variants } from "framer-motion";
import ServiceItem from "./ServiceItem";
import { Service } from "@/lib/types";
import { siteData } from "@/lib/data";

interface ServiceListProps {
  services: Service[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <section id="services" className="py-24 md:py-40 lg:py-48 bg-white border-b border-eureka-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-eureka-blue/3 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase mb-4">
                <span className="w-2 h-2 bg-eureka-blue rounded-full" />
                {siteData.services.sectionTag}
              </span>
              <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
                {siteData.services.headline}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-editorial-sub text-eureka-slate font-normal leading-relaxed">
                {siteData.services.subtext}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-eureka-border/50"
        >
          {services.map((service, index) => (
            <motion.div key={service.id || service.slug} variants={itemVariants}>
              <ServiceItem service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}