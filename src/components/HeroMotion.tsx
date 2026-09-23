"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Hero com mockup controlado por arraste.
 *
 * Os quadros do giro ficam em /public/motion/elo (desktop) e
 * /public/motion/elo-mobile (celular). Para trocar o vídeo do giro,
 * basta regerar os quadros e ajustar FRAMES_DESKTOP / FRAMES_MOBILE.
 */

const FRAMES_DESKTOP = 97;
const FRAMES_MOBILE = 65;

/** No celular usamos 1 quadro a cada 2 (índices pares): 33 no lugar de 65. */
const MOBILE_FRAME_STEP = 2;

type Frame = { source: CanvasImageSource; width: number; height: number };

function frameUrls(isMobile: boolean) {
  const dir = isMobile ? "/motion/elo-mobile" : "/motion/elo";
  const total = isMobile ? FRAMES_MOBILE : FRAMES_DESKTOP;
  const step = isMobile ? MOBILE_FRAME_STEP : 1;
  const urls: string[] = [];
  for (let i = 0; i < total; i += step) {
    urls.push(`${dir}/frame_${String(i + 1).padStart(3, "0")}.webp`);
  }
  return urls;
}

/**
 * Carrega um quadro já decodificado, para o drawImage não pagar a
 * decodificação do WebP no meio do arraste.
 *
 * No celular vale createImageBitmap: o decode sai da thread principal e sobra
 * um bitmap pronto, que é o caminho rápido no Safari iOS. No desktop ficamos
 * com <img> + decode(), porque os 97 quadros de 900x936 ocupariam por volta
 * de 327 MB se virassem bitmaps presos na memória.
 */
async function loadFrame(url: string, useBitmap: boolean): Promise<Frame | null> {
  if (useBitmap && typeof createImageBitmap === "function") {
    try {
      const response = await fetch(url);
      const bitmap = await createImageBitmap(await response.blob());
      return { source: bitmap, width: bitmap.width, height: bitmap.height };
    } catch {
      // sem suporte ou falha na rede: cai no <img> abaixo
    }
  }

  return new Promise<Frame | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const settle = () =>
      resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight });
    img.onload = () => {
      if (typeof img.decode === "function") img.decode().then(settle, settle);
      else settle();
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

type Slide = {
  title: string;
  support: string;
  cta?: boolean;
};

const SLIDES: Slide[] = [
  {
    title: "Tecnologia que resolve problemas reais",
    support: "Não apenas sites e aplicativos.",
  },
  {
    title: "Nossas soluções vão além da entrega de sites",
    support: "Presença digital, vendas online, gestão e automação com IA.",
  },
  {
    title: "Se o seu negócio tem processo, a gente organiza",
    support: "Sistemas sob medida para qualquer segmento ou porte.",
  },
  {
    title: "Feito sob medida para o seu comércio",
    support: "Vamos aplicar o Diagnóstico Elo no seu negócio.",
    cta: true,
  },
];

const LAST = SLIDES.length - 1;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Lê a preferência do sistema sem chamar setState dentro de um efeito. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

export default function HeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(Frame | null)[]>([]);
  const rafRef = useRef(0);
  // O loop só roda quando há arraste ou animação em curso.
  const runningRef = useRef(false);
  // Último quadro desenhado: evita redesenhar o mesmo índice.
  const lastFrameRef = useRef(-1);
  // Espelha o slide atual sem forçar re-render a cada quadro.
  const slideRef = useRef(0);
  const reducedRef = useRef(false);

  // progress: 0 = slide 0, 1 = slide 1 ... LAST
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const dragRef = useRef<{ active: boolean; startX: number; startProgress: number }>({
    active: false,
    startX: 0,
    startProgress: 0,
  });

  const [slide, setSlide] = useState(0);
  const [ready, setReady] = useState(false);
  // Uma vez que o usuário interage, o indicador não volta mais.
  const [hasInteracted, setHasInteracted] = useState(false);
  const reduced = usePrefersReducedMotion();

  // force = true redesenha mesmo com o mesmo quadro (resize, fim do load).
  const draw = useCallback((force = false) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const count = frames.length;
    // cada slide consome uma volta inteira do giro
    const turn = progressRef.current % 1;
    const index = Math.min(count - 1, Math.max(0, Math.round(turn * (count - 1))));

    // Nada mudou desde o último desenho: o arraste não precisa repintar.
    if (!force && index === lastFrameRef.current) return;

    const frame = frames[index];
    if (!frame || frame.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // O backing store fica preso à resolução nativa do quadro, e não ao
    // tamanho em CSS. O contêiner tem transição de 700ms ao trocar de slide,
    // então o tamanho em CSS muda a cada quadro durante a transição; deixar o
    // buffer acompanhar isso o realocava — e limpava — a cada pintura. Escalar
    // o elemento para o tamanho final é trabalho do compositor, bem mais
    // barato, e o drawImage passa a ser um blit 1:1, sem reescala nenhuma.
    if (canvas.width !== frame.width || canvas.height !== frame.height) {
      canvas.width = frame.width;
      canvas.height = frame.height;
    }
    ctx.clearRect(0, 0, frame.width, frame.height);
    ctx.drawImage(frame.source, 0, 0);
    lastFrameRef.current = index;
  }, []);

  // carrega os quadros já decodificados
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const urls = frameUrls(isMobile);
    const frames: (Frame | null)[] = new Array(urls.length).fill(null);
    framesRef.current = frames;
    lastFrameRef.current = -1;
    let cancelled = false;

    const loadAll = async () => {
      // o primeiro quadro na frente, para o hero aparecer sem esperar o resto
      const first = await loadFrame(urls[0], isMobile);
      if (cancelled) return;
      frames[0] = first;
      setReady(true);
      draw(true);

      const rest = await Promise.all(urls.slice(1).map((url) => loadFrame(url, isMobile)));
      if (cancelled) return;
      rest.forEach((frame, i) => {
        frames[i + 1] = frame;
      });
      draw(true);
    };

    void loadAll();

    const onResize = () => draw(true);
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      // libera os bitmaps, que seguram memória até serem fechados
      for (const frame of frames) {
        if (frame && typeof (frame.source as ImageBitmap).close === "function") {
          (frame.source as ImageBitmap).close();
        }
      }
    };
  }, [draw]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  // Loop de suavização: aproxima progress do alvo.
  // Com "reduzir movimento" o arraste continua valendo — é manipulação direta,
  // não animação autônoma. O que desligamos é a inércia: o quadro passa a
  // acompanhar o ponteiro 1:1, sem easing.
  //
  // O loop roda sob demanda: quem move o alvo chama startLoop, e o tick se
  // encerra sozinho quando não há mais arraste nem animação pendente. O
  // setSlide só dispara quando o índice inteiro muda de fato, para o canvas
  // não depender de re-render do React durante o arraste.
  const startLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    // declaração de função (içada) para o step poder se reagendar
    function step() {
      const diff = targetRef.current - progressRef.current;
      const moving = Math.abs(diff) > 0.0005;

      if (moving) {
        const easing = reducedRef.current ? 1 : dragRef.current.active ? 0.35 : 0.12;
        progressRef.current += diff * easing;
      } else if (progressRef.current !== targetRef.current) {
        progressRef.current = targetRef.current;
      }

      draw();

      const next = Math.round(progressRef.current);
      if (next !== slideRef.current) {
        slideRef.current = next;
        setSlide(next);
      }

      if (dragRef.current.active || moving) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        runningRef.current = false;
      }
    }

    startLoopRef.current = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(step);
    };

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const startLoop = useCallback(() => startLoopRef.current(), []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(LAST, Math.max(0, index));
      targetRef.current = clamped;
      slideRef.current = clamped;
      setSlide(clamped);
      setHasInteracted(true);
      startLoop();
    },
    [startLoop]
  );

  // arraste: a velocidade do giro acompanha a velocidade do dedo
  const onPointerDown = (event: React.PointerEvent) => {
    // O pointer capture redireciona o clique para a seção, o que mataria o
    // CTA e os dots. Só nesses dois alvos o arraste não começa — em qualquer
    // outro ponto da section, o canvas incluído, o arraste vale.
    if ((event.target as HTMLElement).closest("a, button")) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startProgress: progressRef.current,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    startLoop();
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const width = sectionRef.current?.clientWidth || window.innerWidth;
    const delta = (drag.startX - event.clientX) / (width * 0.6);
    // Só um movimento real conta como arraste — um clique parado não.
    if (Math.abs(drag.startX - event.clientX) > 4) setHasInteracted(true);
    targetRef.current = Math.min(LAST, Math.max(0, drag.startProgress + delta));
    startLoop();
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    goTo(Math.round(targetRef.current));
  };

  const current = SLIDES[slide] ?? SLIDES[0];
  const centered = slide === 0;
  const showHint = slide === 0 && !hasInteracted;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-[#0A1628] touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Apresentação da Elo Digital"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(slide + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(slide - 1);
        }
      }}
    >
      <div className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E5FE0]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center gap-8 px-6 pt-24 pb-28 md:flex-row md:gap-12 md:pt-24">
        <div
          className={`transition-all duration-700 ease-out ${
            centered
              ? "w-full max-w-xl md:w-[52%]"
              : "w-[58%] max-w-sm md:w-[34%] md:max-w-md"
          }`}
        >
          <canvas
            ref={canvasRef}
            className={`canvas-fade h-auto w-full transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            style={{ aspectRatio: "856 / 890" }}
            aria-hidden="true"
          />
        </div>

        <div
          className={`w-full text-center transition-all duration-700 ease-out md:text-left ${
            centered ? "md:w-[48%]" : "md:w-[66%]"
          }`}
        >
          <div key={slide} className="animate-[fadeUp_0.6s_ease-out]">
            <h1 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {current.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
              {current.support}
            </p>

            {current.cta ? (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1E5FE0] px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(30,95,224,0.3)] transition-all hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(30,95,224,0.6)]"
              >
                Falar com a Elo Digital
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 md:bottom-24">
        {SLIDES.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ir para ${item.title}`}
            aria-current={slide === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              slide === index ? "w-7 bg-[#3B9EFF]" : "w-2.5 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Indicador de arraste: some na primeira interação e não reaparece. */}
      <div
        className={`pointer-events-none absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 transition-opacity duration-500 md:bottom-24 md:left-auto md:right-8 md:translate-x-0 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!showHint}
      >
        <span className="relative flex h-7 w-14 items-center justify-center rounded-full border border-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B9EFF] animate-[swipeDot_1.8s_ease-in-out_infinite] motion-reduce:animate-none" />
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <ChevronLeft
            size={13}
            className="animate-[swipeArrow_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
            aria-hidden="true"
          />
          Arraste para o lado
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Slide ${slide + 1} de ${SLIDES.length}: ${current.title}`}
      </p>

      {/* Transição em onda, emendando com a seção Como Atuamos (#F5F7FA) */}
      <div className="pointer-events-none absolute bottom-[-1px] left-0 z-20 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[40px] w-full md:h-[70px]"
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
