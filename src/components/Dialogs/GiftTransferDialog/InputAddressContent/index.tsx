import React, { useState } from "react";
import { Formik } from "formik";

import { Button, Dialog, Form, TextIcon } from "~/components";
import { contract } from "~/utils";

type Props = {
  account: string;
  tokenId: string;
  next: () => void;
};

export const InputAddressContent: React.FC<Props> = ({
  account,
  tokenId,
  next,
}) => {
  const [address, setAddress] = useState("");

  return (
    <>
      <Dialog.Content>
        <p>Wallet address or ENS name</p>
        <Formik
          initialValues={{}}
          onSubmit={() => {
            // TODO: analytics
            console.log("submitting...");
            next();
          }}
          validationSchema={null}
        >
          <Form>
            <Form.Field
              as="input"
              name="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // console.log('changed:', e.target.value);
                setAddress(e.target.value);
              }}
              type="text"
              placeholder="e.g. 0xFb3... or matters.eth"
              hint={`"Travelogger #${tokenId}" will be transferred to ${address}`}
            />
          </Form>
        </Formik>
      </Dialog.Content>
      <Dialog.Footer.Button
        color="green"
        onClick={() => {
          contract.transferFrom(account, address, tokenId);
          next();
        }}
      >
        Send
      </Dialog.Footer.Button>
    </>
  );
};
