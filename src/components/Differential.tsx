"use client";

import { motion } from "framer-motion";
import { Eye, ShieldCheck, Zap, TrendingUp } from "lucide-react";

const BENEFITS = [
  {
    label: "Mais visibilidade",
    description: "Sua empresa encontrada por quem já está procurando o que você faz.",
    icon: Eye,
  },
  {
    label: "Mais controle",
    description: "Clientes, serviços e prazos em um lugar só, não espalhados no WhatsApp.",
    icon: ShieldCheck,
  },
  {
    label: "Mais eficiência",
    description: "Menos tarefa repetitiva e menos retrabalho na rotina da equipe.",
    icon: Zap,
  },
  {
    label: "Mais crescimento",
    description: "Uma base pronta para aguentar o próximo passo do negócio.",
    icon: TrendingUp,
  },
];

export default function Differential() {
  return (
    <section
      id="diferencial"
      className="section-padding relative overflow-hidden bg-brand-primary pb-28 md:pb-36"
    >
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="network-diff"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="2" fill="#ffffff" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-diff)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="text-3xl leading-tight font-bold text-white md:text-4xl lg:text-[2.75rem]">
              Não vendemos apenas sites e aplicativos.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-blue-100">
              Desenvolvemos soluções para resolver problemas reais e gerar crescimento
              sustentável, com tecnologia que acompanha o seu ritmo, não o contrário.
            </p>
          </div>

          <ul className="space-y-7">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.li
                  key={benefit.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex gap-5 border-b border-white/15 pb-7 last:border-0 last:pb-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon
                      size={21}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="text-white"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{benefit.label}</h3>
                    <p className="mt-1.5 leading-relaxed text-blue-100/90">
                      {benefit.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Transição para a CTASection (#0A1628) */}
      <div className="pointer-events-none absolute bottom-[-1px] left-0 z-10 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[40px] w-full md:h-[70px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#0A1628"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
