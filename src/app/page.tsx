import { cookies } from "next/headers";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import Marquee from "@/components/Marquee";
import ServiceList from "@/components/ServiceList";
import ProjectGrid from "@/components/ProjectGrid";
import MissionSection from "@/components/MissionSection";
import WhySection from "@/components/WhySection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import { fetchProjects, fetchServices, fetchTestimonials, fetchPartners, fetchSiteSettings } from "@/lib/db";
import { siteData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch real-time dynamic CMS data from Supabase

export default async function HomePage() {
  const [projects, services, testimonials, partners, siteSettings] = await Promise.all([
    fetchProjects(),
    fetchServices(),
    fetchTestimonials(),
    fetchPartners(),
    fetchSiteSettings(),
  ]);

  // Store pre-cached site data in cookie upon load
  try {
    const cookieStore = await cookies();
    const cachePayload = JSON.stringify({
      company_name: siteSettings.company_name,
      tagline: siteSettings.tagline,
      email: siteSettings.email,
      phone: siteSettings.phone,
      address: siteSettings.address,
      projects_count: projects.length,
      services_count: services.length,
      updated_at: new Date().toISOString(),
    });
    cookieStore.set("ethio_eureka_site_cache", cachePayload, {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });
  } catch (err) {
    console.warn("Cookie set warning:", err);
  }

  const serviceSlugs = services.map((s) => (s.slug ? s.slug.toUpperCase() : s.title.toUpperCase()));

  return (
    <>
      <Hero projects={projects} />
      <Marquee items={serviceSlugs.length > 0 ? serviceSlugs : siteData.marquee.defaultServiceSlugs} />
      <IntroSection />
      <ServiceList services={services} />
      <ProjectGrid projects={projects} />
      <MissionSection />
      <WhySection />
      <ProcessTimeline />
      <TestimonialSection testimonials={testimonials} />
      <ContactSection />
    </>
  );
}

