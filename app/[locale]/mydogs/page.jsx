import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAllUserDogs } from "@/app/api/httprequests";

import DogsList from "../../components/DogsList";

export default async function Mydogs() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user.token) {
    redirect("/");
  }
  const dogs = await getAllUserDogs();
  return (
    <div className="flex min-h-screen flex-col items-center p-24 justify-between">
      <DogsList dogs={dogs} />
    </div>
  );
}
