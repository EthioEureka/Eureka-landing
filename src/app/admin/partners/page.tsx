"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { Partner } from "@/lib/types";
import { Plus, Edit2, Trash2, CheckCircle, Eye, EyeOff, Building2, RefreshCw, Search, SlidersHorizontal } from "lucide-react";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [published, setPublished] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  // Toolbar state (prefixed to avoid collision with form "published" state)
  const [search, setSearch] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("All");
  const [partnerSort, setPartnerSort] = useState("Sort Order");

  const loadPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/partners");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPartners(data);
      }
    } catch (err) {
      console.error("Failed to load partners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const resetForm = () => {
    setEditingPartner(null);
    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setSortOrder(partners.length + 1);
    setPublished(true);
    setStatusMsg("");
  };

  const handleEditClick = (partner: Partner) => {
    setEditingPartner(partner);
    setName(partner.name);
    setLogoUrl(partner.logo_url || "");
    setWebsiteUrl(partner.website_url || "");
    setSortOrder(partner.sort_order || 1);
    setPublished(partner.published !== false);
    setStatusMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setStatusMsg("");

    const payload = {
      id: editingPartner?.id,
      name,
      logo_url: logoUrl,
      website_url: websiteUrl,
      sort_order: Number(sortOrder),
      published,
    };

    try {
      const method = editingPartner ? "PUT" : "POST";
      const res = await fetch("/api/admin/partners", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMsg(editingPartner ? "Partner updated successfully!" : "Partner added successfully!");
        resetForm();
        loadPartners();
      } else {
        const data = await res.json();
        setStatusMsg(`Error: ${data.error || "Failed to save partner"}`);
      }
    } catch (err) {
      console.error("Save partner error:", err);
      setStatusMsg("Failed to save partner");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (partner: Partner) => {
    try {
      const res = await fetch("/api/admin/partners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: partner.id, published: !partner.published }),
      });
      if (res.ok) {
        loadPartners();
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadPartners();
        if (editingPartner?.id === id) resetForm();
      }
    } catch (err) {
      console.error("Delete partner error:", err);
    }
  };

  // Computed filtered/sorted partners list
  let displayedPartners = [...partners];
  if (partnerFilter === "Visible") displayedPartners = displayedPartners.filter((p) => p.published !== false);
  else if (partnerFilter === "Hidden") displayedPartners = displayedPartners.filter((p) => p.published === false);
  if (search.trim()) {
    const q = search.toLowerCase();
    displayedPartners = displayedPartners.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (partnerSort === "A–Z") displayedPartners.sort((a, b) => a.name.localeCompare(b.name));
  else if (partnerSort === "Z–A") displayedPartners.sort((a, b) => b.name.localeCompare(a.name));
  else displayedPartners.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-eureka-border shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-eureka-blue font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 size={16} />
            <span>Partner & Client Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-eureka-dark tracking-tight">
            Footer Marquee Partners
          </h1>
          <p className="text-xs sm:text-sm text-eureka-slate font-sans mt-1">
            Add and manage partner logos & names displayed in the scrolling marquee banner above the footer.
          </p>
        </div>

        <button
          onClick={loadPartners}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-eureka-border hover:bg-slate-50 text-xs font-mono font-bold text-eureka-dark transition-all self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh List</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-eureka-border shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-eureka-border pb-4">
            <h2 className="text-lg font-extrabold text-eureka-dark">
              {editingPartner ? "Edit Partner" : "Add New Partner"}
            </h2>
            {editingPartner && (
              <button
                onClick={resetForm}
                className="text-xs font-mono text-eureka-slate hover:text-eureka-blue underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {statusMsg && (
            <div
              className={`p-3.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 ${
                statusMsg.startsWith("Error")
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              <CheckCircle size={14} />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-eureka-dark uppercase mb-1.5">
                Partner / Client Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Abyssinia Craft"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-eureka-border focus:border-eureka-blue focus:ring-1 focus:ring-eureka-blue text-sm font-sans text-eureka-dark outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-eureka-dark uppercase mb-1.5">
                Logo URL (Image Path or URL)
              </label>
              <input
                type="text"
                placeholder="e.g. /Eureka-logo.png or https://..."
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-eureka-border focus:border-eureka-blue focus:ring-1 focus:ring-eureka-blue text-sm font-mono text-eureka-dark outline-none transition-all"
              />
              <p className="text-[11px] font-sans text-eureka-slate mt-1">
                Leave empty for text-only rendering or provide logo image path.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-eureka-dark uppercase mb-1.5">
                Website URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-eureka-border focus:border-eureka-blue focus:ring-1 focus:ring-eureka-blue text-sm font-mono text-eureka-dark outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-eureka-dark uppercase mb-1.5">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-eureka-border focus:border-eureka-blue text-sm font-mono text-eureka-dark outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-eureka-dark uppercase mb-1.5">
                  Visibility
                </label>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={`w-full py-3 px-4 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                    published
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-slate-100 border-slate-300 text-slate-600"
                  }`}
                >
                  {published ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{published ? "Published" : "Hidden"}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 px-6 rounded-xl bg-eureka-blue hover:bg-eureka-indigo text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-eureka-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {saving ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : editingPartner ? (
                <CheckCircle size={16} />
              ) : (
                <Plus size={16} />
              )}
              <span>{editingPartner ? "Update Partner" : "Add Partner"}</span>
            </button>
          </form>
        </div>

        {/* Partners List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-eureka-border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-eureka-border pb-4">
            <h2 className="text-lg font-extrabold text-eureka-dark">
              Active Partners ({partners.length})
            </h2>
            <span className="text-xs font-mono text-eureka-blue font-semibold">
              Live in Footer Marquee
            </span>
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
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm border border-eureka-border rounded-xl focus:border-eureka-blue focus:outline-none font-mono text-eureka-dark bg-slate-50 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Visible">Visible</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-eureka-slate pointer-events-none" />
              <select
                value={partnerSort}
                onChange={(e) => setPartnerSort(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm border border-eureka-border rounded-xl focus:border-eureka-blue focus:outline-none font-mono text-eureka-dark bg-slate-50 cursor-pointer"
              >
                <option value="Sort Order">Sort Order</option>
                <option value="A–Z">A–Z</option>
                <option value="Z–A">Z–A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-eureka-slate text-xs font-mono flex items-center justify-center gap-2">
              <RefreshCw size={16} className="animate-spin text-eureka-blue" />
              <span>Loading partners...</span>
            </div>
          ) : partners.length === 0 ? (
            <div className="py-12 text-center text-eureka-slate text-xs font-mono border-2 border-dashed border-slate-200 rounded-2xl">
              No partners added yet. Use the form to add your first partner logo.
            </div>
          ) : (
            <div className="space-y-3">
              {displayedPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-eureka-border hover:border-eureka-blue/40 bg-slate-50/50 transition-all gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-10 h-10 shrink-0 rounded-xl bg-white border border-eureka-border p-1 overflow-hidden flex items-center justify-center">
                      {partner.logo_url ? (
                        <Image
                          src={partner.logo_url}
                          alt={partner.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <Building2 size={20} className="text-eureka-slate" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-eureka-dark truncate">
                        {partner.name}
                      </h3>
                      {partner.website_url && (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-eureka-blue hover:underline block truncate"
                        >
                          {partner.website_url}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(partner)}
                      className={`p-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                        partner.published !== false
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                      title={partner.published !== false ? "Published" : "Hidden"}
                    >
                      {partner.published !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>

                    <button
                      onClick={() => handleEditClick(partner)}
                      className="p-2 rounded-xl bg-white border border-eureka-border hover:border-eureka-blue text-eureka-dark hover:text-eureka-blue transition-colors"
                      title="Edit Partner"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="p-2 rounded-xl bg-white border border-eureka-border hover:border-red-500 text-slate-500 hover:text-red-600 transition-colors"
                      title="Delete Partner"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
