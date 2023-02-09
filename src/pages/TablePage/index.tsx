import React from "react"
import { useState } from "react"
import { Table, DataDecorator, ModalWindow, InputForm, Select, SearchForm, Paginator } from "../../components"
import { PAGE_LENS } from "../../config"
import { useURL, UrlState, FiltersState } from "../../utils"
import { choiceTableElements, changeSearchQuery, changeSortField } from "./helpers"

type SetUrlState = React.Dispatch<React.SetStateAction<UrlState>>

type buildColumns = (
  sortField: string,
  typeSort: boolean,
  setUrlState: React.Dispatch<React.SetStateAction<UrlState>>,
  setFilterState: React.Dispatch<React.SetStateAction<FiltersState>>,
  changeSortField: (field: string, setUrlState: SetUrlState) => void
) => Array<string | JSX.Element>

type TablePageProps = {
  baseUrl: string
  buildColumns: buildColumns
  addToRecomendations: (rating: string, dataIds: number[]) => void
  dataDecorator?: DataDecorator
}

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
          onChange={(e) => setUrlState((prev) => ({ ...prev, pageLen: e.target.value }))}
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
        columns={buildColumns(urlState.sortField, urlState.typeSort, setUrlState, setFilterState, changeSortField)}
      />
      <Paginator
        pageMount={pageMount}
        currentPage={urlState.page}
        onClick={(pageNum) => {
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
