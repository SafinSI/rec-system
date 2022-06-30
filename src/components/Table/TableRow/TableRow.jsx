import React from "react";

function TableRow(props) {
  return (
    <tr {...props} key={props.data.id}>{
      Object.values(props.data).map((item, i) => (
        <td key={i}>{item}</td>
      ))
    }</tr>
  );
}

export default TableRow;