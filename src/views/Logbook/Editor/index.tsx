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
          }

          .remirror-theme .ProseMirror,
          .remirror-theme .ProseMirror:active,
          .remirror-theme .ProseMirror:focus {
            min-height: var(--rmr-space-6);
            box-shadow: unset;
            padding: unset;
            border-radius: unset;
            outline: none;
          }

          .remirror-theme a:link,
          .remirror-theme a:visited {
            color: var(--color-gradient-green-start);
            text-decoration: underline;
          }

          .remirror-editor.ProseMirror ul,
          .remirror-editor.ProseMirror ol {
            list-style: unset;
          }

          .remirror-editor.ProseMirror {
            overflow-y: hidden;
          }

          .remirror-editor ol > li > .remirror-list-item-marker-container,
          .remirror-editor ul > li.remirror-list-item-with-custom-mark,
          .remirror-editor
            .remirror-ul-list-content
            > li.remirror-list-item-with-custom-mark {
            list-style: inside;
          }

          .remirror-editor.ProseMirror li {
            position: relative;
            list-style: reset;
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

export default Editor;
