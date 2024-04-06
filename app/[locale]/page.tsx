
import initTranslations from "@/app/i18n";
import { getAllDogs } from "../api/httprequests";
import DogsList from "../components/DogsList";
import { getServerSession } from "next-auth";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
type HomeProps = {
  params: {
    locale: string;
  };
}

export default function Home({ params }: HomeProps) {
  const session =  useSession();

  const { t } = useTranslation();
  // const dogs = await getAllDogs()
  const dogs = [{id: '1', name:'tyzlo', breed: 'dvir', image:'http://res.cloudinary.com/dwzeqka9z/image/upload/v1712308074/ajiwndkzlzvwfxcjjqpv.jpg'}]
  return (    
      <main>
      <h1>{t('hello')}</h1>
      <DogsList dogs={dogs} page='home' />
      </main>
  );
}


