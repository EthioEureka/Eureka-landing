"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ProcessTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: "01",
      name: "Discover",
      title: "Discovery & Alignment",
      desc: "Understand the business, audience, goals, competitive landscape, and key opportunities.",
      deliverables: [
        "Brand Audit & Discovery Workshop",
        "Target Audience Persona",
        "Competitive Landscape Analysis",
        "Core Project Goals",
      ],
    },
    {
      num: "02",
      name: "Define",
      title: "Strategy & Architecture",
      desc: "Build the strategy, visual direction, content structure, UX wireframes, and technical roadmap.",
      deliverables: [
        "Visual Moodboards & Art Direction",
        "Information Architecture & Sitemap",
        "UX Wireframes",
        "Technical Stack Specification",
      ],
    },
    {
      num: "03",
      name: "Create",
      title: "Design & Development",
      desc: "Design, develop, write, refine, and test the final digital experience with pixel perfection.",
      deliverables: [
        "High-Fidelity UI Design System",
        "Responsive Code Execution",
        "Micro-Animations & Interaction",
        "CMS Integration & Optimization",
      ],
    },
    {
      num: "04",
      name: "Launch & Grow",
      title: "Deployment & Optimization",
      desc: "Launch the project securely and continue improving and scaling your brand presence.",
      deliverables: [
        "Production Domain & SSL Setup",
        "SEO Metadata & Performance Audit",
        "Admin Training & Documentation",
        "Ongoing Growth & Support",
      ],
    },
  ];

  return (
    <section id="process" className="py-24 md:py-36 border-b border-border-gray/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
            06 // THE CREATIVE PROCESS
          </span>
          <h2 className="text-section-headline font-semibold text-off-white">
            From idea to impact.
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Stage Selector Timeline Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {stages.map((stage, idx) => (
              <button
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-6 border transition-all duration-300 flex items-center justify-between group ${
                  activeStage === idx
                    ? "bg-dark-gray border-eureka-green text-off-white shadow-lg"
                    : "bg-deep-black/60 border-border-gray/60 text-soft-gray hover:border-border-gray hover:text-off-white"
                }`}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`font-mono text-sm ${
                      activeStage === idx ? "text-eureka-green font-bold" : "text-soft-gray"
                    }`}
                  >
                    {stage.num}
                  </span>
                  <h3 className="text-xl font-light tracking-tight">{stage.name}</h3>
                </div>

                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    activeStage === idx ? "bg-eureka-green scale-125" : "bg-border-gray"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Active Stage Details Card */}
          <div className="lg:col-span-7 bg-dark-gray/60 border border-border-gray/80 p-8 md:p-12 relative min-h-[380px] flex flex-col justify-between">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center border-b border-border-gray/50 pb-4 mb-6">
                <span className="font-mono text-xs text-eureka-green uppercase tracking-widest">
                  STAGE {stages[activeStage].num} // {stages[activeStage].name.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-soft-gray">
                  0{activeStage + 1} / 04
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-off-white mb-4">
                {stages[activeStage].title}
              </h3>

              <p className="text-base text-soft-gray leading-relaxed mb-8">
                {stages[activeStage].desc}
              </p>

              <div className="border-t border-border-gray/40 pt-6">
                <h4 className="font-mono text-xs text-off-white font-semibold uppercase tracking-wider mb-4">
                  KEY DELIVERABLES & OUTCOMES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stages[activeStage].deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-soft-gray">
                      <CheckCircle2 size={14} className="text-eureka-green shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
