import _debounce from "lodash/debounce";
import { ethers, utils } from "ethers";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useContract, useContractWrite, useFeeData, useProvider } from "wagmi";

import {
  Button,
  // RichMarkdownEditor,
  Spinner,
  TextIcon,
} from "~/components";
import { logbookInterface } from "~/utils";

import { useResponsive } from "~/hooks";

import type { EditorRef } from "~/components/RichMarkdownEditor/markdown-editor";

const RichMarkdownEditor = dynamic(
  () => import("~/components/RichMarkdownEditor"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

import styles from "./styles.module.css";

interface Props {
  id: string;
  transferCount: string;
  content: string;
  onLeave: () => any;
}

const Editor: React.FC<Props> = ({ id, content, onLeave }) => {
  const [{ loading: publishWaiting }, publish] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      contractInterface: logbookInterface,
    },
    "publish"
  );

  const [isEditing, enableEditing] = useState(false);
  const isSmallUp = useResponsive("sm-up");

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

  const buttonGroup = (
    <div className={styles.buttonGroup}>
      <Button
        width="7.5rem"
        height="3rem"
        bgColor="white"
        borderRadius="1.75rem"
        shadow={true}
        onClick={() => {
          console.log("leave");
          // enableEditing(false);
          onLeave();
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
        <TextIcon color="white">Publish</TextIcon>
      </Button>
    </div>
  );

  return (
    <section className={styles.container}>
      <div className={styles.editing}>
        <div className={styles.gasEstimate}>Gas: {estimate} MATIC</div>
        {isSmallUp && buttonGroup}
      </div>
      <RichMarkdownEditor
        placeholder="Write *something*..."
        initialContent={content}
        editorUpdate={editorUpdate}
        editorRef={editorRef}
      />
      {!isSmallUp && <section className={styles.footer}>{buttonGroup}</section>}
    </section>
  );
};

export default Editor;
