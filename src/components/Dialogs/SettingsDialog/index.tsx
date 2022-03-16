import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
// import { useEthers } from "@usedapp/core";
import { useContractWrite, useAccount } from "wagmi";

import { Dialog, Form } from "~/components";
import { useDialogSwitch } from "~/hooks";
import { logbookInterface } from "~/utils";

import styles from "./styles.module.css";

type DialogProps = {
  tokenId: string;
  title?: string;
  description?: string;
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseDialog: React.FC<DialogProps> = ({
  tokenId,
  title,
  description,
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  // const { account } = useEthers();

  useEffect(() => {
    console.log("title&summary:", {
      title,
      description,
    });
  }, [title, description]);

  const [{ data: accountData }] = useAccount();
  const [{ loading: multicallLoading }, multicall] = useContractWrite(
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
        title &&
          logbookInterface.encodeFunctionData("setTitle", [tokenId, title]),
        summary &&
          logbookInterface.encodeFunctionData("setDescription", [
            tokenId,
            summary,
          ]),
      ].filter(Boolean),
    ];

    const { error } = await multicall({ args: calldata });

    if (error) {
      console.error("error:", error, formik);

      formik.setErrors({
        title: error?.message || "Failed to set title and summary",
        // summary: errorSummary?.message || "Failed to set summary",
      });
      return;
    }
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
      initialValues={{ title: title as string, summary: description as string }}
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

            <Dialog.Footer.Button
              color="green"
              type="submit"
              // disabled={isSubmitting}
              disabled={isSubmitting || !isValid}
              onClick={submitForm}
            >
              Save
            </Dialog.Footer.Button>
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
