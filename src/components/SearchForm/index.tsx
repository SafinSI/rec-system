import React, { useState } from "react"
import { calcClassName } from "../../utils"
import formStyle from "./SearchFormStyle.module.css"

type SearchFormProps = {
  onClick: (event: React.MouseEvent, input: string) => void
  className?: string
}

export const SearchForm = ({ onClick, className }: SearchFormProps) => {
  const [inputState, setInputState] = useState("")
  return (
    <form className={calcClassName([formStyle.form, className])}>
      <button className={formStyle["square-button"]} onClick={(event) => onClick(event, inputState)}>
        Найти
      </button>
      <input
        className="text-area"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        type="text"
        placeholder="Поиск..."
      />
    </form>
  )
}
