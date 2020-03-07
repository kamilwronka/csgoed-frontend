import React from "react";

function TableCell(props) {
  return <td {...props}>{props.children}</td>;
}

export default TableCell;
