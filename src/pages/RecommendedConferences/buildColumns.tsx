import React from "react"
import { SortingCell, RatingInput } from "../../components"

export const buildColumns = (sortField, typeSort, setUrlState, setFilterState, changeSortField) => [
  <SortingCell
    name={"Номер рекомендации"}
    id={"id"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
  />,
  <SortingCell
    name={"Оценка пользователя"}
    id={"rf_label"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
  >
    <RatingInput
      onChange={({ min, max }) =>
        setFilterState((prev) => ({
          ...prev,
          rf_label__gte: min,
          rf_label__lte: max
        }))
      }
    />
  </SortingCell>,
  <SortingCell
    name={"Оценка системы"}
    id={"recommendation_rating"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
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
    name={"Конференции"}
    id={"conference"}
    sortField={sortField}
    typeSort={typeSort}
    onClick={(field) => changeSortField(field)}
  />
]
