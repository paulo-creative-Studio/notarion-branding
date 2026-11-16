import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROBLEM_SOLUTION_DATA } from '../data/content';

interface ProblemSectionProps {
  onOpenDemoModal: () => void;
}

const handleCursorMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mx', `${x}px`);
  e.currentTarget.style.setProperty('--my', `${y}px`);
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0b0c0e] border-y border-[#d4af37]/15 relative">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">

        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16 space-y-3">
          <p className="font-pinyon font-normal text-2xl sm:text-[1.75rem] text-[#e6ca65] tracking-[0.02em] leading-none">
            Diagnóstico Real
          </p>
          <h2 className="font-[family-name:var(--font-marcellus)] font-normal text-3xl sm:text-4xl md:text-[42px] leading-[1.18] tracking-[-0.02em] text-white text-balance">
            Seu cliente está procurando.{' '}
            <span className="text-[#e6ca65] inline-block">O que ele encontra?</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            {PROBLEM_SOLUTION_DATA.subtitle}
          </p>
        </div>

        {/* Minimalist 2-Column Editorial Problems Grid (No heavy boxes or side borders) */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37] mb-8">
            O que acontece hoje com a maioria dos negócios
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {PROBLEM_SOLUTION_DATA.problems.map((prob, idx) => {
              const indexLabel = String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={idx}
                  onMouseMove={handleCursorMove}
                  className="notarion-dor group"
                >
                  <div className="notarion-dor-spotlight" aria-hidden="true" />
                  <div className="relative z-10">
                    <span className="block text-[11px] font-medium tracking-[0.16em] text-[#d4af37]/85 tabular-nums mb-3.5">
                      {indexLabel} /
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[22px] sm:text-[23px] leading-[1.25] text-[#f4f1ea] group-hover:text-[#e6ca65] transition-colors duration-200 mb-2.5">
                      {prob.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.75] text-zinc-400 group-hover:text-zinc-300 max-w-[46ch] transition-colors duration-200">
                      {prob.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-2 pt-6 border-t border-[#d4af37]/18 text-sm leading-relaxed text-zinc-400">
            <strong className="text-[#e6ca65] font-semibold">Resultado:</strong>{' '}
            clientes desistem da compra e escolhem a opção mais fácil no Google ou no bairro.
          </p>
        </div>

        {/* Clean Editorial Solution Band (Preserves Notarion value + CTA without boxed clutter) */}
        <div className="mt-16 pt-14 border-t border-[#d4af37]/18 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
              Como a Notarion transforma o seu negócio
            </p>
            <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-2xl sm:text-[28px] leading-[1.3] text-white text-balance">
              {PROBLEM_SOLUTION_DATA.solutionHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-[42ch]">
              Sem complexidade técnica. Seu cliente encontra tudo em um toque.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.1em] text-[#090a0c] bg-[#d4af37] hover:bg-[#e6ca65] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
              >
                <span>Ver demonstração para meu negócio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 border-b border-[#d4af37]/16">
            {PROBLEM_SOLUTION_DATA.solutionPillars.map((pillar, idx) => {
              const indexLabel = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  onMouseMove={handleCursorMove}
                  className="notarion-solution-row group flex items-baseline gap-4 sm:gap-5"
                >
                  <div className="notarion-dor-spotlight" aria-hidden="true" />
                  <span className="relative z-10 text-[11px] font-medium tracking-[0.16em] text-[#d4af37]/85 tabular-nums shrink-0">
                    {indexLabel} /
                  </span>
                  <span className="relative z-10 text-sm text-zinc-300 group-hover:text-white leading-relaxed transition-colors duration-200">
                    {pillar}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
