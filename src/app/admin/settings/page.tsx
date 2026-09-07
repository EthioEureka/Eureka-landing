"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, Loader2, Globe, Building2, Share2 } from "lucide-react";
import { defaultSiteSettings } from "@/lib/seed-data";
import { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err: unknown) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err: unknown) {
      console.error("Failed to save settings", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center text-eureka-slate font-mono text-xs">
        <Loader2 className="animate-spin mr-2 text-eureka-blue" size={16} /> Loading site settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-eureka-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-eureka-dark tracking-tight">Site Settings & Information</h1>
          <p className="text-xs font-mono text-eureka-slate mt-1 font-semibold">
            Global studio contact parameters, location details, and active social channels
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-extrabold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <CheckCircle2 size={16} /> Saved Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-eureka-border rounded-3xl p-6 md:p-8 shadow-eureka-lg font-sans text-xs">
        {/* General */}
        <div className="space-y-4">
          <h2 className="text-eureka-dark font-extrabold uppercase tracking-wider border-b border-eureka-border pb-2 flex items-center gap-2 text-xs font-mono">
            <Globe size={15} className="text-eureka-blue" /> 1. GENERAL COMPANY IDENTITY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Company Name</label>
              <input
                type="text"
                value={settings.company_name || ""}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all font-sans"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-eureka-dark font-extrabold uppercase tracking-wider border-b border-eureka-border pb-2 flex items-center gap-2 text-xs font-mono">
            <Building2 size={15} className="text-eureka-blue" /> 2. STUDIO CONTACT & LOCATION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Public Email</label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Public Phone</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Studio Building / Floor (Location Detail)</label>
              <input
                type="text"
                placeholder="e.g. Bole Medhanialem, Executive Tower 4th Floor"
                value={settings.location || ""}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">City & Country (Physical Address)</label>
              <input
                type="text"
                placeholder="e.g. Addis Ababa, Ethiopia"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all font-sans"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Google Maps URL</label>
              <input
                type="url"
                placeholder="https://maps.google.com/?q=Addis+Ababa+Ethiopia"
                value={settings.google_maps_url || ""}
                onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h2 className="text-eureka-dark font-extrabold uppercase tracking-wider border-b border-eureka-border pb-2 flex items-center gap-2 text-xs font-mono">
            <Share2 size={15} className="text-eureka-blue" /> 3. SOCIAL CHANNELS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url || ""}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url || ""}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">Telegram URL</label>
              <input
                type="url"
                value={settings.telegram_url || ""}
                onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2 tracking-wider">X / Twitter URL</label>
              <input
                type="url"
                value={settings.twitter_url || ""}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark px-4 py-3 text-sm font-mono focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none rounded-xl transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-eureka-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-eureka-blue text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-eureka-indigo transition-all flex items-center gap-2 shadow-eureka-sm disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

