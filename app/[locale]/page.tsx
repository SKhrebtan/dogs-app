

import { getAllDogs } from "../api/httprequests";
import DogsList from "../components/DogsList";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";;

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const dogs = await getAllDogs()
  return (   
      <main>
        <DogsList dogs={[]} page='home' />
      </main>

  );
}


