"use client";

import Link from "next/link";
import { ExternalLink, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-eureka-border bg-white px-6 flex items-center justify-between font-mono text-xs text-eureka-slate shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-eureka-blue animate-pulse" />
        <span className="text-eureka-dark font-extrabold tracking-tight">CMS MANAGEMENT CONSOLE</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-eureka-blue font-bold hover:underline"
        >
          <span>View Live Site</span>
          <ExternalLink size={12} />
        </Link>

        <div className="flex items-center gap-2 border-l border-eureka-border pl-6 text-eureka-dark font-semibold">
          <User size={14} className="text-eureka-blue" />
          <span>admin@ethio-eureka.com</span>
        </div>
      </div>
    </header>
  );
}

