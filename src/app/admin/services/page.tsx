import { fetchServices } from "@/lib/db";
import { Plus } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await fetchServices();

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Service Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage agency capabilities and expandable service rows
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 font-mono hover:bg-white transition-colors">
          <Plus size={16} />
          <span>New Service</span>
        </button>
      </div>

      <div className="bg-dark-gray border border-border-gray overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border-gray text-soft-gray uppercase text-[10px] bg-deep-black/60">
              <th className="py-4 px-6 font-semibold">Service Title</th>
              <th className="py-4 px-4 font-semibold">Slug</th>
              <th className="py-4 px-4 font-semibold">Order</th>
              <th className="py-4 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray/50">
            {services.map((s, idx) => (
              <tr key={s.id || s.slug} className="hover:bg-deep-black/40">
                <td className="py-4 px-6 text-off-white font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-eureka-green font-bold">0{idx + 1}</span>
                    <span className="font-sans text-sm font-semibold">{s.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-soft-gray">{s.slug}</td>
                <td className="py-4 px-4 text-soft-gray">{s.sort_order || idx + 1}</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] uppercase">
                    PUBLISHED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
