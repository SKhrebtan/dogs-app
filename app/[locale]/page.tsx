
import initTranslations from "@/app/i18n";
import { getAllDogs } from "../api/httprequests";
import DogsList from "../components/DogsList";
import { getServerSession } from "next-auth";
type HomeProps = {
  params: {
    locale: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const session = await getServerSession();

  const { t } = await initTranslations(params.locale, ['common']) 
  const dogs = await getAllDogs()
  return (    
      <main>
      <h1>{t('hello')}</h1>
      <DogsList dogs={dogs} page='home' />
      </main>
  );
}


