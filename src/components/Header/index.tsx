import React, { useContext } from "react"
import { AuthorizationModal } from "../AuthorizationModal"
import { AuthContext } from "../../contexts/AuthContext"
import { token } from "../../utils"
import style from "./style.module.css"

export const Header = ({ onBurgerButtonClick }) => {
  const [modalActive, setModalActive] = React.useState(false)
  const { isAuth, setIsAuth } = useContext(AuthContext)
  return (
    <header className={style.header}>
      <button className={style["burger-button"]} onClick={onBurgerButtonClick} />
      <div className={style.title}>НРекс</div>
      {isAuth ? (
        <button
          className={style["exit-button"]}
          onClick={() => {
            token.removeToken()
            setIsAuth(false)
          }}
        >
          Выйти
        </button>
      ) : (
        <button className={style["exit-button"]} onClick={() => setModalActive(true)}>
          Войти
        </button>
      )}
      <AuthorizationModal active={modalActive} setActive={setModalActive} setAuth={setIsAuth} />
    </header>
  )
}
