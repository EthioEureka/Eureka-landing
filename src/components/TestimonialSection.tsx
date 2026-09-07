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
    <section className="py-24 md:py-36 bg-slate-50 border-b border-eureka-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            07 // CLIENT TESTIMONIALS
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
            Words from our partners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white border border-eureka-border rounded-2xl p-8 flex flex-col justify-between relative group hover:border-eureka-blue hover:shadow-eureka-md transition-all"
            >
              <Quote className="text-eureka-blue/40 mb-6 group-hover:text-eureka-blue transition-colors" size={32} />

              <p className="text-base text-eureka-dark font-normal leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-eureka-border pt-6 mt-auto">
                {t.photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-eureka-border shrink-0 shadow-sm">
                    <Image src={t.photo} alt={t.client_name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-eureka-border flex items-center justify-center font-mono text-xs text-eureka-blue font-bold shrink-0">
                    {t.client_name.substring(0, 2).toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-extrabold text-eureka-dark">{t.client_name}</h4>
                  <p className="text-xs font-sans text-eureka-slate">
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

