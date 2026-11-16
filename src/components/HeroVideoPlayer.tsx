import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import defaultPoster from '../assets/images/hero_digital_presence_mockup_1790452613859.jpg';

interface RawVideoEntry {
  arquivo?: string;
  src?: string;
  video?: string;
  capa?: string;
  poster?: string;
  legenda?: string;
  caption?: string;
}

interface NormalizedVideo {
  src: string;
  poster: string;
  caption: string;
}

const resolveAssetPath = (value?: string): string => {
  if (!value || typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `/videos/${trimmed}`;
};

export const HeroVideoPlayer: React.FC = () => {
  const [videos, setVideos] = useState<NormalizedVideo[]>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [hasFatalError, setHasFatalError] = useState(false);

  // Dual-buffer state for seamless crossfade when playlist has 2+ videos
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [slotIndices, setSlotIndices] = useState<[number, number]>([0, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const slot0Ref = useRef<HTMLVideoElement | null>(null);
  const slot1Ref = useRef<HTMLVideoElement | null>(null);
  const transitioningRef = useRef(false);
  const preloadTimerRef = useRef<number | null>(null);

  const getVideoRef = (slot: 0 | 1) => (slot === 0 ? slot0Ref.current : slot1Ref.current);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/videos/videos.json', { cache: 'no-store', signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error('Manifest unavailable');
        const data: unknown = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid manifest');

        const normalized: NormalizedVideo[] = data
          .map((item: RawVideoEntry) => {
            const rawSrc = item?.arquivo || item?.src || item?.video || '';
            const src = resolveAssetPath(rawSrc);
            if (!src) return null;

            const rawPoster = item?.capa || item?.poster || '';
            const poster = resolveAssetPath(rawPoster) || defaultPoster;
            const caption = typeof (item?.legenda ?? item?.caption) === 'string'
              ? String(item?.legenda ?? item?.caption).trim()
              : '';

            return { src, poster, caption };
          })
          .filter((v): v is NormalizedVideo => v !== null);

        setVideos(normalized);
        if (normalized.length > 1) {
          setSlotIndices([0, 1]);
        }
        setManifestLoaded(true);
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setVideos([]);
        setManifestLoaded(true);
      });

    return () => {
      controller.abort();
      if (preloadTimerRef.current !== null) {
        window.clearTimeout(preloadTimerRef.current);
      }
    };
  }, []);

  // Ensure initial playback starts reliably on the active slot
  useEffect(() => {
    if (!manifestLoaded || videos.length === 0) return;

    const activeEl = getVideoRef(activeSlot);
    if (!activeEl) return;

    activeEl.muted = isMuted;
    if (isPlaying) {
      activeEl.play().catch(() => {
        // Fallback to muted autoplay if unmuted autoplay is blocked by browser
        activeEl.muted = true;
        setIsMuted(true);
        activeEl.play().catch(() => setIsPlaying(false));
      });
    }
  }, [manifestLoaded, videos.length]);

  const advanceToNextVideo = useCallback(() => {
    if (videos.length <= 1 || transitioningRef.current) return;
    transitioningRef.current = true;

    const currentSlot: 0 | 1 = activeSlot;
    const nextSlot: 0 | 1 = currentSlot === 0 ? 1 : 0;
    const nextIndex = (currentIndex + 1) % videos.length;
    const followingIndex = (nextIndex + 1) % videos.length;

    const incomingEl = getVideoRef(nextSlot);
    const outgoingEl = getVideoRef(currentSlot);

    if (incomingEl) {
      incomingEl.currentTime = 0;
      incomingEl.muted = isMuted;
      if (isPlaying) {
        incomingEl.play().catch(() => {
          incomingEl.muted = true;
          setIsMuted(true);
          incomingEl.play().catch(() => {});
        });
      }
    }

    setActiveSlot(nextSlot);
    setCurrentIndex(nextIndex);

    if (preloadTimerRef.current !== null) {
      window.clearTimeout(preloadTimerRef.current);
    }

    // After the 700ms crossfade finishes, pause outgoing slot and preload the next video in background
    preloadTimerRef.current = window.setTimeout(() => {
      if (outgoingEl) {
        outgoingEl.pause();
        outgoingEl.currentTime = 0;
      }

      setSlotIndices((prev) => {
        const updated: [number, number] = [prev[0], prev[1]];
        updated[currentSlot] = followingIndex;
        return updated;
      });

      transitioningRef.current = false;
    }, 750);
  }, [activeSlot, currentIndex, videos.length, isMuted, isPlaying]);

  const handleTimeUpdate = (slot: 0 | 1) => {
    if (videos.length <= 1 || slot !== activeSlot || transitioningRef.current) return;
    const el = getVideoRef(slot);
    if (!el || !Number.isFinite(el.duration) || el.duration <= 1.5) return;

    if (el.duration - el.currentTime <= 0.65) {
      advanceToNextVideo();
    }
  };

  const handleEnded = (slot: 0 | 1) => {
    if (videos.length <= 1 || slot !== activeSlot) return;
    advanceToNextVideo();
  };

  const handleVideoError = (slot: 0 | 1) => {
    if (videos.length <= 1) {
      setHasFatalError(true);
      return;
    }
    if (slot === activeSlot) {
      advanceToNextVideo();
    }
  };

  const togglePlayPause = () => {
    const activeEl = getVideoRef(activeSlot);
    if (!activeEl) return;

    if (activeEl.paused) {
      activeEl.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      activeEl.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const activeEl = getVideoRef(activeSlot);
    if (activeEl) {
      activeEl.muted = nextMuted;
    }
  };

  // Reserved clean placeholder space if videos.json is missing, empty, or video cannot load
  if (!manifestLoaded || videos.length === 0 || hasFatalError) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-black border border-[#d4af37]/30 shadow-[0_24px_70px_rgba(0,0,0,0.75)] aspect-video w-full">
        <img
          src={defaultPoster}
          alt="Espaço reservado para apresentação em vídeo Notarion Brand"
          className="w-full h-full object-cover opacity-85"
        />
      </div>
    );
  }

  // Single video mode: seamless native loop
  if (videos.length === 1) {
    const singleVideo = videos[0];
    return (
      <div
        onClick={togglePlayPause}
        className="group relative rounded-2xl overflow-hidden bg-black border border-[#d4af37]/30 shadow-[0_24px_70px_rgba(0,0,0,0.75)] aspect-video w-full cursor-pointer"
      >
        <video
          ref={slot0Ref}
          src={singleVideo.src}
          poster={singleVideo.poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => handleVideoError(0)}
          aria-label={singleVideo.caption || 'Vídeo de apresentação Notarion Brand'}
          className="w-full h-full object-cover"
        />

        {/* Subtle bottom gradient only when caption is present or on hover */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            singleVideo.caption ? 'opacity-80 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {singleVideo.caption && (
          <span className="pointer-events-none absolute bottom-3 left-4 text-[11px] font-medium tracking-wide text-zinc-200/90 drop-shadow-sm">
            {singleVideo.caption}
          </span>
        )}

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-zinc-100 border border-white/15 backdrop-blur-sm transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-zinc-100 border border-white/15 backdrop-blur-sm transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  }

  // Multi-video mode: dual-buffer preloading + 700ms crossfade dissolve
  const activeVideo = videos[currentIndex];
  const slot0Video = videos[slotIndices[0] % videos.length];
  const slot1Video = videos[slotIndices[1] % videos.length];

  return (
    <div
      onClick={togglePlayPause}
      className="group relative rounded-2xl overflow-hidden bg-black border border-[#d4af37]/30 shadow-[0_24px_70px_rgba(0,0,0,0.75)] aspect-video w-full cursor-pointer"
    >
      <video
        ref={slot0Ref}
        src={slot0Video.src}
        poster={slot0Video.poster}
        muted={activeSlot === 0 ? isMuted : true}
        playsInline
        preload="auto"
        onTimeUpdate={() => handleTimeUpdate(0)}
        onEnded={() => handleEnded(0)}
        onError={() => handleVideoError(0)}
        aria-hidden={activeSlot !== 0}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          activeSlot === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      />

      <video
        ref={slot1Ref}
        src={slot1Video.src}
        poster={slot1Video.poster}
        muted={activeSlot === 1 ? isMuted : true}
        playsInline
        preload="auto"
        onTimeUpdate={() => handleTimeUpdate(1)}
        onEnded={() => handleEnded(1)}
        onError={() => handleVideoError(1)}
        aria-hidden={activeSlot !== 1}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          activeSlot === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
          activeVideo?.caption ? 'opacity-80 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {activeVideo?.caption && (
        <span className="pointer-events-none absolute bottom-3 left-4 z-20 text-[11px] font-medium tracking-wide text-zinc-200/90 drop-shadow-sm transition-opacity duration-500">
          {activeVideo.caption}
        </span>
      )}

      <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-zinc-100 border border-white/15 backdrop-blur-sm transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-zinc-100 border border-white/15 backdrop-blur-sm transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
