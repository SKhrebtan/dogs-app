import Image from "next/image";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useUpdateDogMutation } from "../store/dogs/dogsSlice";
const DogDetailsPage = ({ dog }) => {
  const { id, name, breed, image } = dog;
  const [edit, setEdit] = useState(false);
  const [updateDog] = useUpdateDogMutation();
  const { t } = useTranslation();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const firstPart = pathParts[1];
  const secondPart = pathParts[2];

  const initialValues = {
    name: "",
    breed: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    breed: Yup.string().required("Breed is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { name, breed } = values;
    try {
      const updatedDog = {
        name,
        breed,
      };
      const { data } = await updateDog({ id, updatedDog });
      resetForm();
      setEdit(false);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="p-[20px] flex mobile:flex-col mobile:align-center desktop:flex-row gap-[40px]">
      <div className="mobile:h-[350px] tablet:h-[750px] mobile:w-full desktop:h-[550px] desktop:w-[1050px] p-[20px] relative">
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
      {edit ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="breed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Breed:
                </label>
                <Field
                  type="text"
                  id="breed"
                  name="breed"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="breed"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                className="bg-red-300 mobile:w-[140px] hover:bg-red-500 mr-[70px] hover:shadow-lg ease-linear duration-300 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-row gap-[10px]">
            <p className="text-amber-500 text-3xl">{t("name")}:</p>
            <p className="text-lime-700 text-3xl">{name}</p>
          </div>
          <div className="flex flex-row gap-[10px]">
            <p className="text-amber-500 text-3xl">{t("breed")}:</p>
            <p className="text-lime-700 text-3xl">{breed}</p>
          </div>
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="bg-blue-300 mobile:w-[180px]  self-center hover:bg-blue-700 hover:shadow-lg ease-linear duration-300 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <Link
            href={
              secondPart === "alldogs"
                ? `/${firstPart}`
                : `/${firstPart}/mydogs`
            }
            className="bg-teal-300 mobile:w-[140px] self-center desktop:self-start  hover:bg-teal-500 hover:shadow-lg ease-linear duration-300 text-white text-center font-bold py-2 px-4 rounded"
          >
            {t("back")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DogDetailsPage;
