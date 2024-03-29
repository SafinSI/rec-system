import { sendRequest } from "../../utils"
import { BASIC_URL } from "../../config"

export const addToRecomendations = (rating: string, dataIds: number[], labelId?: number) => {
  dataIds.forEach((id) => {
    sendRequest({
      url: `${BASIC_URL}recommendation_articles/`,
      method: "POST",
      body: JSON.stringify({
        rating: rating,
        article: id,
        classification_label: labelId
      })
    })
  })
}
