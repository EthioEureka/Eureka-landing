"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  variant?: "large" | "medium" | "compact";
  index: number;
}

export default function ProjectCard({ project, variant = "medium", index }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const rotateX = useTransform(smoothMouseY, [-100, 100], ["5deg", "-5deg"]);
  const rotateY = useTransform(smoothMouseX, [-100, 100], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const aspectRatios = {
    large: "aspect-[21/9] md:aspect-[2.5/1]",
    medium: "aspect-[16/10]",
    compact: "aspect-[4/3]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-3xl bg-white border border-eureka-border/50 shadow-eureka-sm transition-all duration-700 group-hover:border-eureka-blue/50 group-hover:shadow-eureka-xl ${aspectRatios[variant]}`}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
            transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {project.cover_image ? (
            <motion.div
              style={{
                x: useTransform(smoothMouseX, [-100, 100], ["-2%", "2%"]),
                y: useTransform(smoothMouseY, [-100, 100], ["-2%", "2%"]),
              }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority={index === 0}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-eureka-slate font-mono text-sm">
              [ NO IMAGE ]
            </div>
          )}

          <div className="absolute top-6 left-6 right-6 z-20 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center font-mono text-xs text-white">
            <motion.span
              className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 uppercase tracking-wider text-[11px] text-eureka-dark font-semibold shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.category}
            </motion.span>
            <motion.span
              className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 text-[11px] text-eureka-dark font-semibold shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {project.year}
            </motion.span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-eureka-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                  {project.client || "CLIENT WORK"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-eureka-blue transition-all duration-500 drop-shadow-sm">
                {project.title}
              </h3>
            </motion.div>

            <motion.div
              className="w-12 h-12 rounded-full border border-white/60 bg-white/90 backdrop-blur-md flex items-center justify-center text-eureka-dark group-hover:bg-eureka-blue group-hover:text-white group-hover:border-eureka-blue transition-all duration-500 shadow-lg"
              whileHover={{ scale: 1.15, rotate: 45 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          {variant === "large" && project.short_description && (
            <motion.div
              className="absolute bottom-6 left-6 right-6 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-slate-100/90 text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-md">
                {project.short_description}
              </p>
            </motion.div>
          )}
        </div>

        {variant !== "large" && project.short_description && (
          <motion.p
            className="mt-5 text-sm text-eureka-slate line-clamp-2 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.short_description}
          </motion.p>
        )}
      </Link>
    </motion.div>
  );
}