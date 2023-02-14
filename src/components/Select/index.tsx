import React from "react"
import { Option } from "../../utils"
import selectStyle from "./SelectStyle.module.css"

type SelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  value?: string | number
  valueField?: "id" | "name"
}

export const Select = ({
  options,
  valueField = "id",
  onChange,
  value,
  ...props
}: SelectProps & React.HTMLProps<HTMLSelectElement>) => {
  return (
    <select className={selectStyle.select} onChange={onChange} {...props} value={value}>
      {options.map((item) => (
        <option key={item.id} className={selectStyle.option} value={item[valueField]}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
