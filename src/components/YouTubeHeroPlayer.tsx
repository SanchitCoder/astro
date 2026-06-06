import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MASTERCLASS_YOUTUBE_ID = '9jXZZDRZk7I';

const CTRL_BTN: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  border: '1px solid rgba(243,183,87,0.45)',
  background: 'rgba(0,15,35,0.88)',
  color: '#F3B757',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
};

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
};

type YTPlayerEvent = { target: YTPlayer; data?: number };

type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = {
  videoId?: string;
  observeRef: RefObject<HTMLElement | null>;
  ariaLabel?: string;
};

export function YouTubeHeroPlayer({
  videoId = MASTERCLASS_YOUTUBE_ID,
  observeRef,
  ariaLabel = 'Masterclass preview video',
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);

  const togglePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
    if (!isPlaying) player.playVideo();
  }, [isMuted, isPlaying]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let destroyed = false;

    const createPlayer = () => {
      if (destroyed || !mountRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
            setReady(true);
            setIsMuted(true);
            setIsPlaying(true);
          },
          onStateChange: (e) => {
            if (e.data === window.YT!.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT!.PlayerState.PAUSED) setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        createPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      } else {
        const poll = window.setInterval(() => {
          if (window.YT?.Player) {
            window.clearInterval(poll);
            createPlayer();
          }
        }, 100);
        return () => {
          destroyed = true;
          window.clearInterval(poll);
          playerRef.current?.destroy();
          playerRef.current = null;
        };
      }
    }

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  /* Pause when hero scrolls out of view */
  useEffect(() => {
    const section = observeRef.current;
    const player = playerRef.current;
    if (!section || !ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const p = playerRef.current;
        if (!p) return;
        if (entry.isIntersecting) p.playVideo();
        else p.pauseVideo();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [observeRef, ready]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        minHeight: '200px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(216,138,34,0.25)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        background: '#000',
      }}
      aria-label={ariaLabel}
    >
      <div
        ref={mountRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '14px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.72))',
          pointerEvents: 'none',
        }}
      >
        <button
          type="button"
          onClick={togglePlayPause}
          disabled={!ready}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          style={{ ...CTRL_BTN, pointerEvents: 'auto', opacity: ready ? 1 : 0.5 }}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          disabled={!ready}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          style={{ ...CTRL_BTN, pointerEvents: 'auto', opacity: ready ? 1 : 0.5 }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}

export { MASTERCLASS_YOUTUBE_ID };
