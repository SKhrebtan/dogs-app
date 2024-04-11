import {
  useDeleteDogMutation,
  useAddDogMutation,
  useDeleteDogAllListMutation,
} from "../store/dogs/dogsSlice";
import Svg from "../../assets/images/heart-svgrepo-com.svg";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export const DogButton = ({ dog, page, id, children, dataDogs }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { data: sessiondata } = useSession();
  const [deleteContact] = useDeleteDogMutation();
  const [addDog] = useAddDogMutation();
  const [deleteDogAllList] = useDeleteDogAllListMutation();

  useEffect(() => {
    setIsAdded(dataDogs?.find((el) => el.name === dog.name));
  }, [sessiondata, dataDogs]);
  const user = sessiondata?.user;

  const handleBtnAction = async (page, id, role, token) => {
    if (page === "mydogs") {
      await deleteContact(id);
    } else {
      if (role === "admin") {
        await deleteDogAllList(id);
        return;
      }
      if (isAdded) {
        await deleteContact(isAdded.id);
      } else {
        await addDog(dog);
      }
    }
  };

  return (
    sessiondata &&
    (page === "mydogs" ? (
      <button
        type="button"
        onClick={() => handleBtnAction(page, id)}
        className={`px-4 py-2 rounded transition duration-300 bg-red-500  hover:bg-red-700 text-white`}
      >
        {children}
      </button>
    ) : user.role === "admin" ? (
      <button
        className="px-4 py-2 rounded transition duration-300 bg-red-500 text-white hover:bg-red-700"
        type="button"
        onClick={() => handleBtnAction(page, id, user.role, user.token)}
      >
        Delete
      </button>
    ) : (
      <button
        type="button"
        onClick={() => handleBtnAction(page, id)}
        className={`${
          isAdded
            ? "w-10 h-10 text-red-500"
            : "w-10 h-10 text-gray-500 dark:text-teal-50"
        }`}
      >
        <Svg />
      </button>
    ))
  );
};
