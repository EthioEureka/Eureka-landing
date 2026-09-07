"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff, Search, SlidersHorizontal } from "lucide-react";
import { Service } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toolbar state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Sort Order");

  // Custom Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    serviceId: string;
    serviceTitle: string;
  }>({
    isOpen: false,
    serviceId: "",
    serviceTitle: "",
  });

  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      }
    } catch (err: unknown) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleTogglePublished = async (id: string, currentPublished: boolean | undefined) => {
    const prev = currentPublished !== false;
    setServices((prevList) =>
      prevList.map((s) =>
        (s.id === id || s.slug === id) ? { ...s, published: !prev } : s
      )
    );
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !prev }),
      });
      if (!res.ok) {
        throw new Error("Failed to update published status");
      }
    } catch (err: unknown) {
      console.error("Failed to toggle published status", err);
      setServices((prevList) =>
        prevList.map((s) =>
          (s.id === id || s.slug === id) ? { ...s, published: prev } : s
        )
      );
    }
  };

  const openDeleteModal = (id: string, title: string) => {
    setConfirmModal({
      isOpen: true,
      serviceId: id,
      serviceTitle: title,
    });
  };

  const handleConfirmDelete = async () => {
    const { serviceId } = confirmModal;
    if (!serviceId) return;

    setDeletingId(serviceId);
    try {
      const res = await fetch(`/api/admin/services?id=${serviceId}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== serviceId && s.slug !== serviceId));
      }
    } catch (err: unknown) {
      console.error("Failed to delete service", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, serviceId: "", serviceTitle: "" });
    }
  };

  // Computed filtered/sorted list
  let displayed = [...services];
  if (filter === "In Marquee") displayed = displayed.filter((s) => s.show_in_marquee !== false);
  else if (filter === "Hidden from Marquee") displayed = displayed.filter((s) => s.show_in_marquee === false);
  else if (filter === "Visible") displayed = displayed.filter((s) => s.published !== false);
  else if (filter === "Hidden") displayed = displayed.filter((s) => s.published === false);
  if (search.trim()) {
    const q = search.toLowerCase();
    displayed = displayed.filter((s) => s.title.toLowerCase().includes(q));
  }
  if (sort === "A–Z") displayed.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === "Z–A") displayed.sort((a, b) => b.title.localeCompare(a.title));
  else displayed.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Service Management</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Manage agency capabilities and expandable service offerings
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-eureka-indigo transition-all font-mono shadow-eureka-sm"
        >
          <Plus size={16} />
          <span>New Service</span>
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
            <option value="In Marquee">In Marquee</option>
            <option value="Hidden from Marquee">Hidden from Marquee</option>
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
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-eureka-border rounded-2xl overflow-hidden shadow-eureka-sm">
        {loading ? (
          <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
            <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading services...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-eureka-border text-eureka-slate uppercase text-[10px] bg-slate-50">
                  <th className="py-4 px-6 font-bold">Service Title</th>
                  <th className="py-4 px-4 font-bold">Slug</th>
                  <th className="py-4 px-4 font-bold">Order</th>
                  <th className="py-4 px-4 font-bold">Marquee</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eureka-border">
                {displayed.map((s, idx) => (
                  <tr
                    key={s.id || s.slug}
                    className={`hover:bg-slate-50/80 transition-colors ${s.published === false ? "opacity-50" : ""}`}
                  >
                    <td className="py-4 px-6 text-eureka-dark font-medium">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-blue-50 text-eureka-blue font-bold flex items-center justify-center text-xs border border-blue-100">
                          0{idx + 1}
                        </span>
                        <span className="font-sans text-sm font-bold text-eureka-dark">{s.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-eureka-slate">{s.slug}</td>
                    <td className="py-4 px-4 text-eureka-slate">{s.sort_order || idx + 1}</td>
                    <td className="py-4 px-4">
                      {s.show_in_marquee !== false ? (
                        <span className="px-2.5 py-1 bg-eureka-blue/10 text-eureka-blue border border-eureka-blue/20 text-[10px] font-bold rounded-md uppercase">
                          IN MARQUEE
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-slate-100 text-eureka-slate border border-slate-200 text-[10px] font-bold rounded-md uppercase">
                          HIDDEN
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button
                        onClick={() => handleTogglePublished(s.id || s.slug, s.published)}
                        className={`inline-flex items-center gap-1 p-1.5 rounded-lg transition-colors ${
                          s.published !== false
                            ? "text-emerald-600 hover:bg-emerald-50"
                            : "text-slate-400 hover:bg-slate-100"
                        }`}
                        title={s.published !== false ? "Visible — click to hide" : "Hidden — click to show"}
                      >
                        {s.published !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <Link
                        href={`/admin/services/${s.id || s.slug}/edit`}
                        className="text-eureka-slate hover:text-eureka-blue transition-colors inline-flex items-center gap-1 p-1.5 hover:bg-slate-100 rounded-lg"
                        title="Edit Service"
                      >
                        <Edit size={15} />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(s.id || s.slug, s.title)}
                        disabled={deletingId === (s.id || s.slug)}
                        className="text-eureka-slate hover:text-red-600 transition-colors inline-flex items-center gap-1 p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete Service"
                      >
                        {deletingId === (s.id || s.slug) ? (
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

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Agency Service"
        message={`Are you sure you want to delete service "${confirmModal.serviceTitle}"? This capability will no longer appear on the services section or project creation form.`}
        confirmText="Delete Service"
        cancelText="Keep Service"
        variant="danger"
        loading={deletingId === confirmModal.serviceId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, serviceId: "", serviceTitle: "" })}
      />
    </div>
  );
}
