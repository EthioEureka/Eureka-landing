"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Layout, Sparkles, FileText, Share2, PenTool } from "lucide-react";
import { Service } from "@/lib/types";
import Link from "next/link";

interface ServiceItemProps {
  service: Service;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={24} className="text-eureka-green" />,
  Sparkles: <Sparkles size={24} className="text-eureka-green" />,
  FileText: <FileText size={24} className="text-eureka-green" />,
  Share2: <Share2 size={24} className="text-eureka-green" />,
  PenTool: <PenTool size={24} className="text-eureka-green" />,
};

export default function ServiceItem({ service, index }: ServiceItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div
      className={`border-b border-border-gray/70 transition-all duration-300 ${
        isOpen ? "bg-dark-gray/60" : "hover:bg-dark-gray/30"
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
          <span className="font-mono text-sm md:text-base text-soft-gray group-hover:text-eureka-green transition-colors">
            {formatNumber(index + 1)}
          </span>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-off-white group-hover:text-eureka-green group-hover:translate-x-1 transition-all">
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
            className={`w-10 h-10 rounded-full border border-border-gray flex items-center justify-center text-soft-gray group-hover:border-eureka-green group-hover:text-eureka-green transition-all ${
              isOpen ? "bg-eureka-green text-deep-black border-eureka-green" : ""
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
            <div className="pb-10 px-6 md:px-12 pl-12 md:pl-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-border-gray/30 pt-6">
              
              <div className="md:col-span-8">
                <p className="text-lg md:text-xl font-normal text-off-white mb-4 leading-relaxed">
                  {service.short_description}
                </p>
                <p className="text-sm md:text-base text-soft-gray leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-eureka-green hover:underline decoration-eureka-green underline-offset-4"
                >
                  <span>Inquire about this service</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="md:col-span-4 bg-deep-black/60 p-6 border border-border-gray/50 font-mono text-xs text-soft-gray">
                <p className="text-off-white font-semibold mb-3 border-b border-border-gray/40 pb-2">
                  DELIVERABLES & PROCESS
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-eureka-green rounded-full" />
                    <span>Tailored Strategy & Direction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-eureka-green rounded-full" />
                    <span>Swiss Editorial Visual Standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-eureka-green rounded-full" />
                    <span>High-Performance Code Execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-eureka-green rounded-full" />
                    <span>Ongoing Support & Evolution</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
