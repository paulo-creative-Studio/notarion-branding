import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin, MessageSquare, Clock, Star, PhoneCall, Check } from 'lucide-react';
import { NotarionBrandIcon } from './NotarionLogo';

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenCallModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal, onOpenCallModal }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'gastronomia' | 'moda' | 'servicos'>('gastronomia');

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] text-balance">
              Seu negócio merece uma <span className="gold-gradient-text">presença digital</span> à altura da sua marca.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
              Criamos sites, vitrines digitais, cardápios, soluções para Google, WhatsApp e automações para negócios locais que querem ser encontrados, transmitir profissionalismo e facilitar o contato com seus clientes.
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

          {/* Right Column: Multi-device visual presentation */}
          <div className="lg:col-span-6">
            <div className="relative">
              
              {/* Device Frame Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800/60 to-zinc-900/90 p-2 sm:p-3 border border-zinc-700/60 shadow-2xl">
                
                {/* Visual Header with Real Image */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img
                    src="/src/assets/images/hero_digital_presence_mockup_1790452613859.jpg"
                    alt="Demonstração da experiência digital Notarion Brand em smartphone e desktop"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Bar inside mockup */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono tracking-tight text-white border border-white/10">
                      notarion.com.br/empresa
                    </span>
                    <span className="bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3df89] text-[11px] px-2 py-0.5 rounded font-semibold">
                      Ao Vivo
                    </span>
                  </div>

                  {/* Overlaid business quick card inside preview */}
                  <div className="absolute bottom-3 left-3 right-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 rounded-lg p-3 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold tracking-tight text-white">
                            {activePreviewTab === 'gastronomia' && 'Osteria & Bar San Paolo'}
                            {activePreviewTab === 'moda' && 'Lumière Moda & Confecção'}
                            {activePreviewTab === 'servicos' && 'TechAuto Mecânica & Diagnóstico'}
                          </h4>
                          <span className="flex items-center text-[10px] text-amber-400 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" /> 4.9 (Google)
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-300 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#d4af37]" />
                          <span>Rua dos Pinheiros, 450 · Centro</span>
                          <span className="text-emerald-400 font-medium">· Aberto agora</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex text-[11px] text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                          Rotas Waze / Maps
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black bg-[#d4af37] px-2.5 py-1 rounded">
                          <MessageSquare className="w-3 h-3" /> Pedir WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Scenario Switcher underneath */}
                <div className="mt-3 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 px-1">
                    <span className="font-semibold text-zinc-300">Simule seu tipo de negócio:</span>
                    <span className="text-[11px] text-zinc-400">Clique para alternar o exemplo</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActivePreviewTab('gastronomia')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                        activePreviewTab === 'gastronomia'
                          ? 'bg-zinc-800 text-[#f3df89] border border-[#d4af37]/40 shadow-sm'
                          : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
                      }`}
                    >
                      <span className="block font-bold">1. Gastronomia</span>
                      <span className="text-[10px] text-zinc-300">Cardápio & QR Code</span>
                    </button>

                    <button
                      onClick={() => setActivePreviewTab('moda')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                        activePreviewTab === 'moda'
                          ? 'bg-zinc-800 text-[#f3df89] border border-[#d4af37]/40 shadow-sm'
                          : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
                      }`}
                    >
                      <span className="block font-bold">2. Lojas & Roupas</span>
                      <span className="text-[10px] text-zinc-300">Modelos Virtuais</span>
                    </button>

                    <button
                      onClick={() => setActivePreviewTab('servicos')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                        activePreviewTab === 'servicos'
                          ? 'bg-zinc-800 text-[#f3df89] border border-[#d4af37]/40 shadow-sm'
                          : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white'
                      }`}
                    >
                      <span className="block font-bold">3. Especialistas</span>
                      <span className="text-[10px] text-zinc-300">Portfólio & Orçamento</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Float badge indicator */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Pronto para uso em celulares e computadores
                </span>
                <button
                  onClick={onOpenDemoModal}
                  className="text-zinc-300 hover:text-[#d4af37] underline underline-offset-2 transition-colors font-medium"
                >
                  Solicitar prévia da minha empresa &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
