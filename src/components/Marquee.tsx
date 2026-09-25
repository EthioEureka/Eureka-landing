"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Partner } from "@/lib/types";

interface MarqueeProps {
  items?: string[];
  partners?: Partner[];
  speed?: "normal" | "slow" | "fast";
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  partners,
  speed = "normal",
  reverse = false,
  className = "",
}: MarqueeProps) {
  const isPartnerMarquee = partners !== undefined;

  const speedConfig = {
    fast: 15,
    normal: 25,
    slow: 40,
  };

  const duration = speedConfig[speed];

  if (isPartnerMarquee) {
    if (!partners || partners.length === 0) {
      return null;
    }

    const marqueeItems = [...partners, ...partners, ...partners, ...partners];

    return (
      <div className={`relative w-full overflow-hidden border-y border-eureka-border/50 py-5 bg-slate-50/50 backdrop-blur-sm select-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none z-10" />
        
        <motion.div
          className={`flex whitespace-nowrap gap-10 md:gap-16 items-center ${reverse ? "[animation-direction:reverse]" : ""}`}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {marqueeItems.map((partner, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {partner.logo_url && (
                <motion.div
                  className="relative w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg overflow-hidden bg-white border border-eureka-border/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    fill
                    className="object-contain p-1"
                    sizes="40px"
                  />
                </motion.div>
              )}
              <span className="text-xs md:text-sm font-bold tracking-wider font-mono text-eureka-dark uppercase hover:text-eureka-blue transition-colors duration-300 whitespace-nowrap">
                {partner.name}
              </span>
              <motion.span
                className="w-2 h-2 rounded-full bg-eureka-blue/40 ml-2 shrink-0"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden border-y border-eureka-border/50 py-5 bg-slate-50/50 backdrop-blur-sm select-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none z-10" />
      
      <motion.div
        className={`flex whitespace-nowrap gap-10 md:gap-16 items-center ${reverse ? "[animation-direction:reverse]" : ""}`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {marqueeItems.map((text, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-6 shrink-0 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-mono font-semibold text-eureka-slate hover:text-eureka-blue transition-colors duration-300 whitespace-nowrap">
              {text}
            </span>
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-eureka-blue shrink-0"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.08 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}