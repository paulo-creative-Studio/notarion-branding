import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NotarionBrandIcon } from './NotarionLogo';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onOpenCallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal, onOpenCallModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090b]/95 backdrop-blur-md border-b border-zinc-800 shadow-xl">
      {/* LINHA 1 SUPERIOR: Logo Notarion Brand à esquerda + Botão Grande Dourado à direita */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Logo NOTARION BRAND à esquerda com o favicon/emblema oficial */}
        <a 
          href="#" 
          className="group flex items-center gap-1.5 sm:gap-3 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg min-w-0"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-b from-[#1c1d22] to-[#0f1013] border border-[#d4af37]/45 p-1 sm:p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] sm:shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:border-[#d4af37]/80 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all shrink-0">
            <NotarionBrandIcon className="w-full h-full" glow />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
              <span className="font-display font-extrabold text-xs sm:text-lg lg:text-xl tracking-wider text-white group-hover:text-[#f3df89] transition-colors truncate">
                NOTARION
              </span>
              <span className="font-display font-semibold text-[9px] sm:text-xs lg:text-sm tracking-widest text-[#d4af37]">
                BRAND
              </span>
            </div>
            <span className="text-[7.5px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-zinc-400 font-medium mt-0.5 sm:mt-1 truncate">
              Soluções Digitais
            </span>
          </div>
        </a>

        {/* Lado direito do topo: Botão Dourado + Botão Hambúrguer móvel com folga lateral e microinteração deslizante */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 pr-1 sm:pr-0">
          <button
            onClick={onOpenDemoModal}
            className="group relative inline-flex items-center gap-1 sm:gap-2.5 px-2 py-1.5 sm:px-6 sm:py-3 rounded-md sm:rounded-xl text-[10px] sm:text-sm font-bold text-black bg-gradient-to-r from-[#f3df89] via-[#d4af37] to-[#ba9324] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(212,175,55,0.25)] sm:shadow-[0_2px_18px_rgba(212,175,55,0.35)] whitespace-nowrap cursor-pointer shrink-0"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-black shrink-0" />
            <span className="inline sm:hidden">Demonstração</span>
            <span className="hidden sm:inline">Quero uma demonstração gratuita</span>
            <ArrowUpRight className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </button>

          {/* Gatilho do menu mobile em telas pequenas com folga e efeito de deslizamento para a esquerda ao aproximar o mouse ou toque */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:text-white md:hidden focus:outline-none shrink-0 transition-transform duration-200 ease-out hover:-translate-x-1.5 active:-translate-x-2 shadow-sm"
            aria-label="Abrir Menu de Navegação"
            title="Menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3df89]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>

      </div>

      {/* LINHA 2 A BAIXO: Menus de navegação + Agendar Conversa (delimitada e não se mistura ao corpo) */}
      <div className="hidden md:block w-full bg-[#0d0e12]/95 border-t border-zinc-800/90 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-8 text-xs lg:text-sm font-semibold tracking-wide uppercase text-zinc-300">
            <a 
              href="#solucoes" 
              className="py-1 hover:text-[#f3df89] transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span>Soluções</span>
            </a>
            <a 
              href="#segmentos" 
              className="py-1 hover:text-[#f3df89] transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span>Segmentos</span>
            </a>
            <a 
              href="#pacotes" 
              className="py-1 hover:text-[#f3df89] transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span>Pacotes</span>
            </a>
            <a 
              href="#projetos" 
              className="py-1 hover:text-[#f3df89] transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span>Demonstrações</span>
            </a>
            <a 
              href="#como-funciona" 
              className="py-1 hover:text-[#f3df89] transition-colors duration-150 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span>Como Funciona</span>
            </a>
          </nav>

          {/* Agendar Conversa na linha de baixo à direita */}
          <button
            onClick={onOpenCallModal}
            className="text-xs font-semibold text-zinc-300 hover:text-[#f3df89] px-3.5 py-1.5 rounded-lg border border-zinc-700/80 hover:border-[#d4af37]/50 bg-zinc-900/80 transition-all whitespace-nowrap cursor-pointer"
          >
            Agendar Conversa
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d10] border-t border-zinc-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold tracking-wide uppercase text-zinc-300">
            <a 
              href="#solucoes" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>Soluções</span>
            </a>
            <a 
              href="#segmentos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>Segmentos</span>
            </a>
            <a 
              href="#pacotes" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>Pacotes</span>
            </a>
            <a 
              href="#projetos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>Demonstrações</span>
            </a>
            <a 
              href="#como-funciona" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>Como Funciona</span>
            </a>
          </nav>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallModal();
              }}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700 hover:text-white text-center"
            >
              Agendar Conversa
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
