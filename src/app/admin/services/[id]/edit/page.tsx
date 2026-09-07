"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import { Service } from "@/lib/types";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    icon: "Code",
    sort_order: 1,
    featured: true,
    published: true,
  });

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch(`/api/admin/services/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.service) {
            const s: Service = data.service;
            setFormData({
              title: s.title || "",
              slug: s.slug || "",
              short_description: s.short_description || "",
              description: s.description || "",
              icon: s.icon || "Code",
              sort_order: s.sort_order || 1,
              featured: !!s.featured,
              published: s.published !== false,
            });
          }
        }
      } catch (err: unknown) {
        console.error("Failed to load service details", err);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update service");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/services");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating service");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
        <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading service details...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-eureka-border pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="p-2.5 border border-eureka-border bg-white text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all shadow-eureka-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">
              Edit Service: {formData.title}
            </h1>
            <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
              Update service details, icon key, and detailed scope
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-mono text-xs rounded-xl font-bold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs flex items-center gap-2 rounded-xl font-bold">
          <Sparkles size={16} className="text-emerald-600" /> Service updated successfully. Redirecting to services list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-eureka-border rounded-3xl p-6 md:p-8 shadow-eureka-lg font-sans text-xs">
        
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Service Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = title
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)+/g, "");
                setFormData({ ...formData, title, slug: autoSlug });
              }}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold tracking-wider">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={() => {
                  const autoSlug = formData.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                  setFormData({ ...formData, slug: autoSlug });
                }}
                className="text-xs font-mono text-eureka-blue font-bold hover:underline flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
              >
                <Sparkles size={11} /> Auto-Generate
              </button>
            </div>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Icon & Sort Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Icon Key *
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-mono transition-all"
            >
              <option value="Code">Code (Web & Engineering)</option>
              <option value="Layers">Layers (Ui/Ux Design)</option>
              <option value="Smartphone">Smartphone (Mobile Apps)</option>
              <option value="Database">Database (Backend & Cloud)</option>
              <option value="TrendingUp">TrendingUp (Growth & Strategy)</option>
              <option value="ShieldCheck">ShieldCheck (Security & DevOps)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Sort Order
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Short Summary */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Short Summary (Card Brief) *
          </label>
          <input
            type="text"
            required
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
          />
        </div>

        {/* Detailed Scope */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Detailed Scope & Capabilities *
          </label>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            <span>Highlight on Homepage</span>
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
            href="/admin/services"
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
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
