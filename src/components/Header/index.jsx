import React, { useContext } from "react";
import { AuthorizationWindow } from "../AuthorizationWindow";
import AuthContext from "../../contexts/AuthContext";
import style from "./style.module.css";

export const Header = ({ onBurgerButtonClick }) => {
  const [modalActive, setModalActive] = React.useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <header className={style.header}>
      <button
        className={style["burger-button"]}
        onClick={onBurgerButtonClick}
      />
      <div className={style.title}>НРекс</div>
      {isAuth ? (
        <button
          className={style["exit-button"]}
          onClick={() => {
            sessionStorage.removeItem("Token");
            setIsAuth(false);
          }}
        >
          Выйти
        </button>
      ) : (
        <button
          className={style["exit-button"]}
          onClick={() => setModalActive(true)}
        >
          Войти
        </button>
      )}
      <AuthorizationWindow
        active={modalActive}
        setActive={setModalActive}
        setAuth={setIsAuth}
      />
    </header>
  );
};
