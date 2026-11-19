import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ImageOff,
} from 'lucide-react';
import { DemoProject, ProjectMediaItem } from '../types';

interface ProjectShowcaseModalProps {
  projects: DemoProject[];
  activeProjectIndex: number | null;
  onSelectProjectIndex: (index: number) => void;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  projects,
  activeProjectIndex,
  onSelectProjectIndex,
  onClose,
  onRequestSimilar,
}) => {
  const isOpen = activeProjectIndex !== null && Boolean(projects[activeProjectIndex]);
  const project = isOpen ? projects[activeProjectIndex] : null;

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [failedMediaIds, setFailedMediaIds] = useState<Record<string, boolean>>({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const mediaItems: ProjectMediaItem[] = React.useMemo(() => {
    if (!project) return [];
    if (project.media && project.media.length > 0) {
      return project.media;
    }
    return [
      {
        id: `${project.id}-cover`,
        type: 'image',
        src: project.image,
        alt: project.imageAlt || project.title,
        kind: 'Visão Geral',
      },
    ];
  }, [project]);

  const hasMultipleMedia = mediaItems.length > 1;
  const safeMediaIndex = Math.min(activeMediaIndex, Math.max(0, mediaItems.length - 1));
  const currentMedia = mediaItems[safeMediaIndex] || null;

  // Reset media index and video playback whenever project changes
  useEffect(() => {
    setActiveMediaIndex(0);
    setIsVideoPlaying(false);
    setIsVideoMuted(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [activeProjectIndex]);

  // Pause video when changing slides
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [safeMediaIndex]);

  // Manage body scroll lock and focus lifecycle
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      if (closeButtonRef.current && closeButtonRef.current.offsetParent !== null) {
        closeButtonRef.current.focus();
      } else if (mobileCloseButtonRef.current && mobileCloseButtonRef.current.offsetParent !== null) {
        mobileCloseButtonRef.current.focus();
      } else {
        dialogRef.current?.focus();
      }
    }, 10);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const goToNextMedia = useCallback(() => {
    if (!hasMultipleMedia) return;
    setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  }, [hasMultipleMedia, mediaItems.length]);

  const goToPrevMedia = useCallback(() => {
    if (!hasMultipleMedia) return;
    setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  }, [hasMultipleMedia, mediaItems.length]);

  const goToNextProject = useCallback(() => {
    if (activeProjectIndex === null || projects.length <= 1) return;
    onSelectProjectIndex((activeProjectIndex + 1) % projects.length);
  }, [activeProjectIndex, onSelectProjectIndex, projects.length]);

  const goToPrevProject = useCallback(() => {
    if (activeProjectIndex === null || projects.length <= 1) return;
    onSelectProjectIndex((activeProjectIndex - 1 + projects.length) % projects.length);
  }, [activeProjectIndex, onSelectProjectIndex, projects.length]);

  // Keyboard navigation: Escape to close, Left/Right arrows for gallery, Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight' && hasMultipleMedia) {
        event.preventDefault();
        goToNextMedia();
        return;
      }

      if (event.key === 'ArrowLeft' && hasMultipleMedia) {
        event.preventDefault();
        goToPrevMedia();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextMedia, goToPrevMedia, hasMultipleMedia, isOpen, onClose]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleMedia || event.touches.length !== 1) return;
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleMedia || !touchStartRef.current || event.changedTouches.length === 0) return;
    const deltaX = event.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNextMedia();
      } else {
        goToPrevMedia();
      }
    }
  };

  const toggleVideoPlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false));
    } else {
      videoEl.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const nextMuted = !isVideoMuted;
    videoEl.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const markMediaError = (mediaId: string) => {
    setFailedMediaIds((prev) => ({ ...prev, [mediaId]: true }));
  };

  if (!isOpen || !project || !currentMedia || activeProjectIndex === null) {
    return null;
  }

  const formatIndex = (num: number) => String(num + 1).padStart(2, '0');
  const formatTotal = (num: number) => String(num).padStart(2, '0');
  const summaryText = project.editorialSummary || project.description;
  const conceptText = project.concept || project.highlightTakeaway;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 lg:p-8 bg-black/88 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="showcase-project-title"
        className="notarion-showcase-panel w-full sm:w-[92vw] lg:w-[88vw] max-w-[1320px] max-h-[94vh] lg:h-[min(86vh,780px)] bg-[#0b0c0f] border border-[#d4af37]/25 shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative focus:outline-none"
      >
        {/* Top Mobile Bar (visible only below lg so close button is always unobstructed) */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-[#d4af37]/15 bg-[#090a0c] sticky top-0 z-20 gap-3">
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#e6ca65] leading-snug">
            {project.segment} · {project.tag}
          </span>
          <button
            ref={mobileCloseButtonRef}
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37]/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
            aria-label="Fechar apresentação do projeto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LEFT / TOP: 65% Primary Media Gallery */}
        <div className="w-full lg:w-[65%] lg:h-full bg-[#060709] flex flex-col shrink-0 lg:shrink lg:min-h-0">
          {/* Featured Media Stage */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-0 flex items-center justify-center overflow-hidden bg-[#060709]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {failedMediaIds[currentMedia.id] ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-8 py-12 text-center bg-gradient-to-br from-[#12141a] via-[#090a0d] to-[#050608] border-b border-white/5">
                <ImageOff className="w-8 h-8 text-[#d4af37]/70 mb-3" />
                <p className="font-marcellus text-xl text-white mb-1">{project.title}</p>
                <p className="text-xs text-zinc-400 max-w-md">{currentMedia.alt}</p>
              </div>
            ) : currentMedia.type === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={currentMedia.src}
                  poster={currentMedia.poster || project.image}
                  muted={isVideoMuted}
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                  onError={() => markMediaError(currentMedia.id)}
                  onClick={toggleVideoPlay}
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Video Playback & Mute Controls (never autoplays with audio) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={toggleVideoPlay}
                      className="min-h-[44px] px-4 inline-flex items-center gap-2 bg-black/80 hover:bg-black border border-[#d4af37]/40 text-xs text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                      aria-label={isVideoPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                    >
                      {isVideoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-[#e6ca65]" />
                          <span className="whitespace-nowrap">Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#e6ca65]" />
                          <span className="whitespace-nowrap">Reproduzir vídeo</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-black/80 hover:bg-black border border-white/15 text-zinc-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                      aria-label={isVideoMuted ? 'Ativar áudio do vídeo' : 'Silenciar vídeo'}
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#e6ca65]" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <img
                key={currentMedia.id}
                src={currentMedia.src}
                alt={currentMedia.alt}
                referrerPolicy="no-referrer"
                onError={() => markMediaError(currentMedia.id)}
                className="notarion-showcase-media w-full h-full object-cover"
              />
            )}

            {/* Subtle top/bottom gradient edges for legibility without obscuring photography */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

            {/* Carousel Controls — rendered ONLY when project has 2+ media items */}
            {hasMultipleMedia && (
              <>
                <button
                  type="button"
                  onClick={goToPrevMedia}
                  aria-label="Mídia anterior"
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-black/70 hover:bg-black border border-white/15 hover:border-[#d4af37]/60 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMedia}
                  aria-label="Próxima mídia"
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-black/70 hover:bg-black border border-white/15 hover:border-[#d4af37]/60 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Media Meta & Caption Footer */}
            {(currentMedia.caption || currentMedia.kind || hasMultipleMedia) && (
              <div className="pointer-events-none absolute bottom-0 inset-x-0 px-4 sm:px-6 py-3.5 flex items-end justify-between gap-4">
                <div className="min-w-0 space-y-0.5">
                  {currentMedia.kind && (
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#e6ca65] block">
                      {currentMedia.kind}
                    </span>
                  )}
                  {currentMedia.caption && (
                    <p className="text-xs sm:text-[13px] text-zinc-200 leading-snug line-clamp-2">
                      {currentMedia.caption}
                    </p>
                  )}
                </div>

                {hasMultipleMedia && (
                  <span className="text-xs font-mono tabular-nums text-zinc-200 shrink-0 tracking-wider">
                    {formatIndex(safeMediaIndex)} / {formatTotal(mediaItems.length)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Clickable Thumbnails Strip — rendered ONLY when project has 2+ media items */}
          {hasMultipleMedia && (
            <div className="border-t border-white/10 bg-[#08090c] px-4 sm:px-6 py-3 flex items-center gap-2.5 overflow-x-auto">
              {mediaItems.map((item, idx) => {
                const isActive = idx === safeMediaIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    aria-label={`Selecionar mídia ${idx + 1}: ${item.kind || item.alt}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative shrink-0 w-20 h-13 overflow-hidden border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89] ${
                      isActive
                        ? 'border-[#d4af37] opacity-100'
                        : 'border-white/10 opacity-55 hover:opacity-90 hover:border-white/30'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
                        <img
                          src={item.poster || project.image}
                          alt={item.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-70"
                        />
                        <Play className="w-4 h-4 text-[#f3df89] absolute" />
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT / BOTTOM: 35% Editorial Information & Navigation */}
        <div className="w-full lg:w-[35%] lg:h-full bg-[#0b0c0f] border-t lg:border-t-0 lg:border-l border-[#d4af37]/15 flex flex-col lg:min-h-0">
          {/* Desktop Top Metadata & Close */}
          <div className="hidden lg:flex items-center justify-between px-7 pt-5 pb-3.5 border-b border-white/10 shrink-0 gap-3">
            <span className="text-[10px] uppercase tracking-[0.11em] text-[#d4af37] leading-snug">
              {project.segment} · {project.tag}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar apresentação do projeto"
              className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center text-zinc-400 hover:text-white border border-transparent hover:border-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Editorial Body */}
          <div className="flex-1 lg:overflow-y-auto px-5 py-5 sm:px-7 space-y-5">
            {/* Title Block */}
            <div className="space-y-2">
              <p className="font-pinyon text-2xl text-[#e6ca65] leading-none">
                Estudo Demonstrativo
              </p>
              <h2
                id="showcase-project-title"
                className="font-marcellus font-normal text-2xl sm:text-[26px] text-white leading-[1.2] text-balance"
              >
                {project.title}
              </h2>
              {project.headline && (
                <p className="font-italiana text-lg sm:text-[20px] text-[#f3df89] leading-[1.35] tracking-wide pt-0.5">
                  {project.headline}
                </p>
              )}
            </div>

            {/* Editorial Objective Description */}
            <div className="space-y-2.5 border-t border-white/10 pt-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 block">
                Visão do Projeto
              </span>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                {summaryText}
              </p>
              {project.bodyParagraphs?.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Concept & Objective */}
            {conceptText && (
              <div className="border border-[#d4af37]/20 bg-[#101216] px-4 py-3.5 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#e6ca65] block">
                  Conceito &amp; Objetivo
                </span>
                <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                  {conceptText}
                </p>
              </div>
            )}

            {/* Implemented / Demonstrated Features */}
            <div className="border-t border-white/10 pt-5 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 block">
                Recursos Demonstrados
              </span>

              {project.detailedItems && project.detailedItems.length > 0 ? (
                <div className="space-y-3">
                  {project.detailedItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <strong className="text-xs font-medium text-white block">
                          {item.title}
                        </strong>
                        <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Anchored Bottom CTA + Project Switcher */}
          <div className="border-t border-[#d4af37]/15 bg-[#090a0d] px-5 py-4 sm:px-7 space-y-3.5 shrink-0">
            <button
              type="button"
              onClick={() => onRequestSimilar(project.title)}
              className="w-full min-h-[44px] px-5 py-3 bg-[#d4af37] hover:bg-[#e6ca65] text-black text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
            >
              <span>Solicitar solução semelhante</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {projects.length > 1 && (
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={goToPrevProject}
                  className="min-h-[44px] px-2.5 inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#e6ca65] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Projeto anterior</span>
                </button>

                <span className="text-[11px] font-mono tabular-nums text-zinc-400 whitespace-nowrap shrink-0">
                  {formatIndex(activeProjectIndex)} / {formatTotal(projects.length)}
                </span>

                <button
                  type="button"
                  onClick={goToNextProject}
                  className="min-h-[44px] px-2.5 inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#e6ca65] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3df89]"
                >
                  <span>Próximo projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
