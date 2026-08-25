import { Search, PenTool, Rocket, LineChart } from "lucide-react";

const STEPS = [
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

export default function Methodology() {
  return (
    <section id="como-atuamos" className="py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Atuamos
          </h2>
          <p className="text-lg text-gray-600">
            Um processo comprovado em 4 etapas para garantir que a tecnologia traga resultados de verdade para sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />

          {STEPS.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#1E5FE0]/10 text-[#1E5FE0] rounded-full flex items-center justify-center mb-6 border border-[#1E5FE0]/20">
                <step.icon size={28} />
              </div>
              <div className="bg-[#1E5FE0] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                ETAPA {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
