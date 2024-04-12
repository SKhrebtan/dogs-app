import {
  useDeleteDogMutation,
  useAddDogMutation,
  useDeleteDogAllListMutation,
} from "../store/dogs/dogsSlice";
import Svg from "../../assets/images/heart-svgrepo-com.svg";
import { useSession } from "next-auth/react";
import { useState, useEffect, FC } from "react";

interface Dog {
  id: string;
  name: string;
  breed: string;
  image: string;
}

interface Props {
  dog: Dog;
  page: string;
  id: number;
  children: React.ReactNode;
  dataDogs: Dog[];
}

export const DogButton: FC<Props> = ({ dog, page, id, children, dataDogs }) => {
 const [isAdded, setIsAdded] = useState<Dog | undefined>(undefined);
  const { data: sessiondata } = useSession();
  const [deleteContact] = useDeleteDogMutation();
  const [addDog] = useAddDogMutation();
  const [deleteDogAllList] = useDeleteDogAllListMutation();

  useEffect(() => {
    const addedDog = dataDogs?.find((el) => el.name === dog.name);
    setIsAdded(addedDog);
  }, [sessiondata, dataDogs]);
  let user: any;
  if (sessiondata) {
    user = sessiondata?.user;
  }

  const handleBtnAction = async (
    page: string,
    id: number,
    role?: string,
    token?: string
  ) => {
    if (page === "mydogs") {
      await deleteContact(id);
    } else {
      if (role === "admin") {
        await deleteDogAllList(id);
        return;
      }
      if (isAdded) {
        console.log(isAdded);
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
