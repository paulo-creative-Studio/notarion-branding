import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { MessageSquare, Instagram, MapPin, Mail, ArrowUp } from 'lucide-react';
import { NotarionBrandIcon } from './NotarionLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-lg font-bold text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#1c1d22] to-[#0f1013] border border-[#d4af37]/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <NotarionBrandIcon className="w-full h-full" glow />
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-wider leading-none">
                  NOTARION <span className="text-[#d4af37]">BRAND</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-medium mt-1">
                  Design · Presença Digital · Tecnologia
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Transformando pequenos e médios negócios locais em experiências digitais profissionais, acessíveis e fáceis de encontrar.
            </p>

            <div className="text-[11px] text-zinc-400 space-y-1">
              <div>Design · Presença Digital · Tecnologia · Automações</div>
              <div>Soluções sob medida para o comércio e serviços do dia a dia.</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Navegação
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">Soluções Digitais</a>
              </li>
              <li>
                <a href="#segmentos" className="hover:text-white transition-colors">Segmentos Atendidos</a>
              </li>
              <li>
                <a href="#pacotes" className="hover:text-white transition-colors">Pacotes & Planos</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-white transition-colors">Projetos Demonstrativos</a>
              </li>
            </ul>
          </div>

          {/* Contact & Official Channels */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Canais & Dados Oficiais
            </span>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Business: <span className="font-semibold text-white">{COMPANY_INFO.whatsappDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a 
                  href={COMPANY_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram: <span className="font-semibold text-white">{COMPANY_INFO.instagram}</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  E-mail: <span className="font-semibold text-white">{COMPANY_INFO.email}</span>
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    Local: <span className="font-semibold text-white">{COMPANY_INFO.location}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Atendemos com reunião presencial na região de <strong>Maringá</strong>, <strong>Paiçandu</strong> e <strong>Doutor Camargo</strong>. Também atendemos a nível Brasil de forma online.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Notarion Brand. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <span>Privacidade & Transparência</span>
            <span aria-hidden="true">·</span>
            <span>Termos de Uso</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
              aria-label="Voltar ao topo"
            >
              <span>Topo</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
