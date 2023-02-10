import React from "react"
import selectStyle from "./SelectStyle.module.css"

type SelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ id: number; name: string | number }>
  valueField?: "id" | "name"
}

export const Select = ({
  options,
  valueField = "id",
  onChange,
  ...props
}: SelectProps & React.HTMLProps<HTMLSelectElement>) => {
  return (
    <select className={selectStyle.select} onChange={onChange} {...props}>
      {options.map((item) => (
        <option key={item.id} className={selectStyle.option} value={item[valueField]}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
