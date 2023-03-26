import React from "react"
import { useState } from "react"
import { Table, RatingModal, Select, SearchForm, Paginator } from "../../components"
import { PAGE_LENS } from "../../config"
import { useURL } from "../../utils"
import { choiceTableElements, changeSearchQuery, changeSortField } from "./helpers"
import { TablePageProps } from "./types"
import style from "./style.module.css"

export const TablePage = ({
  baseUrl,
  buildColumns,
  dataDecorator,
  addToRecomendations,
  modalSelectOptions
}: TablePageProps) => {
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
      <div className={style.num_wrapper}>
        <span className={style.num_text}>Показать</span>
        <Select
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setUrlState((prev) => ({ ...prev, pageLen: Number(event.target.value) }))
          }
          options={PAGE_LENS}
          valueField={"name"}
        />
        <span className={style.num_text}>записей</span>
      </div>
      <SearchForm onClick={changeSearchQuery(setUrlState)} className={style.search_form} />
      <button
        className={`${style.button} square-button`}
        disabled={chosenTableRows.length === 0}
        onClick={() => setModalActive(true)}
      >
        {modalSelectOptions ? "Добавить к рекомендациям" : "Обновить рейтинг"}
      </button>
      <Table
        className={style.table}
        data={data}
        dataDecorator={dataDecorator}
        choiseRows={choiceTableElements(setChosenTableRows)}
        columns={buildColumns(urlState.sortField, urlState.typeSort, changeSortField, setUrlState, setFilterState)}
      />
      <Paginator
        className={style.paginator}
        pageMount={pageMount}
        currentPage={urlState.page}
        onClick={(pageNum: number) => {
          setUrlState((prev) => ({
            ...prev,
            page: pageNum
          }))
        }}
      />
      <RatingModal
        title={"Оценка для рекомендательной системы"}
        isActive={modalActive}
        setActive={setModalActive}
        onConfirm={(data) => {
          if (!!data.rating) {
            addToRecomendations(data.rating, chosenTableRows, data.labelId)
            setModalActive(false)
          }
        }}
        dataInitialState={{
          rating: "",
          labelId: 1
        }}
        dataLabels={modalSelectOptions}
      />
    </>
  )
}

export * from "./types"
