import React from "react";
import style from './style.module.css';

function Thematic(props) {
  return (
    <div key={props.item.id} className={style.item}>{props.item.name}
      <button onClick={e => props.remove(props.item)}
      className={style["delete-button"]}>&times;</button>
    </div>
  );
}

export default Thematic;
