import React from 'react'

import { TextIcon, IconGiftSign } from '~/components'

import styles from './styles.module.css'

export interface TitleProps {
  title: string
  date?: string
}

export const Title: React.FC<TitleProps> = ({ title, date }) => {
  // TODO: 禮物符號存在於用戶剛拿到書籍的前三天，之後即消失
  let hasGiftSign = false
  if (date) {
    hasGiftSign = true
  }
  if (hasGiftSign) {
    return (
      <section className={styles.titleContainer}>
        <IconGiftSign size="xxs" className={styles.giftSign}/>
        <p className={styles.content}>{title}</p>
      </section>
    )
  }
  return (
    <section className={styles.titleContainer}>
      <p className={styles.content}>{title}</p>
    </section>
  )
}
