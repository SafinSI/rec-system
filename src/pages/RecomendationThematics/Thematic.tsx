import React from "react"
import { Option } from "../../utils"
import style from "./style.module.css"

type ThematicProps = {
  item: Option
  removeItem: (item: Option) => void
}

export const Thematic = ({ item, removeItem }: ThematicProps) => {
  return (
    <div className={style.item}>
      {item.name}
      <button onClick={() => removeItem(item)} className={style["delete-button"]}>
        &times;
      </button>
    </div>
  )
}
