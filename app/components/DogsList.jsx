"use client";
import { useGetDogsQuery } from "../store/dogs/dogsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OneDog } from "./OneDog";
import { setCurrentToken } from "../store//auth/authSlice";
import { useSession } from "next-auth/react";
import { setAuthHeader } from "../api/httprequests";
import { useGetAllDogsQuery } from "../store/dogs/dogsSlice";
const DogsList = ({ dogs, page }) => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const { data: dataDogs } = useGetDogsQuery();
  const { data: allDogs } = useGetAllDogsQuery();
  useEffect(() => {
    if (!data?.user?.token) {
      dispatch(setCurrentToken(null));
      return;
    }
    data.user.token && setAuthHeader(data.user.token);
    data.user.token && dispatch(setCurrentToken(data.user.token));
  }, [data]);

  return (
    <div className="p-[20px]">
      <ul className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        {(dogs.length > 0 ? dogs : allDogs)?.map(
          ({ id, name, breed, image }) => (
            <OneDog
              dataDogs={dataDogs}
              key={id}
              id={id}
              name={name}
              breed={breed}
              image={image}
              page={page}
            />
          )
        )}
      </ul>
    </div>
  );
};
export default DogsList;
