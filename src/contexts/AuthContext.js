import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  isAuth: null,
  setToken: () => {},
  setIsAuth: () => {},
});

export default AuthContext;
