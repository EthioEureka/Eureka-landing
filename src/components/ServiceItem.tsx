"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Layout, Sparkles, FileText, Share2, PenTool, CheckCircle2 } from "lucide-react";
import { Service } from "@/lib/types";
import Link from "next/link";

interface ServiceItemProps {
  service: Service;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={24} className="text-eureka-blue" />,
  Sparkles: <Sparkles size={24} className="text-eureka-blue" />,
  FileText: <FileText size={24} className="text-eureka-blue" />,
  Share2: <Share2 size={24} className="text-eureka-blue" />,
  PenTool: <PenTool size={24} className="text-eureka-blue" />,
};

export default function ServiceItem({ service, index }: ServiceItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div
      className={`border-b border-eureka-border transition-all duration-300 ${
        isOpen ? "bg-slate-50/80" : "hover:bg-slate-50/40"
      }`}
    >
      {/* Header Row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 md:py-10 px-6 md:px-12 flex items-center justify-between text-left group transition-all"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6 md:gap-12">
          {/* Index Number */}
          <span className="font-mono text-sm md:text-base font-semibold text-eureka-slate group-hover:text-eureka-blue transition-colors">
            {formatNumber(index + 1)}
          </span>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-eureka-dark group-hover:text-eureka-blue group-hover:translate-x-1 transition-all">
            {service.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Icon Badge on Hover */}
          <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity">
            {service.icon && iconMap[service.icon]}
          </span>

          {/* Expand/Collapse Toggle */}
          <div
            className={`w-10 h-10 rounded-full border border-eureka-border flex items-center justify-center text-eureka-slate group-hover:border-eureka-blue group-hover:text-eureka-blue transition-all ${
              isOpen ? "bg-eureka-blue text-white border-eureka-blue shadow-sm" : "bg-white shadow-sm"
            }`}
          >
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </div>
        </div>
      </button>

      {/* Accordion Expandable Details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 px-6 md:px-12 pl-12 md:pl-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-eureka-border/60 pt-6">
              
              <div className="md:col-span-8">
                <p className="text-lg md:text-xl font-bold text-eureka-dark mb-4 leading-relaxed">
                  {service.short_description}
                </p>
                <p className="text-sm md:text-base text-eureka-slate leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-eureka-blue hover:text-eureka-indigo transition-colors"
                >
                  <span>Inquire about this service</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-eureka-border font-sans text-xs text-eureka-slate shadow-sm">
                  <p className="text-eureka-dark font-extrabold mb-3 border-b border-eureka-border pb-2 uppercase tracking-wider font-mono">
                    DELIVERABLES & PROCESS
                  </p>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-eureka-blue shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

