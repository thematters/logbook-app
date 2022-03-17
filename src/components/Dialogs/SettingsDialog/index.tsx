import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
// import { useEthers } from "@usedapp/core";
import { useContractWrite, useAccount } from "wagmi";

import { Dialog, Form } from "~/components";
import { useDialogSwitch, LogbookContext } from "~/hooks";
import { logbookInterface } from "~/utils";

import { WaitCompleteDialog } from "../WaitCompleteDialog";

import styles from "./styles.module.css";

type DialogProps = {
  id: string;
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseDialog: React.FC<DialogProps> = ({ id, children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  // const { account } = useEthers();

  const logbook = useContext(LogbookContext);

  useEffect(() => {
    console.log("in SettingsDialog: title&summary:", logbook);
  }, [logbook]);

  const [{ data: accountData }] = useAccount();
  const [{ data: multicallData, loading: multicallLoading }, multicall] =
    useContractWrite(
      {
        addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
        contractInterface: logbookInterface,
      },
      "multicall"
    );

  const account = accountData?.address;

  const maxAllowedLength = { title: 45, summary: 240 };

  // const { values, isSubmitting, isValid } = useFormikContext();

  const onSubmit = async (
    { title, summary }: { title: string; summary: string },
    formik: FormikHelpers<{
      title: string;
      summary: string;
    }>
  ) => {
    // TODO: analytics
    console.log("submitting:", { title, summary });

    const calldata = [
      [
        title && logbookInterface.encodeFunctionData("setTitle", [id, title]),
        summary &&
          logbookInterface.encodeFunctionData("setDescription", [id, summary]),
      ].filter(Boolean),
    ];

    const { data, error } = await multicall({ args: calldata });

    if (error) {
      console.error("error:", error, formik);

      formik.setErrors({
        title: error?.message || "Failed to set title and summary",
        // summary: errorSummary?.message || "Failed to set summary",
      });
    }

    console.log("set title&summary:", data);

    closeDialog();
  };

  /* const onValidate = async ({
    title,
    summary,
  }: {
    title: string;
    summary: string;
  }) => {
    const errors = { title: "", summary: "" };
    if (title?.length > maxAllowedLength.title) errors.title = "too long";
    if (summary?.length > maxAllowedLength.summary) errors.summary = "too long";
    if (errors.title || errors.summary) return errors;
    else return;
  }; */

  return (
    <Formik
      initialValues={{
        title: logbook.title as string,
        summary: logbook.description as string,
      }}
      onSubmit={onSubmit}
      // validate={onValidate}
      // onSubmit={() => {console.log("submit!");}}
      // validator={() => ({})}
    >
      {({ values, isSubmitting, isValid, submitForm }) => (
        <>
          {children({ openDialog })}

          <Dialog isOpen={show} onDismiss={closeDialog}>
            <Dialog.Header title="Setting" closeDialog={closeDialog} />

            <Dialog.Content>
              <Form>
                <Form.Field
                  label="Title"
                  as="input"
                  name="title"
                  type="text"
                  value={values.title}
                  hint={
                    <p>
                      Max length:&nbsp;
                      <span
                        className={classNames({
                          [styles.error]:
                            values.title?.length > maxAllowedLength.title,
                        })}
                      >
                        {values.title?.length}
                      </span>
                      /{maxAllowedLength.title}
                    </p>
                  }
                />
                <Form.Field
                  label="Summary"
                  as="textarea"
                  name="summary"
                  type="text"
                  value={values.summary}
                  hint={
                    <p>
                      Max length:&nbsp;
                      <span
                        className={classNames({
                          [styles.error]:
                            values.summary?.length > maxAllowedLength.summary,
                        })}
                      >
                        {values.summary?.length}
                      </span>
                      /{maxAllowedLength.summary}
                    </p>
                  }
                />
              </Form>
            </Dialog.Content>

            <WaitCompleteDialog id={id} hash={multicallData?.hash as string}>
              {({ openDialog, closeDialog }) => (
                <Dialog.Footer.Button
                  color="green"
                  type="submit"
                  // disabled={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  onClick={() => {
                    openDialog();
                    submitForm();
                  }}
                >
                  Save
                </Dialog.Footer.Button>
              )}
            </WaitCompleteDialog>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export const SettingsDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
