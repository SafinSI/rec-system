import React from "react";
import { useState, useEffect } from "react";

import {
  Table,
  ModalWindow,
  InputForm,
  Select,
  SearchForm,
  PageSwitcher,
  SortingCell,
} from "../components";

import { sendRequest, getActualURL } from "../utils";
import { BASIC_URL, PAGE_LENS } from "../config";

function conferencesDataSelector(item) {
  return {
    id: item.id,
    name: (
      <a className="link" rel="noreferrer" target="_blank" href={item.full_url}>
        {item.name}
      </a>
    ),
  };
}

export function ViewingConferences({ onClick }) {
  const [articles, setArticles] = useState([]);
  const [chosenTableRows, setChosenTableRows] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [pageMount, setPageMount] = useState(0);
  const [urlState, setUrlState] = useState({
    base: BASIC_URL + "conferences/",
    page: 1,
    pageLen: 10,
    sortField: "id",
    typeSort: false,
    searchQuery: "",
  });

  // get data from server
  useEffect(() => {
    sendRequest(getActualURL(urlState)).then((response) => {
      setArticles(response.results);
      // set pagemount
      setPageMount(Math.ceil(response.count / urlState.pageLen));
      console.log("get articles from server");
    });
  }, [urlState]);

  const choiceTableElements = (elt) => {
    setChosenTableRows((prevState) => {
      if (prevState.indexOf(elt) === -1) {
        return [...prevState, elt];
      } else {
        return prevState.filter((item) => item !== elt);
      }
    });
  };

  // request to add recomendations
  const addToRecomendations = (rating) => {
    chosenTableRows.forEach((id) => {
      sendRequest(
        BASIC_URL + "recommendation_conferences/",
        "POST",
        JSON.stringify({
          rating: rating,
          conference: id,
        })
      );
    });
    setModalActive(false);
  };

  // Изменение url
  const changeSortField = (field) => {
    setUrlState((prev) => {
      return {
        ...prev,
        sortField: field,
        typeSort: !prev.typeSort,
      };
    });
  };

  const changeSearchQuery = (event, input) => {
    event.preventDefault();
    setUrlState((prev) => {
      return {
        ...prev,
        searchQuery: input,
      };
    });
  };

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
      <SearchForm onClick={changeSearchQuery} />
      <button
        className="square-button"
        disabled={chosenTableRows.length === 0}
        onClick={() => setModalActive(true)}
      >
        Добавить к рекомендациям
      </button>

      <Table
        data={articles}
        dataSelector={conferencesDataSelector}
        choiseRows={choiceTableElements}
        columns={[
          <SortingCell
            name={"Номер статьи"}
            id={"id"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          />,
          <SortingCell
            name={"Название"}
            id={"name"}
            sortField={urlState.sortField}
            typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          />,
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
            addToRecomendations(data.rating);
          }
        }}
        dataInitialState={{ rating: "" }}
        renderFunction={InputForm}
      />
    </div>
  );
}
