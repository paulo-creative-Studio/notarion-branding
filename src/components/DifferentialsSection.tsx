import React from 'react';
import { DIFFERENTIALS_DATA } from '../data/content';
import { Target, Palette, Zap, Layers, Sparkles } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Target className="w-5 h-5 text-[#d4af37]" />;
      case 1: return <Palette className="w-5 h-5 text-[#d4af37]" />;
      case 2: return <Zap className="w-5 h-5 text-[#d4af37]" />;
      case 3: return <Layers className="w-5 h-5 text-[#d4af37]" />;
      case 4: return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      default: return <Target className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#0c0d10] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Por que escolher a Notarion Brand
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Design e tecnologia construídos para a rotina de quem empreende
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Não prometemos fórmulas mágicas. Entregamos clareza, presença digital profissional e soluções que facilitam a vida dos seus clientes.
          </p>
        </div>

        {/* Grid of 5 Differentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIALS_DATA.map((diff, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1 border-[#d4af37]/30 bg-gradient-to-b from-zinc-950 to-zinc-900' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {getIcon(idx)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">
                  {diff.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {diff.desc}
                </p>
              </div>

              <div className="text-[11px] text-zinc-400 font-mono tracking-wider pt-2 border-t border-zinc-900">
                Pilar 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Card: Por que escolher a Notarion? (Foco total no cliente e quebra de objeções) */}
        <div id="por-que-notarion" className="mt-14 rounded-2xl bg-black border border-[#d4af37]/40 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.12)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Coluna Esquerda: Por que empresas escolhem a Notarion */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
                  Vantagens Reais
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Por que empresas escolhem a Notarion?
                </h4>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Veja uma demonstração antes de contratar</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Sem mensalidade obrigatória</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Atendimento direto e sem burocracia</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Funciona em celular, tablet e computador</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Integração com WhatsApp e redes sociais</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Projeto adaptado ao seu tipo de negócio</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#d4af37] font-bold text-base leading-none">✓</span>
                  <span>Suporte opcional após a entrega</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: O que você recebe & Resultado */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                  POR QUE ESCOLHER A NOTARION?
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Soluções digitais criadas para gerar resultado no mundo real.
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Desenvolvemos sites, vitrines digitais e automações pensadas para facilitar o contato entre sua empresa e seus clientes.
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Nosso objetivo não é apenas criar páginas bonitas, mas entregar ferramentas úteis para divulgar produtos, apresentar serviços, receber contatos e fortalecer a presença digital do seu negócio.
              </p>

              {/* O que você recebe */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-[#f3df89] tracking-wide uppercase">
                  O que você recebe:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-200">
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Demonstração gratuita antes de contratar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Projeto adaptado ao seu segmento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Site responsivo para celular, tablet e computador</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Integração com WhatsApp e redes sociais</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Estrutura pensada para facilitar o contato dos clientes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Entrega rápida e suporte opcional após a publicação</span>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span>Atendimento direto, sem burocracia</span>
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="pt-2 border-t border-zinc-800 space-y-1.5">
                <h4 className="text-xs font-bold text-[#d4af37] tracking-wider uppercase">
                  Resultado
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Mais profissionalismo, mais praticidade para seus clientes e uma presença digital preparada para acompanhar o crescimento da sua empresa.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
