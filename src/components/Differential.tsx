import { Eye, ShieldCheck, Zap, TrendingUp } from "lucide-react";

const BENEFITS = [
  { label: "Mais Visibilidade", icon: Eye },
  { label: "Mais Controle", icon: ShieldCheck },
  { label: "Mais Eficiência", icon: Zap },
  { label: "Mais Crescimento", icon: TrendingUp },
];

export default function Differential() {
  return (
    <section id="diferencial" className="section-padding bg-brand-primary overflow-hidden relative">
      {/* Network Background */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network-diff" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#ffffff" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-diff)" />
        </svg>
      </div>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-800 opacity-90 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Não vendemos apenas sites e aplicativos. Desenvolvemos soluções para resolver problemas reais e gerar <span className="text-brand-cyan">crescimento sustentável.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <benefit.icon size={36} className="text-brand-cyan mb-4" strokeWidth={1.5} />
              <span className="text-white font-semibold text-lg text-center">{benefit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
