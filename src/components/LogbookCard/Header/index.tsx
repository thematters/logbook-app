import React from 'react'
import { Button, TextIcon } from '~/components'

import styles from './styles.module.css'
import { useResponsive } from '~/hooks'

export interface HeaderProps {
  tokenID?: string
  date?: string
  txHash?: string
  [key: string]: any
}

export const Header: React.FC<HeaderProps> = ({ tokenID, date, txHash }) => {
  // TODO: 格式化 tokenID,
  const formattedID = '#1150'

  // TODO: 格式化 date
  const formattedDate = 'Dec 10,2021'

  // TODO: 格式化 txHash
  const formattedHash = '9r53...22vT'

  const isSmallUp = useResponsive('sm-up')

  let borderRadius = '1rem'
  let width = '6.5625rem'
  let height = '1.75rem'

  if (isSmallUp) {
    width = '7.1875rem'
    height = '2rem'
  }

  return (
    <section className={styles.header}>
      <div>
        <TextIcon color="blueGreen" weight="medium">
          {formattedID}
        </TextIcon>
        <TextIcon color="grey" weight="normal">
          <span className={styles.interpunct}>·</span>
          {formattedDate}
        </TextIcon>
      </div>
      <Button
        width={width}
        height={height}
        borderRadius={borderRadius}
        bgColor="greyLighter"
        is="span"
      >
        <TextIcon color="greyDark">{formattedHash}</TextIcon>
      </Button>
    </section>
  )
}
