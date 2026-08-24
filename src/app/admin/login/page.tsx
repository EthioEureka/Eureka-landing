"use client";

import { useState } from "react";
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
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-dark-gray border border-border-gray p-8 shadow-2xl">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded bg-eureka-green text-deep-black font-bold text-xl flex items-center justify-center font-mono mx-auto mb-4">
            E
          </div>
          <h1 className="text-2xl font-light text-off-white">Ethio-Eureka CMS</h1>
          <p className="text-xs font-mono text-soft-gray mt-1">
            AUTHENTICATED CMS CONTROL PORTAL
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 font-mono text-xs text-center">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3.5 text-soft-gray" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ethio-eureka.com"
                className="w-full bg-deep-black border border-border-gray text-off-white pl-10 pr-4 py-3 text-sm focus:border-eureka-green focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-soft-gray uppercase mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3.5 text-soft-gray" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-deep-black border border-border-gray text-off-white pl-10 pr-4 py-3 text-sm focus:border-eureka-green focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eureka-green text-deep-black font-semibold text-xs uppercase tracking-widest py-3 px-6 hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-mono"
          >
            <span>{loading ? "Authenticating..." : "Access Dashboard"}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-gray/50 flex items-center justify-between text-[10px] font-mono text-soft-gray">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-eureka-green" /> 256-BIT ENCRYPTION
          </span>
          <span>ETHIO-EUREKA © 2026</span>
        </div>

      </div>
    </div>
  );
}
