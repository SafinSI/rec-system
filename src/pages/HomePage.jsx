import React from "react";

export const HomePage = ({ onClick }) => {
  return (
    <div className="main" onClick={onClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1 className="main_header1">Рекомендательная система НРекС</h1>
      </div>
    </div>
  );
};
