'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

import { translations } from '@/data/translations';
import type { Locale, Localized } from '@/data/content';

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  pick: (value: Localized) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// O idioma escolhido fica no localStorage; o servidor sempre renderiza em pt
const STORAGE_KEY = 'language';
const CHANGE_EVENT = 'language-change';
let memoryLanguage: Locale = 'pt'; // usado quando o localStorage está bloqueado

function readLanguage(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'pt' ? saved : memoryLanguage;
  } catch {
    return memoryLanguage;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useSyncExternalStore(subscribe, readLanguage, () => 'pt' as Locale);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const handleSetLanguage = (lang: Locale) => {
    memoryLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignora: sem localStorage o idioma não persiste
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    let value: unknown = translations[language];
    for (const k of key.split('.')) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    if (typeof value !== 'string') return key;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };

  const pick = (value: Localized) => value[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
