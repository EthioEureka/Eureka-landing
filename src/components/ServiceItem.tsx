"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Layout, Sparkles, FileText, Share2, PenTool, CheckCircle2, Zap, Globe, Palette, Database, Layers, Cpu } from "lucide-react";
import { Service } from "@/lib/types";
import Link from "next/link";

interface ServiceItemProps {
  service: Service;
  index: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Layout,
  Sparkles,
  FileText,
  Share2,
  PenTool,
  Zap,
  Globe,
  Palette,
  Database,
  Layers,
  Cpu,
};

const defaultIcons = [Layout, Sparkles, FileText, Share2, PenTool, Zap, Globe, Palette, Database, Layers, Cpu];

export default function ServiceItem({ service, index }: ServiceItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : defaultIcons[index % defaultIcons.length];

  const formatNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`transition-all duration-500 ease-out ${
          isOpen ? "bg-slate-50/80 border-b border-eureka-border/50" : "hover:bg-slate-50/40 border-b border-eureka-border/50"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-10 md:py-12 px-6 md:px-12 flex items-center justify-between text-left group transition-all duration-300"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-6 md:gap-12">
            <motion.span
              className="font-mono text-sm md:text-base font-semibold text-eureka-slate group-hover:text-eureka-blue transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              {formatNumber(index + 1)}
            </motion.span>

            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-eureka-blue/10 to-eureka-indigo/10 border border-eureka-blue/20 flex items-center justify-center shrink-0 group-hover:border-eureka-blue/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 3 }}
              >
                <IconComponent size={24} className="text-eureka-blue" />
              </motion.div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-eureka-dark group-hover:text-eureka-blue transition-colors duration-300">
                {service.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.span
              className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-eureka-slate"
              whileHover={{ x: 4 }}
            >
              {service.short_description.substring(0, 60)}...
            </motion.span>

            <motion.div
              className={`w-12 h-12 rounded-full border flex items-center justify-center text-eureka-slate group-hover:border-eureka-blue group-hover:text-eureka-blue transition-all duration-300 ${
                isOpen
                  ? "bg-eureka-blue text-white border-eureka-blue shadow-eureka-md"
                  : "bg-white border-eureka-border shadow-sm"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-12 px-6 md:px-12 pl-12 md:pl-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-eureka-border/50 pt-8">
                
                <div className="lg:col-span-7">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-lg md:text-xl font-bold text-eureka-dark mb-4 leading-relaxed"
                  >
                    {service.short_description}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-sm md:text-base text-eureka-slate leading-relaxed mb-8 max-w-2xl"
                  >
                    {service.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-eureka-blue hover:text-eureka-indigo transition-colors group"
                  >
                    <span>Inquire about this service</span>
                    <motion.span whileHover={{ x: 4 }}><ArrowUpRight size={14} /></motion.span>
                  </motion.div>
                </div>

                {service.deliverables && service.deliverables.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="lg:col-span-5 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-eureka-border/50 font-sans text-xs text-eureka-slate shadow-eureka-sm hover:shadow-eureka-md transition-shadow"
                  >
                    <p className="text-eureka-dark font-extrabold mb-5 border-b border-eureka-border/50 pb-3 uppercase tracking-wider font-mono text-sm">
                      DELIVERABLES & PROCESS
                    </p>
                    <ul className="space-y-3">
                      {service.deliverables.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors group"
                        >
                          <CheckCircle2 size={16} className="text-eureka-blue shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}