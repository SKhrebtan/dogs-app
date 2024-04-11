"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Axios } from "@/app/api/httprequests";
import { useAddDogAllListMutation } from "@/app/store/dogs/dogsSlice";
const DogForm = () => {
  const [addDogAllList, { isLoading }] = useAddDogAllListMutation();
  const initialValues = {
    name: "",
    breed: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    breed: Yup.string().required("Breed is required"),
    file: Yup.mixed().required("Photo is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("breed", values.breed);
      formData.append("file", values.file);
      const response = await addDogAllList(formData);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
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
              className="block text-sm font-medium text-gray-700 dark:text-teal-300"
            >
              Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-teal-300"
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
              className="block text-sm font-medium text-gray-700 dark:text-teal-300"
            >
              Breed:
            </label>
            <Field
              type="text"
              id="breed"
              name="breed"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-teal-300"
            />
            <ErrorMessage
              name="breed"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Photo:
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 text-gray-700 cursor-pointer shadow-sm hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:text-teal-300"
              >
                Choose a file
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) =>
                    setFieldValue("file", event.currentTarget.files[0])
                  }
                  className="sr-only"
                />
              </label>
              <span>{values.file ? values.file.name : "No file chosen"}</span>
            </div>
            <ErrorMessage
              name="photo"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-block px-4 py-2 rounded focus:outline-none ${
              isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700"
            }`}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DogForm;
