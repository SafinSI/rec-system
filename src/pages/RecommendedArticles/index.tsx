import React from "react"
import { BASIC_URL } from "../../config"
import { TablePage } from "../TablePage"
import { buildColumns } from "./buildColumns"
import { articleDataDecorator } from "./articleDataDecorator"
import { addToRecomendations } from "./helpers"

export const RecommendedArticles = () => (
  <TablePage
    baseUrl={`${BASIC_URL}recommendation_articles/`}
    buildColumns={buildColumns}
    dataDecorator={articleDataDecorator}
    addToRecomendations={addToRecomendations}
  />
)
