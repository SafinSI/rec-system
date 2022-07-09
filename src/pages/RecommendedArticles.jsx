import React from "react";
import { useState, useEffect } from "react";

import Table from '../components/Table/Table';
import ModalWindow from "../components/ModalWindow/ModalWindow";
import InputForm from "../components/ModalWindow/ModalBodyForms/InputForm"
import Select from '../components/Select/Select';
import SearchForm from "../components/SearchForm/SearchForm";
import PageSwitcher from '../components/PageSwitcher/PageSwitcher';
import SortingCell from "../components/SortingCell/SortingCell";
import RatingInput from '../components/RatingInput/RatingInput';

import getActualURL from '../utils/getActualURL';
import sendRequest from '../utils/sendRequest';
import environmentConstants from '../environmentConstants';

const { BASIC_URL, PAGE_LENS } = environmentConstants;

function articleDataSelector(item) {
  return {
    id: item.id,
    rating: item.rating,
    recommendation_rating: item.recommendation_rating,
    name: <a className="link" rel="noreferrer" target="_blank" href={item.article.full_url}>{item.article.name}</a>,
    classification_label: item.classification_label.name,
  }
}

function RecommendedArticles({onClick}) {
  const [articles, setArticles] = useState([]);
  const [chosenTableRows, setChosenTableRows]= useState([])
  const [modalActive, setModalActive] = useState(false)
  const [pageMount, setPageMount] = useState(0);
  const [filtersState, setFilterState] =  useState({})
  const [urlState, setUrlState] = useState({
    base: BASIC_URL + 'recommendation_articles/',
    page: 1,
    pageLen: 10,
    sortField: 'id',
    typeSort: false,
    searchQuery: ''
  })

  // get data from server
  useEffect(() => {
    sendRequest(getActualURL(urlState, filtersState))
    .then(response => {
      setArticles(response.results)
      // set pagemount
      setPageMount(Math.ceil(response.count/urlState.pageLen))
      console.log('get articles from server')
    })
  }, [urlState, filtersState]);

  const choiceTableElements = (elt) => {
    setChosenTableRows((prevState) => {
      if (prevState.indexOf(elt) === -1) {
        return [...prevState, elt]
      } else {
        return prevState.filter(item => item !== elt)
    }
    })
  }

  // request to add recomendations
  const addToRecomendations = (rating) => {
    chosenTableRows.forEach(id => {
      sendRequest(
        BASIC_URL + 'recommendation_articles/' + id + '/', 
        'PATCH', 
        JSON.stringify({
          rating: rating,
        })
      )
    })
    setModalActive(false)
  }

  // Изменение url
  const changeSortField = (field) => {
    setUrlState(prev => {
      return {
        ...prev,
        sortField: field,
        typeSort: !prev.typeSort
      }
    });
  }

  const changeSearchQuery = (event, input) => {
    event.preventDefault()
    setUrlState(prev => {
      return {
        ...prev,
        searchQuery: input
      }
    });
  }

  return(
    <div className="main" onClick={onClick}>
      <div className="pages-num-wrapper">
        <span className="pages-num-text">Показать</span>
          <Select style={{width: '55px', height: '100%'}}
            onChange={(e)=> setUrlState(prev => ({...prev, pageLen: e.target.value}))}
            options={PAGE_LENS}
            valueField={'name'}
          />
        <span className="pages-num-text">записей</span>
      </div>
      <SearchForm onClick={changeSearchQuery}/>
      <button className="square-button" 
        disabled={(chosenTableRows.length > 0)?"": "disabled"}
        onClick={() => setModalActive(true)}>Обновить рейтинг
      </button>

      <Table data={articles} 
        dataSelector={articleDataSelector}
        choiseRows={choiceTableElements}
        columns={[
          <SortingCell name={'Номер рекомендации'} id={'id'}
            sortField={urlState.sortField} typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          />,
          <SortingCell name={'Оценка пользователя'} id={'rating'}
            sortField={urlState.sortField} typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          >
            <RatingInput 
              onChange={({min, max}) => setFilterState((prev) => (
                {...prev, rating__gte: min, rating__lte: max}))}
            />
          </SortingCell>,
          <SortingCell name={'Оценка системы' } id={'recommendation_rating'}
            sortField={urlState.sortField} typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          >
            <RatingInput 
              onChange={({min, max}) => setFilterState((prev) => (
                {...prev, recommendation_rating__gte: min, recommendation_rating__lte: max}))}
            />
          </SortingCell>,
          <SortingCell name={'Статья'} id={'article'}
            sortField={urlState.sortField} typeSort={urlState.typeSort}
            onClick={(field) => changeSortField(field)}
          />,
          'Классы статьи'
        ]}
      />

      <PageSwitcher pageMount={pageMount}
        currentPage={urlState.page}
        onClick={(pageNum) => {
          setUrlState(prev => {
            return {
              ...prev,
              page: pageNum
            }
          });
        }}
      />
      
      <ModalWindow title={'Оценка для рекомендательной системы'}
        active={modalActive} setActive={setModalActive}
        onConfirm={(data) => {
          if (!!data.rating) {
            addToRecomendations(data.rating)
          }
        }}
        dataInitialState = {{rating: ''}}
        renderFunction={InputForm}
      />
    </div>
  )
}

export default RecommendedArticles;
