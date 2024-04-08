'use client'
import { useGetOneDogFromAllQuery } from "@/app/store/dogs/dogsSlice"
import DogDetailsPage from '../../../components/DogDetailsPage'
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
  const { data} = useGetOneDogFromAllQuery(id[0]);
    
  return data && <DogDetailsPage dog={data} />
}

export default OneDogPage