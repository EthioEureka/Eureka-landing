import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjects } from "@/lib/db";
import { siteData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: siteData.workPage.metaTitle,
  description: siteData.workPage.metaDescription,
};

export default async function WorkPage() {
  const projects = await fetchProjects();

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
          {siteData.workPage.sectionTag}
        </span>
        <h1 className="text-section-headline font-semibold text-off-white mb-6">
          {siteData.workPage.headline}
        </h1>
        <p className="text-editorial-sub text-soft-gray max-w-2xl font-light">
          {siteData.workPage.subtext}
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
