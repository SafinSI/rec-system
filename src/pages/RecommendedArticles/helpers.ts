import { sendRequest } from "../../utils";
import { BASIC_URL } from "../../config";

export const addToRecomendations = (rating, chosenTableRows) => {
  chosenTableRows.forEach((id) => {
    sendRequest(
      BASIC_URL + "recommendation_articles/" + id + "/",
      "PATCH",
      JSON.stringify({
        rating: rating,
      })
    );
  });
};

export const changeSortField = (field, setUrlState) => {
  setUrlState((prev) => {
    return {
      ...prev,
      sortField: field,
      typeSort: !prev.typeSort,
    };
  });
};

export const changeSearchQuery = (setUrlState) => (event, input) => {
  event.preventDefault();
  setUrlState((prev) => {
    return {
      ...prev,
      searchQuery: input,
    };
  });
};

export const choiceTableElements = (setChosenTableRows) => (elt) => {
  setChosenTableRows((prevState) => {
    if (prevState.indexOf(elt) === -1) {
      return [...prevState, elt];
    } else {
      return prevState.filter((item) => item !== elt);
    }
  });
};
