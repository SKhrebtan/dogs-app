'use client'
import { useGetOneDogFromAllQuery } from "@/app/store/dogs/dogsSlice"
import DogDetailsPage from '../../components/DogDetailsPage'
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
    console.log(id[0])
const { data} = useGetOneDogFromAllQuery(id[0]);
      console.log(data)
  return data && <DogDetailsPage dog={data} />
}

export default OneDogPage