import React, { useState } from "react"
import { makeAuthorization } from "../../../utils"
import { ModalWrapper } from "../ModalWrapper"
import style from "./style.module.css"

type AuthorizationModalProps = {
  isActive: boolean
  setActive: (isActive: boolean) => void
  setAuth: (isAuth: boolean) => void
}

export const AuthorizationModal = ({ isActive, setActive, setAuth }: AuthorizationModalProps) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const authHandler = (err: string) => {
    if (err) {
      setErrorMessage(err)
    } else {
      setAuth(true)
      setActive(false)
      setErrorMessage("")
    }
  }

  return (
    <ModalWrapper isActive={isActive} setActive={setActive}>
      <>
        <h4 className={style.header}>Вход</h4>
        <input
          className={style.textarea}
          type="text"
          placeholder={"Логин"}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className={style.textarea}
          type="password"
          placeholder={"Пароль"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <span className={style.error}>{errorMessage}</span>}
        <button
          className="square-button"
          onClick={() => {
            makeAuthorization({
              username: login,
              password,
              authHandler
            })
          }}
        >
          Войти
        </button>
      </>
    </ModalWrapper>
  )
}
