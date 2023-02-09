import React from "react"
import { TableRow } from "./TableRow"
import { TableHeader } from "./TableHeader"
import tableStyle from "./TableStyle.module.css"

export type DataItem = Record<string, any> & { id: number }
export type DataDecorator = (item: DataItem) => DataItem | string | JSX.Element

type TableProps = {
  data: Array<DataItem>
  columns: Array<string | JSX.Element>
  dataDecorator?: DataDecorator
  choiseRows: (id: number) => void
  noDataMessage?: string
}

const TableView = ({
  data,
  columns,
  dataDecorator,
  choiseRows,
  noDataMessage = "Отсутствуют данные в таблице "
}: TableProps) => {
  console.log("render table")

  const onTableRowClick = (id) => (event) => {
    const eltColor = event.currentTarget.style.backgroundColor
    event.currentTarget.style.backgroundColor = eltColor ? "" : "#DBDBDB"
    choiseRows(id)
  }

  return (
    <div className={tableStyle.wrapper}>
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
