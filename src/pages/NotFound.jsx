import React from "react";

function NotFound({onClick}) {
  return(
    <div className="main" onClick={onClick}>
        <h2 className="main_header1 ">Страница не найдена</h2>
    </div>
  )
}

export default NotFound;