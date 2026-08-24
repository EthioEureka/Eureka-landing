"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#process", label: "Process" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-deep-black/90 backdrop-blur-md py-4 border-b border-border-gray/60 shadow-xl"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-tight text-off-white hover:text-eureka-green transition-colors"
          >
            <span className="w-2.5 h-2.5 bg-eureka-green rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-mono tracking-widest text-sm md:text-base">ETHIO-EUREKA</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wider text-soft-gray">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-off-white hover:underline underline-offset-8 decoration-eureka-green decoration-2 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest bg-off-white text-deep-black hover:bg-eureka-green hover:text-deep-black px-5 py-2.5 transition-all duration-300 group"
            >
              <span>Start a project</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden p-2 rounded-md text-off-white border border-border-gray hover:border-eureka-green hover:text-eureka-green transition-colors"
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
