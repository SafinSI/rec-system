import { sendRequest } from "../../utils"
import { BASIC_URL } from "../../config"

export const addToRecomendations = (rating: string, dataIds: number[]) => {
  dataIds.forEach((id) => {
    sendRequest({
      url: `${BASIC_URL}recommendation_articles/${id}/`,
      method: "PATCH",
      body: JSON.stringify({
        rating: rating
      })
    })
  })
}
