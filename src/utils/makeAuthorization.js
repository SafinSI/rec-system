import sendRequest from "./sendRequest";
import { BASIC_URL } from "../config";

function makeAuthorization(username, password) {
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

export default makeAuthorization;
