"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
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
      <div className="py-20 flex items-center justify-center text-soft-gray font-mono text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading site settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-border-gray pb-6">
        <div>
          <h1 className="text-2xl font-light text-off-white">Site Settings & Information</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            Global studio contact parameters, location, and social links
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-eureka-green font-mono text-xs">
            <CheckCircle2 size={16} /> Saved Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-dark-gray border border-border-gray p-8 font-mono text-xs">
        {/* General */}
        <div className="space-y-4">
          <h2 className="text-off-white font-semibold uppercase tracking-wider border-b border-border-gray/50 pb-2">
            1. GENERAL COMPANY IDENTITY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-soft-gray uppercase mb-1">Company Name</label>
              <input
                type="text"
                value={settings.company_name || ""}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-soft-gray uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-off-white font-semibold uppercase tracking-wider border-b border-border-gray/50 pb-2">
            2. STUDIO CONTACT & LOCATION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-soft-gray uppercase mb-1">Public Email</label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-soft-gray uppercase mb-1">Public Phone</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-soft-gray uppercase mb-1">Physical Address</label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h2 className="text-off-white font-semibold uppercase tracking-wider border-b border-border-gray/50 pb-2">
            3. SOCIAL CHANNELS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-soft-gray uppercase mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url || ""}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-soft-gray uppercase mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url || ""}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-soft-gray uppercase mb-1">Telegram URL</label>
              <input
                type="url"
                value={settings.telegram_url || ""}
                onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-soft-gray uppercase mb-1">X / Twitter URL</label>
              <input
                type="url"
                value={settings.twitter_url || ""}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full bg-deep-black border border-border-gray text-off-white px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border-gray flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
