import { SortingCell } from "../../components"
import { BuildColumns } from "../TablePage"

export const buildColumns: BuildColumns = (sortField, typeSort, changeSortField, setUrlState) => [
  <SortingCell
    name={"Номер статьи"}
    id={"id"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />,
  <SortingCell
    name={"Название"}
    id={"name"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />
]
