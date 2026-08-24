"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client: "",
    category: "Brand Identity & Web",
    year: 2026,
    short_description: "",
    description: "",
    challenge: "",
    approach: "",
    result: "",
    website_url: "",
    cover_image: "",
    featured: false,
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, title: val, slug: generatedSlug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save / Supabase insertion
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/projects");
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Top Header */}
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
              Add a new portfolio case study to Ethio-Eureka database
            </p>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Sparkles size={16} /> Project saved successfully. Redirecting to projects list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-gray border border-border-gray p-8">
        
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
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-soft-gray px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
              Category *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Brand Identity & E-Commerce"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Cover Image URL *
          </label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            value={formData.cover_image}
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm font-mono focus:border-eureka-green focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Short Description (Grid subtitle) *
          </label>
          <input
            type="text"
            required
            placeholder="Brief 1-2 sentence overview..."
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
            Full Description (Overview)
          </label>
          <textarea
            rows={4}
            placeholder="Detailed project summary..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              The Challenge
            </label>
            <textarea
              rows={3}
              placeholder="Problem statement..."
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Our Approach
            </label>
            <textarea
              rows={3}
              placeholder="Strategy & execution..."
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-border-gray/40">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-soft-gray">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-eureka-green"
            />
            <span>Feature on Homepage</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-soft-gray">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 accent-eureka-green"
            />
            <span>Publish Immediately</span>
          </label>
        </div>

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
            <Save size={16} />
            <span>{loading ? "Saving..." : "Save Project"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
