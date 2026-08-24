import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { fetchProjectBySlug, fetchProjects } from "@/lib/db";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Project Not Found — Ethio-Eureka" };
  return {
    title: `${project.title} — Ethio-Eureka Case Study`,
    description: project.short_description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await fetchProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-36 min-h-screen">
      
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-soft-gray hover:text-eureka-green uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to selected work</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-eureka-green mb-4">
          <span className="bg-dark-gray border border-border-gray px-3 py-1 uppercase tracking-widest">
            {project.category}
          </span>
          <span className="text-soft-gray">/</span>
          <span className="text-soft-gray">{project.year}</span>
        </div>

        <h1 className="text-hero-headline font-semibold text-off-white mb-6">
          {project.title}
        </h1>

        <p className="text-editorial-sub text-soft-gray max-w-3xl font-light leading-snug">
          {project.short_description}
        </p>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-border-gray/50 font-mono text-xs text-soft-gray">
          <div>
            <span className="text-off-white font-semibold block mb-1 uppercase">CLIENT</span>
            <span>{project.client || "Confidential Client"}</span>
          </div>
          <div>
            <span className="text-off-white font-semibold block mb-1 uppercase">CATEGORY</span>
            <span>{project.category}</span>
          </div>
          <div>
            <span className="text-off-white font-semibold block mb-1 uppercase">YEAR</span>
            <span>{project.year}</span>
          </div>
          <div>
            <span className="text-off-white font-semibold block mb-1 uppercase">SERVICES</span>
            <span className="text-eureka-green">Design, Strategy & Dev</span>
          </div>
        </div>
      </header>

      {/* Large Featured Cover Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-border-gray bg-dark-gray">
          {project.cover_image && (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Main Narrative Breakdown */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
        
        {/* Sticky Meta Links Column */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
          <div className="bg-dark-gray/60 border border-border-gray p-8 font-mono text-xs text-soft-gray">
            <h3 className="text-off-white font-semibold uppercase tracking-wider mb-4 border-b border-border-gray/40 pb-2">
              PROJECT SNAPSHOT
            </h3>
            <p className="mb-6 leading-relaxed">{project.description}</p>

            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-eureka-green text-deep-black font-semibold uppercase tracking-widest py-3 px-4 flex items-center justify-between hover:bg-white transition-colors"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Overview */}
          {project.description && (
            <section className="space-y-4">
              <span className="text-xs font-mono text-eureka-green uppercase tracking-widest">
                01 // OVERVIEW
              </span>
              <h2 className="text-2xl font-light text-off-white">The Vision</h2>
              <p className="text-lg text-soft-gray leading-relaxed font-light">
                {project.description}
              </p>
            </section>
          )}

          {/* Challenge */}
          {project.challenge && (
            <section className="space-y-4 pt-8 border-t border-border-gray/40">
              <span className="text-xs font-mono text-eureka-green uppercase tracking-widest">
                02 // THE CHALLENGE
              </span>
              <h2 className="text-2xl font-light text-off-white">Problem Statement</h2>
              <p className="text-base text-soft-gray leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {/* Approach */}
          {project.approach && (
            <section className="space-y-4 pt-8 border-t border-border-gray/40">
              <span className="text-xs font-mono text-eureka-green uppercase tracking-widest">
                03 // OUR APPROACH
              </span>
              <h2 className="text-2xl font-light text-off-white">Strategy & Execution</h2>
              <p className="text-base text-soft-gray leading-relaxed">
                {project.approach}
              </p>
            </section>
          )}

          {/* Result */}
          {project.result && (
            <section className="space-y-4 pt-8 border-t border-border-gray/40 bg-dark-gray/30 p-8 border border-border-gray">
              <span className="text-xs font-mono text-eureka-green uppercase tracking-widest">
                04 // RESULT & OUTCOME
              </span>
              <h2 className="text-2xl font-light text-off-white">Business Impact</h2>
              <p className="text-base text-off-white leading-relaxed font-normal">
                {project.result}
              </p>
            </section>
          )}

        </div>
      </div>

      {/* Gallery Layout */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <span className="text-xs font-mono text-eureka-green uppercase tracking-widest block mb-6">
            VISUAL GALLERY
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, gIdx) => (
              <div
                key={gIdx}
                className="relative aspect-[16/10] overflow-hidden border border-border-gray bg-dark-gray"
              >
                <Image src={imgUrl} alt={`${project.title} screenshot ${gIdx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Project Footer */}
      {nextProject && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-border-gray/60">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 bg-dark-gray/40 border border-border-gray hover:border-eureka-green transition-all"
          >
            <div>
              <span className="text-xs font-mono text-soft-gray uppercase tracking-widest block mb-1">
                NEXT PROJECT →
              </span>
              <h3 className="text-3xl font-light text-off-white group-hover:text-eureka-green transition-colors">
                {nextProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-eureka-green uppercase tracking-widest">
              <span>View Case Study</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      )}

    </article>
  );
}
