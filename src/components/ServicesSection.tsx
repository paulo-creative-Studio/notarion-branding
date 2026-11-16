import React from 'react';
import { SOLUTIONS_LIST } from '../data/content';

interface ServicesSectionProps {
  onOpenDemoModal: (serviceId?: string) => void;
  onOpenCallModal: () => void;
}

const ROMAN_NUMERALS = ['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.', 'VIII.'];

const handleCursorMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mx', `${x}px`);
  e.currentTarget.style.setProperty('--my', `${y}px`);
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenDemoModal,
  onOpenCallModal,
}) => {
  return (
    <section id="solucoes" className="py-20 md:py-28 bg-[#090a0c] relative scroll-mt-24">
      <div className="max-w-[1190px] mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="font-pinyon font-normal text-2xl sm:text-[1.75rem] text-[#e6ca65] tracking-[0.02em] leading-none">
              Soluções Práticas
            </p>
            <h2 className="font-marcellus font-normal text-3xl sm:text-4xl md:text-[42px] text-[#f4f1ea] tracking-[-0.015em] leading-[1.18] text-balance">
              O que a Notarion desenvolve para o seu negócio
            </h2>
            <p className="text-zinc-400 text-sm sm:text-[15px] leading-[1.8]">
              Ferramentas objetivas que eliminam atritos entre o seu cliente e a compra. Tudo integrado ao celular e fácil de manter.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onOpenDemoModal()}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#d4af37]/70 bg-transparent text-[#e6ca65] hover:bg-[#d4af37]/10 hover:border-[#f3df89] text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
            >
              Solicitar demonstração completa
            </button>
          </div>
        </div>

        {/* Grid of 8 Practical Solutions matching Packages editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {SOLUTIONS_LIST.map((sol, idx) => {
            const isFeatured = sol.id === 'vitrine-digital';
            const roman = ROMAN_NUMERALS[idx] ?? `${idx + 1}.`;

            return (
              <article
                key={sol.id}
                onMouseMove={handleCursorMove}
                className={`notarion-plan flex flex-col justify-between p-7 sm:p-8 ${
                  isFeatured ? 'notarion-plan-featured lg:col-span-2' : ''
                }`}
              >
                <div className="notarion-plan-spotlight" aria-hidden="true" />

                {isFeatured && sol.badgeText && (
                  <div className="absolute right-0 top-0 bg-[#d4af37] text-[#090a0c] text-[9px] tracking-[0.14em] font-bold px-3.5 py-2 uppercase">
                    {sol.badgeText}
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Numeral & Unboxed Category */}
                  <div
                    className={`flex items-baseline gap-3 ${
                      isFeatured ? 'justify-start pt-4 sm:pt-0' : 'justify-between'
                    }`}
                  >
                    <span className="font-[family-name:var(--font-italiana)] text-[28px] leading-none text-[#d4af37]">
                      {roman}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d4af37]/85">
                      {sol.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-marcellus font-normal text-[22px] sm:text-[24px] leading-[1.22] text-[#f4f1ea] mt-4 mb-2.5">
                    {sol.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] leading-[1.75] text-zinc-400">
                    {sol.description}
                  </p>

                  {/* Deliverables List */}
                  <ul
                    className={`mt-6 pt-5 mb-6 border-t border-[#d4af37]/16 flex-1 ${
                      isFeatured
                        ? 'grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 content-start'
                        : 'space-y-3'
                    }`}
                  >
                    {sol.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="text-[12.5px] leading-[1.65] text-zinc-200 flex items-start gap-2.5"
                      >
                        <span className="text-[#d4af37] shrink-0" aria-hidden="true">
                          ↗
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For + CTA Button */}
                <div className="relative z-10 space-y-4">
                  <p className="text-[11px] leading-[1.6] text-zinc-400 border-t border-[#d4af37]/12 pt-4">
                    <span className="text-[#d4af37]/90 font-semibold">Ideal:</span>{' '}
                    {sol.idealFor}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      sol.id === 'automacoes-digitais'
                        ? onOpenCallModal()
                        : onOpenDemoModal(sol.id)
                    }
                    className={`w-full py-3.5 px-4 text-center text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89] ${
                      isFeatured
                        ? 'bg-[#d4af37] text-[#090a0c] border border-[#d4af37] hover:bg-[#e6ca65]'
                        : 'bg-transparent text-[#e6ca65] border border-[#d4af37]/70 hover:bg-[#d4af37]/10 hover:border-[#f3df89]'
                    }`}
                  >
                    {sol.id === 'automacoes-digitais' ? 'Solicitar diagnóstico' : 'Ver prévia da solução'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
