"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover listeners for cursor text and expand state
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setIsHovered(true);
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
      } else if (target.closest("a, button, input, textarea, select")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleElementHover);
    };
  }, [isVisible]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer subtle ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border border-eureka-green/60 flex items-center justify-center transition-opacity duration-300 ${
          cursorText ? "bg-eureka-green text-deep-black font-semibold text-[10px] tracking-widest px-2" : ""
        }`}
        animate={{
          x: position.x - (cursorText ? 28 : isHovered ? 24 : 12),
          y: position.y - (cursorText ? 28 : isHovered ? 24 : 12),
          width: cursorText ? 56 : isHovered ? 48 : 24,
          height: cursorText ? 56 : isHovered ? 48 : 24,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      >
        {cursorText}
      </motion.div>

      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-eureka-green rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 800 }}
      />
    </div>
  );
}
