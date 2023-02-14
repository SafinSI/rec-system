import React from "react"

import style from "./style.module.css"

type ModalWrapperProps = {
  isActive: boolean
  setActive: (isActive: boolean) => void
  children: JSX.Element
}

export const ModalWrapper = ({ isActive, setActive, children }: ModalWrapperProps) => {
  console.log("modal rendered")
  return (
    <div className={isActive ? style.active : style.unactive} onClick={() => setActive(false)}>
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
