"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";

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

    // Process gallery comma-separated URLs into array
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
      <div className="flex items-center justify-between border-b border-border-gray pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 border border-border-gray text-soft-gray hover:text-eureka-green transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-light text-off-white">Create New Project</h1>
            <p className="text-xs font-mono text-soft-gray mt-1">
              Add a new portfolio case study to Ethio-Eureka database & landing page
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/60 border border-red-800 text-red-400 font-mono text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Sparkles size={16} /> Project saved successfully. Redirecting to projects list...
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
              placeholder="e.g. Abyssinia Craft"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
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
              placeholder="e.g. abyssinia-craft"
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
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            >
              <option value="Website Design & Development">Website Design & Development</option>
              <option value="Branding & Identity">Branding & Identity</option>
              <option value="Content & Social Management">Content & Social Management</option>
              <option value="Graphic & Editorial Design">Graphic & Editorial Design</option>
              <option value="Web Application & Dashboard">Web Application & Dashboard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Client Name
            </label>
            <input
              type="text"
              placeholder="e.g. Abyssinia Artisan Group"
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
              placeholder="https://images.unsplash.com/photo-..."
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
              placeholder="https://example.com"
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
            placeholder="Brief 1-2 sentence overview shown on project cards..."
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
            placeholder="Detailed project summary explaining the project concept and scope..."
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
              placeholder="What obstacle or market gap did the client face..."
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
              placeholder="How Ethio-Eureka designed and engineered the solution..."
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
            placeholder="Key results, metrics, or client impact achieved..."
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
            placeholder="https://images.unsplash.com/photo-1..., https://images.unsplash.com/photo-2..."
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
            disabled={loading}
            className="px-8 py-3 bg-eureka-green text-deep-black font-semibold font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{loading ? "Saving..." : "Save Project"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
