import React, { useState } from "react"
import style from "./style.module.css"
import { makeAuthorization } from "../../utils"

export const AuthorizationModal = ({ active, setActive, setAuth }) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onSucces = () => (result) => {
    if (result) {
      setActive(false)
      setAuth(true)
      setErrorMessage("")
    } else {
      setErrorMessage("Неверный Логин/Пароль")
      setAuth(false)
    }
  }

  const errorHandler = (err) => {
    setErrorMessage("Ошибка авторизации")
    console.log(err)
  }

  return (
    <div className={active ? style.active : style.unactive} onClick={() => setActive(false)}>
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
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
              onSucces,
              errorHandler
            })
          }}
        >
          Войти
        </button>
      </div>
    </div>
  )
}
