import React from 'react';
import { PACKAGES_DATA } from '../data/content';
import { PackageTier } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageTier) => void;
  onOpenCallModal: () => void;
  onOpenDemoModal: () => void;
}

const ROMAN_NUMERALS = ['I.', 'II.', 'III.'];

const COMPLEMENTARY_SERVICES = [
  {
    title: 'Identidade Visual',
    desc: 'Criação ou refinamento de marca, linguagem gráfica e aplicações. Orçamento independente.',
  },
  {
    title: 'Presença Local',
    desc: 'Organização das informações comerciais e orientação para visibilidade nas buscas.',
  },
  {
    title: 'Manutenção & Evolução',
    desc: 'Atualizações e suporte após a entrega, com contratação opcional e condições próprias.',
  },
];

const handleCursorMove = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mx', `${x}px`);
  e.currentTarget.style.setProperty('--my', `${y}px`);
};

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  onOpenCallModal,
  onOpenDemoModal,
}) => {
  return (
    <section id="pacotes" className="py-20 md:py-28 bg-[#090a0c] relative scroll-mt-24">
      <div className="max-w-[1190px] mx-auto px-6 sm:px-8">

        {/* Editorial Intro */}
        <div className="max-w-4xl space-y-5">
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
            NOTARION BRAND · INVESTIMENTO &amp; SOLUÇÕES
          </p>
          <h2 className="font-[family-name:var(--font-marcellus)] font-normal text-4xl sm:text-5xl md:text-[64px] leading-[1.12] tracking-[-0.03em] text-[#f4f1ea] text-balance">
            Soluções à altura{' '}
            <span className="font-[family-name:var(--font-italiana)] text-[#e6ca65] inline-block">
              da sua ambição.
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-[15px] leading-[1.85] max-w-[670px]">
            Da presença digital essencial a experiências desenvolvidas sob medida. Cada projeto parte de um objetivo claro: apresentar sua empresa com consistência, funcionalidade e personalidade.
          </p>
        </div>

        <div className="border-t border-[#d4af37]/18 my-12 md:my-14" />

        {/* 01 / Soluções com escopo definido */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div>
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
                01 / SOLUÇÕES COM ESCOPO DEFINIDO
              </p>
              <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-3xl sm:text-4xl md:text-[46px] leading-[1.16] text-[#f4f1ea] mt-2.5">
                Escolha seu ponto de partida.
              </h3>
            </div>
            <p className="text-zinc-400 text-[13px] leading-[1.7] max-w-[380px]">
              Três níveis de projeto, apresentados com clareza. O escopo é confirmado antes da contratação.
            </p>
          </div>

          {/* 3-Column Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            {PACKAGES_DATA.map((pkg, idx) => {
              const isFeatured = Boolean(pkg.popular);
              const roman = ROMAN_NUMERALS[idx] ?? `${idx + 1}.`;
              const isFromPrice = pkg.priceTag.toLowerCase().startsWith('a partir de ');
              const cleanAmount = isFromPrice
                ? pkg.priceTag.replace(/^a partir de\s+/i, '')
                : pkg.priceTag;

              return (
                <article
                  key={pkg.id}
                  onMouseMove={handleCursorMove}
                  className={`notarion-plan flex flex-col justify-between p-7 sm:p-8 lg:min-h-[590px] ${
                    isFeatured ? 'notarion-plan-featured' : ''
                  }`}
                >
                  <div className="notarion-plan-spotlight" aria-hidden="true" />

                  {isFeatured && (
                    <div className="absolute right-0 top-0 bg-[#d4af37] text-[#090a0c] text-[9px] tracking-[0.14em] font-bold px-3.5 py-2 uppercase">
                      Recomendado
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col flex-1">
                    <span className="font-[family-name:var(--font-italiana)] text-[32px] leading-none text-[#d4af37]">
                      {roman}
                    </span>

                    <h4 className="font-[family-name:var(--font-marcellus)] font-normal text-[24px] sm:text-[26px] leading-[1.2] text-[#f4f1ea] mt-4 mb-2.5 lg:min-h-[62px] flex items-start">
                      {pkg.title}
                    </h4>

                    <p className="text-[12.5px] leading-[1.8] text-zinc-400 lg:min-h-[68px]">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-5 font-[family-name:var(--font-marcellus)] text-[34px] sm:text-[38px] leading-none text-[#f4f1ea] tabular-nums">
                      {isFromPrice ? (
                        <>
                          <span className="font-[family-name:var(--font-sans)] text-[12px] text-zinc-400 font-normal mr-2">
                            A partir de
                          </span>
                          <span>{cleanAmount}</span>
                        </>
                      ) : (
                        <>
                          <span>{cleanAmount}</span>
                          <span className="font-[family-name:var(--font-sans)] text-[12px] text-zinc-400 font-normal ml-2">
                            / projeto
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-2">
                      {pkg.priceNote}
                    </p>

                    <ul className="mt-6 pt-5 mb-7 border-t border-[#d4af37]/16 space-y-3.5 flex-1">
                      {pkg.features.map((feat, featIdx) => (
                        <li
                          key={featIdx}
                          className="text-[12.5px] leading-[1.65] text-zinc-200 flex items-start gap-2.5"
                        >
                          <span className="text-[#d4af37] shrink-0" aria-hidden="true">
                            ↗
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className={`relative z-10 w-full py-3.5 px-4 text-center text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89] ${
                      isFeatured
                        ? 'bg-[#d4af37] text-[#090a0c] border border-[#d4af37] hover:bg-[#e6ca65]'
                        : 'bg-transparent text-[#e6ca65] border border-[#d4af37]/70 hover:bg-[#d4af37]/10 hover:border-[#f3df89]'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>
                </article>
              );
            })}
          </div>

          <p className="mt-6 text-[12px] text-zinc-400 leading-[1.8] max-w-4xl">
            Domínio, manutenção, integrações pagas e serviços de terceiros são avaliados separadamente. O escopo definitivo, prazos e condições constam da proposta comercial.
          </p>
        </div>

        {/* 02 / Além dos pacotes */}
        <div
          id="sobmedida"
          className="mt-16 pt-16 border-t border-[#d4af37]/18 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
              02 / ALÉM DOS PACOTES
            </p>
            <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-3xl sm:text-[42px] leading-[1.2] text-[#f4f1ea] mt-3 mb-4">
              Projetos com{' '}
              <span className="font-[family-name:var(--font-pinyon)] text-[#e6ca65] text-[48px] sm:text-[52px] font-normal leading-none inline-block px-1">
                identidade
              </span>{' '}
              própria.
            </h3>
            <p className="text-sm leading-[1.85] text-zinc-400 max-w-[52ch]">
              Algumas necessidades exigem uma solução exclusiva. A NOTARION desenvolve projetos de identidade visual, experiências digitais personalizadas e integrações específicas a partir de um diagnóstico do negócio.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
              DESENVOLVIMENTO PERSONALIZADO
            </p>
            <h4 className="font-[family-name:var(--font-marcellus)] font-normal text-[28px] sm:text-[30px] leading-[1.2] text-[#f4f1ea]">
              Proposta sob medida
            </h4>
            <p className="text-sm leading-[1.85] text-zinc-400 max-w-[52ch]">
              Escopo, entregas, investimento e cronograma definidos após entender a operação e os objetivos da empresa. Sem promessas genéricas ou funcionalidades que não serão utilizadas.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenCallModal}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#d4af37]/70 bg-transparent text-[#e6ca65] hover:bg-[#d4af37]/10 hover:border-[#f3df89] text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
              >
                Solicitar avaliação do projeto
              </button>
            </div>
          </div>
        </div>

        {/* 03 / Primeiro contato */}
        <div
          id="avaliacao"
          className="mt-16 pt-16 border-t border-[#d4af37]/18 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
              03 / PRIMEIRO CONTATO
            </p>
            <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-3xl sm:text-[42px] leading-[1.2] text-[#f4f1ea] mt-3 mb-4 text-balance">
              Conheça as possibilidades para sua empresa.
            </h3>
            <p className="text-sm leading-[1.85] text-zinc-400 max-w-[50ch]">
              Antes de contratar, você pode solicitar uma conversa inicial e conhecer a proposta de demonstração visual gratuita da NOTARION.
            </p>
          </div>

          <div
            onMouseMove={handleCursorMove}
            className="notarion-plan p-7 sm:p-9 space-y-4"
          >
            <div className="notarion-plan-spotlight" aria-hidden="true" />
            <div className="relative z-10 space-y-3">
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37]">
                DEMONSTRAÇÃO GRATUITA
              </p>
              <h4 className="font-[family-name:var(--font-marcellus)] font-normal text-[28px] sm:text-[30px] leading-[1.2] text-[#f4f1ea]">
                Uma primeira visão do seu projeto.
              </h4>
              <p className="text-[13px] leading-[1.8] text-zinc-400">
                Prévia conceitual personalizada e conversa sobre oportunidades de melhoria, sem compromisso de contratação. A demonstração não equivale à entrega de um projeto completo.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="w-full py-3.5 px-5 bg-[#d4af37] text-[#090a0c] hover:bg-[#e6ca65] text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                >
                  Solicitar demonstração
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Serviços Complementares */}
        <div className="mt-16 pt-14 border-t border-[#d4af37]/18">
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#d4af37] mb-6">
            SERVIÇOS COMPLEMENTARES
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0">
            {COMPLEMENTARY_SERVICES.map((item, idx) => (
              <article
                key={idx}
                onMouseMove={handleCursorMove}
                className="notarion-dor group"
              >
                <div className="notarion-dor-spotlight" aria-hidden="true" />
                <div className="relative z-10">
                  <h4 className="font-[family-name:var(--font-marcellus)] font-normal text-[22px] sm:text-[23px] leading-[1.25] text-[#f4f1ea] group-hover:text-[#e6ca65] transition-colors duration-200 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[12.5px] leading-[1.8] text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
