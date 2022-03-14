import _debounce from "lodash/debounce";
import { ethers, utils } from "ethers";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  useAccount,
  useContract,
  useContractWrite,
  useFeeData,
  useProvider,
} from "wagmi";

import {
  Button,
  Card,
  DropdownDialog,
  GiftTransferDialog,
  IconEdit,
  IconGift,
  IconMore,
  IconShare,
  IconShoppingCart,
  IconSettings,
  SettingsDialog,
  // RichMarkdownEditor,
  Spinner,
  TextIcon,
} from "~/components";
import { logbookABI, logbookInterface } from "~/utils";

import type { EditorRef } from "~/components/RichMarkdownEditor/markdown-editor";

const RichMarkdownEditor = dynamic(
  () => import("~/components/RichMarkdownEditor"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

import styles from "./styles.module.css";

const DropdownMenu: React.FC<{ id: string; openSettingsDialog: () => any }> = ({
  id,
  openSettingsDialog,
}) => (
  <ul role="menu" className={styles.menu}>
    <li role="menu-item">
      <Card>
        <IconShare size="md" />
        <TextIcon>Share this Logbook</TextIcon>
      </Card>
    </li>
    <li role="menu-item">
      <Card htmlHref={`https://opensea.io/${id}`} htmlTarget="_blank">
        <IconShoppingCart size="md" />
        <TextIcon>OpenSea page</TextIcon>
      </Card>
    </li>
    <li role="menu-item">
      <Card onClick={openSettingsDialog}>
        <IconSettings size="md" />
        <TextIcon>Setting</TextIcon>
      </Card>
    </li>
  </ul>
);

interface Props {
  id: string;
  transferCount: string;
  content: string;
}

const BookcaseDetail: React.FC<Props> = ({ id, transferCount, content }) => {
  // const [{ data: accountData }] = useAccount();
  const [{ loading: publishWaiting }, publish] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      contractInterface: logbookInterface,
    },
    "publish"
  );

  const [isEditing, enableEditing] = useState(false);

  const [estimate, setEstimate] = useState("0.05");

  const editorRef = useRef<EditorRef | null>(null);

  const provider = useProvider();
  const logbookContract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    contractInterface: logbookInterface,
    signerOrProvider: provider,
  });

  const [{ data: feeData, error: errorFeeData }, getFeeData] = useFeeData({
    // skip: true,
    watch: true,
  });

  const editorUpdate = _debounce(async ({ content }: { content: string }) => {
    console.log("got update:", { content, errorFeeData });
    // estimate
    if (errorFeeData) {
      console.error(`error getting fee:`, errorFeeData);
      return;
    }

    /* await Promise.all([
      logbookContract.estimateGas.publish(id, content),
      getFeeData(),
    ]); */

    const gasNeeded =
      // data: { gasPrice, maxFeePerGas, maxPriorityFeePerGas },
      await logbookContract.estimateGas.publish(id, content);

    // add buffer
    const maxGasNeeded = gasNeeded.mul(4).div(3); // +33%

    console.log("get maxGasNeeded:", { maxGasNeeded, feeData });

    const { gasPrice, maxPriorityFeePerGas } = feeData!;

    const estimate = utils.formatUnits(
      maxGasNeeded.mul(
        ethers.BigNumber.from(0).add(gasPrice!).add(maxPriorityFeePerGas!)
      )
    );

    console.log("get feeData:", {
      gasNeeded,
      feeData, // gasPrice, maxFeePerGas, maxPriorityFeePerGas,
      estimate,
    });

    setEstimate(estimate);
  }, 1300);

  const onPublish = async () => {
    const content = editorRef.current?.getMarkdown();
    console.log("publish:", { content });
    // editorRef.current!.setContent(`### title3`);

    const { error } = await publish({
      args: [id, content],
    });

    if (error) {
      console.error("publish error:", error);
      return;
    }

    if (!error) {
      // published
      console.log("published:");
    }
  };

  return (
    <section className={styles.container}>
      <h2>Book {id}</h2>
      {!isEditing && (
        <div className={styles.subtitle}>
          <div>Transfer {transferCount}</div>
          <div className={styles.actions}>
            <Button
              borderRadius="50%"
              onClick={() => {
                // TODO: analytics
                console.log("Edit");
                enableEditing(true);
              }}
            >
              <IconEdit
                size="xl"
                weight="bold"
                color="green"
                className={styles.scaleUp}
              />
            </Button>

            <GiftTransferDialog tokenId={id}>
              {({ openDialog }) => (
                <Button
                  onClick={() => {
                    // TODO: analytics
                    openDialog();
                    console.log("Gift");
                  }}
                >
                  <IconGift size="xl" className={styles.scaleUp} />
                </Button>
              )}
            </GiftTransferDialog>

            <SettingsDialog tokenId={id}>
              {({ openDialog: openSettingsDialog }) => (
                <DropdownDialog
                  dropdown={{
                    content: (
                      <DropdownMenu
                        id={id}
                        openSettingsDialog={openSettingsDialog}
                      />
                    ),
                    placement: "bottom-end",
                  }}
                  dialog={{
                    title: "moreActions",
                    content: (
                      <DropdownMenu
                        id={id}
                        openSettingsDialog={openSettingsDialog}
                      />
                    ),
                  }}
                >
                  {({ openDialog, ref }) => (
                    <Button ref={ref} onClick={openDialog}>
                      <IconMore
                        size="xl"
                        weight="bold"
                        className={styles.scaleUp}
                      />
                    </Button>
                  )}
                </DropdownDialog>
              )}
            </SettingsDialog>
          </div>
        </div>
      )}
      {isEditing && (
        <>
          <div className={styles.editing}>
            <div>Gas: {estimate} MATIC</div>
            <div>
              <Button
                width="7.5rem"
                height="3rem"
                bgColor="white"
                borderRadius="1.75rem"
                shadow={true}
                onClick={() => {
                  console.log("leave");
                  enableEditing(false);
                }}
              >
                <TextIcon>Leave</TextIcon>
              </Button>
              <Button
                width="7.5rem"
                height="3rem"
                bgColor="blueGreen"
                // bgActiveColor="greenLighter"
                borderRadius="1.75rem"
                shadow={true}
                disabled={publishWaiting}
                onClick={onPublish}
              >
                <TextIcon>Publish</TextIcon>
              </Button>
            </div>
          </div>
          <RichMarkdownEditor
            placeholder="Write *something*..."
            initialContent={content}
            editorUpdate={editorUpdate}
            editorRef={editorRef}
          />
        </>
      )}
    </section>
  );
};

export default BookcaseDetail;
