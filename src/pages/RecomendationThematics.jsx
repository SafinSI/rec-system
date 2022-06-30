import ThematicsList from '../components/ThematicsList/ThematicsList';
import ThematicsAdderForm from '../components/ThematicsAdderForm/ThematicsAdderForm';
import { useState } from 'react';
import React from "react";


function RecomendationThematics({onClick}) {
    const [themes, setThemes] = useState([
      {name: 'ИАД', id: 1}, 
      {name:'Название Тематики 1', id: 2}, 
      {name:'Название Тематики 2', id: 3}
    ])
    const addTheme = (themeTitle) => {
      setThemes([...themes, {name: themeTitle, id: Date.now()}])
    }
    const removeTheme = (theme) => {
      setThemes(themes.filter(item => item.id !== theme.id))
    }
    return (
    <main className="main" onClick={onClick}>
        <h2 className="main_header1">Тематики для рекомендаций</h2>
        <ThematicsList themes={themes} remove={removeTheme}/>
        <ThematicsAdderForm addTheme={addTheme}/>
    </main>
    );
}

export default RecomendationThematics;