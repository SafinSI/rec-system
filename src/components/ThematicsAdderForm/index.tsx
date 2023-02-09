import React from "react"
import { useState } from "react"
import style from "./style.module.css"

export const ThematicsAdderForm = (props) => {
  const [themeTitle, setThemeTitle] = useState("")
  const addNewThematic = (e) => {
    e.preventDefault()
    if (themeTitle) {
      props.addTheme(themeTitle)
      setThemeTitle("")
    }
  }
  return (
    <form className={style.form}>
      <button className={style["square-button"]} onClick={addNewThematic}>
        Добавить тематику
      </button>
      <input
        className="text-area"
        type="text"
        placeholder={"Название тематики..."}
        value={themeTitle}
        onChange={(e) => setThemeTitle(e.target.value)}
      />
    </form>
  )
}
