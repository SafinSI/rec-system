import React from "react";

export function MessagePage({ onClick, message }) {
  return (
    <div className="main" onClick={onClick}>
      <h1 className="main_header1">{message}</h1>
    </div>
  );
}
