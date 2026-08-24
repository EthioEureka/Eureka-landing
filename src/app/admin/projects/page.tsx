import Link from "next/link";
import { Plus, ExternalLink, Star } from "lucide-react";
import { fetchAllProjectsAdmin } from "@/lib/db";

export default async function AdminProjectsPage() {
  const projects = await fetchAllProjectsAdmin();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Project Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage portfolio case studies, featured toggles, and metadata
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 hover:bg-white transition-colors font-mono"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Projects Data Table */}
      <div className="bg-dark-gray border border-border-gray overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
              <th className="py-4 px-6 font-semibold">Project Name</th>
              <th className="py-4 px-4 font-semibold">Category</th>
              <th className="py-4 px-4 font-semibold">Year</th>
              <th className="py-4 px-4 font-semibold">Featured</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray/50">
            {projects.map((p) => (
              <tr key={p.id || p.slug} className="hover:bg-deep-black/40 transition-colors">
                <td className="py-4 px-6 text-off-white font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-border-gray flex items-center justify-center font-bold text-[10px]">
                      {p.title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-sans font-semibold">{p.title}</p>
                      <p className="text-[10px] text-soft-gray">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-soft-gray">{p.category}</td>
                <td className="py-4 px-4 text-soft-gray">{p.year}</td>
                <td className="py-4 px-4">
                  {p.featured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-eureka-green/20 text-eureka-green border border-eureka-green/40 px-2 py-0.5 font-bold uppercase">
                      <Star size={10} className="fill-eureka-green" /> FEATURED
                    </span>
                  ) : (
                    <span className="text-[10px] text-soft-gray/60 uppercase">STANDARD</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] uppercase">
                    PUBLISHED
                  </span>
                </td>
                <td className="py-4 px-6 text-right space-x-3">
                  <Link
                    href={`/work/${p.slug}`}
                    target="_blank"
                    className="text-soft-gray hover:text-eureka-green transition-colors inline-inline-flex items-center gap-1"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
