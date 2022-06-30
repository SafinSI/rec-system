import React from "react";
import { useState, useEffect } from "react";

import Table from '../components/Table/Table';
import ModalWindow from "../components/ModalWindow/ModalWindow";
import Select from '../components/Select/Select';
import SearchForm from "../components/SearchForm/SearchForm";
import PageSwitcher from '../components/PageSwitcher/PageSwitcher';
import RatingInput from '../components/RatingInput/RatingInput';

import getActualURL from '../utils/getActualURL'
import sendRequest from '../utils/sendRequest'
import environmentConstants from '../environmentConstants';

const { BASIC_URL, PAGE_LENS } = environmentConstants;

function conferenceDataSelector(item) {
  return {
    id: item.id,
    rating: item.rf_label,
    recommendation_rating: item.recommendation_rating,
    name: <a className="link" rel="noreferrer" target="_blank" href={item.conference.full_url}>{item.conference.name}</a>,
  }
}

function RecommendedConferences({onClick}) {
  const [articles, setArticles] = useState([]);
  const [chosenTableRows, setChosenTableRows]= useState([])
  const [modalActive, setModalActive] = useState(false)
  const [pageMount, setPageMount] = useState(0);
  const [urlState, setUrlState] = useState({
    base: BASIC_URL + 'recommendation_conferences/',
    page: 1,
    pageLen: 10,
    sortField: 'id',
    typeSort: false,
    searchQuery: ''
  })

  const [filtersState, setFilterState] =  useState({})
  console.log('a', filtersState)


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
        BASIC_URL + 'recommendation_conferences/' + id + '/', 
        'PATCH', 
        JSON.stringify({
          rf_label: rating,
        })
      )
    })
    setModalActive(false)
  }

  // Изменение url
  const changeSortField = (field) => {
    const commands = {
      'Номер рекомендации': 'id',
      'Оценка пользователя': 'rf_label',
      'Оценка системы'        : 'recommendation_rating', // проверить сортировку
      'Конференция': 'conference',
    }
    if (commands.hasOwnProperty(field)) {
      setUrlState(prev => {
        return {
          ...prev,
          sortField: commands[field],
          typeSort: !prev.typeSort
        }
      });
    }
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
        dataSelector={conferenceDataSelector}
        choiseRows={choiceTableElements}
        columns={[
          'Номер рекомендации',
          <RatingInput id={1} name='Оценка пользователя'
            onChange={({min, max}) => setFilterState((prev) => (
              {...prev, rf_label__gte: min, rf_label__lte: max}))}/>,
          <RatingInput id={2} name='Оценка системы' 
            onChange={({min, max}) => setFilterState((prev) => (
              {...prev, recommendation_rating__gte: min, recommendation_rating__lte: max}))}
            />,
          'Конференция'
        ]}
        action={changeSortField}
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
      <ModalWindow active={modalActive} 
        setActive={setModalActive} 
        onConfirm={addToRecomendations}/>
    </div>
  )
}

export default RecommendedConferences;