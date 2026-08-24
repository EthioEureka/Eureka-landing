"use client";

import Link from "next/link";
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
          className="fixed inset-0 z-50 bg-deep-black text-off-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-border-gray/60 pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl font-bold tracking-tight text-off-white flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 bg-eureka-green rounded-full inline-block" />
              ETHIO-EUREKA
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-border-gray flex items-center justify-center text-off-white hover:border-eureka-green hover:text-eureka-green transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="my-12 flex flex-col gap-6">
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
                  className="text-4xl sm:text-5xl font-light tracking-tight hover:text-eureka-green transition-colors flex items-center justify-between group border-b border-border-gray/30 pb-4"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-soft-gray group-hover:text-eureka-green">
                    0{idx + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info & CTA */}
          <div className="flex flex-col gap-8 pt-6 border-t border-border-gray/60">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full bg-eureka-green text-deep-black font-semibold text-lg py-4 px-6 rounded-none flex items-center justify-between hover:bg-white transition-colors"
            >
              <span>Start a project</span>
              <ArrowUpRight size={22} />
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-soft-gray">
              <div>
                <p className="text-white font-semibold mb-1">Direct Contact</p>
                <p>hello@ethio-eureka.com</p>
                <p>+251 911 234 567</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Location</p>
                <p>Addis Ababa, Ethiopia</p>
                <p>Bole Medhanialem, 4th Floor</p>
              </div>
            </div>

            <div className="flex gap-6 text-xs font-mono text-soft-gray">
              <a href="https://instagram.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green">
                INSTAGRAM
              </a>
              <a href="https://linkedin.com/company/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green">
                LINKEDIN
              </a>
              <a href="https://t.me/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green">
                TELEGRAM
              </a>
              <a href="https://x.com/ethioeureka" target="_blank" rel="noopener noreferrer" className="hover:text-eureka-green">
                X / TWITTER
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
