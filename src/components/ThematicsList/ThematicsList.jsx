import React from "react";
import style from './style.module.css'
import Thematic from './Thematic'

function ThematicsList(props) {
  return (
    <div className={style["thematics-list"]}>
      {props.themes.map(item => Thematic({item, remove: props.remove}))}
    </div>
  );
}

export default ThematicsList;