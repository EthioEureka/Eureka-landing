"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { SiteSettings } from "@/lib/types";

export default function ContactSection() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    location: "Bole Medhanialem, Executive Tower 4th Floor",
    address: "Addis Ababa, Ethiopia",
    email: "hello@ethio-eureka.com",
    phone: "+251 911 234 567",
    google_maps_url: "https://maps.google.com/?q=Addis+Ababa+Ethiopia",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Website Design & Development",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err: unknown) {
        console.error("Failed to load settings in ContactSection", err);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "Website Design & Development",
          budget: "",
          message: "",
        });
      } else {
        setErrorMsg(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setErrorMsg("Network error submitting inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 border-b border-border-gray/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-green uppercase flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-eureka-green rounded-full" />
            08 // START A PROJECT
          </span>
          <h2 className="text-section-headline font-semibold text-off-white max-w-4xl">
            Have something worth building?
          </h2>
          <p className="text-editorial-sub text-soft-gray font-light mt-4 max-w-2xl">
            Tell us what you&apos;re working on. Let&apos;s turn the idea into something people remember.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-dark-gray/60 border border-border-gray/80 p-8 md:p-12 relative">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <CheckCircle size={56} className="text-eureka-green" />
                <h3 className="text-2xl font-light text-off-white">Inquiry Received</h3>
                <p className="text-sm font-mono text-soft-gray max-w-md">
                  Thank you for reaching out to Ethio-Eureka. Our team will review your details and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-mono text-xs text-eureka-green uppercase tracking-widest hover:underline"
                >
                  Send another inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Your name "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+251 911 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Requested Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    >
                      <option value="Website Design & Development">Website Design & Development</option>
                      <option value="Branding & Identity">Branding & Identity</option>
                      <option value="Content Management">Content Management</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Multiple Services">Multiple Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                      Project Budget (Optional)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                    >
                      <option value="">Select Range</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
                    Project Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your goals, timelines, and ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-deep-black border border-border-gray text-off-white px-4 py-3 text-sm focus:border-eureka-green focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-eureka-green text-deep-black font-semibold text-sm uppercase tracking-widest py-4 px-8 hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span>{loading ? "Sending..." : "Send inquiry →"}</span>
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            )}
          </div>

          {/* Location & Studio Contact Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div className="bg-dark-gray/40 border border-border-gray/70 p-8">
              <span className="text-xs font-mono text-eureka-green uppercase tracking-widest block mb-4">
                LOCATION & POSITIONING
              </span>
              <p className="text-sm text-soft-gray leading-relaxed mb-6">
                Based in Ethiopia. Working with ambitious businesses anywhere.
              </p>

              <div className="space-y-4 font-mono text-xs text-soft-gray pt-2 border-t border-border-gray/40">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-eureka-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-off-white font-semibold">Studio Address</p>
                    <p>{settings.location || "Bole Medhanialem, Executive Tower 4th Floor"}</p>
                    <p>{settings.address || "Addis Ababa, Ethiopia"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-eureka-green shrink-0" />
                  <div>
                    <p className="text-off-white font-semibold">General Inquiries</p>
                    <a href={`mailto:${settings.email || "hello@ethio-eureka.com"}`} className="hover:text-eureka-green">
                      {settings.email || "hello@ethio-eureka.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-eureka-green shrink-0" />
                  <div>
                    <p className="text-off-white font-semibold">Direct Phone</p>
                    <p>{settings.phone || "+251 911 234 567"}</p>
                  </div>
                </div>
              </div>

              {/* Map Preview Box */}
              <div className="mt-6 pt-6 border-t border-border-gray/40">
                <a
                  href={settings.google_maps_url || "https://maps.google.com/?q=Addis+Ababa+Ethiopia"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden border border-border-gray/80 bg-deep-black hover:border-eureka-green transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center">
                    <img
                      src="/map.png"
                      alt={`Studio Map Location - ${settings.address || "Addis Ababa, Ethiopia"}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-deep-black/10" />
                    
                    {/* Top-Left Status Badge */}
                    <div className="absolute top-3 left-3 bg-deep-black/90 backdrop-blur-md px-3 py-1 border border-border-gray/80 text-[10px] font-mono text-eureka-green flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-eureka-green animate-pulse" />
                      <span>{settings.address ? settings.address.toUpperCase() : "ADDIS ABABA, ETHIOPIA"}</span>
                    </div>

                    {/* Centered Pin, Location Title & Subtitle Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 pointer-events-none">
                      <div className="relative mb-2 group-hover:scale-110 transition-transform duration-300">
                        <MapPin size={30} className="text-eureka-green drop-shadow-[0_0_14px_rgba(0,255,102,0.9)]" />
                      </div>

                      <h4 className="text-soft-gray font-mono text-xs mt-0.5 tracking-wider hover:scale-110 transition-transform duration-300">
                        {settings.location ? settings.location.toUpperCase() : "BOLE MEDHANIALEM"}
                      </h4>

                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="p-3 bg-dark-gray/90 flex items-center justify-between font-mono text-xs text-soft-gray group-hover:text-eureka-green transition-colors">
                    <span className="uppercase tracking-widest text-[10px]">Open Google Maps</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Operating Notice */}
            {/* <div className="bg-deep-black p-6 border border-border-gray/60 font-mono text-xs text-soft-gray">
              <span className="text-eureka-green font-semibold block mb-1">● ACCEPTING NEW PROJECTS</span>
              <p className="text-[11px]">Average project kickoff within 5–7 business days after discovery alignment.</p>
            </div> */}
          </div>

        </div>

      </div>
    </section>
  );
}
