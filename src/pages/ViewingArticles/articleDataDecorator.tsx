import React from "react"
import { DataDecorator } from "../../components"

export const articleDataDecorator: DataDecorator = (item) => {
  return {
    id: item.id,
    name: (
      <a className="link" rel="noreferrer" target="_blank" href={item.full_url}>
        {item.name}
      </a>
    ),
    keywords: item.keywords,
    authors: item.authors.map((item: { name: string }) => item.name).join(", "),
    classification_labels: item.classification_labels
      .map((item: { classification_label__name: string }) => item.classification_label__name)
      .join(" ")
  }
}
