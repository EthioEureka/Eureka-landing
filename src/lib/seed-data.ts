import { Project, Service, Testimonial, SiteSettings } from "./types";

export const defaultSiteSettings: SiteSettings = {
  id: "default-settings",
  company_name: "Ethio-Eureka",
  tagline: "We build digital identities that make businesses matter.",
  description:
    "Ethio-Eureka is an independent creative technology and digital studio based in Addis Ababa, helping ambitious brands turn ideas into high-impact digital experiences.",
  email: "hello@ethio-eureka.com",
  phone: "+251 911 234 567",
  location: "Addis Ababa, Ethiopia",
  address: "Bole Medhanialem, Executive Tower 4th Floor, Addis Ababa",
  google_maps_url: "https://maps.google.com/?q=Addis+Ababa+Ethiopia",
  instagram_url: "https://instagram.com/ethioeureka",
  facebook_url: "https://facebook.com/ethioeureka",
  linkedin_url: "https://linkedin.com/company/ethioeureka",
  twitter_url: "https://x.com/ethioeureka",
  telegram_url: "https://t.me/ethioeureka",
  whatsapp_number: "+251911234567",
  meta_title: "Ethio-Eureka — Independent Creative & Digital Technology Studio",
  meta_description:
    "Ethio-Eureka is a creative digital studio helping ambitious businesses build brands, websites, and digital experiences that stand out globally.",
};

export const defaultServices: Service[] = [
  {
    id: "srv-01",
    title: "Website Design & Development",
    slug: "website-design-development",
    short_description:
      "We design and build fast, responsive websites that turn your digital presence into a serious business asset.",
    description:
      "From bespoke editorial web design to complex Next.js full-stack applications, we engineer digital platforms built for maximum speed, immaculate typography, and conversion performance.",
    icon: "Layout",
    sort_order: 1,
    featured: true,
    published: true,
  },
  {
    id: "srv-02",
    title: "Branding & Visual Identity",
    slug: "branding-visual-identity",
    short_description:
      "We create visual identities that give businesses clarity, personality, and a recognizable presence.",
    description:
      "We build complete brand systems — logos, visual guidelines, color palettes, typography scales, and brand collateral — crafted to command authority across print and digital screens.",
    icon: "Sparkles",
    sort_order: 2,
    featured: true,
    published: true,
  },
  {
    id: "srv-03",
    title: "Content Management Systems",
    slug: "content-management",
    short_description:
      "We organize, create, and manage digital content so your brand stays consistent and relevant.",
    description:
      "Empower your team with clean, custom-built CMS architecture that makes publishing editorial content, case studies, and corporate announcements effortless.",
    icon: "FileText",
    sort_order: 3,
    featured: true,
    published: true,
  },
  {
    id: "srv-04",
    title: "Social Media Management",
    slug: "social-media-management",
    short_description:
      "We help brands build an active social presence through strategy, creative content, and consistent publishing.",
    description:
      "We turn social channels into brand narrative engines. Strategic visual storytelling, video clips, layout grids, and community engagement for high-growth enterprises.",
    icon: "Share2",
    sort_order: 4,
    featured: true,
    published: true,
  },
  {
    id: "srv-05",
    title: "Graphic & Editorial Design",
    slug: "graphic-editorial-design",
    short_description:
      "From campaigns to social assets, presentations, and marketing materials, we create visuals that communicate clearly.",
    description:
      "High-end corporate keynotes, investor decks, print collateral, annual reports, and outdoor campaign designs crafted with Swiss visual precision.",
    icon: "PenTool",
    sort_order: 5,
    featured: true,
    published: true,
  },
];

export const defaultProjects: Project[] = [
  {
    id: "prj-01",
    title: "Abyssinia Craft",
    slug: "abyssinia-craft",
    client: "Abyssinia Artisan Group",
    category: "Brand Identity & E-Commerce",
    year: 2026,
    short_description:
      "A digital transformation for an authentic East African luxury leather and artisan export house.",
    description:
      "Abyssinia Craft connects traditional Ethiopian leather artisans with global luxury consumers. Ethio-Eureka designed a modern editorial brand identity and high-performance direct-to-consumer web experience.",
    challenge:
      "The client needed to reposition their heritage craft house as a contemporary international luxury label without losing cultural authenticity or visual warmth.",
    approach:
      "We introduced a clean, high-contrast dark monochrome identity paired with warm tactile photography, modern grotesk typography, and a lightning-fast custom web storefront.",
    result:
      "Increased international retail orders by 140% within 90 days of launch, establishing Abyssinia Craft as a premier African luxury exporter.",
    website_url: "https://abyssiniacraft.example.com",
    cover_image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    id: "prj-02",
    title: "Kality Freight",
    slug: "kality-freight",
    client: "Kality Logistics Corp",
    category: "Design System & Web App",
    year: 2026,
    short_description:
      "A real-time supply chain platform and design system for regional freight operations.",
    description:
      "Kality Freight is an East African logistics enterprise managing cross-border cargo transport. Ethio-Eureka overhauled their brand presence and engineered their customer tracking portal.",
    challenge:
      "Legacy phone and paper tracking systems led to communication delays between cargo owners and transport fleets.",
    approach:
      "We built a minimalist, real-time web portal with brutalist clarity, clear status indicators, instant quote generation, and SMS milestone updates.",
    result:
      "Reduced support call volume by 65% while improving customer satisfaction scores to 98%.",
    website_url: "https://kalityfreight.example.com",
    cover_image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    id: "prj-03",
    title: "Zoma Architecture",
    slug: "zoma-architecture",
    client: "Zoma Sustainable Design Lab",
    category: "Editorial Web Experience",
    year: 2025,
    short_description:
      "An immersive digital monograph for an award-winning eco-architectural practice.",
    description:
      "Zoma Architecture blends vernacular rammed-earth construction with contemporary structural engineering. Ethio-Eureka crafted a gallery-grade web platform highlighting their project portfolio.",
    challenge:
      "Standard architectural templates failed to convey the textural depth and material innovation of their earth-built public structures.",
    approach:
      "We designed an ultra-minimalist dark grid layout featuring high-resolution full-bleed photography, architectural line drawings, and subtle interactive page transitions.",
    result:
      "Featured in international architectural publications and won 2 digital design awards.",
    website_url: "https://zomaarch.example.com",
    cover_image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    published: true,
    sort_order: 3,
  },
  {
    id: "prj-04",
    title: "Nile Capital Partners",
    slug: "nile-capital-partners",
    client: "Nile Capital Venture Fund",
    category: "Fintech Brand & Identity",
    year: 2025,
    short_description:
      "Brand identity and investor reporting portal for a tech venture catalyst in East Africa.",
    description:
      "Nile Capital backs early-stage African tech founders. We established a confident, institutional visual identity and investor web portal that reflects financial stability and innovation.",
    challenge:
      "Communicating credibility to global LPs while showcasing high-growth tech portfolios.",
    approach:
      "Precision typography, Swiss layout principles, subtle metallic accents, and dynamic portfolio case studies.",
    result:
      "Successfully closed Fund II with $35M in commitments from institutional backed partners.",
    website_url: "https://nilecapital.example.com",
    cover_image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    published: true,
    sort_order: 4,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "tst-01",
    client_name: "Yonas Tadesse",
    role: "Founder & CEO",
    company: "Abyssinia Artisan Group",
    quote:
      "Ethio-Eureka understood our ambition immediately. They didn't just design a website; they elevated our brand to compete on the global stage. Their eye for detail is unmatched.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    id: "tst-02",
    client_name: "Bethlehem Alemu",
    role: "Managing Director",
    company: "Kality Logistics",
    quote:
      "Working with Ethio-Eureka gave us complete visual clarity. Our digital portal transformed how our enterprise clients view our efficiency and capabilities.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    id: "tst-03",
    client_name: "Marcus Vance",
    role: "General Partner",
    company: "Nile Capital Partners",
    quote:
      "Fast, articulate, and deeply strategic. Ethio-Eureka builds digital identity with the exact aesthetic polish you expect from a tier-1 global design studio.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    featured: true,
    published: true,
    sort_order: 3,
  },
];
