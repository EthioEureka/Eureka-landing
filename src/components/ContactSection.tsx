"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { siteData } from "@/lib/data";

export default function ContactSection() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [serviceOptions, setServiceOptions] = useState<string[]>(siteData.contact.form.serviceOptions);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: siteData.contact.form.serviceOptions[0],
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Load site settings
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) setSettings(data.settings);
      })
      .catch(() => {});

    // Load services from DB for the service select; fall back to static list if empty/error
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const services = Array.isArray(data) ? data : data?.services;
        if (Array.isArray(services) && services.length > 0) {
          const names = services.map((s: { title: string }) => s.title);
          // Always append generic options at the end
          setServiceOptions([...names, "Multiple Services", "Other"]);
        }
      })
      .catch(() => {});
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
          service: serviceOptions[0] || siteData.contact.form.serviceOptions[0],
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
    <section id="contact" className="py-24 md:py-36 bg-white border-b border-eureka-border relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {siteData.contact.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark max-w-4xl tracking-tight">
            {siteData.contact.headline}
          </h2>
          <p className="text-editorial-sub text-eureka-slate font-normal mt-4 max-w-2xl">
            {siteData.contact.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-50 border border-eureka-border rounded-3xl p-8 md:p-12 relative shadow-eureka-sm">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <CheckCircle size={56} className="text-eureka-blue" />
                <h3 className="text-2xl font-extrabold text-eureka-dark">{siteData.contact.success.title}</h3>
                <p className="text-sm font-sans text-eureka-slate max-w-md">
                  {siteData.contact.success.message}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-mono text-xs text-eureka-blue font-bold uppercase tracking-wider hover:underline"
                >
                  {siteData.contact.success.resetButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-sans text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={siteData.contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={siteData.contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.companyLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={siteData.contact.form.companyPlaceholder}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      placeholder={siteData.contact.form.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.serviceLabel}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                      {siteData.contact.form.budgetLabel}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                    >
                      {siteData.contact.form.budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
                    {siteData.contact.form.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={siteData.contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-eureka-border rounded-xl text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-eureka-blue text-white font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-eureka-indigo transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-eureka-sm"
                >
                  <span>{loading ? siteData.contact.form.sendingButton : siteData.contact.form.submitButton}</span>
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            )}
          </div>

          {/* Location & Studio Contact Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div className="bg-slate-50 border border-eureka-border rounded-3xl p-8 shadow-eureka-sm">
              <span className="text-xs font-mono text-eureka-blue font-bold uppercase tracking-wider block mb-4">
                {siteData.contact.locationLabel}
              </span>
              <p className="text-sm text-eureka-slate leading-relaxed mb-6 font-normal">
                {siteData.contact.locationSubtext}
              </p>

              <div className="space-y-4 font-sans text-xs text-eureka-slate pt-4 border-t border-eureka-border">
                {(settings.location || settings.address) && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-eureka-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.addressLabel}</p>
                      {settings.location && <p>{settings.location}</p>}
                      {settings.address && <p>{settings.address}</p>}
                    </div>
                  </div>
                )}

                {settings.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-eureka-blue shrink-0" />
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.emailLabel}</p>
                      <a href={`mailto:${settings.email}`} className="hover:text-eureka-blue font-medium">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-eureka-blue shrink-0" />
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.phoneLabel}</p>
                      <p>{settings.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Preview Box */}
              {settings.google_maps_url && (
                <div className="mt-6 pt-6 border-t border-eureka-border">
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-2xl border border-eureka-border bg-white hover:border-eureka-blue transition-all shadow-sm"
                  >
                    <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center">
                      <img
                        src="/map.png"
                        alt="Studio Map Location"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                      
                      {settings.address && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[10px] font-mono text-eureka-blue font-bold flex items-center gap-2 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-eureka-blue animate-pulse" />
                          <span>{settings.address.toUpperCase()}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 pointer-events-none">
                        <div className="relative mb-2 group-hover:scale-110 transition-transform duration-300">
                          <MapPin size={32} className="text-white drop-shadow-[0_4px_12px_rgba(37,99,235,0.8)]" />
                        </div>

                        {settings.location && (
                          <h4 className="text-white font-mono text-xs font-bold mt-0.5 tracking-wider drop-shadow-md">
                            {settings.location.toUpperCase()}
                          </h4>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-white flex items-center justify-between font-mono text-xs text-eureka-slate group-hover:text-eureka-blue transition-colors">
                      <span className="uppercase tracking-wider text-[10px] font-bold">{siteData.contact.mapsLabel}</span>
                      <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
