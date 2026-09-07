"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Sparkles, FolderPlus } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client: "",
    category: "Website Design & Development",
    year: new Date().getFullYear(),
    short_description: "",
    description: "",
    challenge: "",
    approach: "",
    result: "",
    website_url: "",
    cover_image: "",
    gallery_raw: "",
    featured: false,
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, title: val, slug: generatedSlug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const galleryArray = formData.gallery_raw
      ? formData.gallery_raw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = {
      title: formData.title,
      slug: formData.slug,
      client: formData.client || undefined,
      category: formData.category,
      year: Number(formData.year) || new Date().getFullYear(),
      short_description: formData.short_description,
      description: formData.description,
      challenge: formData.challenge || undefined,
      approach: formData.approach || undefined,
      result: formData.result || undefined,
      website_url: formData.website_url || undefined,
      cover_image: formData.cover_image,
      gallery: galleryArray,
      featured: formData.featured,
      published: formData.published,
      sort_order: Date.now(),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred saving the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-eureka-border pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2.5 border border-eureka-border bg-white text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all shadow-eureka-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Create New Project</h1>
            <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
              Add a new portfolio case study to Ethio-Eureka database & landing page
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
          <Sparkles size={16} className="text-emerald-600" /> Project saved successfully. Redirecting to projects list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-eureka-border rounded-3xl p-6 md:p-8 shadow-eureka-lg font-sans text-xs">
        
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Abyssinia Craft"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
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
              placeholder="e.g. abyssinia-craft"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Category, Client, Year */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            >
              <option value="Website Design & Development">Website Design & Development</option>
              <option value="Branding & Identity">Branding & Identity</option>
              <option value="Content & Social Management">Content & Social Management</option>
              <option value="Graphic & Editorial Design">Graphic & Editorial Design</option>
              <option value="Web Application & Dashboard">Web Application & Dashboard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Client Name
            </label>
            <input
              type="text"
              placeholder="e.g. Abyssinia Artisan Group"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Year *
            </label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Cover Image & Website Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Cover Image URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Live Website URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Short Summary (Card Preview) *
          </label>
          <input
            type="text"
            required
            placeholder="Brief 1-2 sentence overview shown on project cards..."
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
          />
        </div>

        {/* Full Overview */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Full Description (Overview & The Vision) *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Detailed project summary explaining the project concept and scope..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
          />
        </div>

        {/* Challenge & Approach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              The Challenge (Problem Statement)
            </label>
            <textarea
              rows={3}
              placeholder="What obstacle or market gap did the client face..."
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
              Our Approach (Strategy & Execution)
            </label>
            <textarea
              rows={3}
              placeholder="How Ethio-Eureka designed and engineered the solution..."
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
            />
          </div>
        </div>

        {/* Business Outcome / Result */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Result & Outcome (Business Impact)
          </label>
          <textarea
            rows={2}
            placeholder="Key results, metrics, or client impact achieved..."
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl font-sans transition-all"
          />
        </div>

        {/* Visual Gallery Image URLs */}
        <div>
          <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">
            Visual Gallery Image URLs (Comma-separated)
          </label>
          <textarea
            rows={2}
            placeholder="https://images.unsplash.com/photo-1..., https://images.unsplash.com/photo-2..."
            value={formData.gallery_raw}
            onChange={(e) => setFormData({ ...formData, gallery_raw: e.target.value })}
            className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
          />
          <p className="text-[11px] font-mono text-eureka-slate/80 mt-1">
            Separate multiple image URLs with commas to display a gallery on the project case study page.
          </p>
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
            <span>Feature on Homepage</span>
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
            href="/admin/projects"
            className="px-6 py-3 border border-eureka-border text-eureka-slate hover:text-eureka-dark hover:bg-slate-100 rounded-xl transition-all font-mono text-xs uppercase font-bold"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-eureka-blue text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-eureka-indigo transition-all flex items-center gap-2 shadow-eureka-sm disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{loading ? "Saving..." : "Save Project"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}

