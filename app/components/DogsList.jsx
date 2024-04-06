"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OneDog } from "./OneDog";
import { setCurrentToken } from "../store//auth/authSlice";
import { useSession } from "next-auth/react";
import { setAuthHeader } from "../api/httprequests";

const DogsList = ({ dogs, page }) => {
  const dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    if (!data?.user?.token) {
      dispatch(setCurrentToken(null));
      return;
    }
    data.user.token && setAuthHeader(data.user.token);
    data.user.token && dispatch(setCurrentToken(data.user.token));
  }, [data]);

  return (
    <div className=" p-[20px]">
      <ul className="grid gap-4 grid-cols-4">
        {dogs?.map(({ id, name, breed, image }) => (
          <OneDog
            key={id}
            id={id}
            name={name}
            breed={breed}
            image={image}
            page={page}
          />
        ))}
      </ul>
    </div>
  );
};
export default DogsList;
