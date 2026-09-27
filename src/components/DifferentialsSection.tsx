import React from 'react';
import { DIFFERENTIALS_DATA } from '../data/content';
import { Target, Palette, Zap, Layers, Sparkles } from 'lucide-react';
import { NotarionBrandIcon } from './NotarionLogo';

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

        {/* Official Brand Identity Showcase Card (Matching Image 3) */}
        <div className="mt-14 rounded-2xl bg-black border border-[#d4af37]/40 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.12)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl">
              <NotarionBrandIcon className="w-24 h-24 sm:w-28 sm:h-28 mb-4" glow />
              
              <div className="text-3xl sm:text-4xl text-[#dfb744] font-serif italic tracking-wide select-none drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
                <span className="text-4xl sm:text-5xl not-italic font-normal" style={{ fontFamily: 'Georgia, serif' }}>N</span>otarion
              </div>
              
              <div className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#e6ca65] uppercase mt-1 select-none">
                BRANDING
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                A Identidade Notarion
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Design com propósito para fortalecer marcas locais reais.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Nossa identidade visual une a precisão geométrica do símbolo com o requinte da tipografia clássica, refletindo nossa missão: elevar pequenos e médios negócios ao patamar de grandes marcas, com tecnologias funcionais e presença digital imponente.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  Design Exclusivo
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  Tecnologia Prática
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  Foco em Conversão Real
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
