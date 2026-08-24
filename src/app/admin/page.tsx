import Link from "next/link";
import { FolderKanban, Star, Inbox, MessageSquareQuote, ArrowUpRight, Plus } from "lucide-react";
import { fetchAllProjectsAdmin, fetchTestimonials } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  const projects = await fetchAllProjectsAdmin();
  const testimonials = await fetchTestimonials();

  let submissions: Array<{
    id: string;
    created_at?: string;
    name: string;
    email: string;
    service?: string;
    status?: string;
  }> = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) submissions = data;
    } catch {
      submissions = [];
    }
  }

  const featuredCount = projects.filter((p) => p.featured).length;
  const newSubmissionsCount = submissions.filter((s) => s.status === "new" || !s.status).length;

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-off-white">Dashboard Overview</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Ethio-Eureka Studio CMS & Lead Activity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-white transition-colors font-mono"
          >
            <Plus size={16} />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-gray border border-border-gray p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-soft-gray mb-4">
            <span className="text-xs font-mono uppercase">Total Projects</span>
            <FolderKanban size={20} className="text-eureka-green" />
          </div>
          <p className="text-4xl font-mono font-light text-off-white">{projects.length}</p>
          <p className="text-[11px] font-mono text-soft-gray mt-2">Active in portfolio</p>
        </div>

        <div className="bg-dark-gray border border-border-gray p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-soft-gray mb-4">
            <span className="text-xs font-mono uppercase">Featured Showcase</span>
            <Star size={20} className="text-eureka-green" />
          </div>
          <p className="text-4xl font-mono font-light text-eureka-green">{featuredCount}</p>
          <p className="text-[11px] font-mono text-soft-gray mt-2">Homepage featured</p>
        </div>

        <div className="bg-dark-gray border border-border-gray p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-soft-gray mb-4">
            <span className="text-xs font-mono uppercase">New Inquiries</span>
            <Inbox size={20} className="text-eureka-green" />
          </div>
          <p className="text-4xl font-mono font-light text-off-white">{newSubmissionsCount}</p>
          <p className="text-[11px] font-mono text-soft-gray mt-2">Contact submissions</p>
        </div>

        <div className="bg-dark-gray border border-border-gray p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-soft-gray mb-4">
            <span className="text-xs font-mono uppercase">Testimonials</span>
            <MessageSquareQuote size={20} className="text-eureka-green" />
          </div>
          <p className="text-4xl font-mono font-light text-off-white">{testimonials.length}</p>
          <p className="text-[11px] font-mono text-soft-gray mt-2">Client quotes</p>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-dark-gray border border-border-gray p-6">
          <div className="flex items-center justify-between border-b border-border-gray pb-4 mb-6">
            <h2 className="text-base font-semibold text-off-white font-mono uppercase">
              Recent Contact Leads
            </h2>
            <Link
              href="/admin/contact-submissions"
              className="text-xs font-mono text-eureka-green hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {submissions.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-soft-gray border border-dashed border-border-gray">
              No contact submissions received yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px]">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Service</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray/50">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-deep-black/40">
                      <td className="py-3 text-off-white">
                        <p className="font-semibold">{sub.name}</p>
                        <p className="text-[10px] text-soft-gray">{sub.email}</p>
                      </td>
                      <td className="py-3 text-soft-gray">{sub.service || "General"}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-eureka-green/10 text-eureka-green text-[10px] uppercase border border-eureka-green/30">
                          {sub.status || "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Portfolio Summary */}
        <div className="lg:col-span-5 bg-dark-gray border border-border-gray p-6">
          <div className="flex items-center justify-between border-b border-border-gray pb-4 mb-6">
            <h2 className="text-base font-semibold text-off-white font-mono uppercase">
              Portfolio Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-eureka-green hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id || p.slug}
                className="flex items-center justify-between p-3 bg-deep-black/60 border border-border-gray/60"
              >
                <div>
                  <h3 className="text-sm text-off-white font-medium">{p.title}</h3>
                  <p className="text-[10px] font-mono text-soft-gray">{p.category} · {p.year}</p>
                </div>
                {p.featured && (
                  <span className="text-[10px] font-mono bg-eureka-green text-deep-black px-2 py-0.5 font-semibold uppercase">
                    FEATURED
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
