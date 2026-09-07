"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@ethio-eureka.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(data.error || "Invalid login credentials.");
      }
    } catch {
      setLoading(false);
      setErrorMsg("An error occurred during authentication.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white border border-eureka-border rounded-3xl p-8 md:p-10 shadow-eureka-lg">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="relative w-14 h-14 mx-auto mb-4">
            <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-eureka-dark tracking-tight">Ethio-Eureka CMS</h1>
          <p className="text-xs font-mono text-eureka-blue font-bold tracking-wider mt-1">
            AUTHENTICATED CMS CONTROL PORTAL
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-sans text-xs text-center rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-eureka-slate" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ethio-eureka.com"
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark pl-10 pr-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none font-mono rounded-xl transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-eureka-slate uppercase font-bold mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-eureka-slate" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-eureka-border text-eureka-dark pl-10 pr-4 py-3 text-sm focus:border-eureka-blue focus:ring-2 focus:ring-eureka-blue/20 focus:outline-none font-mono rounded-xl transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eureka-blue text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-eureka-indigo transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-mono shadow-eureka-sm"
          >
            <span>{loading ? "Authenticating..." : "Access Dashboard"}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-eureka-border flex items-center justify-between text-[10px] font-mono text-eureka-slate">
          <span className="flex items-center gap-1 font-bold">
            <ShieldCheck size={12} className="text-eureka-blue" /> SUPABASE SECURED
          </span>
          <span>ETHIO-EUREKA © 2026</span>
        </div>

      </div>
    </div>
  );
}

