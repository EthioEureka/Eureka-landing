"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-white text-eureka-dark flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-eureka-border pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl font-bold tracking-tight text-eureka-dark flex items-center gap-3"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-cover" />
              </div>
              <span className="font-extrabold text-base tracking-tight">ETHIO-EUREKA</span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-eureka-border flex items-center justify-center text-eureka-dark hover:border-eureka-blue hover:text-eureka-blue transition-colors bg-slate-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="my-8 flex flex-col gap-4">
            {links.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-eureka-dark hover:text-eureka-blue transition-colors flex items-center justify-between group border-b border-eureka-border pb-4"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-eureka-slate group-hover:text-eureka-blue font-semibold">
                    0{idx + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info & CTA */}
          <div className="flex flex-col gap-6 pt-6 border-t border-eureka-border">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white font-semibold text-base py-4 px-6 rounded-full flex items-center justify-between hover:shadow-eureka-lg transition-all"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={22} />
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-eureka-slate">
              <div>
                <p className="text-eureka-dark font-bold mb-1">Direct Contact</p>
                <p>hello@ethio-eureka.com</p>
                <p>+251 911 000 000</p>
              </div>
              <div>
                <p className="text-eureka-dark font-bold mb-1">Location</p>
                <p>Addis Ababa, Ethiopia</p>
                <p>Bole Road, Digital Studio</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono font-semibold text-eureka-slate">
              <a href="https://instagram.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue">
                INSTAGRAM
              </a>
              <a href="https://linkedin.com/company/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue">
                LINKEDIN
              </a>
              <a href="https://t.me/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue">
                TELEGRAM
              </a>
              <a href="https://x.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-blue">
                TWITTER
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

