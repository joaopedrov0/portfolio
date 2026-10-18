'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { labProjects, productionProjects } from '@/data/content';
import { ExperimentalTag, StatusDot, useYearLabel } from '@/components/ui';

type Filter = 'all' | 'prod' | 'lab';

export default function ProjectsBrowser() {
  const { t, pick } = useLanguage();
  const yearLabel = useYearLabel();
  const [filter, setFilter] = useState<Filter>('all');

  const chips: { id: Filter; label: string; count: number; dot: string }[] = [
    { id: 'all', label: t('projectsPage.all'), count: productionProjects.length + labProjects.length, dot: 'bg-muted' },
    { id: 'prod', label: t('production.title'), count: productionProjects.length, dot: 'bg-prod' },
    { id: 'lab', label: t('lab.title'), count: labProjects.length, dot: 'bg-lab' },
  ];

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-[72px] pb-24 sm:px-6">
      <p className="mb-4 font-mono text-[13px] text-subtle">/projetos</p>
      <h1 className="mb-4 text-[52px] font-bold tracking-[-0.03em]">{t('projectsPage.title')}</h1>
      <p className="mb-10 max-w-[640px] text-lg leading-relaxed text-muted">{t('projectsPage.description')}</p>

      <div role="group" aria-label={t('projectsPage.filter')} className="mb-12 flex flex-wrap gap-2.5">
        {chips.map((c) => {
          const on = c.id === filter;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.id)}
              className={`inline-flex h-11 items-center gap-2.5 rounded-full border px-[18px] text-[15px] font-medium transition-colors ${
                on ? 'border-solid bg-solid text-on-solid' : 'border-line-strong bg-surface text-ink-2 hover:text-ink'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${c.dot}`} aria-hidden="true" />
              {c.label}
              <span className="font-mono text-xs opacity-70">{c.count}</span>
            </button>
          );
        })}
      </div>

      {filter !== 'lab' && (
        <section className="mb-[72px]">
          <h2 className="mb-6 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-prod">{t('production.title')}</h2>
          <div className="flex flex-col gap-5">
            {productionProjects.map((p) => (
              <Link key={p.slug} href={`/projetos/${p.slug}`} className="flex flex-wrap gap-8 rounded-3xl border border-line bg-surface p-6 text-ink">
                {p.image && (
                  <span className="relative block aspect-video w-full max-w-[520px] min-w-0 flex-[1_1_420px] overflow-hidden rounded-[14px] border border-line">
                    <Image src={asset(p.image.src)} alt={pick(p.image.alt)} fill sizes="(min-width: 1200px) 520px, 100vw" className="object-cover object-top" />
                  </span>
                )}
                <span className="flex min-w-0 flex-[1_1_360px] flex-col justify-center gap-3.5">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line-strong px-2.5 py-[5px] font-mono text-xs text-muted">
                      <StatusDot status={p.status} suffix={p.version ? ` · ${p.version}` : undefined} />
                    </span>
                    <span className="font-mono text-xs text-subtle">{yearLabel(p)}</span>
                  </span>
                  <span className="text-[26px] font-bold tracking-[-0.02em]">{p.title}</span>
                  <span className="text-base leading-relaxed text-muted">{pick(p.summary)}</span>
                  {p.facts && (
                    <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      {p.facts
                        .filter((f) => f.key === 'role')
                        .map((f) => (
                          <div key="role">
                            <dt className="font-mono text-xs text-subtle">{t('projectsPage.role')}</dt>
                            <dd className="mt-1 text-ink-2">{pick(f.value)}</dd>
                          </div>
                        ))}
                      <div>
                        <dt className="font-mono text-xs text-subtle">{t('projectsPage.stack')}</dt>
                        <dd className="mt-1 text-ink-2">{p.stack.join(' · ')}</dd>
                      </div>
                    </dl>
                  )}
                  <span className="mt-1 text-[15px] font-semibold text-prod">{t('production.caseStudy')}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {filter !== 'prod' && (
        <section>
          <h2 className="mb-6 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-lab">{t('lab.title')}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
            {labProjects.map((p) => (
              <Link key={p.slug} href={`/projetos/${p.slug}`} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface text-ink">
                {p.image ? (
                  <span className="relative block aspect-video border-b border-line">
                    <Image src={asset(p.image.src)} alt={pick(p.image.alt)} fill sizes="(min-width: 1200px) 380px, 100vw" className="object-cover object-top" />
                  </span>
                ) : (
                  <span aria-hidden="true" className="flex h-[120px] items-end border-b border-line bg-lab-soft/50 px-[22px] pb-4 font-mono text-[13px] text-lab">
                    {p.stack.join(' · ')}
                  </span>
                )}
                <span className="flex flex-col gap-2 px-[22px] pt-5 pb-[22px]">
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex flex-wrap items-center gap-2 text-[19px] font-bold">
                      {p.title}
                      {p.status === 'experimental' && <ExperimentalTag />}
                    </span>
                    <span className="font-mono text-xs text-subtle">{p.year}</span>
                  </span>
                  <span className="text-[15px] leading-[1.55] text-muted">{pick(p.summary)}</span>
                  {p.image && <span className="mt-1 font-mono text-xs text-subtle">{p.stack.join(' · ')}</span>}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
