import React from "react"
import style from "./style.module.css"

type ThematicsAdderFormProps = {
  value: string
  onChange: (value: string) => void
  onClick: (event: React.MouseEvent) => void
}

export const ThematicsAdderForm = ({ value, onChange, onClick }: ThematicsAdderFormProps) => (
  <form className={style.form}>
    <button className={style["square-button"]} onClick={onClick}>
      Добавить тематику
    </button>
    <input
      className="text-area"
      type="text"
      placeholder={"Название тематики..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </form>
)
