"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/types";
import { siteData } from "@/lib/data";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const featured = projects.filter((p) => p.featured);
  const displayProjects = featured.length > 0 ? featured : projects;

  const firstProject = displayProjects[0];
  const remainingProjects = displayProjects.slice(1);

  return (
    <section id="work" className="py-24 md:py-36 bg-slate-50 border-b border-eureka-border relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
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
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Large Feature Project */}
        {firstProject && (
          <ProjectCard project={firstProject} variant="large" index={0} />
        )}

        {/* Remaining Asymmetric Grid */}
        {remainingProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {remainingProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.id || proj.slug}
                project={proj}
                variant={idx % 3 === 0 ? "medium" : "compact"}
                index={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
