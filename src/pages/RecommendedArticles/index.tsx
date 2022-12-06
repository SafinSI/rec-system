import React from "react";
import { useState } from "react";
import {
  Table,
  ModalWindow,
  InputForm,
  Select,
  SearchForm,
  PageSwitcher,
  SortingCell,
  RatingInput,
} from "../../components";
import { BASIC_URL, PAGE_LENS } from "../../config";
import { useURL } from "../../utils";
import {
  choiceTableElements,
  changeSearchQuery,
  changeSortField,
  addToRecomendations,
} from "./helpers";
import { articleDataSelector } from "./articleDataSelector";

export function RecommendedArticles({ onClick }) {
  const [articles, setArticles] = useState([]);
  const [chosenTableRows, setChosenTableRows] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [pageMount, setPageMount] = useState(0);
  const { urlState, setUrlState, setFilterState } = useURL({
    base: BASIC_URL + "recommendation_articles/",
    page: 1,
    pageLen: 10,
    sortField: "id",
    typeSort: false,
    searchQuery: "",
    action: (response, state) => {
      setArticles(response.results);
      setPageMount(Math.ceil(response.count / state.pageLen));
    },
  });

  return (
    <div className="main" onClick={onClick}>
      <div className="pages-num-wrapper">
        <span className="pages-num-text">Показать</span>
        <Select
          style={{ width: "55px", height: "100%" }}
          onChange={(e) =>
            setUrlState((prev) => ({ ...prev, pageLen: e.target.value }))
          }
          options={PAGE_LENS}
          valueField={"name"}
        />
        <span className="pages-num-text">записей</span>
      </div>
      <SearchForm onClick={changeSearchQuery(setUrlState)} />
      <button
        className="square-button"
        disabled={chosenTableRows.length === 0}
        onClick={() => setModalActive(true)}
      >
        Обновить рейтинг
      </button>

      <Table
        data={articles}
        dataSelector={articleDataSelector}
        choiseRows={choiceTableElements(setChosenTableRows)}
        columns={[
          <SortingCell
            name={"Номер рекомендации"}
            id={"id"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field, setUrlState)}
          />,
          <SortingCell
            name={"Оценка пользователя"}
            id={"rating"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field, setUrlState)}
          >
            <RatingInput
              onChange={({ min, max }) =>
                setFilterState((prev) => ({
                  ...prev,
                  rating__gte: min,
                  rating__lte: max,
                }))
              }
            />
          </SortingCell>,
          <SortingCell
            name={"Оценка системы"}
            id={"recommendation_rating"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field, setUrlState)}
          >
            <RatingInput
              onChange={({ min, max }) =>
                setFilterState((prev) => ({
                  ...prev,
                  recommendation_rating__gte: min,
                  recommendation_rating__lte: max,
                }))
              }
            />
          </SortingCell>,
          <SortingCell
            name={"Статья"}
            id={"article"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field, setUrlState)}
          />,
          "Классы статьи",
        ]}
      />
      <PageSwitcher
        pageMount={pageMount}
        currentPage={urlState.page}
        onClick={(pageNum) => {
          setUrlState((prev) => {
            return {
              ...prev,
              page: pageNum,
            };
          });
        }}
      />
      <ModalWindow
        title={"Оценка для рекомендательной системы"}
        isActive={modalActive}
        setActive={setModalActive}
        onConfirm={(data) => {
          if (!!data.rating) {
            addToRecomendations(data.rating, chosenTableRows);
            setModalActive(false);
          }
        }}
        dataInitialState={{ rating: "" }}
        renderFunction={InputForm}
      />
    </div>
  );
}
