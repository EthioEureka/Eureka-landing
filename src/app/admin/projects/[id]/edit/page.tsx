"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Project } from "@/lib/types";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    client: "",
    category: "Web Application",
    year: new Date().getFullYear(),
    short_description: "",
    description: "",
    challenge: "",
    approach: "",
    result: "",
    website_url: "",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
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
            setFormData(data.project);
          }
        }
      } catch (err: unknown) {
        console.error("Failed to load project", err);
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

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update project");
      }

      router.push("/admin/projects");
      router.refresh();
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

      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-gray border border-border-gray p-8 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-soft-gray uppercase mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-soft-gray uppercase mb-1">URL Slug *</label>
            <input
              type="text"
              required
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-soft-gray uppercase mb-1">Category</label>
            <input
              type="text"
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-soft-gray uppercase mb-1">Client Name</label>
            <input
              type="text"
              value={formData.client || ""}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-soft-gray uppercase mb-1">Short Summary (Card Preview) *</label>
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
            rows={4}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-deep-black border border-border-gray text-off-white p-3 focus:border-eureka-green focus:outline-none font-sans text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-soft-gray uppercase mb-1">Cover Image URL *</label>
            <input
              type="text"
              required
              value={formData.cover_image || ""}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-soft-gray uppercase mb-1">Website URL</label>
            <input
              type="text"
              value={formData.website_url || ""}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2 focus:border-eureka-green focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-border-gray/50">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="accent-eureka-green w-4 h-4"
            />
            <span className="text-off-white">Featured Project</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published !== false}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="accent-eureka-green w-4 h-4"
            />
            <span className="text-off-white">Published</span>
          </label>
        </div>

        <div className="pt-6 border-t border-border-gray flex justify-end gap-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3 border border-border-gray text-soft-gray hover:text-off-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
