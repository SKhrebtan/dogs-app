'use client'
import { useGetOneDogFromAllQuery } from "@/app/store/dogs/dogsSlice"
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
    console.log(id[0])
const { data} = useGetOneDogFromAllQuery(id[0]);
      console.log(data)
    return(<h1>tyt byde pesuk</h1>)
}

export default OneDogPage