import _debounce from "lodash/debounce";
import React, { useState } from "react";
import { Formik } from "formik";

import { isAddress } from "@ethersproject/address";

import { Button, Dialog, Form, IconExclaim, TextIcon } from "~/components";

import { alchemyProvider, contract } from "~/utils";

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
  const [error, setError] = useState("");

  const getENSAddress = async (name: string) => {
    try {
      const address = await alchemyProvider.resolveName(name);
      if (address && isAddress(address)) {
        console.log(`resolved ${name} to:`, address);
        setError("");
      } else setError("Invalid address or ENS name");
    } catch (err) {
      console.error("catch error:", err);
    }
    setError("Invalid address or ENS name");
  };

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
                const address = e.target.value as string;
                // console.log('changed:', e.target.value);
                setAddress(address);
                if (isAddress(address)) setError("");
                else getENSAddress(address); // alchemyProvider.resolveName(address) .then(res => );
              }}
              type="text"
              placeholder="e.g. 0xFb3... or matters.eth"
              hint={`"Travelogger #${tokenId}" will be transferred to ${address}`}
              error={error}
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
