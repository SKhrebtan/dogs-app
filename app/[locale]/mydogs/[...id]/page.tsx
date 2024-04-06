'use client'
import { useGetOneDogQuery } from "@/app/store/dogs/dogsSlice"
interface Params {
  id: string;
}
function OneDogPage({ params:{id} }:{params:Params}) {
const { data} = useGetOneDogQuery(id[0]);
      console.log(data)
    return(<h1>tyt byde pesuk</h1>)
}

export default OneDogPage