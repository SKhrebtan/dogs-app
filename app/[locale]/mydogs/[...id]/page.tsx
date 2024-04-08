'use client'
import { useGetOneDogQuery } from "@/app/store/dogs/dogsSlice"
import DogDetailsPage from '../../../components/DogDetailsPage'
import { notFound} from "next/navigation";
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
  const { data, isLoading, error } = useGetOneDogQuery(id[0]);

   if (error && error?.data.statusCode !== 404) {    
    return notFound()
    }
  return (
    <div>
      {data && <DogDetailsPage dog={data} />}
      {error && error.data.statusCode === 404 && <h1>{error.data.message}</h1>}

    </div>
    )
}

export default OneDogPage