"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Quote, UserCheck } from "lucide-react";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    client_name: "",
    role: "",
    company: "",
    quote: "",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    featured: true,
    published: true,
    sort_order: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create testimonial");
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-eureka-border pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/testimonials"
            className="p-2.5 border border-eureka-border bg-white text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all shadow-eureka-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">
              Create New Testimonial
            </h1>
            <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
              Add client endorsement and executive feedback to social proof section
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-mono text-xs rounded-xl font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-eureka-border rounded-3xl p-6 md:p-8 shadow-eureka-lg font-sans text-xs">
        
        {/* Client Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bethlehem Alemu"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Executive Role / Title
            </label>
            <input
              type="text"
              placeholder="e.g. Managing Director & Founder"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>
        </div>

        {/* Company Name & Avatar Preset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="e.g. Kality Logistics & Freight"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Avatar Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Avatar Preset Quick Options */}
        <div>
          <label className="block text-[11px] font-mono text-eureka-slate font-bold uppercase mb-2">
            Quick Avatar Presets
          </label>
          <div className="flex items-center gap-3">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            ].map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFormData({ ...formData, photo: url })}
                className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                  formData.photo === url
                    ? "border-eureka-blue ring-2 ring-eureka-blue/30 scale-105"
                    : "border-eureka-border hover:border-eureka-blue opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Client Testimonial Quote *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Ethio-Eureka completely transformed our digital operations. Their team delivered incredible quality on tight deadlines..."
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
          />
        </div>

        {/* Feature Checkboxes */}
        <div className="flex items-center gap-8 pt-4 border-t border-eureka-border">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-sans text-eureka-dark font-bold">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-eureka-blue focus:ring-eureka-blue accent-eureka-blue"
            />
            <span>Featured Testimonial</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs font-sans text-eureka-dark font-bold">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded text-eureka-blue focus:ring-eureka-blue accent-eureka-blue"
            />
            <span>Publish Immediately</span>
          </label>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-eureka-border flex justify-end gap-4">
          <Link
            href="/admin/testimonials"
            className="px-6 py-3 border border-eureka-border text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all font-mono text-xs uppercase font-bold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-eureka-blue text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-eureka-indigo transition-all flex items-center gap-2 shadow-eureka-sm disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>Create Testimonial</span>
          </button>
        </div>
      </form>
    </div>
  );
}
