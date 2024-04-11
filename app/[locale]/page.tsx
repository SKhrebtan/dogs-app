import DogsList from "../components/DogsList";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <main>
      <DogsList dogs={[]} page="home" />
    </main>
  );
}
