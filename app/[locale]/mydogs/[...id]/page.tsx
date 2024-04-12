"use client";
import { useGetOneDogQuery } from "@/app/store/dogs/dogsSlice";
import DogDetailsPage from "../../../components/DogDetailsPage";

interface Params {
  id: string;
}

function OneDogPage({ params: { id } }: { params: Params }) {
  const { data, isLoading, error } = useGetOneDogQuery(id[0]);

  return <div>{data && <DogDetailsPage dog={data} />}</div>;
}

export default OneDogPage;
