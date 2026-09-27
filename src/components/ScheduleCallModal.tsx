import React, { useState } from 'react';
import { X, Calendar, Clock, Check, ArrowRight, Video } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [topic, setTopic] = useState('Projeto Personalizado / Automações');
  const [notes, setNotes] = useState('');
  const [scheduled, setScheduled] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);

    const message = encodeURIComponent(
      `Olá! Gostaria de confirmar o agendamento de uma conversa com a Notarion Brand:\n\n` +
      `👤 *Nome:* ${name}\n` +
      `🏢 *Empresa:* ${company}\n` +
      `📅 *Data pretendida:* ${preferredDate || 'A combinar'}\n` +
      `⏰ *Horário sugerido:* ${preferredTime}\n` +
      `🎯 *Assunto:* ${topic}\n` +
      `📱 *WhatsApp:* ${whatsapp}` +
      (notes ? `\n📝 *Observações:* ${notes}` : '')
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
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!scheduled ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#d4af37]" />
                Conversa de Diagnóstico (20 min)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Agendar uma Conversa
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ideal para projetos com automações, necessidades específicas ou empresas que querem alinhar detalhes operacionais.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Sua empresa"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Tópico Principal
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                >
                  <option value="Automação & Atendimento">Automação de WhatsApp</option>
                  <option value="Projeto Personalizado">Projeto Personalizado Completo</option>
                  <option value="Vitrines com Modelos Virtuais">Vitrine com Modelos Virtuais</option>
                  <option value="Cardápio & Sistema de Pedidos">Cardápio & Pedidos</option>
                  <option value="Dúvidas Comerciais">Dúvidas Comerciais / Pacotes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Data sugerida
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Melhor período
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                >
                  <option value="Manhã (09:00 - 11:30)">Manhã (09:00 - 11:30)</option>
                  <option value="Início da tarde (13:30 - 15:30)">Início da tarde (13:30 - 15:30)</option>
                  <option value="Fim da tarde (16:00 - 18:00)">Fim da tarde (16:00 - 18:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Conte brevemente o principal desafio (opcional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Queremos organizar nosso cardápio e parar de perder tempo com mensagens repetitivas..."
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Confirmar Agendamento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Conversa Pré-Agendada!
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
              Nossa equipe entrará em contato para confirmar o link de videoconferência ou chamada de áudio no melhor horário para você.
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
