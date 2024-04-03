
import LangBtnList from "@/langSwitcher/LangBtnList";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/langSwitcher/TranslationProvider"

type HomeProps = {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }:HomeProps) {
  const { t } = await initTranslations(locale, ['common']) 
  return (    
      <main>
      <h1>{t('hello')}</h1>
      </main>
  );
}


