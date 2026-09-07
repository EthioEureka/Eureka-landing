"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Service } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
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
                {services.map((s, idx) => (
                  <tr key={s.id || s.slug} className="hover:bg-slate-50/80 transition-colors">
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


