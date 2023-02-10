import React from "react"
import { useState } from "react"
import { Table, ModalWindow, InputForm, Select, SearchForm, Paginator } from "../../components"
import { PAGE_LENS } from "../../config"
import { useURL } from "../../utils"
import { choiceTableElements, changeSearchQuery, changeSortField } from "./helpers"
import { TablePageProps } from "./types"

export const TablePage = ({ baseUrl, buildColumns, dataDecorator, addToRecomendations }: TablePageProps) => {
  const [data, setData] = useState([])

  const [chosenTableRows, setChosenTableRows] = useState<number[]>([])
  const [modalActive, setModalActive] = useState(false)

  const [pageMount, setPageMount] = useState(0)

  const { urlState, setUrlState, setFilterState } = useURL({
    base: baseUrl,
    page: 1,
    pageLen: 10,
    sortField: "id",
    typeSort: false,
    searchQuery: "",
    action: (response, state) => {
      setData(response.results)
      setPageMount(Math.ceil(response.count / state.pageLen))
    }
  })

  return (
    <>
      <div className="pages-num-wrapper">
        <span className="pages-num-text">Показать</span>
        <Select
          style={{ width: "55px", height: "100%" }}
          onChange={(event) => setUrlState((prev) => ({ ...prev, pageLen: event.target.value }))}
          options={PAGE_LENS}
          valueField={"name"}
        />
        <span className="pages-num-text">записей</span>
      </div>
      <SearchForm onClick={changeSearchQuery(setUrlState)} />
      <button className="square-button" disabled={chosenTableRows.length === 0} onClick={() => setModalActive(true)}>
        Обновить рейтинг
      </button>
      <Table
        data={data}
        dataDecorator={dataDecorator}
        choiseRows={choiceTableElements(setChosenTableRows)}
        columns={buildColumns(urlState.sortField, urlState.typeSort, changeSortField, setUrlState, setFilterState)}
      />
      <Paginator
        pageMount={pageMount}
        currentPage={urlState.page}
        onClick={(pageNum: number) => {
          setUrlState((prev) => {
            return {
              ...prev,
              page: pageNum
            }
          })
        }}
      />
      <ModalWindow
        title={"Оценка для рекомендательной системы"}
        isActive={modalActive}
        setActive={setModalActive}
        onConfirm={(data) => {
          if (!!data.rating) {
            addToRecomendations(data.rating, chosenTableRows)
            setModalActive(false)
          }
        }}
        dataInitialState={{ rating: "" }}
        renderFunction={InputForm}
      />
    </>
  )
}

export * from "./types"
