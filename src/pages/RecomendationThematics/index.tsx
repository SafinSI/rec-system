import React, { useState } from "react"
import { Option } from "../../utils"
import { ThematicsPool } from "./ThematicsPool"
import { ThematicsAdderForm } from "./ThematicsAdderForm"

const mockedThematics: Option[] = [
  { name: "ИАД", id: 1 },
  { name: "Машинное Обучение", id: 2 },
  { name: "Нейронные Сети", id: 3 }
]

export const RecomendationThematics = () => {
  const [themes, setThemes] = useState<Option[]>(mockedThematics)
  const [themeTitle, setThemeTitle] = useState("")

  const removeTheme = (theme: Option) => {
    setThemes(themes.filter((item) => item.id !== theme.id))
  }

  const addTheme = (event: React.MouseEvent) => {
    event.preventDefault()
    if (themeTitle) {
      setThemes([...themes, { name: themeTitle, id: Date.now() }])
      setThemeTitle("")
    }
  }

  return (
    <>
      <h2 className="main_header1">Тематики для рекомендаций</h2>
      <ThematicsAdderForm value={themeTitle} onChange={setThemeTitle} onClick={addTheme} />
      <ThematicsPool themeItems={themes} removeItem={removeTheme} />
    </>
  )
}
