import { useState, useEffect } from "react";

import { getActualURL, sendRequest } from "./index";
import { FiltersState, UrlState } from "./types";

type UseURLProps = UrlState & {
  action?: (response: any, state: UrlState) => void;
  initFilterState?: FiltersState;
};

export const useURL = ({
  base,
  page,
  pageLen,
  sortField,
  typeSort,
  searchQuery,
  action,
  initFilterState = {},
}: UseURLProps) => {
  const [filtersState, setFilterState] =
    useState<FiltersState>(initFilterState);
  const [urlState, setUrlState] = useState<UrlState>({
    base,
    page,
    pageLen,
    sortField,
    typeSort,
    searchQuery,
  });

  useEffect(() => {
    sendRequest({ url: getActualURL(urlState, filtersState) }).then(
      (response) => {
        if (action) {
          action(response, urlState);
        }
      }
    );
  }, [urlState, filtersState]);

  return { urlState, setUrlState, filtersState, setFilterState };
};
