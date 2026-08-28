import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function CTASection() {
  return (
    <section id="contato" className="section-padding bg-[#0A1628] relative overflow-hidden">
      {/* Network Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network-cta" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="#3B9EFF" />
              <line x1="40" y1="40" x2="80" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="40" y1="40" x2="0" y2="80" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-cta)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm shadow-2xl">
          <div className="w-16 h-16 bg-brand-primary/20 text-brand-cyan rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Vamos aplicar o Diagnóstico Elo no seu negócio?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            Fale com a nossa equipe no WhatsApp e descubra como a tecnologia certa pode transformar a sua operação.
          </p>
          <a
            href={WHATSAPP_URL}
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

