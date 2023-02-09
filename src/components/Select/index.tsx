import React from "react"
import selectStyle from "./SelectStyle.module.css"

export const Select = ({ options, valueField = "id", ...props }) => {
  return (
    <select className={selectStyle.select} {...props}>
      {options.map((item) => (
        <option key={item.id} className={selectStyle.option} value={item[valueField]}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
