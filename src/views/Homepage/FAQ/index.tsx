import { Container, Expandable } from "~/components";

import styles from "./styles.module.css";

const TEXTS = {
  ans1_1:
    'NFT stands for "Non-Fungible Token". It is a special and unique ' +
    "digital item that users can buy, own, and trade.",
  ans1_2:
    "Logbook 2.0 is generated based on ERC-721 and issued on Polygon. As a new " +
    "digital content storage method, NFT conforms to the laws of Matterverse.",
  ans2_1:
    "The owners of Logbook have the right to access and write in the Logbook.",
  ans2_2:
    "The Logbook 2.0 is directly stored on the Polygon Mainnet, and users need to " +
    "pay MATIC, the gas fee for the Polygon network. Before you write in the Logbook, " +
    "confirm the gas fee of your action, which will be shown in your wallet. The MATIC " +
    "gas fee constantly fluctuates, and you can see the most real-time gas fee there.",
  ans3_1: "For now, only Traveloggers owners could claim a new Logbook 2.0.",
  ans3_2: "Once Logbook 2.0 is listed on OpenSea, you can click here for ",
  ans3_3: "purchase instructions",
  ans4_1:
    "Yes, every Traveloggers comes with a Logbook issued on the Polygon. However, since " +
    "Logbook is a transferable NFT that could be only minted once, if the previous owner " +
    "has claimed or transferred it, you will not be able to have a new Logbook to write on.",
  ans4_2: "To check if the Traveloggers’ Logbook has been claimed, check on ",
  ans4_3:
    " by entering the Traveloggers number in the search bar to ensure the transactions.",
  ans4_4:
    "Of course, the easiest way is to buy Traveloggers from official on Opensea: ",
  ans5_1: "You can sell your Logbook 2.0 through OpenSea.",
  ans6_1:
    "Gas fees are the handling fees required when a transaction is initiated on the " +
    "blockchain to compensate miners. When you transfer assets on Polygon chain, gas " +
    "fees are paid to miners for the computing power needed to process and validate transactions.",
};

export const FAQ = () => {
  return (
    <Container>
      <section className={styles.faq}>
        <h1 className={styles.title}>FAQ</h1>

        <Expandable
          customStyles={{ paddingTop: "1.5rem" }}
          title="What is NFT ?  What is Logbook 2.0 ?"
          content={
            <>
              <p>{TEXTS.ans1_1}</p>
              <p>{TEXTS.ans1_2}</p>
            </>
          }
        />

        <Expandable
          title="How do I use Logbook 2.0 ?"
          hasBorder
          content={
            <>
              <p>{TEXTS.ans2_1}</p>
              <p>{TEXTS.ans2_2}</p>
            </>
          }
        />

        <Expandable
          title="How can I purchase Logbook 2.0 on OpenSea ?"
          hasBorder
          content={
            <>
              <p>{TEXTS.ans3_1}</p>
              <p>
                {TEXTS.ans3_2}
                <a
                  className={styles.instruction}
                  href="https://support.opensea.io/hc/en-us/sections/1500000462261-Buying"
                  rel="noreferrer"
                  target="_blank"
                >
                  {TEXTS.ans3_3}
                </a>
              </p>
            </>
          }
        />

        <Expandable
          title="Does every Traveloggers come with a Logbook 2.0 ?"
          hasBorder
          content={
            <>
              <p>{TEXTS.ans4_1}</p>
              <p>
                {TEXTS.ans4_2}
                <a
                  className={styles.instruction}
                  href="https://polygonscan.com/token/0xcdf8d568ec808de5fcbb35849b5bafb5d444d4c0"
                  rel="noreferrer"
                  target="_blank"
                >
                  Polyscan
                </a>
                {TEXTS.ans4_3}
              </p>
              <p>
                {TEXTS.ans4_4}
                <a
                  className={styles.instruction}
                  href="https://opensea.io/Traveloggers"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://opensea.io/Traveloggers
                </a>
              </p>
            </>
          }
        />

        <Expandable
          title="How do I sell Logbook 2.0 ?"
          hasBorder
          content={<p>{TEXTS.ans5_1}</p>}
        />

        <Expandable
          title="What are gas fees? Why are gas fees necessary?"
          hasBorder
          content={<p>{TEXTS.ans6_1}</p>}
        />
      </section>
    </Container>
  );
};
