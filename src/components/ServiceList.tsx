"use client";

import ServiceItem from "./ServiceItem";
import { Service } from "@/lib/types";

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <section id="services" className="py-24 md:py-36 border-b border-border-gray/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
              02 // SERVICES & CAPABILITIES
            </span>
            <h2 className="text-section-headline font-semibold text-off-white">
              What we do.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-editorial-sub text-soft-gray font-light leading-snug">
              One creative partner. Multiple ways to move your brand forward.
            </p>
          </div>
        </div>
      </div>

      {/* Services List Rows */}
      <div className="border-t border-border-gray/70">
        {services.map((service, index) => (
          <ServiceItem key={service.id || service.slug} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
