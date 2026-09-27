import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, FileCheck, Layers, Send } from 'lucide-react';
import { PackageTier } from '../types';
import { COMPANY_INFO } from '../data/content';

interface PackageModalProps {
  pkg: PackageTier | null;
  onClose: () => void;
  onOpenCallModal: () => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onOpenCallModal }) => {
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [step, setStep] = useState<'details' | 'onboarding'>('details');

  if (!pkg) return null;

  const handleStartContractFlow = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Olá! Tenho interesse no pacote *${pkg.title}* da Notarion Brand.\n\n` +
      `🏢 *Empresa:* ${businessName}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `📦 *Pacote Escolhido:* ${pkg.title} (${pkg.priceTag})\n\n` +
      `Gostaria de receber a proposta detalhada e o formulário de onboarding inicial.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            Detalhamento do Pacote
          </span>
          <h3 className="text-2xl font-bold text-white">
            {pkg.title}
          </h3>
          <p className="text-xs text-zinc-400">
            {pkg.subtitle}
          </p>
        </div>

        {/* Price & Term */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#f3df89] block">
              {pkg.priceTag}
            </span>
            <span className="text-xs text-zinc-400">
              {pkg.priceNote}
            </span>
          </div>
          <span className="text-xs text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded">
            Projeto Exclusivo
          </span>
        </div>

        {/* Features breakdown */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Escopo de entrega previsto:
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {pkg.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding Roadmap visual */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Fluxo de início do projeto:
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-[#d4af37] font-bold block">1. Proposta</span>
              <span className="text-zinc-400">Alinhamento</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-[#d4af37] font-bold block">2. Briefing</span>
              <span className="text-zinc-400">Coleta dados</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-[#d4af37] font-bold block">3. Criação</span>
              <span className="text-zinc-400">Construção</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">4. Entrega</span>
              <span className="text-zinc-400">Publicação</span>
            </div>
          </div>
        </div>

        {/* Quick form for direct proposal */}
        <form onSubmit={handleStartContractFlow} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Nome da Empresa *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex: Minha Empresa"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                WhatsApp com DDD *
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(DDD) 99999-9999"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-colors flex items-center justify-center gap-2"
            >
              <span>Solicitar Proposta do Pacote</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCallModal();
              }}
              className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-700 hover:text-white transition-colors"
            >
              Agendar Conversa Antes
            </button>
          </div>
        </form>

        {pkg.disclaimer && (
          <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 text-center leading-snug">
            {pkg.disclaimer}
          </div>
        )}

        <div className="text-[11px] text-zinc-400 text-center">
          Sem cobranças automáticas. O pagamento só ocorre após a aprovação formal da proposta e do cronograma.
        </div>

      </div>
    </div>
  );
};
