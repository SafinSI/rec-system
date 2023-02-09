import React from "react"
import style from "./style.module.css"

export const Thematic = (props) => {
  return (
    <div key={props.item.id} className={style.item}>
      {props.item.name}
      <button onClick={(e) => props.remove(props.item)} className={style["delete-button"]}>
        &times;
      </button>
    </div>
  )
}
