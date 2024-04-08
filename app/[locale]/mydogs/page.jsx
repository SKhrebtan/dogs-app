"use client";
import DogsList from "../../components/DogsList";
import { useGetDogsQuery } from "../../store/dogs/dogsSlice";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Loader } from "../../components/Loader";
export default function Mydogs() {
  const { data, refetch, error, isLoading } = useGetDogsQuery();
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="">
      {isLoading && (
        <div className="w-screen flex flex-row justify-center">
          <Loader />
        </div>
      )}
      {data && <DogsList dogs={data} page="mydogs" />}
      {error && <h1>Something went wrong....</h1>}
    </div>
  );
}
