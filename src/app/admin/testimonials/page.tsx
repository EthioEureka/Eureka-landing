"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Quote, Edit, Trash2, Loader2 } from "lucide-react";
import { Testimonial } from "@/lib/types";

import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

      {/* Grid List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
          <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading testimonials...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={t.id || idx} className="bg-white border border-eureka-border rounded-2xl p-6 shadow-eureka-sm space-y-4 relative group">
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


