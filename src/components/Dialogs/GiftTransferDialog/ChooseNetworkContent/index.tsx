import React from "react";

import {
  Dialog,
  SelectButton,
  IconWallet,
  IconMaskNetwork,
  IconAngleRight,
} from "~/components";

type Props = {
  next: () => void;
};

export const ChooseNetworkContent: React.FC<Props> = ({ next }) => (
  <Dialog.Content>
    <section>
      <SelectButton
        title="Wallet address or ENS"
        leftIcon={<IconWallet size="xlM" />}
        right={<IconAngleRight />}
        onClick={next}
        // disabled={disabled || loading}
      />
    </section>
    <section>
      <SelectButton
        title="Mask Network"
        leftIcon={<IconMaskNetwork size="xlM" />}
        right={<IconAngleRight />}
        // onClick={next}
        // disabled={disabled || loading}
      />
    </section>
  </Dialog.Content>
);
