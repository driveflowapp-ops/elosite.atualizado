"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A1628]">
      {/* Network Background (CSS/SVG) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="absolute inset-0 w-full h-full animate-[spin_120s_linear_infinite]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#3B9EFF" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="200%" height="200%" fill="url(#network)" transform="translate(-50%, -50%)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-[#0A1628]/80 to-[#0A1628] z-0" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#1E5FE0]/20 text-[#3B9EFF] text-sm font-semibold tracking-wider mb-6 border border-[#1E5FE0]/30">
            TRANSFORMAÇÃO DIGITAL PARA PMEs
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tecnologia que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0]">resolve problemas reais</span> — não só sites e aplicativos.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Atuamos nos 4 pilares essenciais do seu negócio: <strong className="text-white font-medium">Presença Digital, Vendas Online, Gestão Inteligente e Automação com IA.</strong>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://wa.me/5562981864905"
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
    </section>
  );
}
