type Token = {
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const token: Token = {
  getToken: () => sessionStorage.getItem("Token"),
  setToken: (token) => sessionStorage.setItem("Token", `Token ${token}`),
  removeToken: () => sessionStorage.removeItem("Token"),
};
