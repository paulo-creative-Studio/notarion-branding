import React, { useState } from 'react';
import { Sparkles, PhoneCall, Check, ArrowRight, MapPin, MessageSquare, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface ConversionCtaSectionProps {
  onOpenCallModal: () => void;
  onOpenDemoModal: (prefillName?: string) => void;
}

export const ConversionCtaSection: React.FC<ConversionCtaSectionProps> = ({ 
  onOpenCallModal,
  onOpenDemoModal
}) => {
  const [businessName, setBusinessName] = useState('');
  const [segment, setSegment] = useState('Gastronomia & Restaurante');
  const [city, setCity] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mainGoal, setMainGoal] = useState('Site profissional & Google Maps');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format WhatsApp message to send lead directly
    const message = encodeURIComponent(
      `Olá! Vim pelo site da Notarion Brand e solicitei uma Demonstração Gratuita:\n\n` +
      `🏢 *Empresa:* ${businessName || 'Minha Empresa'}\n` +
      `📍 *Cidade:* ${city || 'Não informada'}\n` +
      `🏷️ *Segmento:* ${segment}\n` +
      `🎯 *Principal Objetivo:* ${mainGoal}\n` +
      `📱 *WhatsApp:* ${whatsapp}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <section id="demonstracao" className="py-20 md:py-28 bg-[#090a0c] relative overflow-hidden">
      {/* Glow effect */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#d4af37]/8 blur-[160px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Value */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
              Demonstração Sem Custo
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Quer descobrir como sua empresa poderia ficar?
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              Conte um pouco sobre seu negócio e nossa equipe prepara uma prévia visual personalizada no smartphone. Veja a sua marca com o padrão visual que ela merece antes de fechar qualquer contrato.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Sem compromisso de contratação prévia</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Simulação focada no comportamento mobile do seu cliente</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Atendimento humano e direto pelo WhatsApp</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenCallModal}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#d4af37]" />
                <span>Prefere falar por chamada de vídeo? <strong className="underline font-semibold">Agendar uma conversa</strong></span>
              </button>
            </div>
          </div>

          {/* Right Form & Live Simulation */}
          <div className="lg:col-span-6">
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl relative">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      Solicitar Minha Demonstração
                    </span>
                    <span className="text-[11px] text-zinc-400">Gratuito</span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Nome da sua Empresa ou Negócio *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ex: Cantina Bella Vista, Boutique Donna..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Segmento do Negócio
                      </label>
                      <select
                        value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        <option value="Gastronomia & Restaurante">Bares & Restaurantes</option>
                        <option value="Lojas & Moda (Confecção)">Lojas de Roupas & Moda</option>
                        <option value="Comércio & Mercadinho">Mercadinho & Comércio Local</option>
                        <option value="Profissional Liberal / Técnico">Profissional Liberal / Técnico</option>
                        <option value="Outro Negócio Local">Outro Negócio Local</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Cidade e Estado *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: São Paulo - SP"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Seu WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        O que você mais precisa hoje?
                      </label>
                      <select
                        value={mainGoal}
                        onChange={(e) => setMainGoal(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        <option value="Site profissional & Google Maps">Site profissional & Google</option>
                        <option value="Cardápio digital QR Code">Cardápio digital QR Code</option>
                        <option value="Vitrine de Roupas com Modelos Virtuais">Vitrine com Modelos Virtuais</option>
                        <option value="Automação & Atendimento WhatsApp">Automação no WhatsApp</option>
                        <option value="Portfólio para fechar orçamentos">Portfólio de Serviços</option>
                      </select>
                    </div>
                  </div>

                  {/* Live simulated card preview as user types */}
                  <div className="pt-2">
                    <span className="text-[11px] text-zinc-400 block mb-1">
                      Prévia instantânea do cabeçalho da sua demonstração:
                    </span>
                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded bg-[#d4af37] text-black font-extrabold flex items-center justify-center text-xs">
                            {(businessName || 'Sua Empresa')[0].toUpperCase()}
                          </span>
                          <div>
                            <span className="font-bold text-white block leading-none">
                              {businessName || 'Nome da Sua Empresa'}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              {segment} · {city || 'Sua Cidade'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0 no Google
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#f3df89] via-[#d4af37] to-[#ba9324] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_2px_15px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
                  >
                    <span>Quero Minha Demonstração</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[11px] text-zinc-400 text-center">
                    Ao clicar, nossa equipe receberá seus dados e entrará em contato via WhatsApp com a prévia inicial.
                  </p>
                </form>
              ) : (
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Estamos preparando o canal direto no WhatsApp com os detalhes de <strong>{businessName}</strong> para apresentação da sua demonstração.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-zinc-400 hover:text-white underline"
                    >
                      Enviar outra solicitação
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
