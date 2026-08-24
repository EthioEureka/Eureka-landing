import { fetchTestimonials } from "@/lib/db";
import { Plus, Quote } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Testimonial Management</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Manage client quotes, endorsements, and roles
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest px-5 py-3 font-mono hover:bg-white transition-colors">
          <Plus size={16} />
          <span>New Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={t.id || idx} className="bg-dark-gray border border-border-gray p-6 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between text-soft-gray border-b border-border-gray/50 pb-3">
              <span className="flex items-center gap-2 text-off-white font-semibold font-sans text-sm">
                <Quote size={14} className="text-eureka-green" /> {t.client_name}
              </span>
              <span className="text-[10px] uppercase text-eureka-green">FEATURED</span>
            </div>

            <p className="text-soft-gray italic font-sans text-xs leading-relaxed">&ldquo;{t.quote}&rdquo;</p>

            <div className="text-[11px] text-soft-gray">
              <p className="text-off-white">{t.role}</p>
              <p>{t.company}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
