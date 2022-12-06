import React, { useState } from "react";
import formStyle from "./SearchFormStyle.module.css";

export const SearchForm = ({ onClick }) => {
  const [inputState, setInputState] = useState("");
  return (
    <form className={formStyle.form}>
      <button
        className={formStyle["square-button"]}
        onClick={(e) => onClick(e, inputState)}
      >
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
  );
};
