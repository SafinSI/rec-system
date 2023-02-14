import React, { useContext } from "react"
import { AuthorizationModal } from "../ModalWindows/AuthorizationModal"
import { AuthContext } from "../../contexts/AuthContext"
import { token } from "../../utils"
import style from "./style.module.css"

type HeaderProps = {
  onBurgerButtonClick: () => void
}

export const Header = ({ onBurgerButtonClick }: HeaderProps) => {
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
      <AuthorizationModal isActive={modalActive} setActive={setModalActive} setAuth={setIsAuth} />
    </header>
  )
}
