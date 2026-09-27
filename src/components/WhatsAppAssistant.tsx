import React, { useState } from 'react';
import { MessageSquare, X, Send, ArrowRight, Sparkles, Building2, MapPin, Globe, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NotarionBrandIcon } from './NotarionLogo';

export const WhatsAppAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  
  // Guided triage state
  const [businessType, setBusinessType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [currentPresence, setCurrentPresence] = useState<string[]>([]);
  const [mainGoal, setMainGoal] = useState('');

  const handlePresenceToggle = (item: string) => {
    if (currentPresence.includes(item)) {
      setCurrentPresence(currentPresence.filter(i => i !== item));
    } else {
      setCurrentPresence([...currentPresence, item]);
    }
  };

  const handleFinishTriage = () => {
    const formattedPresence = currentPresence.length > 0 ? currentPresence.join(', ') : 'Nenhum canal ativo';
    const message = encodeURIComponent(
      `Olá! Vim pelo site da Notarion Brand através da Atendente Virtual:\n\n` +
      `🏢 *Empresa:* ${companyName || 'Não informado'}\n` +
      `🏷️ *Tipo de Negócio:* ${businessType || 'Geral'}\n` +
      `📍 *Cidade/Região:* ${city || 'Não informado'}\n` +
      `🌐 *Canais atuais:* ${formattedPresence}\n` +
      `🎯 *Principal necessidade:* ${mainGoal || 'Conhecer as soluções'}\n\n` +
      `Gostaria de falar com o atendimento humano para receber a proposta.`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(COMPANY_INFO.defaultWhatsappMessage);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Pop-up assistant window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-40px)] sm:w-96 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black border border-[#d4af37]/40 p-1 flex items-center justify-center shadow-md">
                <NotarionBrandIcon className="w-full h-full" glow />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Pré-Atendimento Notarion
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[10px] text-zinc-400">
                  Triagem rápida para direcionamento
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Fechar assistente"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Guided Steps */}
          <div className="p-4 space-y-4 text-xs max-h-[360px] overflow-y-auto">
            
            {/* Step 1: Tipo de Negócio */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 space-y-1">
                  <p className="font-semibold text-white">Olá! Seja bem-vindo à Notarion Brand.</p>
                  <p className="text-[11px] text-zinc-400">Qual é o segmento principal da sua empresa?</p>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    'Bar / Restaurante / Cafeteria',
                    'Loja de Roupas / Moda / Calçados',
                    'Mercadinho / Comércio do Bairro',
                    'Profissional Liberal / Técnico',
                    'Outro Negócio Local'
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setBusinessType(type);
                        setStep(2);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/60 text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>{type}</span>
                      <ArrowRight className="w-3 h-3 text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Nome e Cidade */}
            {step === 2 && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <p className="text-[11px] text-zinc-400">Excelente! Como se chama sua empresa e onde ela fica?</p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nome da sua empresa..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cidade e Estado (Ex: Campinas - SP)..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setStep(1)}
                    className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 text-[11px]"
                  >
                    Voltar
                  </button>
                  <button
                    disabled={!companyName}
                    onClick={() => setStep(3)}
                    className="flex-1 py-2 rounded-lg bg-[#d4af37] text-black font-bold disabled:opacity-40 text-xs text-center"
                  >
                    Avançar
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Presença Atual */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <p className="text-[11px] text-zinc-400">Quais canais a sua empresa já possui hoje?</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['Site Próprio', 'Google Maps', 'Instagram', 'WhatsApp Business'].map((channel) => {
                    const isSelected = currentPresence.includes(channel);
                    return (
                      <button
                        key={channel}
                        onClick={() => handlePresenceToggle(channel)}
                        className={`p-2 rounded-lg text-left text-xs border transition-colors flex items-center justify-between ${
                          isSelected 
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>{channel}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#d4af37]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setStep(2)}
                    className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 text-[11px]"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs text-center"
                  >
                    Próximo Passo
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Principal necessidade & Conectar */}
            {step === 4 && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <p className="text-[11px] text-zinc-400">Qual o seu principal objetivo agora?</p>
                </div>

                <div className="space-y-1.5">
                  {[
                    'Quero uma demonstração visual do meu negócio',
                    'Preciso de cardápio digital ou vitrine',
                    'Organizar ficha no Google Maps e endereço',
                    'Automação e respostas no WhatsApp',
                    'Preços e contratação de pacote'
                  ].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setMainGoal(goal)}
                      className={`w-full text-left p-2 rounded-lg text-xs border transition-colors ${
                        mainGoal === goal
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-white font-medium'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleFinishTriage}
                    className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Conectar com Atendimento Humano</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Quick bypass directly to WhatsApp without bot */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Prefere falar direto?</span>
            <button
              onClick={handleDirectWhatsApp}
              className="text-[#f3df89] hover:text-white font-semibold underline underline-offset-2 transition-colors"
            >
              Pular pré-atendimento
            </button>
          </div>

        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95"
        aria-label="Abrir conversa no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#090a0c] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#090a0c]" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white fill-white" />
        )}
      </button>

    </div>
  );
};
