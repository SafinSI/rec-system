import React from "react"
import { calcClassName } from "../../utils"
import { TableRow } from "./TableRow"
import { TableHeader } from "./TableHeader"
import tableStyle from "./TableStyle.module.css"
import { TableProps } from "./types"

const TableView = ({
  data,
  columns,
  dataDecorator,
  choiseRows,
  noDataMessage = "Отсутствуют данные в таблице ",
  className
}: TableProps) => {
  console.log("render table")

  const onTableRowClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
    const eltColor = event.currentTarget.style.backgroundColor
    event.currentTarget.style.backgroundColor = eltColor ? "" : "#DBDBDB"
    choiseRows(id)
  }

  return (
    <div className={calcClassName([tableStyle.wrapper, className])}>
      <table className={tableStyle.table}>
        <TableHeader columns={columns} />
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.id}
                className={tableStyle.row}
                data={dataDecorator ? dataDecorator(item) : item}
                onClick={onTableRowClick(item.id)}
              />
            ))
          ) : (
            <tr key={1} className={tableStyle.row}>
              <td colSpan={100} style={{ width: "100%" }}>
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const Table = React.memo(TableView)
