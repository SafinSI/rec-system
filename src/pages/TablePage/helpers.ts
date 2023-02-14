import { SetUrlState } from "./types"

export const changeSortField = (field: string, setUrlState: SetUrlState) => {
  setUrlState((prev) => {
    return {
      ...prev,
      sortField: field,
      typeSort: !prev.typeSort
    }
  })
}

export const changeSearchQuery = (setUrlState: SetUrlState) => (event: React.MouseEvent, input: string) => {
  event.preventDefault()
  setUrlState((prev) => {
    return {
      ...prev,
      searchQuery: input
    }
  })
}

export const choiceTableElements =
  (setChosenTableRows: React.Dispatch<React.SetStateAction<number[]>>) => (currentItemId: number) => {
    setChosenTableRows((prevState) => {
      if (prevState.indexOf(currentItemId) === -1) {
        return [...prevState, currentItemId]
      } else {
        return prevState.filter((item) => item !== currentItemId)
      }
    })
  }
