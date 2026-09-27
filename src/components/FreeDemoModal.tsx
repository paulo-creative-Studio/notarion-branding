import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NotarionBrandIcon } from './NotarionLogo';

interface FreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSegment?: string;
  initialProject?: string;
}

export const FreeDemoModal: React.FC<FreeDemoModalProps> = ({
  isOpen,
  onClose,
  initialSegment,
  initialProject
}) => {
  const [businessName, setBusinessName] = useState('');
  const [segment, setSegment] = useState(initialSegment || 'Bares & Restaurantes');
  const [city, setCity] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [hasGoogleMaps, setHasGoogleMaps] = useState('sim');
  const [hasInstagram, setHasInstagram] = useState('sim');
  const [mainGoal, setMainGoal] = useState('Apresentação profissional e atrair clientes locais');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = encodeURIComponent(
      `Olá! Vim pelo site da Notarion Brand e solicitei uma Demonstração Gratuita:\n\n` +
      `🏢 *Empresa:* ${businessName}\n` +
      `📍 *Cidade:* ${city}\n` +
      `🏷️ *Segmento:* ${segment}\n` +
      `🗺️ *Possui Google Maps:* ${hasGoogleMaps}\n` +
      `📸 *Possui Instagram:* ${hasInstagram}\n` +
      `🎯 *Foco:* ${mainGoal}\n` +
      `📱 *WhatsApp:* ${whatsapp}` +
      (initialProject ? `\n📌 *Referência:* ${initialProject}` : '')
    );

    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
                <NotarionBrandIcon className="w-4 h-4" glow />
                Demonstração Gratuita sem compromisso
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Veja como a presença digital da sua empresa pode ficar antes de contratar
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Conheça uma proposta visual preparada para o seu negócio e veja, na prática, como seus clientes poderiam encontrar informações, produtos, serviços e formas de contato em um único lugar.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Nome da sua Empresa *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex: Bar do Alemão, Boutique La Moda..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Segmento do Negócio
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                >
                  <option value="Bares & Restaurantes">Bares & Restaurantes</option>
                  <option value="Lojas de Roupas & Calçados">Lojas de Roupas & Calçados</option>
                  <option value="Mercadinho & Comércio Local">Mercadinho & Comércio Local</option>
                  <option value="Profissional Autônomo / Técnico">Profissional Autônomo / Técnico</option>
                  <option value="Serviços Gerais & Outro">Serviços Gerais & Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Cidade / Região *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Curitiba - PR"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Já possui perfil no Google Maps?
                </label>
                <select
                  value={hasGoogleMaps}
                  onChange={(e) => setHasGoogleMaps(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                >
                  <option value="sim">Sim, já tenho</option>
                  <option value="nao">Não tenho ainda</option>
                  <option value="precisa-atualizar">Tenho, mas está desatualizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Tem Instagram ativo?
                </label>
                <select
                  value={hasInstagram}
                  onChange={(e) => setHasInstagram(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                >
                  <option value="sim">Sim, ativo</option>
                  <option value="pouco-ativo">Tenho, mas posto pouco</option>
                  <option value="nao">Não tenho</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Seu WhatsApp para envio da demonstração *
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(DDD) 99999-9999"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#f3df89] via-[#d4af37] to-[#ba9324] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_2px_15px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
              >
                <span>Solicitar Demonstração Gratuita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Não cobramos nada para gerar a prévia inicial.</span>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Demonstração Solicitada!
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
              Nossa equipe está montando a prévia para <strong>{businessName}</strong> e entrará em contato via WhatsApp para apresentar o visual.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
