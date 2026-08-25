"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Soluções", href: "#solucoes" },
  { name: "Como Atuamos", href: "#como-atuamos" },
  { name: "Para Quem É", href: "#segmentos" },
  { name: "Por Que a Elo", href: "#diferencial" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 md:h-24 transition-all duration-300 flex items-center",
        "bg-[#0A1628] border-b border-white/10",
        isScrolled ? "shadow-lg shadow-black/30" : "shadow-none"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <Image
            src="/logo.png"
            alt="Elo Digital"
            width={80}
            height={80}
            className="h-14 w-auto md:h-16 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex items-baseline text-2xl md:text-3xl font-bold tracking-tight select-none">
            <span className="text-white font-black tracking-tight">ELO</span>
            <span className="text-brand-cyan font-light ml-1.5 md:ml-2 tracking-wider">DIGITAL</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="#contato"
            className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(30,95,224,0.4)] hover:shadow-[0_0_25px_rgba(30,95,224,0.6)]"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0A1628] border-b border-white/10 shadow-2xl px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-200 hover:text-brand-cyan py-2 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-brand-primary text-white text-center px-6 py-3 rounded-xl font-medium mt-2 shadow-lg shadow-blue-500/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

