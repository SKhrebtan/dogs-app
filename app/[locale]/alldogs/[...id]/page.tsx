'use client'
import { notFound } from "next/navigation";
import { useGetOneDogFromAllQuery } from "@/app/store/dogs/dogsSlice"
import DogDetailsPage from '../../../components/DogDetailsPage'
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
  const { data,error} = useGetOneDogFromAllQuery(id[0]);
  // if (error && error?.data.statusCode !== 404) {
    
  //   return notFound()
  //   }
  return (
    <div>
      {/* {error && error.data.statusCode === 404 && <h1>{error.data.message}</h1>} */}
      {data && <DogDetailsPage dog={data} />}
    </div>
    )
}

export default OneDogPage