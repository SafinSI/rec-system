import React from "react"

export const TableHeader = ({ columns }: { columns: Array<JSX.Element | string> }) => {
  return (
    <thead>
      <tr key={0}>
        {columns.map((item, i) => (
          <th key={i}>{item}</th>
        ))}
      </tr>
    </thead>
  )
}
