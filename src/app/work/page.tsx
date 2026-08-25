import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjects } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Selected Work — Ethio-Eureka Digital Studio",
  description: "Explore selected brand identities, web applications, design systems, and digital platforms built by Ethio-Eureka.",
};

export default async function WorkPage() {
  const projects = await fetchProjects();

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
          WORK ARCHIVE // 2025–2026
        </span>
        <h1 className="text-section-headline font-semibold text-off-white mb-6">
          Selected work.
        </h1>
        <p className="text-editorial-sub text-soft-gray max-w-2xl font-light">
          A showcase of digital identities, web applications, and editorial design platforms engineered for ambitious enterprises.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id || project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
