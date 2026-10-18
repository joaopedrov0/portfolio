'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  // false no servidor e na hidratação, true depois: evita divergência no ícone do tema
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const onProjects = pathname.startsWith('/projetos');
  const linkClass = 'text-ink-2 hover:text-ink transition-colors';
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-[18px] sm:px-6">
        <Link href="/" className="font-mono text-[17px] font-medium text-ink">
          joaopedrov0<span className="text-prod">_</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
          <Link
            href="/projetos"
            className={onProjects ? 'text-ink underline underline-offset-[6px]' : linkClass}
            aria-current={onProjects ? 'page' : undefined}
          >
            {t('nav.projects')}
          </Link>
          <Link href="/#ensino" className={linkClass}>{t('nav.teaching')}</Link>
          <Link href="/#publicacoes" className={linkClass}>{t('nav.publications')}</Link>
          <Link href="#contato" className={linkClass}>{t('nav.contact')}</Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              aria-label={t('nav.language')}
              className="h-10 rounded-full border border-line bg-surface px-3.5 font-mono text-[13px] text-ink transition-colors hover:border-line-strong"
            >
              <span className={language === 'pt' ? 'font-semibold' : 'text-subtle'}>PT</span>
              <span className="text-subtle"> / </span>
              <span className={language === 'en' ? 'font-semibold' : 'text-subtle'}>EN</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={t('nav.theme')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-line-strong"
            >
              {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
