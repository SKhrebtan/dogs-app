import {
  useDeleteDogMutation,
  useAddDogMutation,
  useGetDogsQuery,
} from "../store/dogs/dogsSlice";
import Image from "next/image";
import Svg from "../../assets/images/heart-svgrepo-com.svg";
import { redirect } from "next/dist/server/api-utils";
export const DogButton = ({ dog, page, id, children }) => {
  const [deleteContact] = useDeleteDogMutation();
  const { data } = useGetDogsQuery();
  const [addDog] = useAddDogMutation();
  const isAdded = data?.find((el) => el.name === dog.name);

  const handleBtnAction = async (page, id) => {
    if (page === "mydogs") {
      await deleteContact(id);
    } else {
      if (isAdded) {
        await deleteContact(isAdded.id);
      } else {
        await addDog(dog);
      }
    }
  };

  return page === "mydogs" ? (
    <button
      type="button"
      onClick={() => handleBtnAction(page, id)}
      className={`px-4 py-2 rounded transition duration-300 bg-red-500  hover:bg-red-700 text-white`}
    >
      {children}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => handleBtnAction(page, id)}
      className={`${
        isAdded
          ? "w-10 h-10 text-red-500" // якщо isAdded true, встановити червоний колір
          : "w-10 h-10 text-gray-500" // якщо isAdded false, встановити сірий колір
      }`}
    >
      <Svg />
      {/* <Image
        src={heartIcon}
        alt="Follow us on Twitter"
        className={`${
          isAdded
            ? "w-6 h-6 text-red-500" // якщо isAdded true, встановити червоний колір
            : "w-6 h-6 text-gray-500" // якщо isAdded false, встановити сірий колір
        }`}
      /> */}
    </button>

    // <button
    //   type="button"
    //   onClick={() => handleBtnAction(page, id)}
    //   className={`px-4 py-2 rounded transition duration-300 ${
    //     page === "home"
    //       ? "bg-blue-500  hover:bg-blue-700"
    //       : "bg-red-500  hover:bg-red-700"
    //   } text-white`}
    // >
    //   {children}
    // </button>
  );
};
