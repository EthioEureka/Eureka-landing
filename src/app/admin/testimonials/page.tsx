"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Quote, Edit, Trash2, Loader2, Eye, EyeOff, Search, SlidersHorizontal } from "lucide-react";
import { Testimonial } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toolbar state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Sort Order");

  // Custom Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    testimonialId: string;
    clientName: string;
  }>({
    isOpen: false,
    testimonialId: "",
    clientName: "",
  });

  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (err: unknown) {
      console.error("Failed to load testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleTogglePublished = async (id: string, currentPublished: boolean | undefined) => {
    const prev = currentPublished !== false;
    setTestimonials((prevList) =>
      prevList.map((t) => (t.id === id ? { ...t, published: !prev } : t))
    );
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !prev }),
      });
      if (!res.ok) {
        throw new Error("Failed to update published status");
      }
    } catch (err: unknown) {
      console.error("Failed to toggle published status", err);
      setTestimonials((prevList) =>
        prevList.map((t) => (t.id === id ? { ...t, published: prev } : t))
      );
    }
  };

  const openDeleteModal = (id: string, clientName: string) => {
    setConfirmModal({
      isOpen: true,
      testimonialId: id,
      clientName: clientName,
    });
  };

  const handleConfirmDelete = async () => {
    const { testimonialId } = confirmModal;
    if (!testimonialId) return;

    setDeletingId(testimonialId);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${testimonialId}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== testimonialId));
      }
    } catch (err: unknown) {
      console.error("Failed to delete testimonial", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, testimonialId: "", clientName: "" });
    }
  };

  // Computed filtered/sorted list
  let displayed = [...testimonials];
  if (filter === "Featured") displayed = displayed.filter((t) => t.featured);
  else if (filter === "Visible") displayed = displayed.filter((t) => t.published !== false);
  else if (filter === "Hidden") displayed = displayed.filter((t) => t.published === false);
  if (search.trim()) {
    const q = search.toLowerCase();
    displayed = displayed.filter(
      (t) =>
        t.client_name.toLowerCase().includes(q) || (t.company || "").toLowerCase().includes(q)
    );
  }
  if (sort === "A–Z") displayed.sort((a, b) => a.client_name.localeCompare(b.client_name));
  else if (sort === "Z–A") displayed.sort((a, b) => b.client_name.localeCompare(a.client_name));
  else if (sort === "Featured First")
    displayed.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  else displayed.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Testimonial Management</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Manage client quotes, avatar pictures, endorsements, and roles
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-eureka-indigo transition-all font-mono shadow-eureka-sm"
        >
          <Plus size={16} />
          <span>New Testimonial</span>
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
            <option value="A–Z">A–Z</option>
            <option value="Z–A">Z–A</option>
            <option value="Featured First">Featured First</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
          <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading testimonials...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((t, idx) => (
            <div
              key={t.id || idx}
              className={`bg-white border border-eureka-border rounded-2xl p-6 shadow-eureka-sm space-y-4 relative group ${
                t.published === false ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center justify-between border-b border-eureka-border pb-4">
                <div className="flex items-center gap-3">
                  {t.photo ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-eureka-blue/40 shrink-0 shadow-sm">
                      <Image src={t.photo} alt={t.client_name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-mono text-xs text-eureka-blue font-bold shrink-0">
                      {t.client_name ? t.client_name.substring(0, 2).toUpperCase() : "TS"}
                    </div>
                  )}
                  <div>
                    <span className="text-eureka-dark font-bold font-sans text-sm block">
                      {t.client_name}
                    </span>
                    <span className="text-xs text-eureka-slate font-medium">{t.role} · {t.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublished(t.id, t.published)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      t.published !== false
                        ? "text-emerald-600 hover:bg-emerald-50"
                        : "text-slate-400 hover:bg-slate-100"
                    }`}
                    title={t.published !== false ? "Visible — click to hide" : "Hidden — click to show"}
                  >
                    {t.published !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="text-eureka-slate hover:text-eureka-blue transition-colors p-1.5 hover:bg-slate-100 rounded-lg"
                    title="Edit Testimonial"
                  >
                    <Edit size={15} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(t.id, t.client_name)}
                    disabled={deletingId === t.id}
                    className="text-eureka-slate hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                    title="Delete Testimonial"
                  >
                    {deletingId === t.id ? <Loader2 size={15} className="animate-spin text-red-600" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>

              <p className="text-eureka-slate italic font-sans text-xs leading-relaxed bg-slate-50 p-4 border border-eureka-border/60 rounded-xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="text-[11px] pt-1 flex justify-between items-center font-mono">
                <span className="flex items-center gap-1.5 text-eureka-slate text-xs font-semibold">
                  <Quote size={13} className="text-eureka-blue" /> Client Endorsement
                </span>
                {t.featured && (
                  <span className="text-[10px] uppercase text-eureka-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 font-bold rounded-md">
                    FEATURED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Client Testimonial"
        message={`Are you sure you want to delete the testimonial from "${confirmModal.clientName}"? This review will be removed from the landing page.`}
        confirmText="Delete Testimonial"
        cancelText="Keep Testimonial"
        variant="danger"
        loading={deletingId === confirmModal.testimonialId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, testimonialId: "", clientName: "" })}
      />
    </div>
  );
}
