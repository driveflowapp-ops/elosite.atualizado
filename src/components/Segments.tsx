import { Briefcase, Building2, Stethoscope, Church, Wrench, Home, Store } from "lucide-react";

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
    <section id="segmentos" className="section-padding bg-[#0A1628] text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTVmZTAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDBWMjRoMjRWMEgzNnYyNGgyNnYxMEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Para quem é a Elo Digital?
          </h2>
          <p className="text-lg text-gray-400">
            Nossas soluções são desenhadas para atender diversos setores, trazendo profissionalismo e eficiência para qualquer segmento.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {SEGMENTS.map((segment, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#3B9EFF]/50 transition-all px-6 py-3.5 rounded-full"
            >
              <segment.icon size={20} className="text-[#3B9EFF]" />
              <span className="font-medium text-gray-200">{segment.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
