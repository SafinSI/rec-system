import sendRequest from "./sendRequest";

const BASIC_URL = 'https://46.138.244.16:6321/api/v1/'

function makeAuthorization (username, password) {
  return (
    sendRequest(BASIC_URL + 'auth/login/', 'POST', JSON.stringify({ username, password }))
    .then(responce => {
      if (responce.token) {
        sessionStorage.setItem('Token', `Token ${responce.token}`);
      }
    return responce.token
    })
  )
}

export default makeAuthorization;
