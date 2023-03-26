import { SortingCell } from "../../components"
import { BuildColumns } from "../TablePage"

export const buildColumns: BuildColumns = (sortField, typeSort, changeSortField, setUrlState) => [
  <SortingCell
    name={"Номер"}
    id={"id"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />,
  <SortingCell
    name={"Название конференции"}
    id={"name"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />
]
