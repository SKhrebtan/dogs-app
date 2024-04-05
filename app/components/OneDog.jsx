"use client";
import Image from "next/image";
import { useState } from "react";
import { DogButton } from "./DogButton";
export const OneDog = ({ breed, name, image, page, id }) => {
  return (
    <li className="hover:shadow-md hover:shadow-gray-500 transition duration-300">
      <div className="h-64 relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-row justify-between p-[10px]">
        <div>
          <p>Name: {name}</p>
          <p>Breed: {breed}</p>
        </div>

        <DogButton page={page} id={id} dog={{ breed, name, image }}>
          {page === "home" ? "Add" : "Delete"}
        </DogButton>
      </div>
    </li>
  );
};
