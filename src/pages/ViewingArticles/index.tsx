import React, { useEffect, useState } from "react"
import { BASIC_URL } from "../../config"
import { TablePage } from "../TablePage"
import { buildColumns } from "./buildColumns"
import { articleDataDecorator } from "./articleDataDecorator"
import { addToRecomendations } from "./helpers"

import { sendRequest, Option } from "../../utils"

export const ViewingArticles = () => {
  const [classificationLabels, setClassificationLabels] = useState<Option[]>([])

  useEffect(() => {
    sendRequest<{ results: Option[] }>({ url: BASIC_URL + "classification_labels/" }).then((response) => {
      setClassificationLabels(response.results)
    })
  }, [])

  return (
    <TablePage
      baseUrl={`${BASIC_URL}articles/`}
      buildColumns={buildColumns}
      dataDecorator={articleDataDecorator}
      addToRecomendations={addToRecomendations}
      modalSelectOptions={classificationLabels}
    />
  )
}
