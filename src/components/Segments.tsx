"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Stethoscope,
  Church,
  Wrench,
  Home,
  Store,
  ArrowRight,
} from "lucide-react";

import SectionWave from "@/components/SectionWave";
import { WHATSAPP_URL } from "@/lib/constants";

const SEGMENTS = [
  { name: "Prestadores de serviço", icon: Briefcase },
  { name: "Profissionais liberais", icon: Stethoscope },
  { name: "Empresas locais", icon: Store },
  { name: "Igrejas e instituições", icon: Church },
  { name: "Clínicas e escritórios", icon: Building2 },
  { name: "Construtoras", icon: Home },
  { name: "Oficinas e técnicos", icon: Wrench },
];

export default function Segments() {
  return (
    <section
      id="segmentos"
      className="section-padding relative overflow-hidden border-t border-white/5 bg-[#0A1628] pb-28 text-white md:pb-36"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTVmZTAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDBWMjRoMjRWMEgzNnYyNGgyNnYxMEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Para quem é a Elo Digital?</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            Nossas soluções são desenhadas para atender diversos setores, trazendo
            profissionalismo e eficiência para qualquer segmento.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SEGMENTS.map((segment, index) => {
            const Icon = segment.icon;

            return (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-[#3B9EFF]/50 hover:bg-white/10"
              >
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="text-[#3B9EFF] transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span className="text-[15px] leading-snug font-medium text-gray-200">
                  {segment.name}
                </span>
              </motion.div>
            );
          })}

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: SEGMENTS.length * 0.05 }}
            className="group flex flex-col justify-between gap-4 rounded-2xl bg-[#1E5FE0] p-5 transition-colors duration-300 hover:bg-blue-600"
          >
            <span className="text-[15px] leading-snug font-semibold text-white">
              Não achou o seu segmento?
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-blue-100">
              Fale com a gente
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </motion.a>
        </div>
      </div>

      <SectionWave fill="#1E5FE0" />
    </section>
  );
}
