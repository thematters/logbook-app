import React from 'react'
import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/utils'

import { Header } from './Header'
import { Title } from './Title'
import { Footer } from './Footer'

import styles from './styles.module.css'

type paddingType = 'base' | 'loose'

type backgroundType = 'white' | 'transparent'

export interface LogbookCardProps {
  // TODO: 确定tokenid date txhash类型，然后判断是否需要渲染 Header
  tokenID?: string
  date?: string
  txHash?: string
  padding?: paddingType
  background?: backgroundType
  shadow?: boolean
  border?: boolean
  borderHover?: boolean
  [key: string]: any
}

export const LogbookCard: React.FC<LogbookCardProps> = ({
  tokenID,
  date,
  txHash,
  padding = '',
  background = 'transparent',
  shadow,
  border,
  borderHover,
}) => {
  const containerClass = classNames({
    [styles.logbookCard]: true,
    [styles[`padding${capitalizeFirstLetter(padding)}`]]: padding !== '',
    [styles[`bg${capitalizeFirstLetter(background)}`]]: true,
    [styles.shadow]: !!shadow,
    [styles.border]: !!border,
    [styles.borderHover]: !!borderHover,
  })

  // TODO: deal with token id, date, txHash

  let content = `
      Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit`

  return (
    <div className={containerClass}>
      <Header />
      <Title title={content} date="223 " />
      <section>
        <p className={styles.content}>{content}</p>
      </section>
      <Footer exchange={10} history={12} txHash="2342345"></Footer>
    </div>
  )
}
