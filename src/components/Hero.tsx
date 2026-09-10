"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0A1628]">
      {/* Network Background (Static high-performance texture) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="#3B9EFF" />
              <line x1="40" y1="40" x2="80" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="40" y1="40" x2="0" y2="80" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      {/* Ambient gradient glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-[#0A1628]/80 to-[#0A1628] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#1E5FE0]/20 text-[#3B9EFF] text-xs md:text-sm font-semibold tracking-wider mb-6 border border-[#1E5FE0]/30">
            TRANSFORMAÇÃO DIGITAL PARA PEQUENAS E MÉDIAS EMPRESAS
          </span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Tecnologia que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0]">resolve problemas reais</span>! Não apenas sites e aplicativos.
        </motion.h1>

        <motion.p
          className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Atuamos nos 4 pilares essenciais do seu negócio: <strong className="text-white font-medium">Presença Digital, Vendas Online, Gestão Inteligente e Automação com IA.</strong>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#1E5FE0] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(30,95,224,0.3)] hover:shadow-[0_0_30px_rgba(30,95,224,0.6)] flex items-center justify-center gap-2"
          >
            Solicitar Diagnóstico Elo
            <ArrowRight size={20} />
          </a>
          <a
            href="#solucoes"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center"
          >
            Ver Soluções
          </a>
        </motion.div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[70px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#F5F7FA"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

