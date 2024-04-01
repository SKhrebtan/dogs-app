import Image from "next/image";
import Header from "@/langSwitcher/LangBtnList";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/langSwitcher/TranslationProvider"

type HomeProps = {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }:HomeProps) {
  const { t,resources } = await initTranslations(locale, ['common']) 
  return (
     <TranslationsProvider resources={resources} locale={locale} namespaces={['common']}>
    <main>
      <Header/>
      <h1>{t('hello')}</h1>
      </main>
      </TranslationsProvider>
  );
}


