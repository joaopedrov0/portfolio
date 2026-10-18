'use client';

import { useLanguage } from '@/context/LanguageContext';
import { profiles } from '@/data/content';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="bg-footer text-zinc-50">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-4 pt-20 pb-12 sm:px-6">
        <div className="min-w-0">
          <h2 className="mb-5 text-[40px] font-semibold tracking-[-0.02em]">{t('contact.title')}</h2>
          <a href={`mailto:${profiles.email}`} className="break-all font-mono text-lg text-blue-300 hover:text-blue-200">
            {profiles.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-6 text-[15px]">
          <a href={profiles.github} className="text-zinc-300 hover:text-white">GitHub · joaopedrov0</a>
          <a href={profiles.githubMastrien} className="text-zinc-300 hover:text-white">GitHub · mastrien</a>
          <a href={profiles.linkedin} className="text-zinc-300 hover:text-white">LinkedIn</a>
          <a href={profiles.devto} className="text-zinc-300 hover:text-white">Dev.to</a>
          <span className="text-zinc-400">© {new Date().getFullYear()} João Pedro V.</span>
        </div>
      </div>
    </footer>
  );
}
