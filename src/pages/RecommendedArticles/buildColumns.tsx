import React from "react"
import { SortingCell, RatingInput } from "../../components"
import { BuildColumns } from "../TablePage"

export const buildColumns: BuildColumns = (sortField, typeSort, changeSortField, setUrlState, setFilterState) => [
  <SortingCell
    name={"Номер рекомендации"}
    id={"id"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />,
  <SortingCell
    name={"Оценка пользователя"}
    id={"rating"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  >
    <RatingInput
      onChange={({ min, max }) =>
        setFilterState((prev) => ({
          ...prev,
          rating__gte: min,
          rating__lte: max
        }))
      }
    />
  </SortingCell>,
  <SortingCell
    name={"Оценка системы"}
    id={"recommendation_rating"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  >
    <RatingInput
      onChange={({ min, max }) =>
        setFilterState((prev) => ({
          ...prev,
          recommendation_rating__gte: min,
          recommendation_rating__lte: max
        }))
      }
    />
  </SortingCell>,
  <SortingCell
    name={"Статья"}
    id={"article"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field, setUrlState)}
  />,
  "Классы статьи"
]
