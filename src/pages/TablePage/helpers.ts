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

export const changeSearchQuery = (setUrlState: SetUrlState) => (event, input: string) => {
  event.preventDefault()
  setUrlState((prev) => {
    return {
      ...prev,
      searchQuery: input
    }
  })
}

export const choiceTableElements =
  (setChosenTableRows: React.Dispatch<React.SetStateAction<number[]>>) => (currentItem) => {
    setChosenTableRows((prevState) => {
      if (prevState.indexOf(currentItem) === -1) {
        return [...prevState, currentItem]
      } else {
        return prevState.filter((item) => item !== currentItem)
      }
    })
  }
