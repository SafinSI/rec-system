export const changeSortField = (field: string, setUrlState) => {
  setUrlState((prev) => {
    return {
      ...prev,
      sortField: field,
      typeSort: !prev.typeSort
    }
  })
}

export const changeSearchQuery = (setUrlState) => (event, input: string) => {
  event.preventDefault()
  setUrlState((prev) => {
    return {
      ...prev,
      searchQuery: input
    }
  })
}

export const choiceTableElements = (setChosenTableRows) => (currentItem) => {
  setChosenTableRows((prevState) => {
    if (prevState.indexOf(currentItem) === -1) {
      return [...prevState, currentItem]
    } else {
      return prevState.filter((item) => item !== currentItem)
    }
  })
}
