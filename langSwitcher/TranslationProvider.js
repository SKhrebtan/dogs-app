'use client';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}) {
  const i18n = createInstance();
initReactI18next.init(i18n);
  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}