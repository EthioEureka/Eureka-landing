// ============================================================
// data.ts — Centralized Static Content for Ethio-Eureka
// All user-visible text for every landing page section lives
// here. Nothing is hardcoded inside components or pages.
// ============================================================

export const siteData = {

  // ----------------------------------------------------------
  // HERO SECTION
  // ----------------------------------------------------------
  hero: {
    badge: {
      studioLabel: "ETHIO-EUREKA // DIGITAL STUDIO",
      agencyLabel: "Digital CREATIVE AGENCY",
      statusLabel: "Taking New Projects",
    },
    headline: {
      line1: "If your business moves",
      highlightWord: "fast",
      line2: "Your website",
      line3: "should lead.",
    },
    subtext: "Ethio-Eureka is an independent studio crafting bespoke brand identities, ultra-smooth web applications, and dynamic CMS engines.",
    logo3DCard: {
      studioLabel: "ETHIO-EUREKA // DIGITAL STUDIO",
      title: "Creative Technology Partner",
      description: "Crafting world-class visual identities, web products, and dynamic CMS engines for growing brands.",
      statusBadge: "Taking New Projects",
    },
    cta: {
      primary: "Start a Project",
      secondary: "Explore Portfolio",
    },
    bottomBar: {
      disciplines: "Web-dev · Brand-creation · Engineering",
      callPrefix: "Call Us Now:",
      takingClients: "Taking New Clients",
      scrollLabel: "(SCROLL)",
      availability: "Available for global partnerships",
    },
  },

  // ----------------------------------------------------------
  // MARQUEE (below hero)
  // ----------------------------------------------------------
  marquee: {
    defaultServiceSlugs: [
      "WEBSITE DESIGN & DEVELOPMENT",
      "BRANDING & VISUAL IDENTITY",
      "CONTENT MANAGEMENT SYSTEMS",
      "SOCIAL MEDIA MANAGEMENT",
      "GRAPHIC & EDITORIAL DESIGN",
      "WEB APPLICATION & DASHBOARDS",
    ],
  },

  // ----------------------------------------------------------
  // INTRO / POSITIONING SECTION
  // ----------------------------------------------------------
  intro: {
    sectionTag: "01 // POSITIONING",
    tagline: "Studio philosophy centered around strategic clarity, visual restraint, and structural longevity.",
    // The animated editorial paragraph, split into word tokens
    // highlight: true words get hover-underline treatment
    // key groups words that share the same hover group
    words: [
      { text: "Ethio-Eureka", highlight: false },
      { text: "is", highlight: false },
      { text: "a", highlight: false },
      { text: "creative", highlight: false },
      { text: "digital", highlight: false },
      { text: "studio", highlight: false },
      { text: "helping", highlight: false },
      { text: "ambitious", highlight: false },
      { text: "businesses", highlight: false },
      { text: "turn", highlight: false },
      { text: "ideas", highlight: false },
      { text: "into", highlight: false },
      { text: "brands,", highlight: true, key: "brands" },
      { text: "websites,", highlight: true, key: "websites" },
      { text: "and", highlight: false },
      { text: "digital", highlight: true, key: "digital experiences" },
      { text: "experiences", highlight: true, key: "digital experiences" },
      { text: "people", highlight: false },
      { text: "remember.", highlight: true, key: "remember" },
    ],
    footnote: {
      left: "BASED IN ADDIS ABABA & WORKING GLOBALLY",
      right: "ETHIO-EUREKA DIGITAL STUDIO",
    },
  },

  // ----------------------------------------------------------
  // SERVICES SECTION
  // ----------------------------------------------------------
  services: {
    sectionTag: "02 // SERVICES & CAPABILITIES",
    headline: "What we do.",
    subtext: "One creative partner. Multiple ways to move your brand and digital presence forward.",
  },

  // ----------------------------------------------------------
  // PROJECTS / SELECTED WORK SECTION
  // ----------------------------------------------------------
  projects: {
    sectionTag: "03 // SELECTED WORK",
    headline: "Selected work.",
    subtext: "A few things we've built, shaped, and brought to life.",
    viewAllCta: "Explore all projects",
  },

  // ----------------------------------------------------------
  // MISSION SECTION
  // ----------------------------------------------------------
  mission: {
    sectionTag: "04 // OUR MISSION",
    headline: "Built with intention, engineered for impact.",
    description: "We don't do generic templates or surface-level aesthetics. Every brand system and digital platform we build is crafted to position our clients at the forefront of their industries.",
    pillars: [
      {
        number: "01",
        title: "Strategic Clarity",
        description: "We dive deep into your market positioning before laying down a single line of code or visual element.",
      },
      {
        number: "02",
        title: "Immaculate Engineering",
        description: "Ultra-fast Next.js architecture with zero bloat, crisp typography, and responsive perfection across all viewports.",
      },
      {
        number: "03",
        title: "Enduring Identity",
        description: "Aesthetic precision that outlasts design trends, giving your business a distinct visual voice for years to come.",
      },
    ],
  },

  // ----------------------------------------------------------
  // WHY US SECTION
  // ----------------------------------------------------------
  whyUs: {
    sectionTag: "05 // WHY ETHIO-EUREKA",
    headline: "Why leading brands partner with us.",
    principleLabel: "PRINCIPLE",
    features: [
      {
        title: "Full-Stack Creative Capability",
        description: "From strategy to visual identity, Next.js engineering, and CMS management — everything under one roof.",
      },
      {
        title: "Obsessive Attention to Detail",
        description: "Pixel-perfect layouts, micro-animations, typography hierarchy, and lightning-fast load times.",
      },
      {
        title: "Direct Founder Collaboration",
        description: "Work directly with senior craft leads without layers of account management overhead.",
      },
      {
        title: "Future-Proof Architecture",
        description: "Built using modern React & Supabase infrastructure for high security and seamless scalability.",
      },
    ],
  },

  // ----------------------------------------------------------
  // PROCESS / TIMELINE SECTION
  // ----------------------------------------------------------
  process: {
    sectionTag: "06 // OUR PROCESS",
    headline: "How we bring ideas to life.",
    deliverablesLabel: "KEY DELIVERABLES & OUTCOMES",
    stages: [
      {
        num: "01",
        name: "Discover",
        title: "Discovery & Strategy",
        description: "We align on your vision, target audience, competitive landscape, and digital objectives.",
        deliverables: [
          "Brand Audit & Discovery Workshop",
          "Target Audience Persona",
          "Competitive Landscape Analysis",
          "Core Project Goals",
        ],
      },
      {
        num: "02",
        name: "Define",
        title: "Identity & Prototype",
        description: "We craft visual directions, design systems, and high-fidelity interactive wireframes for review.",
        deliverables: [
          "Visual Moodboards & Art Direction",
          "Information Architecture & Sitemap",
          "UX Wireframes",
          "Technical Stack Specification",
        ],
      },
      {
        num: "03",
        name: "Create",
        title: "Engineering & Build",
        description: "We develop pixel-perfect web applications integrated with dynamic content management capabilities.",
        deliverables: [
          "High-Fidelity UI Design System",
          "Responsive Code Execution",
          "Micro-Animations & Interaction",
          "CMS Integration & Optimization",
        ],
      },
      {
        num: "04",
        name: "Launch & Grow",
        title: "Launch & Growth",
        description: "We deploy to production, optimize SEO performance, and provide ongoing strategic support.",
        deliverables: [
          "Production Domain & SSL Setup",
          "SEO Metadata & Performance Audit",
          "Admin Training & Documentation",
          "Ongoing Growth & Support",
        ],
      },
    ],
  },

  // ----------------------------------------------------------
  // TESTIMONIALS SECTION
  // ----------------------------------------------------------
  testimonials: {
    sectionTag: "07 // CLIENT TESTIMONIALS",
    headline: "What our partners say.",
    subtext: "Feedback from business leaders, founders, and managing directors.",
  },

  // ----------------------------------------------------------
  // CONTACT SECTION
  // ----------------------------------------------------------
  contact: {
    sectionTag: "08 // START A PROJECT",
    headline: "Have something worth building?",
    subtext: "Tell us what you're working on. Let's turn the idea into something people remember.",
    locationLabel: "LOCATION & POSITIONING",
    locationSubtext: "Based in Ethiopia. Working with ambitious businesses anywhere.",
    addressLabel: "Studio Address",
    emailLabel: "General Inquiries",
    phoneLabel: "Direct Phone",
    mapsLabel: "Open Google Maps",
    form: {
      namePlaceholder: "e.g. Abebe Bikila",
      emailPlaceholder: "name@company.com",
      companyPlaceholder: "Company Name",
      phonePlaceholder: "+251 911 ...",
      messagePlaceholder: "Tell us about your goals, timelines, and ideas...",
      nameLabel: "Your Name *",
      emailLabel: "Email Address *",
      companyLabel: "Company / Organization",
      phoneLabel: "Phone Number (Optional)",
      serviceLabel: "Requested Service",
      budgetLabel: "Project Budget (Optional)",
      messageLabel: "Project Message *",
      submitButton: "Send inquiry →",
      sendingButton: "Sending...",
      serviceOptions: [
        "Website Design & Development",
        "Branding & Identity",
        "Content Management",
        "Social Media Management",
        "Graphic Design",
        "Multiple Services",
        "Other",
      ],
      budgetOptions: [
        { label: "Select Range", value: "" },
        { label: "$2,000 - $5,000", value: "$2,000 - $5,000" },
        { label: "$5,000 - $10,000", value: "$5,000 - $10,000" },
        { label: "$10,000 - $25,000", value: "$10,000 - $25,000" },
        { label: "$25,000+", value: "$25,000+" },
      ],
    },
    success: {
      title: "Inquiry Received",
      message: "Thank you for reaching out to Ethio-Eureka. Our team will review your details and respond within 24 hours.",
      resetButton: "Send another inquiry →",
    },
  },

  // ----------------------------------------------------------
  // FOOTER
  // ----------------------------------------------------------
  footer: {
    callout: {
      eyebrow: "LET'S COLLABORATE",
      headline: "Let's build something extraordinary.",
      cta: "Start a Project",
    },
    brand: {
      name: "ETHIO-EUREKA",
      description: "Independent creative technology & digital design studio based in Addis Ababa, Ethiopia.",
      tagline: "ETHIOPIA → AFRICA → GLOBAL",
    },
    nav: {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "Services", href: "/#services" },
        { label: "About", href: "/#about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    services: {
      title: "Services",
      items: [
        "Web Design & Dev",
        "Brand Identity Systems",
        "Content & CMS Platforms",
        "Digital Strategy",
        "Graphic & UI/UX Design",
      ],
    },
    connect: {
      title: "Connect",
    },
    bottom: {
      adminLink: "CMS Admin",
      adminHref: "/admin/login",
    },
  },

  // ----------------------------------------------------------
  // WORK PAGE (standalone /work route)
  // ----------------------------------------------------------
  workPage: {
    sectionTag: "WORK ARCHIVE // 2025–2026",
    headline: "Selected work.",
    subtext: "A showcase of digital identities, web applications, and editorial design platforms engineered for ambitious enterprises.",
    metaTitle: "Selected Work — Ethio-Eureka Digital Studio",
    metaDescription: "Explore selected brand identities, web applications, design systems, and digital platforms built by Ethio-Eureka.",
  },

};
