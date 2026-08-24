"use client";

import Link from "next/link";
import { ExternalLink, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-border-gray bg-dark-gray/60 px-6 flex items-center justify-between font-mono text-xs text-soft-gray">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-eureka-green" />
        <span className="text-off-white font-semibold">CMS MANAGEMENT CONSOLE</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-eureka-green hover:underline"
        >
          <span>View Live Site</span>
          <ExternalLink size={12} />
        </Link>

        <div className="flex items-center gap-2 border-l border-border-gray/60 pl-6 text-off-white">
          <User size={14} className="text-eureka-green" />
          <span>admin@ethio-eureka.com</span>
        </div>
      </div>
    </header>
  );
}
