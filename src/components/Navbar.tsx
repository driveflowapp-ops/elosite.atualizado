"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-[#0A1628]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex text-2xl font-bold tracking-tight">
            <span className="text-white">ELO</span>
            <span className="text-brand-cyan ml-1">DIGITAL</span>
          </div>
          {/* Substituir por: <img src="/logo.svg" alt="Elo Digital" className="h-8" /> */}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
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
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A1628] border-b border-white/10 shadow-xl px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-200 hover:text-white py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-brand-primary text-white text-center px-6 py-3 rounded-lg font-medium mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
