import React, { useState } from "react";

import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";



import {
  Head,
  Form,
  LogbookCard,
  LogbookCardProps,
  InfiniteScroll,
} from "~/components";

import { BookList } from "./BookList";

interface FormValues {
  title: string;
  description: string;
}

const EditLogbookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(45, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(240, "Too Long!")
    .required("Required"),
});

const Library: React.FC = () => {
  const initialValues: FormValues = { title: "", description: "" };

  const handleSubmit = ({ title, description }: FormValues) => {
    console.log({ title, description });
  };

  return (
    <>
      <Head title="Library" />

      <h1>Library</h1>


        <BookList />

    </>
  );
};

export default Library;
