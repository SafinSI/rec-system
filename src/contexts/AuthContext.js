import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isAuth: null,
  setToken: () => {},
  setIsAuth: () => {},
});
