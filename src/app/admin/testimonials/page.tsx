"use client";

import { useState, useEffect } from "react";
import { Plus, Quote, Edit, Trash2, Loader2, X, Save } from "lucide-react";
import { Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    client_name: "",
    role: "",
    company: "",
    quote: "",
    featured: true,
    published: true,
    sort_order: 1,
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

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      client_name: "",
      role: "",
      company: "",
      quote: "",
      featured: true,
      published: true,
      sort_order: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData(t);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTestimonial) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTestimonial.id, ...formData }),
        });
        if (res.ok) {
          await loadTestimonials();
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await loadTestimonials();
          setIsModalOpen(false);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to save testimonial", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!window.confirm(`Are you sure you want to delete testimonial by "${clientName}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err: unknown) {
      console.error("Failed to delete testimonial", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Testimonial Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage client quotes, endorsements, and roles
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 font-mono hover:bg-white transition-colors"
        >
          <Plus size={16} />
          <span>New Testimonial</span>
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
          <Loader2 className="animate-spin mr-2" size={16} /> Loading testimonials...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={t.id || idx} className="bg-dark-gray border border-border-gray p-6 font-mono text-xs space-y-4 relative group">
              <div className="flex items-center justify-between text-soft-gray border-b border-border-gray/50 pb-3">
                <span className="flex items-center gap-2 text-off-white font-semibold font-sans text-sm">
                  <Quote size={14} className="text-eureka-green" /> {t.client_name}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="text-soft-gray hover:text-eureka-green"
                    title="Edit Testimonial"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.client_name)}
                    disabled={deletingId === t.id}
                    className="text-soft-gray hover:text-red-400"
                    title="Delete Testimonial"
                  >
                    {deletingId === t.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>

              <p className="text-soft-gray italic font-sans text-xs leading-relaxed">&ldquo;{t.quote}&rdquo;</p>

              <div className="text-[11px] text-soft-gray pt-2 border-t border-border-gray/30 flex justify-between items-end">
                <div>
                  <p className="text-off-white font-semibold">{t.role}</p>
                  <p>{t.company}</p>
                </div>
                {t.featured && (
                  <span className="text-[10px] uppercase text-eureka-green border border-eureka-green/40 px-2 py-0.5">
                    FEATURED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-dark-gray border border-border-gray w-full max-w-lg p-6 space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border-gray pb-4">
              <h2 className="text-base font-light text-off-white">
                {editingTestimonial ? "Edit Testimonial" : "Create New Testimonial"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-soft-gray hover:text-off-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-soft-gray uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.client_name || ""}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-soft-gray uppercase mb-1">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-soft-gray uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-soft-gray uppercase mb-1">Testimonial Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full bg-deep-black border border-border-gray text-off-white p-3 focus:border-eureka-green focus:outline-none font-sans text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-eureka-green w-4 h-4"
                  />
                  <span className="text-off-white">Featured Quote</span>
                </label>
              </div>

              <div className="pt-4 border-t border-border-gray flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-border-gray text-soft-gray hover:text-off-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-eureka-green text-deep-black font-semibold uppercase tracking-wider hover:bg-white flex items-center gap-2"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
