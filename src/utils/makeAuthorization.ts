import { sendRequest } from "./sendRequest"
import { BASIC_URL } from "../config"
import { token } from "./token"

type AuthorizationProps = {
  username: string
  password: string
  authHandler: (err: string) => void
}

export async function makeAuthorization({ username, password, authHandler }: AuthorizationProps) {
  return sendRequest<{ token: string }>({
    url: BASIC_URL + "auth/login/",
    method: "POST",
    body: JSON.stringify({ username, password }),
    errorHandler: () => authHandler("Ошибка авторизации")
  }).then((response) => {
    if (response.token) {
      token.setToken(response.token)
      authHandler("")
    } else {
      authHandler("Неверный Логин / Пароль")
    }
  })
}
