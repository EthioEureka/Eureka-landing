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
      <Link href={`/work/${project.slug}`} data-cursor="VIEW" className="block">
        {/* Cover Image Container */}
        <div
          className={`relative overflow-hidden bg-dark-gray border border-border-gray/70 transition-all duration-500 group-hover:border-eureka-green/70 ${
            variant === "large"
              ? "aspect-[16/9] md:aspect-[21/9]"
              : variant === "compact"
              ? "aspect-[4/3]"
              : "aspect-[16/10]"
          }`}
        >
          {/* Subtle noise / dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity" />

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
            <div className="w-full h-full flex items-center justify-center bg-dark-gray text-soft-gray font-mono text-sm">
              [ NO IMAGE ]
            </div>
          )}

          {/* Top Metadata Badges */}
          <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center font-mono text-xs text-off-white">
            <span className="bg-deep-black/80 backdrop-blur-md px-3 py-1 border border-border-gray/60 uppercase tracking-widest text-[11px]">
              {project.category}
            </span>
            <span className="bg-deep-black/80 backdrop-blur-md px-3 py-1 border border-border-gray/60 text-[11px]">
              {project.year}
            </span>
          </div>

          {/* Bottom Overlay Label for Compact/Large cards */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-eureka-green opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-mono text-soft-gray uppercase tracking-wider">
                  {project.client || "CLIENT WORK"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-off-white group-hover:text-eureka-green group-hover:translate-x-1 transition-all">
                {project.title}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-full border border-border-gray/80 bg-deep-black/80 flex items-center justify-center text-off-white group-hover:border-eureka-green group-hover:text-eureka-green group-hover:bg-eureka-green group-hover:text-deep-black transition-all">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* Supporting Short Description */}
        <p className="mt-4 text-sm text-soft-gray line-clamp-2 leading-relaxed font-normal">
          {project.short_description}
        </p>
      </Link>
    </motion.div>
  );
}
