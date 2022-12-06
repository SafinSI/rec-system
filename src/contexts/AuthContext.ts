import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isAuth: false,
  setToken: () => {},
  setIsAuth: () => {},
});
