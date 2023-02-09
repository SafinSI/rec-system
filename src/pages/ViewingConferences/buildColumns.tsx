import React from "react"
import { SortingCell } from "../../components"

export const buildColumns = (sortField, typeSort, changeSortField) => [
  <SortingCell
    name={"Номер статьи"}
    id={"id"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
  />,
  <SortingCell
    name={"Название"}
    id={"name"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
  />
]
