import { token } from "./token"

export type Request = {
  url: string
  method?: "GET" | "POST" | "PATCH" | "PUT"
  body?: string
  sendToken?: boolean
  errorHandler?: (err: string) => void
}

export function sendRequest<T>({ url, method = "GET", body, sendToken = true, errorHandler }: Request): Promise<T> {
  const authToken = token.getToken()
  const fetchParams = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(sendToken && authToken && { Authorization: authToken })
    },
    ...(["POST", "PATCH", "PUT"].indexOf(method) > -1 && { body })
  }

  return fetch(url, fetchParams)
    .then((response) => {
      return response.ok ? response.json() : response.status
    })
    .catch((err) => errorHandler && errorHandler(err))
}
