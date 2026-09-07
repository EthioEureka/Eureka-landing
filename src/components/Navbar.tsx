"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#process", label: "Process" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md py-3.5 border-b border-eureka-border shadow-eureka-md"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Title with Flying Logo Animation */}
          <Link
            href="/"
            className="group flex items-center text-lg md:text-xl font-bold tracking-tight text-eureka-dark hover:text-eureka-blue transition-colors"
          >
            {/* Flying Logo Badge - Animates in smoothly on scroll */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ width: 0, opacity: 0, scale: 0.4, x: -25, rotate: -15 }}
                  animate={{ width: "auto", opacity: 1, scale: 1, x: 0, rotate: 0 }}
                  exit={{ width: 0, opacity: 0, scale: 0.4, x: -25, rotate: -15 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className="overflow-hidden shrink-0 mr-3"
                >
                  <div className="relative w-9 h-9 shrink-0 transition-transform group-hover:scale-105 rounded-xl overflow-hidden shadow-eureka-glow border border-eureka-blue/30 bg-white">
                    <Image src="/Eureka-logo.png" alt="Ethio-Eureka Logo" fill className="object-cover" priority />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col">
              <span className="font-sans font-extrabold tracking-tight text-base md:text-lg leading-none text-eureka-dark group-hover:text-eureka-blue transition-colors">
                ETHIO-EUREKA
              </span>
              <span className="font-mono text-[10px] text-eureka-muted tracking-widest uppercase mt-0.5">
                Digital Solution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-eureka-slate">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-eureka-blue transition-colors relative py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-eureka-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-eureka-blue text-white hover:bg-eureka-blue-dark px-5 py-2.5 rounded-full transition-all duration-300 shadow-eureka-md hover:shadow-eureka-lg group"
            >
              <span>Start a Project</span>
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden p-2 rounded-lg text-eureka-dark border border-eureka-border hover:border-eureka-blue hover:text-eureka-blue bg-white shadow-sm transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}

