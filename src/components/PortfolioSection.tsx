import React, { useState } from 'react';
import { Eye, ArrowRight, Check, ExternalLink, Sparkles, X } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/content';
import { DemoProject } from '../types';

interface PortfolioSectionProps {
  onOpenDemoModal: (demoTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenDemoModal }) => {
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);

  return (
    <section id="projetos" className="py-20 md:py-28 bg-[#0c0d10] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
            Portfólio & Demonstrações
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projetos que transformam ideias em experiências digitais
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Conheça nossos <strong>projetos demonstrativos</strong> criados para ilustrar como a tecnologia e o design da Notarion se adaptam a negócios reais.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/50 transition-all duration-200 shadow-xl"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Clean unboxed tag */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[11px] font-medium text-zinc-300">
                    {project.tag}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-[#f3df89] block">
                      {project.segment}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-zinc-900 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Explorar detalhes</span>
                </button>

                <button
                  onClick={() => onOpenDemoModal(project.title)}
                  className="text-xs font-bold text-[#d4af37] hover:text-[#f3df89] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Quero parecido</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Honesty note */}
        <div className="mt-12 text-center text-xs text-zinc-400">
          Nota de transparência: Todos os modelos acima são <em>projetos demonstrativos autorais</em> desenvolvidos pela Notarion Brand para evidenciar layout, usabilidade e funcionalidade.
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-zinc-950 border border-zinc-700 max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                {selectedProject.segment} · Projeto Demonstrativo
              </span>
              <h3 className="text-xl font-bold text-white">
                {selectedProject.title}
              </h3>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {selectedProject.headline ? (
              <div className="space-y-3">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {selectedProject.headline}
                </h4>
                {selectedProject.bodyParagraphs?.map((p, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                {selectedProject.highlightTakeaway && (
                  <div className="p-3 rounded-lg bg-zinc-900 border border-[#d4af37]/30 text-xs text-[#f3df89] font-medium leading-relaxed">
                    {selectedProject.highlightTakeaway}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedProject.description}
              </p>
            )}

            {selectedProject.detailedItems ? (
              <div className="space-y-2.5 p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
                <span className="font-semibold text-white block">Recursos & Estrutura:</span>
                <div className="grid grid-cols-1 gap-2.5 text-zinc-300">
                  {selectedProject.detailedItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">{item.title}</strong>
                        <span className="text-zinc-400 text-[11px] leading-snug">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
                <span className="font-semibold text-white block">Funcionalidades demonstradas:</span>
                <div className="grid grid-cols-1 gap-1 text-zinc-300">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenDemoModal(title);
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6ca65] transition-colors text-center"
              >
                Solicitar Demonstração Semelhante
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
