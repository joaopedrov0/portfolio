'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  devtoPosts,
  devtoSeries,
  getProject,
  homeLabSlugs,
  labProjects,
  materials,
  productionProjects,
  profiles,
  publications,
  type Project,
} from '@/data/content';
import {
  ExperimentalTag,
  ExternalIcon,
  PaperThumb,
  SectionHeading,
  StatusDot,
  StatusPill,
  card,
  pillPrimary,
  useYearLabel,
  pillSecondary,
} from '@/components/ui';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="pt-20 pb-[72px] sm:pt-[104px] sm:pb-[88px]">
      <h1 className="mb-6 text-5xl leading-[1.05] tracking-[-0.03em] sm:text-[72px]">
        <span className="font-light text-muted">{t('hero.greeting')}</span>{' '}
        <span className="font-bold">{t('hero.name')}</span>
      </h1>
      <p className="mb-9 max-w-[640px] text-lg leading-[1.65] text-ink-2">{t('hero.bio')}</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/projetos" className={pillPrimary}>
          {t('hero.cta')}
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </Link>
        <a href={profiles.github} className={pillSecondary}>GitHub</a>
        <a href={profiles.linkedin} className={pillSecondary}>LinkedIn</a>
      </div>
    </section>
  );
}

export function ProductionSection() {
  const { t, pick } = useLanguage();
  const yearLabel = useYearLabel();
  const [emma, ifvest, ...rest] = productionProjects;

  return (
    <section className="border-t border-line py-[72px]">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <SectionHeading number="01" tone="prod" title={t('production.title')} />
        <Link href="/projetos" className="text-[15px] text-prod hover:underline">{t('production.allProjects')}</Link>
      </div>
      <div className="flex flex-wrap gap-5">
        <Link href={`/projetos/${emma.slug}`} className={`${card} flex min-w-0 flex-[2_1_640px] flex-col overflow-hidden text-ink`}>
          {emma.image && (
            <span className="relative block aspect-video border-b border-line">
              <Image src={asset(emma.image.src)} alt={pick(emma.image.alt)} fill priority sizes="(min-width: 1200px) 760px, 100vw" className="object-cover object-top" />
            </span>
          )}
          <span className="flex flex-col gap-3.5 px-6 pt-7 pb-8 sm:px-8">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] text-muted">
              <span className="rounded-full bg-prod-soft px-2.5 py-[5px] text-xs uppercase tracking-[0.06em] text-prod">{t('production.featured')}</span>
              <StatusDot status={emma.status} suffix={` · ${emma.version} · ${emma.year}`} />
              <span>{t('production.desktop')}</span>
            </span>
            <span className="flex items-center gap-3.5">
              {emma.logo && <Image src={asset(emma.logo)} alt="" width={40} height={40} unoptimized className="dark:invert" />}
              <h3 className="text-[30px] font-bold tracking-[-0.02em]">{emma.title}</h3>
            </span>
            <p className="max-w-[640px] text-base leading-relaxed text-muted">{pick(emma.summary)}</p>
            <span className="text-sm text-subtle">{t('production.emmaNote')}</span>
            <span className="text-[15px] font-semibold text-prod">{t('production.caseStudy')}</span>
          </span>
        </Link>

        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          <Link href={`/projetos/${ifvest.slug}`} className={`${card} flex flex-col overflow-hidden text-ink`}>
            {ifvest.image && (
              <span className="relative block aspect-video border-b border-line">
                <Image src={asset(ifvest.image.src)} alt={pick(ifvest.image.alt)} fill sizes="(min-width: 1200px) 380px, 100vw" className="object-cover object-top" />
              </span>
            )}
            <span className="flex flex-col gap-2.5 px-6 pt-[22px] pb-6">
              <span className="font-mono text-[13px] text-muted"><StatusDot status={ifvest.status} suffix={` · ${yearLabel(ifvest)}`} /></span>
              <h3 className="text-[21px] font-bold">{ifvest.title}</h3>
              <p className="text-[15px] leading-[1.55] text-muted">{pick(ifvest.summary)}</p>
            </span>
          </Link>

          <div className={`${card} px-5 py-2`}>
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projetos/${p.slug}`}
                className={`flex items-center justify-between gap-3 py-3.5 text-ink ${i < rest.length - 1 ? 'border-b border-line' : ''}`}
              >
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-base font-semibold">{p.title}</span>
                  <span className="text-[13px] text-subtle">{p.year} · {p.stack.join(' · ')}</span>
                </span>
                <StatusPill status={p.status} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LabSection() {
  const { t, pick } = useLanguage();
  const items = homeLabSlugs.map((s) => getProject(s)).filter((p): p is Project => Boolean(p));

  return (
    <section className="flex flex-wrap gap-x-12 gap-y-8 border-t border-line py-[72px]">
      <div className="min-w-0 flex-[1_1_240px]">
        <div className="mb-3">
          <SectionHeading number="02" tone="lab" title={t('lab.title')} />
        </div>
        <p className="mb-5 text-[15px] leading-relaxed text-muted">{t('lab.description')}</p>
        <Link href="/projetos" className="text-[15px] text-prod hover:underline">{t('lab.viewAll', { n: labProjects.length })}</Link>
      </div>
      <div className="min-w-0 flex-[3_1_600px] border-t border-line">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line px-1 py-[18px] text-ink transition-colors hover:bg-surface"
          >
            <span className="flex-[0_0_56px] font-mono text-[13px] text-subtle">{p.year}</span>
            <span className="flex flex-[0_1_220px] flex-wrap items-center gap-2 text-lg font-semibold">
              {p.title}
              {p.status === 'experimental' && <ExperimentalTag />}
            </span>
            <span className="min-w-0 flex-[1_1_260px] text-[15px] text-muted">{pick(p.summary)}</span>
            <span aria-hidden="true" className="text-subtle">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TeachingSection() {
  const { t, pick } = useLanguage();
  return (
    <section id="ensino" className="scroll-mt-6 border-t border-line py-[72px]">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
        <SectionHeading number="03" tone="teach" title={t('teaching.title')} />
        <span className="font-mono text-[13px] text-subtle">{t('teaching.external')}</span>
      </div>
      <p className="mb-7 text-base text-muted">{t('teaching.description')}</p>
      <div className="border-t border-line">
        {materials.map((m) => (
          <a key={m.href} href={m.href} className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-line px-1 py-[22px] text-ink transition-colors hover:bg-surface">
            <span className="flex-[0_0_120px] font-mono text-xs uppercase tracking-[0.06em] text-teach">{pick(m.format)}</span>
            <span className="flex min-w-0 flex-[1_1_360px] flex-col gap-1">
              <span className="text-lg font-semibold">{pick(m.title)}</span>
              <span className="text-sm text-muted">{pick(m.audience)}</span>
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[13px] text-subtle">{m.host}<ExternalIcon /></span>
          </a>
        ))}
      </div>

      <div className="mt-9 mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold">{t('teaching.devto')}</h3>
        <a href={profiles.devto} className="text-[15px] text-prod hover:underline">{t('teaching.devtoProfile')}</a>
      </div>
      <div className={`mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-[20px] border border-line bg-surface px-6 py-5`}>
        <span className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-teach">{t('teaching.series', { n: devtoSeries.parts.length })}</span>
          <span className="text-lg font-semibold">{pick(devtoSeries.title)}</span>
        </span>
        <span className="flex flex-wrap gap-2 text-sm">
          {devtoSeries.parts.map((part) => (
            <a key={part.href} href={part.href} className="rounded-full bg-teach-soft px-3 py-1.5 text-ink-2 hover:text-ink">
              {pick(part.title)}
            </a>
          ))}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {devtoPosts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-surface px-4 py-2 text-[15px] text-ink transition-colors hover:border-subtle"
          >
            <span className="font-mono text-[11px] text-teach">{pick(post.area)}</span>
            {post.title}
          </a>
        ))}
      </div>
    </section>
  );
}

export function PublicationsSection() {
  const { t, pick } = useLanguage();
  const featured = publications.find((p) => p.featured);
  const rest = publications.filter((p) => !p.featured);

  return (
    <section id="publicacoes" className="scroll-mt-6 border-t border-line pt-[72px] pb-24">
      <div className="mb-2">
        <SectionHeading number="04" tone="pub" title={t('publications.title')} />
      </div>
      <p className="mb-7 text-base text-muted">{t('publications.description')}</p>

      {featured && (
        <a href={asset(featured.href)} className={`${card} mb-5 flex flex-wrap items-stretch gap-7 p-6 text-ink`}>
          <PaperThumb src={featured.thumb} alt={t('publications.cover')} width={220} />
          <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 py-2">
            <span className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="rounded-full bg-pub-soft px-2.5 py-[5px] uppercase tracking-[0.06em] text-pub">{t('publications.featured')}</span>
              <span className="text-pub">{featured.event}</span>
              <span className="text-subtle">{pick(featured.kind)}{featured.note ? ` · ${pick(featured.note)}` : ''}</span>
            </span>
            <span className="text-[28px] leading-[1.2] font-bold tracking-[-0.02em]">{featured.title}</span>
            <span className="text-[15px] text-ink-2">{featured.authors}</span>
            {featured.abstract && <span className="max-w-[720px] text-base leading-relaxed text-muted">{pick(featured.abstract)}</span>}
            <span className="mt-auto text-[15px] font-semibold text-pub">{t('publications.readPdf')}</span>
          </span>
        </a>
      )}

      <div className="flex flex-wrap gap-5">
        {rest.map((p) => (
          <a key={p.slug} href={p.href} className="flex min-w-0 flex-[1_1_360px] items-stretch gap-[18px] rounded-[20px] border border-line bg-surface p-4 text-ink">
            <PaperThumb src={p.thumb} alt={t('publications.cover')} width={96} />
            <span className="flex min-w-0 flex-auto flex-col gap-2 py-1 pr-1">
              <span className="flex flex-wrap justify-between gap-x-2 gap-y-1 font-mono text-xs text-pub">
                <span>{p.event}</span>
                <span className="text-subtle">{pick(p.kind)}</span>
              </span>
              <span className="text-base leading-[1.35] font-semibold">{p.title}</span>
              <span className="text-sm text-muted">{p.authors}</span>
              <span className="mt-auto text-sm font-semibold text-pub">{t('publications.readProceedings')}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
