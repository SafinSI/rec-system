import React from "react"
import styles from "./style.module.css"

type SortingCellProps = {
  name: string
  id: string
  sortField: string
  typeSort: boolean
  onClick: (id: string) => void
  children?: JSX.Element
}

export const SortingCell: React.FC<SortingCellProps> = ({ name, id, sortField, typeSort, onClick, children }) => {
  return (
    <div className={styles.wrapper} onClick={() => onClick(id)}>
      <p className={styles.name}>{name}</p>
      <div className={styles.arrows}>
        <div
          className={styles.arrow}
          style={{
            borderBottom: `5px solid ${id === sortField && typeSort ? "#597dff" : "#c0c0c0"}`
          }}
        />
        <div
          className={styles.arrow}
          style={{
            borderTop: `5px solid ${id === sortField && !typeSort ? "#597dff" : "#c0c0c0"}`
          }}
        />
      </div>
      {children}
    </div>
  )
}
