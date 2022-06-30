import React from "react";
import { Link } from "react-router-dom";
import style from './style.module.css';

function Sidebar({ links, activeState, changeActiveState }) {
  return (
  <nav className={style.sidenav} 
    style={ (!activeState) ? {
      visibility: 'hidden',
    } : {}}
    >
    <div className={style['sidenav-content']}>
      {
        links.map((link, i) => (
          <Link key={i}
            className={style["sidenav-content__item"]}
            to={link.path}
            onClick={changeActiveState}
            >{link.name}
          </Link>
        ))
      }
    </div>
  </nav>
  );
}

export default Sidebar;