import React, { useState } from "react"
import { ThematicsList, ThematicsAdderForm } from "../components"

const mockedThematics: Theme[] = [
  { name: "ИАД", id: 1 },
  { name: "Машинное Обучение", id: 2 },
  { name: "Нейронные Сети", id: 3 }
]

type Theme = {
  id: number
  name: string
}

export const RecomendationThematics = () => {
  const [themes, setThemes] = useState<Theme[]>(mockedThematics)
  const addTheme = (themeTitle: string) => {
    setThemes([...themes, { name: themeTitle, id: Date.now() }])
  }
  const removeTheme = (theme: Theme) => {
    setThemes(themes.filter((item) => item.id !== theme.id))
  }
  return (
    <>
      <h2 className="main_header1">Тематики для рекомендаций</h2>
      <ThematicsList themes={themes} remove={removeTheme} />
      <ThematicsAdderForm addTheme={addTheme} />
    </>
  )
}
