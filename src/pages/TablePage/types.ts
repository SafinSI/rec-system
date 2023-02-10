import { DataDecorator } from "@rec-system/components"
import { UrlState, FiltersState } from "@rec-system/utils"

export type SetUrlState = React.Dispatch<React.SetStateAction<UrlState>>

export type BuildColumns = (
  sortField: string,
  typeSort: boolean,
  changeSortField: (field: string, setUrlState: SetUrlState) => void,
  setUrlState: React.Dispatch<React.SetStateAction<UrlState>>,
  setFilterState: React.Dispatch<React.SetStateAction<FiltersState>>
) => Array<string | JSX.Element>

export type TablePageProps = {
  baseUrl: string
  buildColumns: BuildColumns
  addToRecomendations: (rating: string, dataIds: number[]) => void
  dataDecorator?: DataDecorator
}