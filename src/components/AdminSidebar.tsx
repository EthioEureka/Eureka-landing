"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  Sparkles,
  Building2,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/services", label: "Services", icon: Wrench },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { href: "/admin/partners", label: "Partners & Marquee", icon: Building2 },
    { href: "/admin/contact-submissions", label: "Contact Leads", icon: Inbox },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
  ];


  return (
    <aside className="w-64 bg-white border-r border-eureka-border min-h-screen flex flex-col justify-between p-4 shrink-0 shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-eureka-border flex items-center gap-3 mb-6">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-eureka-dark tracking-tight">ETHIO-EUREKA</h1>
            <p className="text-[10px] font-mono text-eureka-blue font-bold tracking-wider">CMS DASHBOARD</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-eureka-slate uppercase px-4 mb-3 tracking-wider font-bold">
            Content & Leads
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-mono rounded-xl transition-all ${
                  isActive
                    ? "bg-eureka-blue text-white font-bold shadow-eureka-sm"
                    : "text-eureka-slate hover:text-eureka-dark hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout & System info */}
      <div className="pt-4 border-t border-eureka-border space-y-3">
        <div className="px-4 py-2.5 bg-slate-50 rounded-xl border border-eureka-border text-[10px] font-mono text-eureka-slate flex items-center justify-between">
          <span className="font-semibold">ENV: SUPABASE</span>
          <span className="flex items-center gap-1 text-eureka-blue font-bold">
            <Sparkles size={10} /> v2.0
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

