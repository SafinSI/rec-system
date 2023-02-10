export type FiltersState = {
  [key: string]: string | number
}

export type UrlState = {
  base: string
  page: number
  pageLen: number
  sortField: string
  typeSort: boolean
  searchQuery: string
  sort?: string
}
