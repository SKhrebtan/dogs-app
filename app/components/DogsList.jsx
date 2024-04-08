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
import { useMediaObserver } from "../helpers/useMediaObserver";
import { useInView, InView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const DogsList = ({ dogs, page }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: dataDogs } = useGetDogsQuery();
  const [pages, setPages] = useState(1);
  const [narrowData, setNarrowData] = useState([]);
  const itemsPerPage = 8;
  const isNarrowScreen = useMediaObserver();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const { data, isLoading, error } = useGetAllDogsQuery({
    pages,
    itemsPerPage,
  });
  console.log(narrowData);
  useEffect(() => {
    if (!data) return;
    if (data.totalPages === pages) return;
    setPages(pages + 1);
  }, [inView]);
  useEffect(() => {
    if (!data) return;
    setNarrowData((prevData) => [...prevData, ...data.dogs]);
  }, [data]);
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
        {(dogs.length > 0
          ? dogs
          : data && (isNarrowScreen ? narrowData : data.dogs)
        )?.map(({ id, name, breed, image }) => (
          <InView key={id}>
            {({ ref, inView }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? "0" : "-100%" }}
                transition={{ duration: 1.25 }}
              >
                <OneDog
                  dataDogs={dataDogs}
                  key={id}
                  id={id}
                  name={name}
                  breed={breed}
                  image={image}
                  page={page}
                />
              </motion.div>
            )}
          </InView>
        ))}
      </ul>
      {page === "home" && data && !isNarrowScreen && (
        <PaginatedItems
          dogs={data.allDogs}
          pages={pages}
          setPages={setPages}
          totalPages={data.totalPages}
        />
      )}
      {isNarrowScreen && !isLoading && <div ref={ref}></div>}
    </div>
  );
};
export default DogsList;
