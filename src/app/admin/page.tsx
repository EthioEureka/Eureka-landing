import Link from "next/link";
import { FolderKanban, Star, Inbox, MessageSquareQuote, ArrowUpRight, Plus } from "lucide-react";
import { fetchAllProjectsAdmin, fetchTestimonials, fetchContactSubmissions } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {

  const projects = await fetchAllProjectsAdmin();
  const testimonials = await fetchTestimonials();
  const allSubmissions = await fetchContactSubmissions();
  const submissions = allSubmissions.slice(0, 5);

  const featuredCount = projects.filter((p) => p.featured).length;
  const newSubmissionsCount = submissions.filter((s) => s.status === "new" || !s.status).length;

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Dashboard Overview</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Ethio-Eureka Studio CMS & Lead Activity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-eureka-indigo transition-all font-mono shadow-eureka-sm"
          >
            <Plus size={16} />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-eureka-border rounded-2xl p-6 flex flex-col justify-between shadow-eureka-sm">
          <div className="flex items-center justify-between text-eureka-slate mb-4">
            <span className="text-xs font-mono uppercase font-semibold">Total Projects</span>
            <FolderKanban size={20} className="text-eureka-blue" />
          </div>
          <p className="text-4xl font-mono font-bold text-eureka-dark">{projects.length}</p>
          <p className="text-[11px] font-mono text-eureka-slate mt-2">Active in portfolio</p>
        </div>

        <div className="bg-white border border-eureka-border rounded-2xl p-6 flex flex-col justify-between shadow-eureka-sm">
          <div className="flex items-center justify-between text-eureka-slate mb-4">
            <span className="text-xs font-mono uppercase font-semibold">Featured Showcase</span>
            <Star size={20} className="text-eureka-blue" />
          </div>
          <p className="text-4xl font-mono font-bold text-eureka-blue">{featuredCount}</p>
          <p className="text-[11px] font-mono text-eureka-slate mt-2">Homepage featured</p>
        </div>

        <div className="bg-white border border-eureka-border rounded-2xl p-6 flex flex-col justify-between shadow-eureka-sm">
          <div className="flex items-center justify-between text-eureka-slate mb-4">
            <span className="text-xs font-mono uppercase font-semibold">New Inquiries</span>
            <Inbox size={20} className="text-eureka-blue" />
          </div>
          <p className="text-4xl font-mono font-bold text-eureka-dark">{newSubmissionsCount}</p>
          <p className="text-[11px] font-mono text-eureka-slate mt-2">Contact submissions</p>
        </div>

        <div className="bg-white border border-eureka-border rounded-2xl p-6 flex flex-col justify-between shadow-eureka-sm">
          <div className="flex items-center justify-between text-eureka-slate mb-4">
            <span className="text-xs font-mono uppercase font-semibold">Testimonials</span>
            <MessageSquareQuote size={20} className="text-eureka-blue" />
          </div>
          <p className="text-4xl font-mono font-bold text-eureka-dark">{testimonials.length}</p>
          <p className="text-[11px] font-mono text-eureka-slate mt-2">Client quotes</p>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white border border-eureka-border rounded-2xl p-6 shadow-eureka-sm">
          <div className="flex items-center justify-between border-b border-eureka-border pb-4 mb-6">
            <h2 className="text-base font-bold text-eureka-dark font-mono uppercase tracking-tight">
              Recent Contact Leads
            </h2>
            <Link
              href="/admin/contact-submissions"
              className="text-xs font-mono text-eureka-blue font-bold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {submissions.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-eureka-slate border border-dashed border-eureka-border rounded-xl">
              No contact submissions received yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-eureka-border text-eureka-slate uppercase text-[10px]">
                    <th className="pb-3 font-bold">Name</th>
                    <th className="pb-3 font-bold">Service</th>
                    <th className="pb-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eureka-border">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 text-eureka-dark">
                        <p className="font-bold">{sub.name}</p>
                        <p className="text-[10px] text-eureka-slate">{sub.email}</p>
                      </td>
                      <td className="py-3 text-eureka-slate">{sub.service || "General"}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 bg-eureka-blue/10 text-eureka-blue text-[10px] font-bold uppercase rounded-md border border-eureka-blue/20">
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
        <div className="lg:col-span-5 bg-white border border-eureka-border rounded-2xl p-6 shadow-eureka-sm">
          <div className="flex items-center justify-between border-b border-eureka-border pb-4 mb-6">
            <h2 className="text-base font-bold text-eureka-dark font-mono uppercase tracking-tight">
              Portfolio Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-eureka-blue font-bold hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id || p.slug}
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-eureka-border rounded-xl"
              >
                <div>
                  <h3 className="text-sm text-eureka-dark font-bold">{p.title}</h3>
                  <p className="text-[10px] font-mono text-eureka-slate">{p.category} · {p.year}</p>
                </div>
                {p.featured && (
                  <span className="text-[10px] font-mono bg-eureka-blue text-white px-2 py-0.5 rounded font-bold uppercase">
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

