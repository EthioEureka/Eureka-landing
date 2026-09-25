"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/types";
import { siteData } from "@/lib/data";

interface ProjectGridProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const displayProjects = projects.filter((p) => p.featured === true);

  if (displayProjects.length === 0) {
    return null;
  }

  const firstProject = displayProjects[0];
  const remainingProjects = displayProjects.slice(1);

  return (
    <section id="work" className="py-24 md:py-40 lg:py-48 bg-slate-50 border-b border-eureka-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-eureka-indigo/3 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase mb-4">
                <span className="w-2 h-2 bg-eureka-blue rounded-full" />
                {siteData.projects.sectionTag}
              </span>
              <h2 className="text-section-headline font-extrabold text-eureka-dark tracking-tight">
                {siteData.projects.headline}
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <p className="text-editorial-sub text-eureka-slate font-normal leading-relaxed mb-6">
                {siteData.projects.subtext}
              </p>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-eureka-blue hover:text-eureka-indigo transition-colors group"
              >
                <span>{siteData.projects.viewAllCta}</span>
                <motion.span whileHover={{ x: 4 }}><ArrowUpRight size={14} /></motion.span>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-20"
        >
          {firstProject && (
            <motion.div variants={itemVariants} className="relative">
              <ProjectCard project={firstProject} variant="large" index={0} />
            </motion.div>
          )}

          {remainingProjects.length > 0 && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {remainingProjects.map((proj, idx) => (
                <motion.div key={proj.id || proj.slug} variants={itemVariants}>
                  <ProjectCard
                    project={proj}
                    variant={idx % 2 === 0 ? "medium" : "compact"}
                    index={idx + 1}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}