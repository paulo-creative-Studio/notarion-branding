import React from 'react';
import { ArrowRight, Sparkles, PhoneCall, Check } from 'lucide-react';
import { NotarionBrandIcon } from './NotarionLogo';
import { HeroVideoPlayer } from './HeroVideoPlayer';

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenCallModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal, onOpenCallModal }) => {

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4af37]/8 blur-[140px] pointer-events-none rounded-full"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-10 right-10 w-96 h-96 bg-zinc-800/10 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top official brand badge line */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#d4af37]/40 text-xs font-semibold tracking-wider text-zinc-300 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <NotarionBrandIcon className="w-4 h-4" glow />
          <span className="text-[#f3df89] font-bold">NOTARION BRAND</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Soluções Digitais para Negócios Locais</span>
          <span aria-hidden="true" className="hidden sm:inline text-zinc-600">·</span>
          <span className="hidden sm:inline text-zinc-400">Atendimento Nacional</span>
        </div>

        {/* Main Headline & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            {/* Detalhe ornamental discreto em Pinyon Script */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-[#d4af37] to-transparent" aria-hidden="true" />
              <span className="font-pinyon text-xl sm:text-2xl text-[#d4af37]/90 tracking-wide leading-none select-none">
                Estética &amp; Valor
              </span>
            </div>

            <h1 className="font-marcellus font-normal text-center text-[1.85rem] sm:text-[2.35rem] md:text-[2.6rem] lg:text-[2.65rem] xl:text-[2.85rem] text-white tracking-[0.005em] leading-[1.18] text-balance">
              Marcas memoráveis começam com uma{' '}
              <span className="bg-gradient-to-r from-[#f3df89] via-[#e6ca65] to-[#d4af37] bg-clip-text text-transparent">
                presença extraordinária.
              </span>
            </h1>

            <p className="font-italiana text-[1.25rem] sm:text-[1.4rem] text-zinc-100/90 leading-[1.48] tracking-[0.02em] max-w-xl">
              Identidade, design e experiências digitais desenvolvidas para valorizar o seu negócio.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenDemoModal}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-[#f3df89] via-[#d4af37] to-[#ba9324] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Quero uma demonstração gratuita</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#solucoes"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-semibold text-zinc-200 bg-zinc-900/90 border border-zinc-700/80 hover:bg-zinc-800 hover:text-white transition-all whitespace-nowrap text-center"
              >
                Conhecer as soluções
              </a>
            </div>

            {/* Secondary CTA link */}
            <div className="pt-1">
              <button
                onClick={onOpenCallModal}
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-[#d4af37] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Precisa de automação ou projeto específico? <strong className="underline underline-offset-2 font-semibold">Agendar uma conversa</strong></span>
              </button>
            </div>

            {/* Trust points - clean unboxed typography */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Google Maps Estruturado</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Vitrines com Modelos Virtuais</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>WhatsApp sem Enrolação</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 16:9 Dynamic Video Playlist Area */}
          <div className="lg:col-span-6">
            <HeroVideoPlayer />
          </div>

        </div>

      </div>
    </section>
  );
};
