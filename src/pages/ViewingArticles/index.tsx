import React from "react"
import { BASIC_URL } from "../../config"
import { TablePage } from "../TablePage"
import { buildColumns } from "./buildColumns"
import { articleDataDecorator } from "./articleDataDecorator"
import { addToRecomendations } from "./helpers"

export const ViewingArticles = () => (
  <TablePage
    baseUrl={`${BASIC_URL}articles/`}
    buildColumns={buildColumns}
    dataDecorator={articleDataDecorator}
    addToRecomendations={addToRecomendations}
  />
)

/*
  const classificationLabels = useRef([])

  // get classification labels
  useEffect(() => {
    sendRequest({ url: BASIC_URL + "classification_labels/" }).then((response) => {
      classificationLabels.current = response.results
    })
  }, [])
*/

/*
 {classificationLabels.current.length > 0 ? (
    <ModalWindow
      title={"Оценка для рекомендательной системы"}
      isActive={modalActive}
      setActive={setModalActive}
      onConfirm={(data) => {
        if (!!data.rating) {
          addToRecomendations(data.rating, data.label)
        }
      }}
      dataInitialState={{
        rating: "",
        label: classificationLabels?.current[0]?.id
      }}
      renderFunction={(args) =>
        SelectAndInputForm({
          ...args,
          options: classificationLabels?.current
        })
      }
    />
  ) : (
    ""
  )}
*/
