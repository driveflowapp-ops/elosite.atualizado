import { Globe } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_URL, WHATSAPP_NUMBER_DISPLAY } from "@/lib/constants";
const Instagram = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-gray-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Elo Digital"
                width={56}
                height={56}
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="flex items-baseline text-xl sm:text-2xl font-bold tracking-tight select-none">
                <span className="text-white font-black tracking-tight">ELO</span>
                <span className="text-brand-cyan font-light ml-1 sm:ml-1.5 tracking-wider">DIGITAL</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Tecnologia que aproxima. Soluções que transformam. Desenvolvemos ferramentas digitais sob medida para o crescimento do seu negócio.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/elodigital.dev" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://elodigital.dev.br" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#solucoes" className="hover:text-brand-cyan transition-colors">Soluções</a></li>
              <li><a href="#como-atuamos" className="hover:text-brand-cyan transition-colors">Como Atuamos</a></li>
              <li><a href="#segmentos" className="hover:text-brand-cyan transition-colors">Para Quem É</a></li>
              <li><a href="#diferencial" className="hover:text-brand-cyan transition-colors">Por Que a Elo</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors flex items-center gap-2">
                  {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <a href="https://instagram.com/elodigital.dev" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors">
                  @elodigital.dev
                </a>
              </li>
              <li>
                <a href="https://elodigital.dev.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors">
                  elodigital.dev.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-center md:text-left gap-4">
          <p>© {new Date().getFullYear()} Elo Digital. Todos os direitos reservados.</p>
          <p>Feito com <span className="text-brand-cyan">tecnologia e propósito</span>.</p>
        </div>
      </div>
    </footer>
  );
}
