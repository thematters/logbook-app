import React from "react";
import classNames from "classnames";

import {
  IconLibrary,
  IconBookcase,
  IconWalletGradient,
  IconSize,
} from '~/components'
import Item from "./Item";

import { useResponsive } from "~/hooks";

import styles from './styles.module.css'

type ItemListProps = {
  show: boolean
}

const ItemList: React.FC<ItemListProps> = ({show}) => {
  const containerClasses = classNames({
    [styles.itemList]: true,
    [styles.show]: show,
  })
  const isSmallUp = useResponsive('sm-up')
  let iconSize: IconSize = 'mdS'
  if (isSmallUp) {
    iconSize = 'md'
  }
    return (
      <>
        <ul className={containerClasses}>
          <Item
            href="library"
            text="Library"
            icon={<IconLibrary size={iconSize} />}
          ></Item>
          <Item
            href="bookcase"
            text="My Bookcase"
            icon={<IconBookcase size={iconSize} />}
          ></Item>
          <Item
            text="Connect Wallet"
            icon={<IconWalletGradient size={iconSize} />}
            onClick={() => {
              // TODO: open connect wallet dialog
              console.log('Connect Wallet Click')
            }}
          ></Item>
        </ul>
      </>
    )
}

export default ItemList
