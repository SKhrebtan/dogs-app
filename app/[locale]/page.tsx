
import initTranslations from "@/app/i18n";
import { getAllDogs } from "../api/httprequests";
import DogsList from "../components/DogsList";
import { getServerSession } from "next-auth";
import { auth } from "../api/auth/[...nextauth]/route";
type HomeProps = {
  params: {
    locale: string;
  };
}
import authOptions from "../api/auth/authOptions";
export default async function Home({ params }: HomeProps) {
  const session = await getServerSession(authOptions);
  // const auth1 = await auth()
  console.log(session)
  console.log(auth)
  const { t } = await initTranslations(params.locale, ['common']) 
  const dogs = await getAllDogs()
  return (    
      <main>
      <h1>{t('hello')}</h1>
      <DogsList dogs={dogs} page='home' />
      </main>
  );
}


