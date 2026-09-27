import React from 'react';
import { 
  Globe, 
  UtensilsCrossed, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  CalendarDays, 
  MessageSquare, 
  Cpu,
  ArrowRight,
  Check
} from 'lucide-react';
import { SOLUTIONS_LIST } from '../data/content';

interface ServicesSectionProps {
  onOpenDemoModal: (serviceId?: string) => void;
  onOpenCallModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenDemoModal, onOpenCallModal }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'presenca-digital': return <Globe className="w-5 h-5 text-[#d4af37]" />;
      case 'vitrine-digital': return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
      case 'cardapio-catalogo': return <UtensilsCrossed className="w-5 h-5 text-[#d4af37]" />;
      case 'portfolio-servicos': return <Briefcase className="w-5 h-5 text-[#d4af37]" />;
      case 'google-maps': return <MapPin className="w-5 h-5 text-[#d4af37]" />;
      case 'eventos-promocoes': return <CalendarDays className="w-5 h-5 text-[#d4af37]" />;
      case 'whatsapp-integrado': return <MessageSquare className="w-5 h-5 text-[#d4af37]" />;
      case 'automacoes-digitais': return <Cpu className="w-5 h-5 text-[#d4af37]" />;
      default: return <Globe className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-[#090a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
              Soluções Práticas
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
              O que a Notarion desenvolve para o seu negócio
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Ferramentas objetivas que eliminam atritos entre o seu cliente e a compra. Tudo integrado ao celular e fácil de manter.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onOpenDemoModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-200 bg-zinc-900 border border-zinc-700 hover:border-[#d4af37] hover:text-[#f3df89] transition-all"
            >
              <span>Solicitar demonstração completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid of 8 Practical Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS_LIST.map((sol) => (
            <div
              key={sol.id}
              className={`rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#d4af37]/40 transition-all duration-200 flex flex-col justify-between group ${
                sol.id === 'vitrine-digital' ? 'md:col-span-2 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border-[#d4af37]/30' : ''
              }`}
            >
              <div className="space-y-4">
                
                {/* Header of card */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
                    {getIcon(sol.id)}
                  </div>
                  
                  {/* Clean unboxed category label */}
                  <span className="text-xs font-medium text-zinc-400">
                    {sol.category}
                  </span>
                </div>

                {/* Title & Badge */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f3df89] transition-colors leading-snug">
                    {sol.title}
                  </h3>
                  {sol.badgeText && (
                    <span className="text-[11px] font-semibold text-[#d4af37] block mt-1">
                      {sol.badgeText}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {sol.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-2 space-y-2">
                  {sol.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer / CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 line-clamp-1 max-w-[180px]">
                  Ideal: {sol.idealFor.split('.')[0]}
                </span>
                <button
                  onClick={() => sol.id === 'automacoes-digitais' ? onOpenCallModal() : onOpenDemoModal(sol.id)}
                  className="text-xs font-semibold text-[#d4af37] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  <span>Ver prévia</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
