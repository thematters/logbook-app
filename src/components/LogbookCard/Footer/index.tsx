import React from 'react'

import {
  Button,
  TextIcon,
  IconExchange,
  IconFile,
  IconShare,
} from '~/components'

import styles from './styles.module.css'

import { useResponsive } from '~/hooks'

export interface FooterProps {
  exchange?: Number
  history?: Number
  txHash?: string
  [key: string]: any
}

export const Footer: React.FC<FooterProps> = ({
  exchange,
  history,
  txHash,
}) => {
  const isSmallUp = useResponsive('sm-up')
  // TODO: 格式化 txHash
  let formattedHash = '9r...2vT'
  if (isSmallUp) {
    formattedHash = '9r53...22vT'
  }

  let borderRadius = '1rem'
  let width = '3.25rem'
  let height = '1.75rem'
  let hashWidth = '5.1875rem'

  if (isSmallUp) {
    width = '3.6875rem'
    height = '2rem'
    hashWidth = '7.1875rem'
  }

  return (
    <section className={styles.footer}>
      <Button
        width={width}
        height={height}
        bgColor="greyLighter"
        borderRadius={borderRadius}
        is="span"
        bgActiveColor="greenLighter"
      >
        <TextIcon
          spacing="xTight"
          color="greyDark"
          icon={<IconExchange></IconExchange>}
        >
          {exchange}
        </TextIcon>
      </Button>
      <Button
        width={width}
        height={height}
        bgColor="greyLighter"
        borderRadius={borderRadius}
        is="span"
        bgActiveColor="greenLighter"
      >
        <TextIcon
          spacing="xTight"
          color="greyDark"
          icon={<IconFile></IconFile>}
        >
          {history}
        </TextIcon>
      </Button>
      <Button
        width={height}
        height={height}
        bgColor="greyLighter"
        borderRadius={borderRadius}
        bgActiveColor="greenLighter"
        className={styles.button}
      >
        <TextIcon
          spacing="xTight"
          color="greyDark"
          icon={<IconShare></IconShare>}
        ></TextIcon>
      </Button>
      {txHash ? (
        <Button
          width={hashWidth}
          height={height}
          bgColor="greyLighter"
          borderRadius={borderRadius}
          is="span"
          bgActiveColor="greenLighter"
        >
          <TextIcon spacing="xTight" color="greyDark">
            {formattedHash}
          </TextIcon>
        </Button>
      ) : (
        <></>
      )}
    </section>
  )
}