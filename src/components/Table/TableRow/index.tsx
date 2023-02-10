import React from "react"
import { DataItem } from "../types"

type TableRowProps = {
  data: DataItem
  className: string
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export const TableRow = ({ data, className, onClick }: TableRowProps) => {
  return (
    <tr className={className} onClick={onClick}>
      {Object.values(data).map((item, i) => (
        <td key={i}>{item}</td>
      ))}
    </tr>
  )
}
