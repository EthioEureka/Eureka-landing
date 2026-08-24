"use client";

import Link from "next/link";
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
    { href: "/admin/contact-submissions", label: "Contact Leads", icon: Inbox },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-dark-gray border-r border-border-gray min-h-screen flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-border-gray/60 flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-eureka-green text-deep-black font-bold flex items-center justify-center font-mono">
            E
          </div>
          <div>
            <h1 className="text-sm font-bold text-off-white font-mono">ETHIO-EUREKA</h1>
            <p className="text-[10px] font-mono text-eureka-green">CMS DASHBOARD</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-soft-gray uppercase px-4 mb-2 tracking-wider">
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
                className={`flex items-center gap-3 px-4 py-3 text-xs font-mono rounded transition-colors ${
                  isActive
                    ? "bg-eureka-green text-deep-black font-semibold"
                    : "text-soft-gray hover:text-off-white hover:bg-deep-black/60"
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
      <div className="pt-4 border-t border-border-gray/60 space-y-3">
        <div className="px-4 py-2 bg-deep-black/60 rounded border border-border-gray/40 text-[10px] font-mono text-soft-gray flex items-center justify-between">
          <span>ENV: PRODUCTION</span>
          <span className="flex items-center gap-1 text-eureka-green">
            <Sparkles size={10} /> v1.0
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono text-red-400 hover:bg-red-950/30 rounded transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
