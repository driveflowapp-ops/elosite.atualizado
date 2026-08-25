"use client";

import { motion } from "framer-motion";
import { Globe, ShoppingCart, LayoutDashboard, Sparkles, CheckCircle2 } from "lucide-react";

const SOLUTIONS = [
  {
    id: "presenca",
    title: "Elo Presença",
    subtitle: "Presença digital com credibilidade, clareza e conversão.",
    icon: Globe,
    features: [
      "Sites institucionais premium",
      "Landing pages focadas em conversão",
      "Otimização SEO e Perfil no Google",
    ],
  },
  {
    id: "vendas",
    title: "Elo Vendas",
    subtitle: "Vendas online com organização, agilidade e integração.",
    icon: ShoppingCart,
    features: [
      "Loja virtual premium e completa",
      "Gestão de estoque e pagamentos",
      "Integração com Instagram Shop e Marketplaces",
    ],
  },
  {
    id: "gestao",
    title: "Elo Gestão",
    subtitle: "Sistemas sob medida para organizar processos e centralizar a operação.",
    icon: LayoutDashboard,
    features: [
      "ERPs e Sistemas personalizados",
      "Gestão de clientes e ordens de serviço",
      "Dashboards gerenciais em tempo real",
    ],
  },
  {
    id: "inteligencia",
    title: "Elo Inteligência",
    subtitle: "Integrações, automações e dados transformados em decisão.",
    icon: Sparkles,
    features: [
      "Automação de tarefas repetitivas",
      "Integração entre sistemas e apps",
      "Recursos de IA para apoio operacional",
    ],
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas Soluções
          </h2>
          <p className="text-lg text-gray-600">
            A tecnologia certa não é a mais complexa. É a que resolve o problema certo. Conheça nossos pilares de transformação:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOLUTIONS.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(30,95,224,0.12)] hover:border-[#1E5FE0]/20 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                <div className="w-16 h-16 shrink-0 bg-[#1E5FE0] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#1E5FE0]/20 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{solution.title}</h3>
                  <p className="text-gray-500 font-medium">{solution.subtitle}</p>
                </div>
              </div>
              
              <ul className="space-y-3 mt-8 pt-6 border-t border-gray-50">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-[#3B9EFF] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
