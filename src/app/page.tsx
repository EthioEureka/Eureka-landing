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
import { fetchProjects, fetchServices, fetchTestimonials } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch real-time dynamic CMS data from Supabase

export default async function HomePage() {
  const [projects, services, testimonials] = await Promise.all([
    fetchProjects(),
    fetchServices(),
    fetchTestimonials(),
  ]);

  return (
    <>
      <Hero projects={projects} />
      <IntroSection />
      <Marquee />
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
