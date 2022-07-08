import React from "react";
import { useState, useEffect, useRef } from "react";

import Table from '../components/Table/Table'
import ModalWindow from "../components/ModalWindow/ModalWindow";
import Select from '../components/Select/Select'
import SearchForm from "../components/SearchForm/SearchForm";
import PageSwitcher from '../components/PageSwitcher/PageSwitcher';
import SelectAndInputForm from '../components/ModalWindow/ModalBodyForms/SelectAndInputForm'

import getActualURL from '../utils/getActualURL'
import sendRequest from '../utils/sendRequest'
import environmentConstants from '../environmentConstants';

const { BASIC_URL, PAGE_LENS } = environmentConstants;

function articleDataSelector(item) {
  return {
    id: item.id,
    name: <a className="link" rel="noreferrer" target="_blank" href={item.full_url}>{item.name}</a>,
    keywords: item.keywords,
    authors: item.authors.map(item => item.name).join(', '),
    classification_labels: item.classification_labels.map(item => item.classification_label.name).join(' ')
  }
}


function ViewingArticles({onClick}) {
  const classificationLabels = useRef([])
  const [articles, setArticles] = useState([]);
  const [chosenTableRows, setChosenTableRows]= useState([])
  const [modalActive, setModalActive] = useState(false)
  const [pageMount, setPageMount] = useState(0);
  const [urlState, setUrlState] = useState({
    base: BASIC_URL + 'articles/',
    page: 1,
    pageLen: 10,
    sortField: 'id',
    typeSort: false,
    searchQuery: ''
  })

  // get classification labels
  useEffect(() => {
    sendRequest(BASIC_URL +'classification_labels/')
    .then(response => {
      classificationLabels.current = response.results;
      })
  }, []);

  // get data from server
  useEffect(() => {
    sendRequest(getActualURL(urlState))
    .then(response => { 
      setArticles(response.results)
      // set pagemount
      setPageMount(Math.ceil(response.count/urlState.pageLen))
      console.log('get articles from server')
    })
  }, [urlState]);

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
  const addToRecomendations = (rating, classification_label) => {
    chosenTableRows.forEach(id => {
      sendRequest(
        BASIC_URL + 'recommendation_articles/', 
        'POST', 
        JSON.stringify({
          rating: rating,
          article: id, 
          classification_label: classification_label
        })
      )
    })
    setModalActive(false)
  }

  // Изменение url
  const changeSortField = (field) => {
    const commands = {
      'Номер статьи': 'id',
      'Название': 'name',
      'Ключевые слова': 'keywords',
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
        onClick={() => setModalActive(true)}>Добавить к рекомендациям
      </button>
      <Table data={articles} 
        dataSelector={articleDataSelector}
        choiseRows={choiceTableElements}
        columns={['Номер статьи', 'Название', 'Ключевые слова',	'Авторы', 'Классы статьи']}
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

      {
        (classificationLabels.current.length > 0)?
        <ModalWindow title={'Оценка для рекомендательной системы'}
          active={modalActive} setActive={setModalActive}
          onConfirm={(data) => {
            if (!!data.rating) {
              addToRecomendations(data.rating, data.label)
            }
          }}
          dataInitialState = {{rating: '', label: classificationLabels?.current[0]?.id}}
          renderFunction={(args) => SelectAndInputForm({...args, options: classificationLabels?.current})}
        />
          :
        ''
      }
    </div>
  )
}

export default ViewingArticles;
