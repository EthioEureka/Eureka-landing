"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 md:py-36 bg-dark-gray/40 border-b border-border-gray/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
            07 // CLIENT TESTIMONIALS
          </span>
          <h2 className="text-section-headline font-semibold text-off-white">
            Words from our partners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-deep-black/80 border border-border-gray/70 p-8 flex flex-col justify-between relative group hover:border-eureka-green/70 transition-colors"
            >
              <Quote className="text-eureka-green/40 mb-6 group-hover:text-eureka-green transition-colors" size={32} />

              <p className="text-base text-off-white font-light leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-border-gray/40 pt-6 mt-auto">
                {t.photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-gray shrink-0">
                    <Image src={t.photo} alt={t.client_name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-border-gray flex items-center justify-center font-mono text-xs text-soft-gray shrink-0">
                    {t.client_name.substring(0, 2).toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-off-white">{t.client_name}</h4>
                  <p className="text-xs font-mono text-soft-gray">
                    {t.role} {t.company && `· ${t.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
