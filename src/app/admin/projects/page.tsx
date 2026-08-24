"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Star, Edit, Trash2, Loader2 } from "lucide-react";
import { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err: unknown) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (p.id === id || p.slug === id ? { ...p, featured: !current } : p))
      );
      await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
    } catch (err: unknown) {
      console.error("Failed to toggle featured status", err);
      loadProjects();
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      }
    } catch (err: unknown) {
      console.error("Failed to delete project", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Project Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage portfolio case studies, featured toggles, and metadata
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 hover:bg-white transition-colors font-mono"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Projects Data Table */}
      <div className="bg-dark-gray border border-border-gray overflow-x-auto">
        {loading ? (
          <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
            <Loader2 className="animate-spin mr-2" size={16} /> Loading projects...
          </div>
        ) : (
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
                <th className="py-4 px-6 font-semibold">Project Name</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Year</th>
                <th className="py-4 px-4 font-semibold">Featured</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray/50">
              {projects.map((p) => (
                <tr key={p.id || p.slug} className="hover:bg-deep-black/40 transition-colors">
                  <td className="py-4 px-6 text-off-white font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-border-gray flex items-center justify-center font-bold text-[10px]">
                        {p.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-sans font-semibold">{p.title}</p>
                        <p className="text-[10px] text-soft-gray">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-soft-gray">{p.category}</td>
                  <td className="py-4 px-4 text-soft-gray">{p.year}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleFeatured(p.id || p.slug, p.featured)}
                      className="focus:outline-none"
                    >
                      {p.featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-eureka-green/20 text-eureka-green border border-eureka-green/40 px-2 py-0.5 font-bold uppercase hover:bg-eureka-green/30">
                          <Star size={10} className="fill-eureka-green" /> FEATURED
                        </span>
                      ) : (
                        <span className="text-[10px] text-soft-gray/60 uppercase hover:text-soft-gray">
                          STANDARD
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] uppercase">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <Link
                      href={`/admin/projects/${p.id || p.slug}/edit`}
                      className="text-soft-gray hover:text-eureka-green transition-colors inline-flex items-center gap-1"
                      title="Edit Project"
                    >
                      <Edit size={14} />
                    </Link>
                    <Link
                      href={`/work/${p.slug}`}
                      target="_blank"
                      className="text-soft-gray hover:text-eureka-green transition-colors inline-flex items-center gap-1"
                      title="View Live"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id || p.slug, p.title)}
                      disabled={deletingId === (p.id || p.slug)}
                      className="text-soft-gray hover:text-red-400 transition-colors inline-flex items-center gap-1"
                      title="Delete Project"
                    >
                      {deletingId === (p.id || p.slug) ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
