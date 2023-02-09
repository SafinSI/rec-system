import React from "react"
import { BASIC_URL } from "../../config"
import { TablePage } from "../TablePage"
import { buildColumns } from "./buildColumns"
import { conferenceDataDecorator } from "./conferenceDataDecorator"
import { addToRecomendations } from "./helpers"

export const RecommendedConferences = () => (
  <TablePage
    baseUrl={`${BASIC_URL}recommendation_conferences/`}
    buildColumns={buildColumns}
    dataDecorator={conferenceDataDecorator}
    addToRecomendations={addToRecomendations}
  />
)
