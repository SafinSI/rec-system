import React from "react"
import { DataDecorator } from "../../components"

export const conferenceDataDecorator: DataDecorator = (item) => {
  return {
    id: item.id,
    rating: item.rf_label,
    recommendation_rating: item.recommendation_rating,
    name: (
      <a className="link" rel="noreferrer" target="_blank" href={item.conference.full_url}>
        {item.conference.name}
      </a>
    )
  }
}
