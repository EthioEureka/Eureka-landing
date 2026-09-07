-- ETHIO-EUREKA SUPABASE DATABASE SCHEMA & RLS POLICIES

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT,
  category TEXT,
  year INTEGER DEFAULT 2026,
  short_description TEXT,
  description TEXT,
  challenge TEXT,
  approach TEXT,
  result TEXT,
  website_url TEXT,
  cover_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT true,
  deliverables JSONB DEFAULT '[]'::jsonb,
  show_in_marquee BOOLEAN DEFAULT true
);

-- MIGRATION: Add deliverables and show_in_marquee to services
-- Run this in Supabase SQL Editor if services table already exists:
-- ALTER TABLE public.services ADD COLUMN IF NOT EXISTS deliverables JSONB DEFAULT '[]'::jsonb;
-- ALTER TABLE public.services ADD COLUMN IF NOT EXISTS show_in_marquee BOOLEAN DEFAULT true;

-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  client_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  photo TEXT,
  featured BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 4. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  read BOOLEAN DEFAULT false
);

-- MIGRATION: Add read and status columns if the table already exists:
-- ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS read BOOLEAN DEFAULT false;
-- ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT 'Ethio-Eureka',
  tagline TEXT DEFAULT 'We build digital identities that make businesses matter.',
  description TEXT DEFAULT 'Ethio-Eureka is a creative digital studio helping ambitious businesses turn ideas into brands, websites, and digital experiences people remember.',
  email TEXT DEFAULT 'hello@ethio-eureka.com',
  phone TEXT DEFAULT '+251 911 000 000',
  location TEXT DEFAULT 'Addis Ababa, Ethiopia',
  address TEXT DEFAULT 'Bole Road, Addis Ababa, Ethiopia',
  google_maps_url TEXT DEFAULT 'https://maps.google.com',
  instagram_url TEXT DEFAULT 'https://instagram.com/ethioeureka',
  facebook_url TEXT DEFAULT 'https://facebook.com/ethioeureka',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/company/ethioeureka',
  twitter_url TEXT DEFAULT 'https://x.com/ethioeureka',
  telegram_url TEXT DEFAULT 'https://t.me/ethioeureka',
  whatsapp_number TEXT DEFAULT '+251911000000',
  logo_url TEXT,
  favicon_url TEXT,
  meta_title TEXT DEFAULT 'Ethio-Eureka — Creative Technology & Digital Studio',
  meta_description TEXT DEFAULT 'Ethio-Eureka is a creative digital studio focused on high-end web design, branding, content management, social media management, and graphic design.',
  og_image TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  logo TEXT,
  website_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC READ ACCESS
CREATE POLICY "Allow public read on published projects" ON public.projects
  FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read on published services" ON public.services
  FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read on published testimonials" ON public.testimonials
  FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read on published partners" ON public.partners
  FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read on site settings" ON public.site_settings
  FOR SELECT USING (true);

-- PUBLIC CONTACT SUBMISSIONS INSERT POLICY
CREATE POLICY "Allow public contact submissions" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (AUTHENTICATED USERS)
CREATE POLICY "Admin full access on projects" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on testimonials" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on contact submissions" ON public.contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on site settings" ON public.site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access on partners" ON public.partners
  FOR ALL USING (auth.role() = 'authenticated');

-- SEED INITIAL SITE SETTINGS ROW
INSERT INTO public.site_settings (id, company_name)
VALUES ('00000000-0000-0000-0000-000000000001', 'Ethio-Eureka')
ON CONFLICT (id) DO NOTHING;
