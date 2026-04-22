"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const links = [
  { label: "Mentores", href: "#mentores" },
  { label: "Programa", href: "#estrutura" },
  { label: "Para Quem", href: "#para-quem" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#12203A]/90 backdrop-blur-md border-b border-[#06F9FA]/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Image
            src="/neolevel-logo.png"
            alt="Neolevel"
            width={140}
            height={36}
            style={{ objectFit: "contain" }}
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#D9D9D9] hover:text-[#06F9FA] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#processo-seletivo"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-lg border border-[#06F9FA] text-[#06F9FA] text-sm font-semibold hover:bg-[#06F9FA] hover:text-[#12203A] transition-all duration-200"
        >
          Inscreva-se
        </a>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#12203A]/95 backdrop-blur-md border-b border-[#06F9FA]/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#D9D9D9] hover:text-[#06F9FA] font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#processo-seletivo"
                className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-[#06F9FA] text-[#12203A] text-sm font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Inscreva-se
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
