export interface Project {
  id: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  slug: string;
  client?: string;
  category: string;
  year: number;
  short_description: string;
  description: string;
  challenge?: string;
  approach?: string;
  result?: string;
  website_url?: string;
  cover_image: string;
  gallery: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon?: string;
  sort_order: number;
  featured: boolean;
  published: boolean;
  deliverables?: string[];      // list of deliverable items shown in ServiceItem card
  show_in_marquee?: boolean;    // whether this service title shows in hero marquee
}

export interface Testimonial {
  id: string;
  created_at?: string;
  updated_at?: string;
  client_name: string;
  role?: string;
  company?: string;
  quote: string;
  photo?: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface ContactSubmission {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  read?: boolean;
}

export interface SiteSettings {
  id?: string;
  company_name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  google_maps_url: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  twitter_url: string;
  telegram_url: string;
  whatsapp_number: string;
  logo_url?: string;
  favicon_url?: string;
  meta_title: string;
  meta_description: string;
  og_image?: string;
  updated_at?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

