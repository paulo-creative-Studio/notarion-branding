import React from 'react';
import { RefreshCw, CheckCircle2, Shield, Calendar, Image, PhoneCall } from 'lucide-react';

interface MaintenanceSectionProps {
  onOpenCallModal: () => void;
}

export const MaintenanceSection: React.FC<MaintenanceSectionProps> = ({ onOpenCallModal }) => {
  return (
    <section className="py-16 md:py-24 bg-[#0d0e11] border-y border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-zinc-950 rounded-2xl border border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <RefreshCw className="w-4 h-4 text-[#d4af37]" />
                <span>Gestão da Presença Digital</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Seu projeto pronto como produto único. Ou com gestão contínua opcional.
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Na Notarion Brand, nós entregamos o projeto finalizado e ele é <strong>100% seu</strong>, sem pegadinhas nem mensalidades obrigatórias. Caso sua empresa precise de atualizações frequentes e não queira perder tempo com tarefas digitais, oferecemos um serviço contínuo de suporte e manutenção.
              </p>

              {/* Clarification banner */}
              <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
                <Shield className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>A contratação do plano de gestão mensal é <strong>totalmente opcional</strong>. Você decide se cuida das atualizações ou se deixa com a nossa equipe.</span>
              </div>

              {/* Maintenance benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Atualização frequente de cardápios e novos pratos</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Cadastro de novos produtos e coleções na vitrine</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Divulgação de eventos sazonais e feriados</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Suporte prioritário e pequenas alterações mensais</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950/80 rounded-xl border border-zinc-800 p-6 space-y-4">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Como funciona a manutenção:
              </span>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#d4af37]" />
                  <span>Envie novas fotos ou avisos via WhatsApp</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
                  <Image className="w-4 h-4 text-[#d4af37]" />
                  <span>Ajustamos o layout, preços e formatos na hora</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Seu cliente sempre encontra informações 100% corretas</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenCallModal}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-zinc-200 bg-zinc-900 border border-zinc-700 hover:text-white hover:border-[#d4af37] transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Tirar dúvidas sobre a gestão contínua</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
