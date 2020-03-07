import React from "react";

function TableRow(props) {
  return <tr {...props}>{props.children}</tr>;
}

export default TableRow;
