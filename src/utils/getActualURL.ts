import { FiltersState, UrlState } from "./types";

const urlMap = {
  page: "page",
  pageLen: "page_size",
  sort: "ordering",
  searchQuery: "search",
};

function getSort(urlState) {
  return `${urlState.typeSort ? "-" : ""}${urlState.sortField}`;
}

const getFilters = (filtersState: FiltersState): Array<string> => {
  // возвращает список фильтров, который нужно собрать
  const filters: Array<string> = [];
  Object.keys(filtersState).forEach((key) => {
    const filterParam = filtersState[key];
    if (!!filterParam || filterParam === 0) {
      filters.push(`${key}=${filterParam}`);
    }
  });
  return filters;
};

export const getActualURL = (
  urlState: UrlState,
  filtersState?: FiltersState
) => {
  let actualUrl = urlState.base;
  let queryParams: Array<string> = [];
  const urlCopy = urlState;
  urlCopy["sort"] = getSort(urlState);

  // преобразуем sortOrdering и sortField в sort
  Object.keys(urlMap).forEach((key) => {
    const urlParam = urlCopy[key];
    if (!!urlParam || urlParam === 0) {
      queryParams.push(`${urlMap[key]}=${urlParam}`);
    }
  });
  if (filtersState) {
    queryParams = queryParams.concat(getFilters(filtersState));
  }
  if (queryParams.length > 0) {
    actualUrl += `?${queryParams.join("&")}`;
  }
  console.log(actualUrl);
  return actualUrl;
};
