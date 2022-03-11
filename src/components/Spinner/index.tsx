import React from "react"

import { IconSpinner } from "~/components"

import styles from "./styles.module.css"

export const Spinner = () => {
  return (
    <div className={styles.spinner} aria-label="Loading...">
      <IconSpinner color="greyLight" size="lg" />
    </div>
  )
}
