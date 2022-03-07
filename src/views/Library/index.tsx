import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { ethers } from "ethers";

import { Head, Form, LogbookCard, LogbookCardProps } from "~/components";

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

  const cardProps: LogbookCardProps = {
    title:
      "Purus facilisis netus velit pellentesque facilisis os josmlfks Purus facilisis netus velit pellentesque facilisis os josmlfks Purus facilisis netus velit pellentesque facilisis os josmlfks",
    content: `
      Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit`,
    forkCount: ethers.BigNumber.from("5"),
    transferCount: ethers.BigNumber.from("10"),
    tokenID: "0x12",
    createdAt: new Date(1645710788),
    txHash: "0xb4034922182a9111aa114aacc2975a4c0b570925",
  };

  return (
    <>
      <Head title="Library" />

      <h1>Library</h1>

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="logbook">Logbook Detail</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
      </ul>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={EditLogbookSchema}
      >
        {({ values }) => (
          <Form>
            <Form.Field
              as="input"
              name="title"
              hint={`Max length: ${values.title.length}/45}`}
              label="Title"
            />
            <Form.Field
              as="textarea"
              name="description"
              hint={`Max length: ${values.description.length}/240}`}
              label="Summary"
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <div className="l-col-full">
        <LogbookCard padding="base" {...cardProps}></LogbookCard>
        <hr></hr>
        <LogbookCard padding="base" {...cardProps}></LogbookCard>
        <br></br>
        <LogbookCard padding="loose" shadow border {...cardProps}></LogbookCard>
        <br></br>
        <LogbookCard
          padding="loose"
          shadow
          borderHover
          {...cardProps}
        ></LogbookCard>
        <br></br>
      </div>
    </>
  );
};

export default Library;
