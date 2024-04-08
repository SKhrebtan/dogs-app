"use client";
import { useGetDogsQuery } from "../store/dogs/dogsSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OneDog } from "./OneDog";
import { setCurrentToken } from "../store//auth/authSlice";
import { useSession } from "next-auth/react";
import { setAuthHeader } from "../api/httprequests";
import { useGetAllDogsQuery } from "../store/dogs/dogsSlice";
import { Loader } from "../components/Loader";
import PaginatedItems from "./ReactPaginate";

const DogsList = ({ dogs, page }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: dataDogs } = useGetDogsQuery();
  const [pages, setPages] = useState(1);
  const itemsPerPage = 8;

  const { data, isLoading, error } = useGetAllDogsQuery({
    pages,
    itemsPerPage,
  });

  useEffect(() => {
    if (!session?.user?.token) {
      dispatch(setCurrentToken(null));
      return;
    }
    session.user.token && setAuthHeader(session.user.token);
    session.user.token && dispatch(setCurrentToken(session.user.token));
  }, [session]);

  return (
    <div className="p-[20px]">
      {isLoading && (
        <div className="w-screen flex flex-row justify-center">
          <Loader />
        </div>
      )}
      {error && error.status === 404 && <h1>{error.message}</h1>}
      <ul className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        {(dogs.length > 0 ? dogs : data && data.dogs)?.map(
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
      {page === "home" && data && (
        <PaginatedItems
          dogs={data.allDogs}
          pages={pages}
          setPages={setPages}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};
export default DogsList;
