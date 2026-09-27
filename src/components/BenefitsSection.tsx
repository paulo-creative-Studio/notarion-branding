import React from 'react';
import { Gift, Ticket, Users, Flame, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  onOpenDemoModal: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="py-20 md:py-24 bg-[#090a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Módulo Adicional Opcional
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Clube de Benefícios & Fidelização Local
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Uma ferramenta adicional para quem deseja transformar clientes esporádicos em fregueses fiéis, sem depender de plataformas caras de terceiros.
          </p>
        </div>

        {/* Bento grid of benefit features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-[#d4af37]">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Cupons & Promoções Exclusivas
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Crie cupons sazonais (ex: 10% na primeira visita ou sobremesa grátis na terça-feira) que o cliente resgata diretamente pelo link oficial da sua empresa.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-[#d4af37]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Cadastro Próprio de Clientes
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Construa sua própria base de contatos (nome, aniversário e WhatsApp) em vez de deixar seus dados reféns do algoritmo das redes sociais.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-[#d4af37]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Campanhas de Reativação
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Dispare avisos especiais para clientes do bairro quando tiver novidades no cardápio, chegada de nova coleção de roupas ou promoções relâmpago.
            </p>
          </div>

        </div>

        {/* Call to action notice */}
        <div className="mt-10 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>O Clube de Benefícios é flexível e implementado sob medida de acordo com o modelo do seu comércio.</span>
          </div>

          <button
            onClick={onOpenDemoModal}
            className="text-xs font-semibold text-[#f3df89] hover:text-white transition-colors inline-flex items-center gap-1 shrink-0"
          >
            <span>Consultar viabilidade para meu negócio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
