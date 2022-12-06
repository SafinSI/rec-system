import { sendRequest } from "./sendRequest";
import { BASIC_URL } from "../config";

export function makeAuthorization(username: string, password: string) {
  return sendRequest(
    BASIC_URL + "auth/login/",
    "POST",
    JSON.stringify({ username, password })
  ).then((responce) => {
    if (responce.token) {
      sessionStorage.setItem("Token", `Token ${responce.token}`);
    }
    return responce.token;
  });
}
