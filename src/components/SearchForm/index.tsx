import React, { useState } from "react"
import formStyle from "./SearchFormStyle.module.css"

type SearchFormProps = {
  onClick: (event: React.MouseEvent, input: string) => void
}

export const SearchForm = ({ onClick }: SearchFormProps) => {
  const [inputState, setInputState] = useState("")
  return (
    <form className={formStyle.form}>
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
