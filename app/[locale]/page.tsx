
import LangBtnList from "@/langSwitcher/LangBtnList";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/langSwitcher/TranslationProvider"
import { getAllDogs } from "../api/httprequests";
import DogsList from "../components/DogsList";
type HomeProps = {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }:HomeProps) {
  const { t } = await initTranslations(locale, ['common']) 
  const dogs = await getAllDogs()
  return (    
      <main>
      <h1>{t('hello')}</h1>
      <DogsList dogs={dogs} />
      </main>
  );
}


