"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import { Project } from "@/lib/types";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.project) {
            const p: Project = data.project;
            setFormData({
              title: p.title || "",
              slug: p.slug || "",
              client: p.client || "",
              category: p.category || "Website Design & Development",
              year: p.year || new Date().getFullYear(),
              short_description: p.short_description || "",
              description: p.description || "",
              challenge: p.challenge || "",
              approach: p.approach || "",
              result: p.result || "",
              website_url: p.website_url || "",
              cover_image: p.cover_image || "",
              gallery_raw: p.gallery && Array.isArray(p.gallery) ? p.gallery.join(", ") : "",
              featured: !!p.featured,
              published: p.published !== false,
            });
          }
        }
      } catch (err: unknown) {
        console.error("Failed to load project details", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
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
    };

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update project");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading project details...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border-gray pb-6">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-soft-gray hover:text-eureka-green mb-2"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <h1 className="text-2xl font-light text-off-white">Edit Project: {formData.title}</h1>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/60 border border-red-800 text-red-400 font-mono text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Sparkles size={16} /> Changes saved successfully. Redirecting to projects list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-gray border border-border-gray p-8">
        
        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-soft-gray px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        {/* Category, Client, Year */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Category *
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Year *
            </label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        {/* Cover Image & Website Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              required
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Live Website URL (Optional)
            </label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Short Summary (Card Preview) *
          </label>
          <input
            type="text"
            required
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
          />
        </div>

        {/* Full Overview */}
        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Full Description (Overview & The Vision) *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
          />
        </div>

        {/* Challenge & Approach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              The Challenge (Problem Statement)
            </label>
            <textarea
              rows={3}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Our Approach (Strategy & Execution)
            </label>
            <textarea
              rows={3}
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        {/* Business Outcome / Result */}
        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Result & Outcome (Business Impact)
          </label>
          <textarea
            rows={2}
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
          />
        </div>

        {/* Visual Gallery Image URLs */}
        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Visual Gallery Image URLs (Comma-separated)
          </label>
          <textarea
            rows={2}
            value={formData.gallery_raw}
            onChange={(e) => setFormData({ ...formData, gallery_raw: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
          />
          <p className="text-[11px] font-mono text-soft-gray/70 mt-1">
            Separate multiple image URLs with commas to display a gallery on the project case study page.
          </p>
        </div>

        {/* Feature Checkboxes */}
        <div className="flex items-center gap-8 pt-4 border-t border-border-gray/40">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-soft-gray">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-eureka-green"
            />
            <span className="text-off-white">Feature on Homepage</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-soft-gray">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 accent-eureka-green"
            />
            <span className="text-off-white">Publish Immediately</span>
          </label>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-border-gray/50 flex justify-end gap-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3 border border-border-gray text-soft-gray hover:text-off-white font-mono text-xs uppercase"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-eureka-green text-deep-black font-semibold font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
