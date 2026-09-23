"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import SectionWave from "@/components/SectionWave";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type ProjectSlide = {
  id: string;
  src: string;
  client: string;
  segment: string;
  summary: string;
  delivered: string[];
  alt: string;
};

/**
 * Cases entregues pela Elo Digital.
 * Para adicionar um novo projeto: coloque a arte final (A4 retrato) em
 * /public/projetos/ e inclua mais um objeto neste array — o carrossel,
 * os dots e a navegação se ajustam sozinhos.
 */
const SLIDES: ProjectSlide[] = [
  {
    id: "ads",
    src: "/projetos/case-ads-completo.jpg",
    client: "ADS Construções",
    segment: "Escavação e terraplanagem",
    summary:
      "Presença digital própria e a operação de obra organizada em um só lugar, do orçamento ao acompanhamento.",
    delivered: ["Site institucional", "App de gestão (PWA)", "Identidade digital"],
    alt: "Case ADS Construções — site institucional e aplicativo PWA de gestão desenvolvidos pela Elo Digital.",
  },
  {
    id: "amigo",
    src: "/projetos/case-amigo-completo.jpg",
    client: "Amigo Soluções Ambientais",
    segment: "Saneamento e limpeza de fossa",
    summary:
      "Atendimento, agendamento e controle de serviços reunidos em um sistema feito para o dia a dia em campo.",
    delivered: ["Site institucional", "Sistema de gestão", "Controle de operação"],
    alt: "Case Amigo Soluções Ambientais — site e sistema completo de gestão da operação desenvolvidos pela Elo Digital.",
  },
  {
    id: "cer",
    src: "/projetos/case-cer-completo.jpg",
    client: "CER — Cia Elétrica Reis",
    segment: "Serviços elétricos",
    summary:
      "Credibilidade para fechar contrato e uma agenda de serviços que deixou de viver no papel e no WhatsApp.",
    delivered: ["Site institucional", "App de gestão (PWA)", "Perfil no Instagram"],
    alt: "Case CER Cia Elétrica Reis — site institucional e aplicativo PWA de gestão desenvolvidos pela Elo Digital.",
  },
];

const AUTOPLAY_MS = 7000;

export default function Projetos() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Vai para um slide específico (usado pelos dots)
  const scrollToIndex = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const total = SLIDES.length;
    const target = ((index % total) + total) % total;
    viewport.scrollTo({
      left: target * viewport.clientWidth,
      behavior: reducedMotionRef.current ? "auto" : "smooth",
    });
  }, []);

  // Avança/volta a partir da posição REAL de rolagem — imune a cliques
  // rápidos e a estado desatualizado
  const step = useCallback(
    (direction: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const current = Math.round(viewport.scrollLeft / viewport.clientWidth);
      scrollToIndex(current + direction);
    },
    [scrollToIndex]
  );

  // Slide ativo a partir da rolagem — funciona também com swipe/arraste nativo
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-slide-index]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(Number(entry.target.getAttribute("data-slide-index")));
          }
        });
      },
      { root: viewport, threshold: [0.6] }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  // Mantém o slide atual enquadrado ao redimensionar a janela
  useEffect(() => {
    const onResize = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      viewport.scrollTo({ left: active * viewport.clientWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  // Autoplay sutil — pausa em hover, foco, toque, reduced-motion e aba oculta
  useEffect(() => {
    if (isPaused || reducedMotionRef.current || SLIDES.length < 2) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const timer = window.setTimeout(() => step(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, isPaused, step]);

  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return (
    <section
      id="projetos"
      className="section-padding relative scroll-mt-24 overflow-x-clip bg-[linear-gradient(to_bottom,#ffffff_0%,#F5F7FA_16%)] pb-28 md:pb-36"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Projetos que já entregamos
          </h2>
          <p className="text-lg text-gray-600">
            Soluções reais, criadas sob medida para empresas reais, do site
            institucional ao sistema que organiza a operação por dentro.
          </p>
        </motion.div>
      </div>

      <div
        className="relative mx-auto w-full max-w-5xl px-4 sm:px-12"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos entregues pela Elo Digital"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        {/* Scroll container (bloco) + trilho flex separados: garante o clip
            horizontal e o swipe nativo em qualquer largura. */}
        <div
          ref={viewportRef}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
        >
          <div className="flex">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                data-slide-index={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${SLIDES.length} — ${slide.client}`}
                className="min-w-full shrink-0 snap-center px-2 sm:px-6"
              >
                <div className="mx-auto grid max-w-3xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
                  {/* Largura travada em vw/px (não em %) para o slide nunca
                      crescer além do trilho — a imagem é sempre menor que o
                      viewport e mantém a proporção A4 sem cortar nada. */}
                  <div className="group/art relative mx-auto">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-brand-cyan/25 to-brand-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover/art:opacity-100"
                    />
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={1240}
                      height={1754}
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 320px, 380px"
                      draggable={false}
                      className="relative mx-auto block h-auto w-auto max-h-[62vh] max-w-[78vw] rounded-2xl shadow-[0_24px_60px_-18px_rgba(10,22,40,0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover/art:-translate-y-1.5 sm:max-w-[320px] lg:max-w-[380px]"
                    />
                  </div>

                  <div
                    className={`text-center transition-all duration-700 ease-out md:text-left ${
                      active === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }`}
                  >
                    <p className="text-sm font-medium text-brand-primary">
                      {slide.segment}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                      {slide.client}
                    </h3>
                    <p className="mt-4 leading-relaxed text-gray-600">
                      {slide.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                      {slide.delivered.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-brand-primary/15 bg-white px-3 py-1.5 text-sm font-medium text-gray-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Projeto anterior"
          className="absolute left-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-dark shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-white hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Próximo projeto"
          className="absolute right-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-dark shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-white hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Ir para o projeto ${index + 1}: ${slide.client}`}
            aria-current={active === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === index
                ? "w-7 bg-brand-primary"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Projeto {active + 1} de {SLIDES.length}: {SLIDES[active]?.client}
      </p>
      <SectionWave fill="#0A1628" />
    </section>
  );
}
