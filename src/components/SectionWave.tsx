/**
 * Onda de transição entre duas seções de cores diferentes.
 *
 * Vai no FIM da seção de cima (que precisa ser `relative`), e a cor
 * recebida em `fill` é a da seção de BAIXO — é ela que "invade" a de cima.
 * É o mesmo desenho usado na emenda do hero, para o site manter um único
 * vocabulário visual.
 */
export default function SectionWave({ fill }: { fill: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-[-1px] left-0 z-10 leading-[0]"
    >
      <svg
        className="relative block h-[40px] w-full md:h-[70px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill={fill}
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </div>
  );
}
