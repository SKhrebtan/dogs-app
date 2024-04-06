"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DogButton } from "./DogButton";
import { usePathname } from "next/navigation";

export const OneDog = ({ breed, name, image, page, id, dataDogs = [] }) => {
  const router = usePathname();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <li className="hover:shadow-md hover:shadow-gray-500 transition duration-300">
      <Link href={`${router}/${String(id)}`}>
        <div className="h-64 relative">
          <Image
            priority
            src={image}
            alt={name}
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </Link>
      <div className="flex flex-row justify-between p-[10px]">
        <div>
          <p>Name: {name}</p>
          <p>Breed: {breed}</p>
        </div>

        <DogButton
          dataDogs={dataDogs}
          page={page}
          id={id}
          dog={{ breed, name, image }}
        >
          {page === "home" ? "Add" : "Delete"}
        </DogButton>
      </div>
    </li>
  );
};
