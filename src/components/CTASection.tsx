"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";

import {
  WHATSAPP_URL,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_NUMBER_RAW,
} from "@/lib/constants";

const REASSURANCE = [
  "Conversa sem compromisso e sem custo",
  "Entendemos seu cenário antes de propor qualquer coisa",
  "Você recebe um caminho claro, mesmo que não feche com a gente",
];

export default function CTASection() {
  return (
    <section id="contato" className="section-padding relative overflow-hidden bg-[#0A1628]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="network-cta"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="1.5" fill="#3B9EFF" />
              <line x1="40" y1="40" x2="80" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="40" y1="40" x2="0" y2="80" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-cta)" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/15 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16"
        >
          <div>
            <h2 className="text-3xl leading-tight font-bold text-white md:text-4xl">
              Vamos aplicar o Diagnóstico Elo no seu negócio?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              Uma conversa rápida para entender sua operação e mostrar onde a tecnologia
              certa faz diferença de verdade.
            </p>

            <ul className="mt-8 space-y-3.5">
              {REASSURANCE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-brand-cyan"
                  />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0A1628]/60 p-7">
            <p className="text-sm font-medium text-gray-400">
              Atendimento direto com quem desenvolve
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-4 text-lg font-semibold text-white shadow-[0_0_20px_rgba(30,95,224,0.3)] transition-all hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(30,95,224,0.6)]"
            >
              Falar no WhatsApp
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href={`tel:+${WHATSAPP_NUMBER_RAW}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-medium text-gray-200 transition-colors hover:border-white/30 hover:text-white"
            >
              <Phone size={18} aria-hidden="true" />
              {WHATSAPP_NUMBER_DISPLAY}
            </a>

            <p className="mt-1 text-center text-sm text-gray-500">
              Resposta no mesmo dia, em horário comercial.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
