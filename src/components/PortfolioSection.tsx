import React, { useState } from 'react';
import { Eye, ArrowRight, ImageOff } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/content';
import { ProjectShowcaseModal } from './ProjectShowcaseModal';

interface PortfolioSectionProps {
  onOpenDemoModal: (demoTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenDemoModal }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [failedCardImages, setFailedCardImages] = useState<Record<string, boolean>>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="projetos" className="py-20 md:py-28 bg-[#090a0c] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="font-pinyon font-normal text-2xl sm:text-[1.75rem] text-[#e6ca65] tracking-[0.02em] leading-none">
            Portfólio &amp; Demonstrações
          </p>
          <h2 className="font-marcellus font-normal text-3xl sm:text-4xl md:text-[42px] text-white tracking-[-0.015em] leading-[1.18] text-balance">
            Projetos que transformam ideias em experiências digitais
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Conheça nossos <strong>projetos demonstrativos</strong> criados para ilustrar como a tecnologia e o design da Notarion se adaptam a negócios reais.
          </p>
        </div>

        {/* Refined Editorial Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {DEMO_PROJECTS.map((project, index) => {
            const hasFailed = Boolean(failedCardImages[project.id]);
            const mediaCount = project.media?.length ?? 1;

            return (
              <article
                key={project.id}
                onMouseMove={handleMouseMove}
                className="notarion-portfolio-card group flex flex-col justify-between bg-[#0d0e12] border border-white/10 transition-colors duration-300 relative"
              >
                <div className="notarion-portfolio-spotlight" aria-hidden="true" />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Prominent Editorial Media Frame (clickable to open Showcase) */}
                  <button
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    aria-label={`Explorar apresentação completa de ${project.title}`}
                    className="relative aspect-[16/11] w-full overflow-hidden bg-[#060709] text-left block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                  >
                    {hasFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#14161c] to-[#090a0d]">
                        <ImageOff className="w-6 h-6 text-[#d4af37]/70 mb-2" />
                        <span className="font-marcellus text-lg text-white">{project.title}</span>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedCardImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="notarion-portfolio-img w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-black/15 to-transparent opacity-80 pointer-events-none" />
                  </button>

                  {/* Minimalist Editorial Text */}
                  <div className="px-6 pt-5 pb-6 space-y-2.5 flex-1">
                    <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.08em]">
                      <span className="text-[#e6ca65]">
                        {project.segment} · {project.tag}
                      </span>
                      {mediaCount > 1 && (
                        <span className="font-mono tabular-nums text-zinc-400 shrink-0">
                          {String(mediaCount).padStart(2, '0')} mídias
                        </span>
                      )}
                    </div>

                    <h3 className="font-marcellus font-normal text-xl sm:text-[22px] text-white group-hover:text-[#f3df89] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Preserved Action Bar */}
                <div className="relative z-10 px-6 py-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    className="min-h-[40px] text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Explorar detalhes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenDemoModal(project.title)}
                    className="min-h-[40px] text-xs font-semibold text-[#d4af37] hover:text-[#f3df89] inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                  >
                    <span>Quero parecido</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Honesty note */}
        <div className="mt-12 text-center text-xs text-zinc-400">
          Nota de transparência: Todos os modelos acima são <em>projetos demonstrativos autorais</em> desenvolvidos pela Notarion Brand para evidenciar layout, usabilidade e funcionalidade.
        </div>
      </div>

      {/* Immersive Project Showcase */}
      <ProjectShowcaseModal
        projects={DEMO_PROJECTS}
        activeProjectIndex={activeProjectIndex}
        onSelectProjectIndex={setActiveProjectIndex}
        onClose={() => setActiveProjectIndex(null)}
        onRequestSimilar={(title) => {
          setActiveProjectIndex(null);
          onOpenDemoModal(title);
        }}
      />
    </section>
  );
};
