"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Search, PenTool, Rocket, LineChart } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Diagnóstico Elo",
    description: "Entendemos seu negócio, desafios e oportunidades com profundidade.",
    icon: Search,
  },
  {
    number: "02",
    title: "Projeto sob medida",
    description: "Desenhamos a solução ideal para gerar valor real e sustentável.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Implantação",
    description: "Colocamos a solução em prática com agilidade, qualidade e segurança.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Evolução contínua",
    description: "Monitoramos resultados e evoluímos junto com o seu negócio.",
    icon: LineChart,
  },
];

function StepItem({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start - 0.08, start + 0.05], [0.4, 1]);
  const lift = useTransform(progress, [start - 0.08, start + 0.05], [14, 0]);
  const Icon = step.icon;

  return (
    <motion.li style={{ opacity, y: lift }} className="relative pl-14 lg:pl-0">
      <div className="absolute top-0 left-0 lg:relative lg:mb-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E5FE0] text-[11px] font-bold text-white ring-8 ring-[#F5F7FA]">
          {step.number}
        </span>
      </div>

      <Icon size={26} strokeWidth={1.75} className="mb-4 text-[#1E5FE0]" aria-hidden="true" />

      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-gray-600">
        {step.description}
      </p>
    </motion.li>
  );
}

export default function Methodology() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const fillHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="como-atuamos" className="section-padding bg-[#F5F7FA]">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl md:mb-20">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Como Atuamos</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Um processo comprovado em 4 etapas para garantir que a tecnologia traga
            resultados de verdade para sua empresa.
          </p>
        </div>

        <div ref={trackRef} className="relative">
          {/* trilho horizontal — desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-0 left-0 hidden h-px bg-gray-200 lg:block"
          >
            <motion.div
              style={{ width: fillWidth }}
              className="h-px bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0]"
            />
          </div>

          {/* trilho vertical — mobile e tablet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[15px] w-px bg-gray-200 lg:hidden"
          >
            <motion.div
              style={{ height: fillHeight }}
              className="w-px bg-gradient-to-b from-[#3B9EFF] to-[#1E5FE0]"
            />
          </div>

          <ol className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-10">
            {STEPS.map((step, index) => (
              <StepItem
                key={step.number}
                step={step}
                index={index}
                total={STEPS.length}
                progress={progress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
