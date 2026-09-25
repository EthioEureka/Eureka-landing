"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, MapPin, Mail, Phone, ExternalLink, Send, Loader2 } from "lucide-react";
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) setSettings(data.settings);
      })
      .catch(() => {});

    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const services = Array.isArray(data) ? data : data?.services;
        if (Array.isArray(services) && services.length > 0) {
          const names = services.map((s: { title: string }) => s.title);
          setServiceOptions([...names, "Multiple Services", "Other"]);
        }
      })
      .catch(() => {});
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 20) return "Message must be at least 20 characters";
        break;
    }
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });
    
    setFieldErrors(errors);
    setTouchedFields(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (Object.keys(errors).length > 0) return;

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
        setFieldErrors({});
        setTouchedFields({});
      } else {
        setErrorMsg(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setErrorMsg("Network error submitting inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ 
    label, 
    name, 
    type = "text", 
    placeholder = "",
    required = false, 
    children,
    className = ""
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    children?: React.ReactNode;
    className?: string;
  }) => {
    const error = fieldErrors[name];
    const touched = touchedFields[name];
    const hasError = touched && error;
    const isFocused = false;

    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-xs font-mono text-eureka-slate uppercase font-semibold mb-2">
          {label} {required && <span className="text-eureka-blue">*</span>}
        </label>
        <div className="relative">
          {children || (
            <input
              type={type}
              name={name}
              required={required}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white border rounded-xl text-eureka-dark px-4 py-3.5 text-sm transition-all duration-300 ${
                hasError
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-eureka-border focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20"
              } focus:outline-none shadow-sm hover:border-eureka-border-hover`}
            />
          )}
          {hasError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[-20px] left-0 text-xs text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-40 lg:py-48 bg-white border-b border-eureka-border relative overflow-hidden">
        <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-eureka-blue/10 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle size={48} className="text-eureka-blue" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-eureka-dark mb-4">
              {siteData.contact.success.title}
            </h3>
            <p className="text-lg text-eureka-slate leading-relaxed mb-8">
              {siteData.contact.success.message}
            </p>
            <motion.button
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 font-mono text-sm text-eureka-blue font-bold uppercase tracking-wider hover:underline group"
            >
              {siteData.contact.success.resetButton}
              <motion.span whileHover={{ x: 4 }}><ArrowRight size={18} /></motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-40 lg:py-48 bg-white border-b border-eureka-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise-subtle pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-eureka-blue/3 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-eureka-blue font-semibold uppercase mb-4">
            <span className="w-2 h-2 bg-eureka-blue rounded-full" />
            {siteData.contact.sectionTag}
          </span>
          <h2 className="text-section-headline font-extrabold text-eureka-dark max-w-3xl tracking-tight">
            {siteData.contact.headline}
          </h2>
          <p className="text-editorial-sub text-eureka-slate font-normal mt-4 max-w-2xl">
            {siteData.contact.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="bg-slate-50/80 backdrop-blur-md border border-eureka-border/50 rounded-3xl p-8 md:p-12 relative shadow-eureka-sm space-y-8" noValidate>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="p-4 bg-red-50 border border-red-200 text-red-700 font-sans text-sm rounded-xl flex items-center gap-3"
                >
                  <span className="w-5 h-5 flex-shrink-0"><CheckCircle size={20} className="text-red-500" /></span>
                  {errorMsg}
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label={siteData.contact.form.nameLabel}
                  name="name"
                  placeholder={siteData.contact.form.namePlaceholder}
                  required
                />
                <Field
                  label={siteData.contact.form.emailLabel}
                  name="email"
                  type="email"
                  placeholder={siteData.contact.form.emailPlaceholder}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label={siteData.contact.form.companyLabel}
                  name="company"
                  placeholder={siteData.contact.form.companyPlaceholder}
                />
                <Field
                  label={siteData.contact.form.phoneLabel}
                  name="phone"
                  type="tel"
                  placeholder={siteData.contact.form.phonePlaceholder}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label={siteData.contact.form.serviceLabel}
                  name="service"
                  className="sm:col-span-2"
                >
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-white border-eureka-border rounded-xl text-eureka-dark px-4 py-3.5 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm hover:border-eureka-border-hover appearance-none bg-no-repeat bg-right pr-12"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748B' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 12px center",
                      backgroundSize: "16px",
                    }}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label={siteData.contact.form.budgetLabel}
                  name="budget"
                  className="sm:col-span-2"
                >
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-white border-eureka-border rounded-xl text-eureka-dark px-4 py-3.5 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm hover:border-eureka-border-hover appearance-none bg-no-repeat bg-right pr-12"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748B' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 12px center",
                      backgroundSize: "16px",
                    }}
                  >
                    {siteData.contact.form.budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label={siteData.contact.form.messageLabel}
                name="message"
                className="sm:col-span-2"
              >
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={siteData.contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-white border-eureka-border rounded-xl text-eureka-dark px-4 py-3.5 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none transition-all shadow-sm hover:border-eureka-border-hover resize-none font-sans"
                />
              </Field>

                  <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-eureka-blue text-white font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-eureka-indigo transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-eureka-sm"
                >
                  <span>{loading ? siteData.contact.form.sendingButton : siteData.contact.form.submitButton}</span>
                  {!loading && <ArrowRight size={18} />}
                </button>
            </form>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-slate-50/80 backdrop-blur-md border border-eureka-border/50 rounded-3xl p-8 md:p-10 shadow-eureka-sm h-full flex flex-col">
              <span className="text-xs font-mono text-eureka-blue font-bold uppercase tracking-wider block mb-4">
                {siteData.contact.locationLabel}
              </span>
              <p className="text-sm text-eureka-slate leading-relaxed mb-8 font-normal">
                {siteData.contact.locationSubtext}
              </p>

              <div className="space-y-5 font-sans text-sm text-eureka-slate pt-6 border-t border-eureka-border/50 flex-1">
                {(settings.location || settings.address) && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 border border-eureka-border/50 hover:border-eureka-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-eureka-blue/10 flex items-center justify-center shrink-0 text-eureka-blue group-hover:bg-eureka-blue group-hover:text-white transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.addressLabel}</p>
                      {settings.location && <p className="text-eureka-slate">{settings.location}</p>}
                      {settings.address && <p className="text-eureka-slate">{settings.address}</p>}
                    </div>
                  </div>
                )}

                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 border border-eureka-border/50 hover:border-eureka-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-eureka-blue/10 flex items-center justify-center shrink-0 text-eureka-blue group-hover:bg-eureka-blue group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.emailLabel}</p>
                      <p className="text-eureka-slate hover:text-eureka-blue transition-colors">{settings.email}</p>
                    </div>
                  </a>
                )}

                {settings.phone && (
                  <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 border border-eureka-border/50 hover:border-eureka-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-eureka-blue/10 flex items-center justify-center shrink-0 text-eureka-blue group-hover:bg-eureka-blue group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-eureka-dark font-extrabold">{siteData.contact.phoneLabel}</p>
                      <p className="text-eureka-slate">{settings.phone}</p>
                    </div>
                  </a>
                )}
              </div>

              {settings.google_maps_url && (
                <div className="mt-6 pt-6 border-t border-eureka-border/50">
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-2xl border border-eureka-border/50 bg-white/90 hover:border-eureka-blue/30 transition-all shadow-sm"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src="/map.png"
                        alt="Studio Map Location"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                      
                      {settings.address && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 text-xs font-mono text-eureka-blue font-bold flex items-center gap-2 shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-eureka-blue animate-pulse" />
                          <span>{settings.address.toUpperCase()}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none">
                        <motion.div
                          className="relative mb-3 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                        >
                          <MapPin size={36} className="text-white drop-shadow-[0_4px_16px_rgba(37,99,235,0.8)]" />
                        </motion.div>

                        {settings.location && (
                          <h4 className="text-white font-mono text-xs font-bold mt-1 tracking-wider drop-shadow-md">
                            {settings.location.toUpperCase()}
                          </h4>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-white/95 backdrop-blur-md flex items-center justify-between font-mono text-xs text-eureka-slate group-hover:text-eureka-blue transition-colors border-t border-eureka-border/50">
                      <span className="uppercase tracking-wider text-[10px] font-bold">{siteData.contact.mapsLabel}</span>
                      <motion.span whileHover={{ x: 4, y: -4 }}><ExternalLink size={16} /></motion.span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}