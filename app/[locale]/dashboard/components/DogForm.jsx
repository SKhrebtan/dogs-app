"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Axios } from "@/app/api/httprequests";

const DogForm = () => {
  const initialValues = {
    name: "",
    breed: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    breed: Yup.string().required("Breed is required"),
    photo: Yup.mixed().required("Photo is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("breed", values.breed);
      formData.append("file", values.photo);

      const response = await Axios.post("alldogs/new-dog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="breed">Breed:</label>
            <Field type="text" id="breed" name="breed" />
            <ErrorMessage name="breed" component="div" />
          </div>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={(event) =>
                setFieldValue("photo", event.currentTarget.files[0])
              }
            />
            <ErrorMessage name="photo" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DogForm;
