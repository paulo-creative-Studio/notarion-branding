import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PACKAGES_DATA } from '../data/content';
import { PackageTier } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageTier) => void;
  onOpenCallModal: () => void;
  onOpenDemoModal: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ 
  onSelectPackage,
  onOpenCallModal,
  onOpenDemoModal
}) => {
  return (
    <section id="pacotes" className="py-20 md:py-28 bg-[#090a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Estrutura Comercial Transparente
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Níveis de solução para o momento da sua empresa
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Comece visualizando o potencial do seu negócio com nossa demonstração ou escolha a estrutura ideal para a sua maturidade digital.
          </p>
        </div>

        {/* Pricing/Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const isFreeDemo = pkg.id === 'demo';
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.15)] -translate-y-1'
                    : isFreeDemo
                    ? 'bg-zinc-900/60 border border-zinc-700/80 shadow-md'
                    : 'bg-zinc-900/40 border border-zinc-800'
                }`}
              >
                {/* Popular or Free Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    Mais Procurado
                  </div>
                )}

                {isFreeDemo && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 text-[#f3df89] text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    Sem Risco
                  </div>
                )}

                <div className="space-y-5">
                  
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 min-h-[32px] leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price display with transparent note */}
                  <div className="py-3 border-y border-zinc-800/80">
                    <span className="text-xl font-bold text-[#f3df89] block tracking-tight">
                      {pkg.priceTag}
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      {pkg.priceNote}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-1">
                    {pkg.introText && (
                      <p className="text-xs text-zinc-300 leading-relaxed pb-1">
                        {pkg.introText}
                      </p>
                    )}

                    {pkg.noCommitmentNotice && (
                      <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] text-[#f3df89] font-medium leading-snug">
                        {pkg.noCommitmentNotice}
                      </div>
                    )}

                    <span className="text-[11px] font-semibold uppercase text-zinc-400 tracking-wider block">
                      {pkg.featuresTitle || 'O que está incluído:'}
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {pkg.closingQuestion && (
                      <p className="text-xs font-semibold text-white pt-2">
                        {pkg.closingQuestion}
                      </p>
                    )}
                  </div>

                </div>

                {/* Card CTA Button */}
                <div className="pt-8 mt-6 border-t border-zinc-800/60">
                  <button
                    onClick={() => {
                      if (pkg.ctaType === 'demo') {
                        onOpenDemoModal();
                      } else if (pkg.ctaType === 'call') {
                        onOpenCallModal();
                      } else {
                        onSelectPackage(pkg);
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#d4af37] text-black hover:bg-[#e6ca65] shadow-[0_2px_15px_rgba(212,175,55,0.3)]'
                        : isFreeDemo
                        ? 'bg-white text-black hover:bg-zinc-200'
                        : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                    }`}
                  >
                    {isFreeDemo && <Sparkles className="w-3.5 h-3.5 text-black" />}
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {pkg.disclaimer && (
                    <p className="text-[10px] text-zinc-400 text-center mt-2.5 leading-snug">
                      {pkg.disclaimer}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 max-w-2xl mx-auto flex items-center gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
          <span>
            <strong>Compromisso Notarion:</strong> Nós nunca inventamos preços mirabolantes. Cada orçamento é formulado de forma justa com base na complexidade e no número de itens do seu negócio.
          </span>
        </div>

      </div>
    </section>
  );
};
