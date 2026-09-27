import React, { useState } from 'react';
import { Utensils, ShoppingBag, Store, Wrench, Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { SEGMENTS_DATA, COMPANY_INFO } from '../data/content';
import { SegmentId } from '../types';

interface SegmentsSectionProps {
  onOpenDemoModal: (segmentId?: string) => void;
}

export const SegmentsSection: React.FC<SegmentsSectionProps> = ({ onOpenDemoModal }) => {
  const [activeSegment, setActiveSegment] = useState<SegmentId>('gastronomia');
  const segment = SEGMENTS_DATA[activeSegment];

  const getSegmentIcon = (id: SegmentId) => {
    switch (id) {
      case 'gastronomia': return <Utensils className="w-4 h-4" />;
      case 'lojas': return <ShoppingBag className="w-4 h-4" />;
      case 'comercio': return <Store className="w-4 h-4" />;
      case 'profissionais': return <Wrench className="w-4 h-4" />;
      case 'personalizado': return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(segment.whatsappMessage);
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <section id="segmentos" className="py-20 md:py-28 bg-[#0c0d10] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Especialização por Nicho
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Uma solução para cada tipo de negócio
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Cada segmento tem rotinas e clientes diferentes. Nossas interfaces são desenhadas respeitando o comportamento real de compra do seu público.
          </p>
        </div>

        {/* Segment Tabs - Clean interactive filter controls */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {(Object.keys(SEGMENTS_DATA) as SegmentId[]).map((segId) => {
            const item = SEGMENTS_DATA[segId];
            const isActive = activeSegment === segId;
            return (
              <button
                key={segId}
                onClick={() => setActiveSegment(segId)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-[0_2px_12px_rgba(212,175,55,0.25)]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {getSegmentIcon(segId)}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Segment Detail Card */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                  {segment.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {segment.tagline}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                  {segment.description}
                </p>
              </div>

              {/* Highlight callout */}
              <div className="p-4 rounded-xl bg-zinc-900/70 border-l-2 border-[#d4af37] text-xs sm:text-sm text-zinc-300">
                <strong className="text-white font-semibold">Diferencial Notarion: </strong>
                {segment.highlightText}
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Recursos inclusos para {segment.title}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {segment.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenDemoModal(segment.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>Solicitar demonstração para {segment.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700 hover:text-white hover:border-zinc-500 transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Conversar sobre este segmento</span>
                </button>
              </div>

            </div>

            {/* Right Visual Presentation */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl relative">
                
                {segment.exampleImage ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={segment.exampleImage}
                      alt={`Exemplo visual de solução para ${segment.title}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#f3df89] block mb-1">
                        {segment.badge}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {segment.mockupTitle}
                      </h4>
                      <p className="text-xs text-zinc-300">
                        {segment.mockupSubtitle}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 aspect-[4/3] flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-[#d4af37]">Projeto Sob Medida</span>
                      <h4 className="text-xl font-bold text-white">{segment.mockupTitle}</h4>
                      <p className="text-xs text-zinc-400">{segment.mockupSubtitle}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                      <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                        <span>Desenvolvimento Exclusivo</span>
                        <span className="text-[#d4af37] font-semibold">100% Personalizado</span>
                      </div>
                      <p>
                        Estruturação focada nas rotinas específicas do seu modelo de atendimento.
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenDemoModal(segment.id)}
                      className="w-full py-2.5 rounded-lg text-xs font-bold text-black bg-[#d4af37] text-center"
                    >
                      Explicar Meu Negócio
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
