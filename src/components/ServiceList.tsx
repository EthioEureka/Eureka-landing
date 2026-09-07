"use client";

import ServiceItem from "./ServiceItem";
import { Service } from "@/lib/types";

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <section id="services" className="py-24 md:py-36 bg-white border-b border-eureka-border relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-eureka-blue rounded-full" />
              02 // SERVICES & CAPABILITIES
            </span>
            <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
              What we do.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-editorial-sub text-eureka-slate font-normal leading-relaxed">
              One creative partner. Multiple ways to move your brand and digital presence forward.
            </p>
          </div>
        </div>
      </div>

      {/* Services List Rows */}
      <div className="border-t border-eureka-border max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceItem key={service.id || service.slug} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

