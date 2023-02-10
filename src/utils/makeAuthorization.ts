import { sendRequest } from "./sendRequest"
import { BASIC_URL } from "../config"
import { token } from "./token"

type AuthorizationProps = {
  username: string
  password: string
  onSucces: (response: string) => void
  errorHandler: (err: string) => void
}

export function makeAuthorization({ username, password, onSucces, errorHandler }: AuthorizationProps) {
  return sendRequest<{ token: string }>({
    url: BASIC_URL + "auth/login/",
    method: "POST",
    body: JSON.stringify({ username, password }),
    errorHandler
  }).then((response) => {
    if (response.token) {
      token.setToken(response.token)
      onSucces(response.token)
    }
  })
}
