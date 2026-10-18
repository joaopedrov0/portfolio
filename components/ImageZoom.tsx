'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { asset } from '@/lib/asset';
import type { Shot } from '@/data/content';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

// Imagem que abre em tela cheia ao clicar, com zoom
export function ZoomableImage({ shot, priority, className = '' }: { shot: Shot; priority?: boolean; className?: string }) {
  const { t, pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('zoom.open', { alt: pick(shot.alt) })}
        className={`group block w-full cursor-zoom-in ${className}`}
      >
        <Image
          src={asset(shot.src)}
          alt={pick(shot.alt)}
          width={shot.width}
          height={shot.height}
          priority={priority}
          className="block h-auto w-full transition-opacity group-hover:opacity-95"
        />
      </button>
      {open && <Lightbox shot={shot} onClose={close} />}
    </>
  );
}

function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const { t, pick } = useLanguage();
  const [scale, setScale] = useState(MIN_SCALE);
  const [fit, setFit] = useState({ w: 0, h: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Ponto da imagem (0 a 1) que deve ficar no centro depois de mudar o zoom
  const focusPoint = useRef({ x: 0.5, y: 0.5 });
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null);

  // Tamanho que cabe na tela, mantendo a proporção da imagem
  useLayoutEffect(() => {
    const measure = () => {
      const maxW = window.innerWidth * 0.92;
      const maxH = window.innerHeight * 0.8;
      const ratio = shot.width / shot.height;
      const w = Math.min(maxW, maxH * ratio, shot.width);
      setFit({ w, h: w / ratio });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [shot.width, shot.height]);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const zoomTo = useCallback((next: number, point = { x: 0.5, y: 0.5 }) => {
    focusPoint.current = point;
    setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)));
  }, []);

  // Depois do zoom, rola para manter o ponto escolhido no centro
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const w = fit.w * scale;
    const h = fit.h * scale;
    el.scrollLeft = Math.max(0, focusPoint.current.x * w - el.clientWidth / 2);
    el.scrollTop = Math.max(0, focusPoint.current.y * h - el.clientHeight / 2);
  }, [scale, fit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === '+' || e.key === '=') zoomTo(scale + 1);
      else if (e.key === '-') zoomTo(scale - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, scale, zoomTo]);

  const onImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (drag.current?.moved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const point = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    zoomTo(scale === MIN_SCALE ? 2 : MIN_SCALE, point);
  };

  // Arrastar para mover quando está ampliado
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || scale === MIN_SCALE) return;
    drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
    el.scrollTop = d.top - dy;
  };
  const onPointerUp = () => {
    // Mantém "moved" até o click que vem logo depois do pointerup
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  const iconButton =
    'flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40';

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={pick(shot.alt)} className="fixed inset-0 z-[100] flex flex-col bg-black/90">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="font-mono text-xs text-zinc-400">{Math.round(scale * 100)}%</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => zoomTo(scale - 1)} disabled={scale <= MIN_SCALE} aria-label={t('zoom.out')} className={iconButton}>
            <Minus size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => zoomTo(scale + 1)} disabled={scale >= MAX_SCALE} aria-label={t('zoom.in')} className={iconButton}>
            <Plus size={18} aria-hidden="true" />
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t('zoom.close')} className={iconButton}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`min-h-0 flex-1 overflow-auto ${scale > MIN_SCALE ? 'cursor-grab active:cursor-grabbing' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={(e) => {
          if (e.target === e.currentTarget && scale === MIN_SCALE) onClose();
        }}
      >
        <div
          className="flex min-h-full min-w-full items-center justify-center p-4"
          style={{ width: fit.w * scale + 32, height: fit.h * scale + 32 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && scale === MIN_SCALE) onClose();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- tamanho controlado pelo zoom */}
          <img
            src={asset(shot.src)}
            alt={pick(shot.alt)}
            draggable={false}
            onClick={onImageClick}
            style={{ width: fit.w * scale, height: fit.h * scale, maxWidth: 'none' }}
            className={`select-none rounded-md ${scale === MIN_SCALE ? 'cursor-zoom-in' : ''}`}
          />
        </div>
      </div>

      {shot.caption && <p className="px-4 pt-2 pb-4 text-center text-sm text-zinc-300">{pick(shot.caption)}</p>}
    </div>,
    document.body
  );
}
