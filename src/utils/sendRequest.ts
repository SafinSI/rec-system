export function sendRequest(url, method = "GET", body = null) {
  const fetchParams = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("Token"),
    },
  };

  if (["POST", "PATCH", "PUT"].indexOf(method) > -1 && !!body) {
    fetchParams.body = body;
  }

  return fetch(url, fetchParams)
    .catch((response) => console.log("ERR", response))
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
      return { results: [], status: response.status };
    });
}
