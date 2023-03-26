export type DataItem = Record<string, any> & { id: number }
export type DataDecorator = (item: DataItem) => DataItem

export type TableProps = {
  data: Array<DataItem>
  columns: Array<string | JSX.Element>
  dataDecorator?: DataDecorator
  choiseRows: (id: number) => void
  noDataMessage?: string
  className?: string
}
