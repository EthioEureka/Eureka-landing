"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, X, Save, Sparkles } from "lucide-react";
import { Service } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    sort_order: 1,
    published: true,
    featured: true,
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

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      short_description: "",
      description: "",
      sort_order: services.length + 1,
      published: true,
      featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setFormData(s);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingService) {
        // PUT update
        const res = await fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id || editingService.slug, ...formData }),
        });
        if (res.ok) {
          await loadServices();
          setIsModalOpen(false);
        }
      } else {
        // POST create
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await loadServices();
          setIsModalOpen(false);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to save service", err);
    } finally {
      setSaving(false);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Service Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage agency capabilities and expandable service rows
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 font-mono hover:bg-white transition-colors"
        >
          <Plus size={16} />
          <span>New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-dark-gray border border-border-gray overflow-x-auto">
        {loading ? (
          <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
            <Loader2 className="animate-spin mr-2" size={16} /> Loading services...
          </div>
        ) : (
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
                <th className="py-4 px-6 font-semibold">Service Title</th>
                <th className="py-4 px-4 font-semibold">Slug</th>
                <th className="py-4 px-4 font-semibold">Order</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray/50">
              {services.map((s, idx) => (
                <tr key={s.id || s.slug} className="hover:bg-deep-black/40">
                  <td className="py-4 px-6 text-off-white font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-eureka-green font-bold">0{idx + 1}</span>
                      <span className="font-sans text-sm font-semibold">{s.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-soft-gray">{s.slug}</td>
                  <td className="py-4 px-4 text-soft-gray">{s.sort_order || idx + 1}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] uppercase">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="text-soft-gray hover:text-eureka-green transition-colors inline-flex items-center gap-1"
                      title="Edit Service"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(s.id || s.slug, s.title)}
                      disabled={deletingId === (s.id || s.slug)}
                      className="text-soft-gray hover:text-red-400 transition-colors inline-flex items-center gap-1"
                      title="Delete Service"
                    >
                      {deletingId === (s.id || s.slug) ? (
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

      {/* Service Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-dark-gray border border-border-gray w-full max-w-lg p-6 space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border-gray pb-4">
              <h2 className="text-base font-light text-off-white">
                {editingService ? "Edit Service" : "Create New Service"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-soft-gray hover:text-off-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-soft-gray uppercase mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    setFormData({
                      ...formData,
                      title,
                      slug: autoSlug,
                    });
                  }}
                  className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-soft-gray uppercase">Slug *</label>
                  <button
                    type="button"
                    onClick={() => {
                      const autoSlug = (formData.title || "")
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "");
                      setFormData({ ...formData, slug: autoSlug });
                    }}
                    className="text-[10px] font-mono text-eureka-green hover:underline flex items-center gap-1"
                  >
                    <Sparkles size={10} /> Auto-Generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-soft-gray uppercase mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.short_description || ""}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-soft-gray uppercase mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-deep-black border border-border-gray text-off-white p-3 focus:border-eureka-green focus:outline-none font-sans text-sm"
                />
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
                  <span>{editingService ? "Update Service" : "Save Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
