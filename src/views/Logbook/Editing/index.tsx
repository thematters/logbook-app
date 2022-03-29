import _debounce from "lodash/debounce";
import { ethers, utils } from "ethers";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useContract, useContractWrite, useFeeData, useProvider } from "wagmi";

import {
  Button,
  IconInfo,
  // RichMarkdownEditor,
  Spinner,
  TextIcon,
  WaitCompleteDialog,
} from "~/components";
import { logbookInterface } from "~/utils";

import { useResponsive } from "~/hooks";

import type { EditorRef } from "~/components/RichMarkdownEditor/markdown-editor";

import { ConfirmLeaveDialog } from "./ConfirmLeaveDialog";

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
  content?: string;
  setContent: (arg0: string) => void;
  onLeave: () => any;
}

export const Editing: React.FC<Props> = ({
  id,
  content,
  setContent,
  onLeave,
}) => {
  const [{ data: dataPublishing, loading: publishWaiting }, publish] =
    useContractWrite(
      {
        addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        contractInterface: logbookInterface,
      },
      "publish"
    );

  const isSmallUp = useResponsive("sm-up");

  const [estimate, setEstimate] = useState("0.005");

  const editorRef = useRef<EditorRef | null>(null);

  const provider = useProvider();
  const logbookContract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    contractInterface: logbookInterface,
    signerOrProvider: provider,
  });

  const [
    { data: feeData, loading: loadingFeeData, error: errorFeeData },
    getFeeData,
  ] = useFeeData({
    // skip: true,
    watch: true,
  });

  const editorUpdate = _debounce(async ({ content }: { content: string }) => {
    // console.log("got update:", { content, errorFeeData });
    setContent(content);

    // estimate
    if (errorFeeData || loadingFeeData) {
      console.error(
        `error getting fee or still loading:`,
        errorFeeData,
        loadingFeeData
      );
      return;
    }

    const gasNeeded = await logbookContract.estimateGas.publish(id, content);

    // add buffer
    const maxGasNeeded = gasNeeded.mul(4).div(3); // +33%

    // console.log("get maxGasNeeded:", { maxGasNeeded, feeData });

    const { gasPrice, maxPriorityFeePerGas } = feeData!;

    const estimate = (+utils.formatUnits(
      ethers.BigNumber.from(0)
        .add(gasPrice!)
        .add(maxPriorityFeePerGas!)
        .mul(maxGasNeeded)
    )).toFixed(8);

    setEstimate(estimate);
  }, 1300);

  const onPublish = async () => {
    const content = editorRef.current?.getMarkdown();
    setContent(content);

    const { data, error } = await publish({
      args: [id, content],
    });

    if (error) {
      console.error("publish error:", error);
      throw error; // to close dialog
    }

    return data;
  };

  const buttonGroup = (
    <div className={styles.buttonGroup}>
      <ConfirmLeaveDialog onLeave={onLeave}>
        {({ openDialog }) => (
          <Button
            width="7.5rem"
            height="3rem"
            bgColor="white"
            borderRadius="1.75rem"
            shadow
            className={styles.leaveButton}
            onClick={() => {
              openDialog();

              setContent(editorRef.current?.getMarkdown());
            }}
          >
            <TextIcon>Leave</TextIcon>
          </Button>
        )}
      </ConfirmLeaveDialog>
      <WaitCompleteDialog id={id} hash={dataPublishing?.hash as string}>
        {({ openDialog, closeDialog }) => (
          <Button
            width="7.5rem"
            height="3rem"
            bgColor="blueGreen"
            bgActiveColor="blueGreenDarker"
            shadow
            borderRadius="1.75rem"
            disabled={publishWaiting}
            onClick={() => {
              openDialog();
              onPublish().catch((err) => {
                closeDialog?.();
              });
            }}
          >
            <TextIcon color="white">Publish</TextIcon>
          </Button>
        )}
      </WaitCompleteDialog>
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
        hint={
          <TextIcon
            size="smS"
            color="grey"
            spacing="xxTight"
            icon={<IconInfo />}
          >
            <span className={styles.hint}>
              Logbook 2.0 support Markdown editor
            </span>
          </TextIcon>
        }
      />
      {!isSmallUp && <section className={styles.footer}>{buttonGroup}</section>}
      <style jsx global>
        {`
          html {
            background-color: var(--color-white);
          }
          @media (min-width: 768px) {
            div.l-container > main.l-row {
              z-index: var(--z-index-header);
            }
          }

          .remirror-theme .remirror-toolbar {
            background-color: transparent;
            position: sticky;
            top: 0;
            z-index: var(--z-index-above);
          }

          .remirror-theme .ProseMirror,
          .remirror-theme .ProseMirror:active,
          .remirror-theme .ProseMirror:focus {
            min-height: var(--rmr-space-6);
            box-shadow: unset;
            padding: unset;
            border-radius: unset;
            outline: none;
            color: var(--color-grey-darker);
          }

          .remirror-theme a:link,
          .remirror-theme a:visited {
            color: var(--color-gradient-green-start);
            text-decoration: underline;
          }

          .remirror-editor.ProseMirror {
            overflow-y: hidden;
          }

          .remirror-editor.ProseMirror img {
            max-width: 100%;
          }

          .remirror-button {
            border: 0;
          }

          .remirror-a11y-dark :not(pre) > code[class*="language-"],
          .remirror-a11y-dark pre[class*="language-"] {
            background: #ededed;
          }
          .remirror-a11y-dark code[class*="language-"],
          .remirror-a11y-dark pre[class*="language-"] {
            color: var(--color-black);
          }
        `}
      </style>
    </section>
  );
};
