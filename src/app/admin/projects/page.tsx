"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Star, Edit, Trash2, Loader2, Eye, EyeOff, Search, SlidersHorizontal } from "lucide-react";
import { Project } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toolbar state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Sort Order");

  // Custom Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    projectId: string;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: "",
    projectTitle: "",
  });

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

  const handleTogglePublished = async (id: string, currentPublished: boolean | undefined) => {
    const prev = currentPublished !== false;
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        (p.id === id || p.slug === id) ? { ...p, published: !prev } : p
      )
    );
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !prev }),
      });
      if (!res.ok) {
        throw new Error("Failed to update published status");
      }
    } catch (err: unknown) {
      console.error("Failed to toggle published status", err);
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          (p.id === id || p.slug === id) ? { ...p, published: prev } : p
        )
      );
    }
  };

  const openDeleteModal = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      projectId: id,
      projectTitle: title,
    });
  };

  const handleConfirmDelete = async () => {
    const { projectId } = confirmModal;
    if (!projectId) return;

    setDeletingId(projectId);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId && p.slug !== projectId));
      }
    } catch (err: unknown) {
      console.error("Failed to delete project", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, projectId: "", projectTitle: "" });
    }
  };

  // Computed filtered/sorted list
  let displayed = [...projects];
  if (filter === "Featured") displayed = displayed.filter((p) => p.featured);
  else if (filter === "Standard") displayed = displayed.filter((p) => !p.featured);
  else if (filter === "Visible") displayed = displayed.filter((p) => p.published !== false);
  else if (filter === "Hidden") displayed = displayed.filter((p) => p.published === false);
  if (search.trim()) {
    const q = search.toLowerCase();
    displayed = displayed.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q)
    );
  }
  if (sort === "Newest First") displayed.sort((a, b) => (b.year || 0) - (a.year || 0));
  else if (sort === "Oldest First") displayed.sort((a, b) => (a.year || 0) - (b.year || 0));
  else if (sort === "A–Z") displayed.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === "Z–A") displayed.sort((a, b) => b.title.localeCompare(a.title));
  else displayed.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Project Management</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Manage portfolio case studies, featured toggles, and metadata
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-eureka-indigo transition-all font-mono shadow-eureka-sm"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Search, Filter, Sort Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white border border-eureka-border rounded-2xl p-4 shadow-eureka-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-eureka-slate" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-eureka-border rounded-xl focus:border-eureka-blue focus:ring-1 focus:ring-eureka-blue/20 focus:outline-none font-sans text-eureka-dark bg-slate-50"
          />
        </div>
        {/* Filter */}
        <div className="relative">
          <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-eureka-slate pointer-events-none" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm border border-eureka-border rounded-xl focus:border-eureka-blue focus:outline-none font-mono text-eureka-dark bg-slate-50 cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Featured">Featured</option>
            <option value="Standard">Standard</option>
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-eureka-slate pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm border border-eureka-border rounded-xl focus:border-eureka-blue focus:outline-none font-mono text-eureka-dark bg-slate-50 cursor-pointer"
          >
            <option value="Sort Order">Sort Order</option>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
            <option value="A–Z">A–Z</option>
            <option value="Z–A">Z–A</option>
          </select>
        </div>
      </div>

      {/* Projects Data Table */}
      <div className="bg-white border border-eureka-border rounded-2xl overflow-hidden shadow-eureka-sm">
        {loading ? (
          <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
            <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading projects...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-eureka-border text-eureka-slate uppercase text-[10px] bg-slate-50">
                  <th className="py-4 px-6 font-bold">Project Name</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Year</th>
                  <th className="py-4 px-4 font-bold">Featured</th>
                  <th className="py-4 px-4 font-bold">Visibility</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eureka-border">
                {displayed.map((p) => (
                  <tr
                    key={p.id || p.slug}
                    className={`hover:bg-slate-50/80 transition-colors ${p.published === false ? "opacity-50" : ""}`}
                  >
                    <td className="py-4 px-6 text-eureka-dark font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-eureka-border flex items-center justify-center font-bold text-eureka-blue text-xs">
                          {p.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-sans font-bold text-eureka-dark">{p.title}</p>
                          <p className="text-[10px] text-eureka-slate">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-eureka-slate">{p.category}</td>
                    <td className="py-4 px-4 text-eureka-slate">{p.year}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(p.id || p.slug, p.featured)}
                        className="focus:outline-none"
                      >
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-eureka-blue/10 text-eureka-blue border border-eureka-blue/30 px-2.5 py-1 rounded-md font-bold uppercase hover:bg-eureka-blue/20 transition-all">
                            <Star size={10} className="fill-eureka-blue" /> FEATURED
                          </span>
                        ) : (
                          <span className="text-[10px] text-eureka-slate/60 uppercase hover:text-eureka-dark font-bold">
                            STANDARD
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublished(p.id || p.slug, p.published)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.published !== false
                            ? "text-emerald-600 hover:bg-emerald-50"
                            : "text-slate-400 hover:bg-slate-100"
                        }`}
                        title={p.published !== false ? "Visible — click to hide" : "Hidden — click to show"}
                      >
                        {p.published !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <Link
                        href={`/admin/projects/${p.id || p.slug}/edit`}
                        className="text-eureka-slate hover:text-eureka-blue transition-colors inline-flex items-center gap-1 p-1.5 hover:bg-slate-100 rounded-lg"
                        title="Edit Project"
                      >
                        <Edit size={15} />
                      </Link>
                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="text-eureka-slate hover:text-eureka-blue transition-colors inline-flex items-center gap-1 p-1.5 hover:bg-slate-100 rounded-lg"
                        title="View Live"
                      >
                        <ExternalLink size={15} />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(p.id || p.slug, p.title)}
                        disabled={deletingId === (p.id || p.slug)}
                        className="text-eureka-slate hover:text-red-600 transition-colors inline-flex items-center gap-1 p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete Project"
                      >
                        {deletingId === (p.id || p.slug) ? (
                          <Loader2 size={15} className="animate-spin text-red-600" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Portfolio Project"
        message={`Are you sure you want to delete project "${confirmModal.projectTitle}"? This will remove the project from both the admin CMS database and the landing page.`}
        confirmText="Delete Project"
        cancelText="Keep Project"
        variant="danger"
        loading={deletingId === confirmModal.projectId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, projectId: "", projectTitle: "" })}
      />
    </div>
  );
}
