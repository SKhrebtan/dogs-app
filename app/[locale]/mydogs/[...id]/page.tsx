'use client'
import { useGetOneDogQuery } from "@/app/store/dogs/dogsSlice"
import DogDetailsPage from '../../../components/DogDetailsPage'
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
const { data} = useGetOneDogQuery(id[0]);
    return data && <DogDetailsPage dog={data} />
}

export default OneDogPage