import React from 'react'
import classNames from 'classnames'
import { ethers } from "ethers"

import { capitalizeFirstLetter } from '~/utils'

import { Header } from './Header'
import { Title } from './Title'
import { Footer } from './Footer'

import styles from './styles.module.css'

type paddingType = 'base' | 'loose'

type backgroundType = 'white' | 'transparent'

export interface LogbookCardProps {
  title: string;
  content: string;
  publicationCount: ethers.BigNumber;
  transferCount: ethers.BigNumber;
  tokenID?: string;
  createdAt?: Date;
  giftSign?: boolean;
  txHash?: string;
  footerHash?: boolean;
  padding?: paddingType;
  background?: backgroundType;
  shadow?: boolean;
  border?: boolean;
  borderHover?: boolean;
  fixedHeight?: boolean;
  [key: string]: any;
}

export const LogbookCard: React.FC<LogbookCardProps> = ({
  title,
  content,
  publicationCount,
  transferCount,
  tokenID,
  createdAt,
  giftSign,
  txHash,
  footerHash,
  padding = "",
  background = "transparent",
  shadow,
  border,
  borderHover,
  fixedHeight,
  className,
}) => {
  const containerClass = classNames({
    [styles.logbookCard]: true,
    [styles[`padding${capitalizeFirstLetter(padding)}`]]: padding !== "",
    [styles[`bg${capitalizeFirstLetter(background)}`]]: true,
    [styles.shadow]: !!shadow,
    [styles.border]: !!border,
    [styles.borderHover]: !!borderHover,
    [styles.fixedHeight]: !!fixedHeight,
  }, className);

  const contentClasses = classNames({
    [styles.content]: true,
    // TODO: use !!fixedHeight
    [styles.fixedHeight]: !!fixedHeight,
  });

  // TODO: deal with token id, date, txHash

  return (
    <div className={containerClass}>
      {!!tokenID ? (
        <Header tokenID={tokenID} createdAt={createdAt} txHash={txHash} />
      ) : (
        ""
      )}
      <Title
        title={title}
        date={createdAt}
        giftSign={giftSign}
        fixedHeight={fixedHeight}
      />
      <section>
        <p className={contentClasses}>{content}</p>
      </section>
      <Footer
        exchange={transferCount}
        history={publicationCount}
        txHash={!!footerHash && !!txHash ? txHash : ""}
      ></Footer>
    </div>
  );
};
