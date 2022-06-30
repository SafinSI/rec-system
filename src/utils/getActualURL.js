const urlMap = {
  page: 'page',
  pageLen: 'page_size',
  sort: 'ordering',
  searchQuery: 'search',
};

function getSort(urlState) {
  return `${urlState.typeSort ? '-' : ''}${urlState.sortField}`;
}

function getFilters(filtersState) {
  // возвращает список фильтров, который нужно собрать
  const filters = [];
  Object.keys(filtersState).forEach((key) => {
    const filterParam = filtersState[key];
    if (!!filterParam | filterParam === 0) {
      filters.push(`${key}=${filterParam}`);
    }
  });
  return filters;
}

function getActualURL(urlState, filtersState) {
  let actualUrl = urlState.base;
  let queryParams = [];
  // преобразуем sortOrdering и sortField в sort
  urlState.sort = getSort(urlState);
  Object.keys(urlMap).forEach((key) => {
    const urlParam = urlState[key];
    if (!!urlParam | urlParam === 0) {
      queryParams.push(`${urlMap[key]}=${urlParam}`);
    }
  });
  if (filtersState) {
    queryParams = queryParams.concat(getFilters(filtersState));
  }
  if (queryParams.length > 0) {
    actualUrl += `?${queryParams.join('&')}`;
  }
  console.log(actualUrl);
  return actualUrl;
}

export default getActualURL;
