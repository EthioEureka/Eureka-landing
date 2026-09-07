"use client";

import Image from "next/image";
import { Partner } from "@/lib/types";

interface MarqueeProps {
  items?: string[];
  partners?: Partner[];
  speed?: "normal" | "slow";
  reverse?: boolean;
}

export default function Marquee({
  items,
  partners,
  speed = "normal",
  reverse = false,
}: MarqueeProps) {
  // If partners prop was explicitly passed for partner marquee
  const isPartnerMarquee = partners !== undefined;

  if (isPartnerMarquee) {
    if (!partners || partners.length === 0) {
      return null;
    }

    const marqueeItems = [...partners, ...partners, ...partners, ...partners];

    return (
      <div className="relative w-full overflow-hidden border-y border-eureka-border py-4 bg-slate-50/90 backdrop-blur-sm select-none">
        <div
          className={`flex whitespace-nowrap gap-8 items-center ${
            speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
          } ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {marqueeItems.map((partner, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              {partner.logo_url ? (
                <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden">
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : null}
              <span className="text-xs md:text-sm font-bold tracking-wider font-mono text-eureka-dark uppercase hover:text-eureka-blue transition-colors">
                {partner.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-eureka-blue/40 ml-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Text Items Marquee (e.g. Service Slugs below Hero)
  if (!items || items.length === 0) {
    return null;
  }

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-eureka-border py-4 bg-slate-50/90 backdrop-blur-sm select-none">
      <div
        className={`flex whitespace-nowrap gap-8 items-center ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {marqueeItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-mono font-semibold text-eureka-slate hover:text-eureka-blue transition-colors">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-eureka-blue" />
          </div>
        ))}
      </div>
    </div>
  );
}



