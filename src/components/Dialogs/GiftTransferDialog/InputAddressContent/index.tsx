import { useEnsResolveName, useContractWrite, useAccount } from "wagmi";
import _debounce from "lodash/debounce";
import { utils } from "ethers";
import { Formik, FormikHelpers } from "formik";

import { Dialog, Form } from "~/components";
import { logbookInterface } from "~/utils";

type Props = {
  tokenId: string;
  next: () => void;
};

export const InputAddressContent: React.FC<Props> = ({ tokenId, next }) => {
  const [{ data: accountData }] = useAccount();
  const [{ loading: ensLoading }, resolveName] = useEnsResolveName();
  const [{ loading: transferLoading }, transfer] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: logbookInterface,
    },
    "transferFrom"
  );

  const account = accountData?.address;

  const onSubmit = async (
    {
      address,
    }: {
      address: string;
    },
    formik: FormikHelpers<{
      address: string;
    }>
  ) => {
    // TODO: analytics

    console.log("transfering to:", [account, address, tokenId]);

    const { data, error } = await transfer({
      args: [account, address, tokenId],
    });

    console.log("transfering to:", [account, address, tokenId], {
      data,
      error,
    });

    if (error) {
      formik.setErrors({ address: error?.message || "Failed to transfer" });
      return;
    }

    console.log("transfered:", data);

    next();
  };

  const onValidate = async ({ address }: { address: string }) => {
    // validate address
    if (utils.isAddress(address)) {
      return;
    }

    // try resolve ENS name
    if (address.indexOf(".eth") >= 0) {
      const { data, error } = await resolveName({ name: address });
      if (error) {
        return { address: "Invalid address or ENS name" };
      }
    }

    // neither address or ENS
    return { address: "Invalid address or ENS name" };
  };

  return (
    <Formik
      initialValues={{ address: "" }}
      onSubmit={onSubmit}
      validate={onValidate}
    >
      {({ values, isSubmitting, isValid, submitForm }) => (
        <>
          <Dialog.Content>
            <p>Wallet address or ENS name</p>

            <Form>
              <Form.Field
                as="input"
                type="text"
                name="address"
                placeholder="e.g. 0xFb3... or matters.eth"
                hint={`"Travelogger #${tokenId}" will be transferred to ${
                  values.address || "..."
                }`}
              />
            </Form>
          </Dialog.Content>

          <Dialog.Footer.Button
            color="green"
            type="submit"
            disabled={ensLoading || isSubmitting || transferLoading || !isValid}
            onClick={submitForm}
          >
            Send
          </Dialog.Footer.Button>
        </>
      )}
    </Formik>
  );
};
