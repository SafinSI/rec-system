import React from "react"
import { DataDecorator } from "../../components"

export const conferenceDataDecorator: DataDecorator = (item) => {
  return {
    id: item.id,
    name: (
      <a className="link" rel="noreferrer" target="_blank" href={item.full_url}>
        {item.name}
      </a>
    )
  }
}
