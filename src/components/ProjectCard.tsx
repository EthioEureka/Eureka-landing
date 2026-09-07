"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  variant?: "large" | "medium" | "compact";
  index: number;
}

export default function ProjectCard({ project, variant = "medium", index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/work/${project.slug}`} className="block">
        {/* Cover Image Container */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-white border border-eureka-border shadow-eureka-sm transition-all duration-500 group-hover:border-eureka-blue group-hover:shadow-eureka-md ${
            variant === "large"
              ? "aspect-[16/9] md:aspect-[21/9]"
              : variant === "compact"
              ? "aspect-[4/3]"
              : "aspect-[16/10]"
          }`}
        >
          {/* Subtle light gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Project Cover Image */}
          {project.cover_image ? (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-eureka-slate font-mono text-sm">
              [ NO IMAGE ]
            </div>
          )}

          {/* Top Metadata Badges */}
          <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center font-mono text-xs text-white">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 uppercase tracking-wider text-[11px] text-eureka-dark font-semibold shadow-sm">
              {project.category}
            </span>
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[11px] text-eureka-dark font-semibold shadow-sm">
              {project.year}
            </span>
          </div>

          {/* Bottom Overlay Label for Compact/Large cards */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-eureka-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                  {project.client || "CLIENT WORK"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-eureka-blue transition-all drop-shadow-sm">
                {project.title}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/60 bg-white/90 backdrop-blur-md flex items-center justify-center text-eureka-dark group-hover:bg-eureka-blue group-hover:text-white group-hover:border-eureka-blue transition-all shadow-md">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* Supporting Short Description */}
        <p className="mt-4 text-sm text-eureka-slate line-clamp-2 leading-relaxed font-normal">
          {project.short_description}
        </p>
      </Link>
    </motion.div>
  );
}

