import React from "react"
import style from "./style.module.css"
import { Option } from "../../utils"
import { Thematic } from "./Thematic"

type ThematicsPoolProps = {
  themeItems: Option[]
  removeItem: (item: Option) => void
}

export const ThematicsPool = ({ themeItems, removeItem }: ThematicsPoolProps) => {
  return (
    <div className={style["thematics-list"]}>
      {themeItems.map((item) => (
        <Thematic key={item.id} item={item} removeItem={removeItem} />
      ))}
    </div>
  )
}
