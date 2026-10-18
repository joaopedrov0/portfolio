'use client';

import Image from 'next/image';
import { asset } from '@/lib/asset';
import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  getProject,
  getPublication,
  labProjects,
  productionProjects,
  type Project,
  type ProjectLink,
  type Publication,
  type Section,
} from '@/data/content';
import { ExperimentalTag, PaperThumb, StatusDot, pillPrimary, pillSecondary, useYearLabel } from '@/components/ui';
import { ZoomableImage } from '@/components/ImageZoom';

type Tone = 'prod' | 'lab';
const toneText: Record<Tone, string> = { prod: 'text-prod', lab: 'text-lab' };

// Pinta a saída do terminal com as mesmas cores que o próprio programa usa
function TerminalLine({ line }: { line: string }) {
  if (line.startsWith('$ ')) {
    return (
      <span className="block">
        <span className="text-zinc-500">$ </span>
        <span className="text-zinc-100">{line.slice(2)}</span>
      </span>
    );
  }
  const parts = line.split(/(\[\d+\]|#\d+|\[DAILY\]|\[DONE\]|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:|^Empty$|^Cart$|^Shelf$|^History$)/);
  return (
    <span className="block min-h-[1lh]">
      {parts.map((part, i) => {
        let cls = 'text-zinc-300';
        if (/^(\[\d+\]|#\d+)$/.test(part)) cls = 'text-fuchsia-400';
        else if (part === '[DAILY]') cls = 'text-cyan-400';
        else if (part === '[DONE]') cls = 'text-green-400';
        else if (part === 'Empty') cls = 'text-red-400';
        else if (/^\d{4}-/.test(part)) cls = 'text-yellow-300';
        else if (['Cart', 'Shelf', 'History'].includes(part)) cls = 'font-semibold text-zinc-100';
        return <span key={i} className={cls}>{part}</span>;
      })}
    </span>
  );
}

function Gallery({ shots, className = 'mt-20' }: { shots: NonNullable<Project['gallery']>; className?: string }) {
  const { t, pick } = useLanguage();
  return (
    <section className={className}>
      <h2 className="mb-6 text-[26px] font-bold tracking-[-0.02em]">{t('project.screens')}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] items-start gap-5">
        {shots.map((shot) => (
          <figure key={shot.src} className="flex flex-col gap-2.5">
            <ZoomableImage shot={shot} className="overflow-hidden rounded-2xl border border-line-strong bg-surface" />
            {shot.caption && <figcaption className="text-sm text-muted">{pick(shot.caption)}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function NextProject({ list, project, kindLabel }: { list: Project[]; project: Project; kindLabel: string }) {
  const { t } = useLanguage();
  const idx = list.findIndex((p) => p.slug === project.slug);
  const next = list[(idx + 1) % list.length];
  return (
    <nav aria-label={t('project.others')} className="mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-8">
      <Link href="/projetos" className="flex flex-col gap-1.5">
        <span className="font-mono text-xs text-subtle">{t('project.backToAll')}</span>
        <span className="text-lg font-semibold text-ink">/projetos</span>
      </Link>
      {next && next.slug !== project.slug && (
        <Link href={`/projetos/${next.slug}`} className="flex flex-col gap-1.5 text-right">
          <span className="font-mono text-xs text-subtle">{t('project.next', { kind: kindLabel })}</span>
          <span className="text-lg font-semibold text-ink">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}

function LinkButtons({ links }: { links: ProjectLink[] }) {
  const { t, pick } = useLanguage();
  if (links.length === 0) return null;
  const firstPrimary = links.findIndex((l) => l.kind !== 'repo');

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l, i) => {
        const label = l.label ? pick(l.label) : t(l.kind === 'live' ? 'project.live' : l.kind === 'download' ? 'project.download' : 'project.repo');
        const primary = i === firstPrimary;
        return (
          <a key={l.href} href={l.href} className={primary ? pillPrimary : pillSecondary}>
            {label}
            {l.kind === 'download' && <Download size={16} strokeWidth={2.2} aria-hidden="true" />}
            {l.kind === 'live' && primary && <ExternalLink size={16} strokeWidth={2.2} aria-hidden="true" />}
          </a>
        );
      })}
    </div>
  );
}

function Breadcrumb({ project }: { project: Project }) {
  const { t } = useLanguage();
  const isProd = project.kind === 'production';
  return (
    <nav aria-label={t('project.breadcrumb')} className="mb-10 flex flex-wrap gap-2 font-mono text-[13px] text-subtle">
      <Link href="/projetos" className="text-muted hover:text-ink">projetos</Link>
      <span aria-hidden="true">/</span>
      <span className={isProd ? 'text-prod' : 'text-lab'}>{t(isProd ? 'project.production' : 'project.lab')}</span>
      <span aria-hidden="true">/</span>
      <span className="text-ink-2">{project.slug}</span>
    </nav>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  const { t, pick } = useLanguage();
  const isPdf = pub.href.endsWith('.pdf');
  return (
    <a href={asset(pub.href)} className="flex flex-wrap items-center gap-5 rounded-[20px] border border-line bg-surface p-5 text-ink">
      <PaperThumb src={pub.thumb} alt={t('publications.cover')} width={72} />
      <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-1.5">
        <span className="font-mono text-xs text-pub">{t('publications.publication')} · {pub.event} · {pick(pub.kind).toLowerCase()}</span>
        <span className="text-lg leading-[1.35] font-semibold">{pub.title}</span>
      </span>
      <span className="text-[15px] font-semibold text-pub">{t(isPdf ? 'publications.readPdf' : 'publications.readProceedings')}</span>
    </a>
  );
}

function SectionBlock({ section, tone = 'prod' }: { section: Section; tone?: Tone }) {
  const { pick } = useLanguage();
  return (
    <section>
      <h2 className="mb-3.5 text-[26px] font-bold tracking-[-0.02em]">{pick(section.title)}</h2>
      {section.type === 'text' && <p className="text-[17px] leading-[1.75] text-ink-2">{pick(section.body)}</p>}
      {section.type === 'stats' && (
        <>
          <dl className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-3">
            {section.items.map((item) => (
              <div key={item.value + item.label.pt} className="flex flex-col-reverse gap-1 rounded-2xl border border-line bg-surface px-5 py-4">
                <dt className="text-sm leading-[1.5] text-muted">{pick(item.label)}</dt>
                <dd className={`font-mono text-[28px] font-medium tracking-[-0.02em] ${toneText[tone]}`}>{item.value}</dd>
              </div>
            ))}
          </dl>
          {section.note && <p className="mt-4 text-[15px] leading-[1.65] text-muted">{pick(section.note)}</p>}
        </>
      )}
      {section.type === 'terminal' && (
        <>
          {section.body && <p className="mb-4 text-[15px] leading-[1.65] text-muted">{pick(section.body)}</p>}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="flex h-9 items-center gap-2 border-b border-zinc-800 px-4" aria-hidden="true">
              <span className="h-[10px] w-[10px] rounded-full bg-zinc-700" />
              <span className="h-[10px] w-[10px] rounded-full bg-zinc-700" />
              <span className="h-[10px] w-[10px] rounded-full bg-zinc-700" />
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]">
              <code>
                {section.output.split('\n').map((line, i) => <TerminalLine key={i} line={line} />)}
              </code>
            </pre>
          </div>
        </>
      )}
      {section.type === 'list' && (
        <ul className="flex flex-col gap-3.5">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[17px] leading-[1.65] text-ink-2">
              <span className={`shrink-0 pt-[3px] font-mono text-[13px] ${toneText[tone]}`}>{String(i + 1).padStart(2, '0')}</span>
              <span><strong className="text-ink">{pick(item.title)}</strong> — {pick(item.body)}</span>
            </li>
          ))}
        </ul>
      )}
      {section.type === 'cards' && (
        <div className="flex flex-col gap-3">
          {section.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-line bg-surface px-[22px] py-5">
              <p className="mb-1.5 text-base font-semibold">{pick(item.title)}</p>
              <p className="text-[15px] leading-[1.65] text-muted">{pick(item.body)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ProductionDetail({ project }: { project: Project }) {
  const { t, pick } = useLanguage();
  const yearLabel = useYearLabel();
  const pubs = (project.publications ?? []).map(getPublication).filter((p): p is Publication => Boolean(p));

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-12 pb-24 sm:px-6">
      <Breadcrumb project={project} />

      <div className="mb-14 flex flex-wrap items-center gap-x-12 gap-y-8">
        {project.logo && (
          <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-[28px] border border-line bg-prod-soft">
            <Image src={asset(project.logo)} alt={`Logo do ${project.title}`} width={80} height={80} unoptimized className="dark:invert" />
          </div>
        )}
        <div className="min-w-0 flex-[1_1_520px]">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-prod-soft px-2.5 py-[5px] font-mono text-xs uppercase tracking-[0.06em] text-prod">{t('project.productionBadge')}</span>
            <span className="rounded-full border border-line-strong px-2.5 py-[5px] font-mono text-xs text-muted">
              <StatusDot status={project.status} suffix={project.version ? ` · ${project.version}` : undefined} />
            </span>
            <span className="font-mono text-xs text-subtle">{yearLabel(project)}</span>
          </div>
          <h1 className="mb-4 max-w-[900px] text-[40px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[56px]">{project.title}</h1>
          <p className="max-w-[720px] text-xl leading-[1.55] text-muted">{pick(project.lead ?? project.summary)}</p>
        </div>
      </div>

      <div className="mb-14">
        <LinkButtons links={project.links} />
      </div>

      {project.image && (
        <figure className="mb-[72px] overflow-hidden rounded-[20px] border border-line-strong bg-surface">
          <div className="flex h-10 items-center gap-2 border-b border-line px-4">
            <span className="h-[11px] w-[11px] rounded-full bg-line-strong" />
            <span className="h-[11px] w-[11px] rounded-full bg-line-strong" />
            <span className="h-[11px] w-[11px] rounded-full bg-line-strong" />
            {project.links[0] && (
              <span className="ml-4 truncate font-mono text-xs text-subtle">{project.links[0].href.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
            )}
          </div>
          <ZoomableImage shot={project.image} priority />
        </figure>
      )}

      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        {project.facts && (
          <aside className="min-w-0 flex-[1_1_260px] rounded-[20px] border border-line bg-surface p-6">
            <dl className="flex flex-col gap-5 text-[15px]">
              {project.facts.map((f) => (
                <div key={f.label.pt}>
                  <dt className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">{pick(f.label)}</dt>
                  <dd className="mt-1.5 text-ink">{pick(f.value)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
        <article className="flex min-w-0 max-w-[720px] flex-[999_1_560px] flex-col gap-12">
          {project.sections?.map((s) => <SectionBlock key={s.title.pt} section={s} />)}
        </article>
      </div>

      {project.gallery && project.gallery.length > 0 && <Gallery shots={project.gallery} />}

      {pubs.length > 0 && (
        <div className="mt-[72px] flex flex-col gap-4">
          {pubs.map((pub) => <PublicationCard key={pub.slug} pub={pub} />)}
        </div>
      )}

      <NextProject list={productionProjects} project={project} kindLabel={t('production.title')} />
    </main>
  );
}

function LabDetail({ project }: { project: Project }) {
  const { t, pick } = useLanguage();
  const pubs = (project.publications ?? []).map(getPublication).filter((p): p is Publication => Boolean(p));

  // Vizinhos na lista (com imagem quando possível) para "Mais do laboratório"
  const idx = labProjects.findIndex((p) => p.slug === project.slug);
  const others = [...labProjects.slice(idx + 1), ...labProjects.slice(0, idx)];
  const more = [...others.filter((p) => p.image), ...others.filter((p) => !p.image)].slice(0, 3);

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-12 pb-24 sm:px-6">
      <Breadcrumb project={project} />

      <div className="mb-[72px] flex flex-wrap items-center gap-x-16 gap-y-12">
        <div className="min-w-0 flex-[1_1_440px]">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-lab-soft px-2.5 py-[5px] font-mono text-xs uppercase tracking-[0.06em] text-lab">{t('project.labBadge')}</span>
            {project.status === 'experimental' ? (
              <ExperimentalTag />
            ) : (
              <span className="font-mono text-xs text-subtle"><StatusDot status={project.status} /></span>
            )}
            <span className="font-mono text-xs text-subtle">{project.year}</span>
          </div>
          <h1 className="mb-[18px] text-[40px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[56px]">{project.title}</h1>
          <p className="mb-7 text-[19px] leading-relaxed text-muted">{pick(project.summary)}</p>
          {project.links.length > 0 && (
            <div className="mb-7">
              <LinkButtons links={project.links} />
            </div>
          )}
          <p className="font-mono text-[13px] text-subtle">{project.stack.join(' · ')}</p>
        </div>
        {project.image && (
          <div className="w-full min-w-0 flex-[1_1_480px]">
            <ZoomableImage shot={project.image} priority className="overflow-hidden rounded-[20px] border border-line-strong" />
          </div>
        )}
      </div>

      {(project.details || project.learned) && (
        <section className="mb-20 flex flex-wrap gap-5">
          {project.details && (
            <div className="min-w-0 flex-[1_1_300px] rounded-[20px] border border-line bg-surface p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-lab">{t('project.about')}</p>
              <p className="text-base leading-[1.7] text-ink-2">{pick(project.details)}</p>
            </div>
          )}
          {project.learned && (
            <div className="min-w-0 flex-[1_1_300px] rounded-[20px] border border-line bg-surface p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-lab">{t('project.learned')}</p>
              <p className="text-base leading-[1.7] text-ink-2">{pick(project.learned)}</p>
            </div>
          )}
        </section>
      )}

      {project.sections && project.sections.length > 0 && (
        <article className="mb-20 flex max-w-[860px] flex-col gap-12">
          {project.sections.map((s) => <SectionBlock key={s.title.pt} section={s} tone="lab" />)}
        </article>
      )}

      {project.gallery && project.gallery.length > 0 && <Gallery shots={project.gallery} className="mb-20" />}

      {pubs.length > 0 && (
        <div className="mb-20 flex flex-col gap-4">
          {pubs.map((pub) => <PublicationCard key={pub.slug} pub={pub} />)}
        </div>
      )}

      <section className="border-t border-line pt-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[22px] font-bold">{t('project.moreLab')}</h2>
          <Link href="/projetos" className="text-[15px] text-prod hover:underline">{t('project.allProjects')}</Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
          {more.map((m) => (
            <Link key={m.slug} href={`/projetos/${m.slug}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 text-ink">
              {m.image ? (
                <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-[10px]">
                  <Image src={asset(m.image.src)} alt={pick(m.image.alt)} fill sizes="96px" className="object-cover object-top" />
                </span>
              ) : (
                <span aria-hidden="true" className="h-16 w-24 shrink-0 rounded-[10px] bg-lab-soft" />
              )}
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-base font-semibold">{m.title}</span>
                <span className="font-mono text-xs text-subtle">{m.year}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <NextProject list={labProjects} project={project} kindLabel={t('lab.title')} />
    </main>
  );
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return null;
  return project.kind === 'production' ? <ProductionDetail project={project} /> : <LabDetail project={project} />;
}
