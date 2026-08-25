import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contato" className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Wave Transition */}
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-0 rotate-180">
        <svg
          className="relative block w-full h-[50px] md:h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,199.11,113.8,241.13,109.18,282.87,83.1,321.39,56.44Z"
            fill="#1e40af"
          ></path>
        </svg>
      </div>
      {/* Network Background (reused from Hero for consistency) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network-cta" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#3B9EFF" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-cta)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-brand-primary/20 text-brand-cyan rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Vamos aplicar o Diagnóstico Elo no seu negócio?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Fale com a nossa equipe no WhatsApp e descubra como a tecnologia certa pode transformar a sua operação.
          </p>
          <a
            href="https://wa.me/5562981864905"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(30,95,224,0.3)] hover:shadow-[0_0_30px_rgba(30,95,224,0.6)] text-lg"
          >
            Falar com Especialista
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
