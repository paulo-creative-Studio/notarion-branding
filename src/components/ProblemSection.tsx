import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROBLEM_SOLUTION_DATA } from '../data/content';

interface ProblemSectionProps {
  onOpenDemoModal: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0d0e11] border-y border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Diagnóstico Real
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {PROBLEM_SOLUTION_DATA.title}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            {PROBLEM_SOLUTION_DATA.subtitle}
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: The bottlenecks */}
          <div className="lg:col-span-6 bg-zinc-950/70 border border-red-950/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2.5 text-red-400 font-semibold text-sm mb-6">
                <AlertCircle className="w-4 h-4" />
                <span>O que acontece hoje com a maioria dos negócios:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROBLEM_SOLUTION_DATA.problems.map((prob, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                    <h3 className="text-sm font-semibold text-zinc-200">
                      {prob.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-400">
              Resultado: clientes desistem da compra e escolhem a opção mais fácil no Google ou no bairro.
            </div>
          </div>

          {/* Right: The Notarion Solution */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_30px_rgba(212,175,55,0.08)]">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#d4af37] font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>Como a Notarion transforma o seu negócio:</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {PROBLEM_SOLUTION_DATA.solutionHeadline}
              </h3>

              <div className="space-y-3.5 pt-2">
                {PROBLEM_SOLUTION_DATA.solutionPillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 font-medium">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 text-center sm:text-left">
                Sem complexidade técnica. Seu cliente encontra tudo em um toque.
              </div>

              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-colors whitespace-nowrap"
              >
                <span>Ver demonstração para meu negócio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
