import React from "react"

import { IconProps, withIcon } from "../withIcon"
import { ReactComponent as Icon } from "./spinner.svg"
import styles from "./styles.module.css"

export const IconSpinner: React.FC<IconProps> = props => (
  <span className={styles.icon}>{withIcon(Icon)(props)}</span>
)
