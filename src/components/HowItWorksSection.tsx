import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenDemoModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#090a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Processo Claro & Transparente
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Como funciona da ideia até a publicação
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Sem burocracias desnecessárias ou termos técnicos confusos. Você acompanha cada fase com clareza total.
          </p>
        </div>

        {/* 5 Steps sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors"
            >
              <div className="space-y-4">
                {/* Step index */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#d4af37]/90 font-mono tracking-wider">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
                    Etapa
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress connector indicator */}
              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-700">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step 3 Emphasis Box */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-semibold text-[#f3df89] uppercase tracking-wider">
              Destaque do Processo
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Você só aprova o projeto depois de visualizar a demonstração.
            </h4>
            <p className="text-xs text-zinc-400">
              Isso garante que o resultado final corresponda exatamente ao padrão e à identidade do seu negócio.
            </p>
          </div>

          <button
            onClick={onOpenDemoModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-all whitespace-nowrap shrink-0 shadow-md"
          >
            <span>Quero iniciar pela Etapa 01</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
