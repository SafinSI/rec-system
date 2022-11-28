import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";

export const Sidebar = ({ links, activeState, changeActiveState }) => {
  return (
    <nav
      className={style.sidenav}
      style={
        !activeState
          ? {
              visibility: "hidden",
            }
          : {}
      }
    >
      <div className={style["sidenav-content"]}>
        {links.map((link, i) => (
          <NavLink
            key={i}
            className={style["sidenav-content__item"]}
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#c0cdff" } : {}
            }
            to={link.path}
            onClick={changeActiveState}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
