'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { statusLabels, type Project, type ProjectStatus } from '@/data/content';

type Tone = 'prod' | 'lab' | 'teach' | 'pub';

const toneText: Record<Tone, string> = {
  prod: 'text-prod',
  lab: 'text-lab',
  teach: 'text-teach',
  pub: 'text-pub',
};

export function SectionHeading({ number, tone, title }: { number: string; tone: Tone; title: string }) {
  return (
    <div>
      <p className={`mb-2.5 font-mono text-[13px] ${toneText[tone]}`}>{number}</p>
      <h2 className="text-[32px] font-bold tracking-[-0.02em]">{title}</h2>
    </div>
  );
}

const dotColor: Record<ProjectStatus, string> = {
  'in-use': 'bg-ok',
  live: 'bg-ok',
  suspended: 'bg-warn',
  done: 'bg-subtle',
  experimental: 'bg-lab',
  paused: 'bg-subtle',
};

// Texto de status com bolinha colorida ("● No ar")
export function StatusDot({ status, suffix }: { status: ProjectStatus; suffix?: string }) {
  const { pick } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-[7px] w-[7px] rounded-full ${dotColor[status]}`} aria-hidden="true" />
      {pick(statusLabels[status])}
      {suffix}
    </span>
  );
}

// Selo compacto, usado nas listas
export function StatusPill({ status }: { status: ProjectStatus }) {
  const { pick } = useLanguage();
  const styles: Partial<Record<ProjectStatus, string>> = {
    live: 'border-ok-line bg-ok-soft text-ok-ink',
    'in-use': 'border-ok-line bg-ok-soft text-ok-ink',
    suspended: 'border-warn-line bg-warn-soft text-warn-ink',
  };
  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-xs lowercase ${styles[status] ?? 'border-line bg-surface text-muted'}`}>
      {pick(statusLabels[status])}
    </span>
  );
}

export function ExperimentalTag() {
  return (
    <span className="rounded-full bg-lab-soft px-2 py-[3px] font-mono text-[11px] font-medium text-lab">experimental</span>
  );
}

export function ExternalIcon() {
  return <ExternalLink size={15} aria-hidden="true" />;
}

// Capa do PDF (primeira página) ou um esboço de página quando não há imagem
export function PaperThumb({ src, alt, width }: { src?: string; alt: string; width: number }) {
  if (src) {
    return (
      <span className="relative block shrink-0 overflow-hidden rounded-md border border-line bg-white" style={{ width, aspectRatio: '210 / 297' }}>
        <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover object-top" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 flex-col items-center gap-[5px] rounded-md border border-line bg-placeholder px-2.5 py-3"
      style={{ width, aspectRatio: '210 / 297' }}
    >
      <span className="h-[5px] w-4/5 rounded-sm bg-ink-2" />
      <span className="h-[5px] w-3/5 rounded-sm bg-ink-2" />
      <span className="mt-[3px] mb-1.5 h-[3px] w-[45%] rounded-sm bg-subtle" />
      <span className="h-[3px] w-full rounded-sm bg-line-strong" />
      <span className="h-[3px] w-full rounded-sm bg-line-strong" />
      <span className="h-[3px] w-full rounded-sm bg-line-strong" />
      <span className="h-[3px] w-[70%] self-start rounded-sm bg-line-strong" />
    </span>
  );
}

export const pillPrimary =
  'inline-flex h-12 items-center gap-2.5 rounded-full bg-solid px-[22px] text-[15px] font-semibold text-on-solid transition-opacity hover:opacity-90';
export const pillSecondary =
  'inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-colors hover:bg-surface';
export const card = 'rounded-3xl border border-line bg-surface';

export function useYearLabel() {
  const { t } = useLanguage();
  return (p: Project) => (p.ongoing ? `${p.year}–${t('common.present')}` : p.year);
}
