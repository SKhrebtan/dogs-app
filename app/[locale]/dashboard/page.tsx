"use client";

import DogForm from "./components/DogForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Dashboard() {
  const { data: session } = useSession();
  const user: any = session?.user;
  if (!session && !(user?.role === "admin")) {
    redirect("/");
  }
  return (
    <>
      <DogForm />
    </>
  );
}
